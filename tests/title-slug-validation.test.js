'use strict';

/**
 * Regression coverage for the title/slug rules on Disease and Tag.
 *
 * Boots the real Strapi app against a throwaway SQLite file and drives the real
 * Document Service (create / update / publish) plus the content-manager UID
 * generator that the admin "regenerate" button calls.
 *
 *   npm test
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TYPES = [
  { name: 'disease', uid: 'api::disease.disease' },
  { name: 'tag', uid: 'api::tag.tag' },
];

let strapi;
let tmpDir;
let uploadsBefore;
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

const listUploads = () => (fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : []);

before(async () => {
  // Isolated database: never touch .tmp/data.db.
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'strapi-title-slug-'));
  process.env.DATABASE_CLIENT = 'sqlite';
  process.env.DATABASE_FILENAME = path.relative(process.cwd(), path.join(tmpDir, 'test.db'));
  process.env.NODE_ENV = 'test';

  // bootstrap.js seeds example data (including upload files) into a fresh DB.
  uploadsBefore = new Set(listUploads());

  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  strapi = await createStrapi(appContext).load();
  strapi.log.level = 'error';
});

after(async () => {
  if (strapi) await strapi.destroy();
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  for (const file of listUploads()) {
    if (!uploadsBefore.has(file)) fs.rmSync(path.join(uploadsDir, file), { force: true });
  }
});

const docs = (uid) => strapi.documents(uid);
const draft = (uid, data) => docs(uid).create({ data });
const publish = (uid, documentId) => docs(uid).publish({ documentId });
const published = (uid, documentId) => docs(uid).findOne({ documentId, status: 'published' });
const generateSlug = (uid, title) =>
  strapi
    .plugin('content-manager')
    .service('uid')
    .generateUIDField({ contentTypeUID: uid, field: 'slug', data: { title } });

/** Asserts publishing fails with a ValidationError that points at `field`. */
async function assertPublishRejected(uid, documentId, field) {
  await assert.rejects(publish(uid, documentId), (error) => {
    assert.equal(error.name, 'ValidationError', error.message);
    const paths = (error.details?.errors ?? []).map((e) => e.path.join('.'));
    assert.ok(paths.includes(field), `expected an error on "${field}", got ${JSON.stringify(paths)}`);
    return true;
  });
}

for (const { name, uid } of TYPES) {
  describe(`${name}: valid title and slug`, () => {
    const valid = [
      ['Acne', 'acne'],
      ['Acne Care', 'acne-care'],
      ['Type 2 Diabetes', 'type-2-diabetes'],
      ['2', '2'],
      ["Crohn's disease (CD) - overview, 100%!", 'crohns-disease-cd'],
      ['Café Crème – Ünïcode मुँहासे 糖尿病', 'cafe-creme-unicode'],
      ['  padded title  ', 'padded-title'],
    ];

    for (const [title, slug] of valid) {
      it(`publishes ${JSON.stringify(title)} / ${slug}`, async () => {
        const created = await draft(uid, { title, slug });
        await publish(uid, created.documentId);
        const live = await published(uid, created.documentId);
        assert.equal(live.title, title);
        assert.equal(live.slug, slug);
      });
    }
  });

  describe(`${name}: blank titles cannot publish`, () => {
    const blank = [
      ['missing', undefined],
      ['null', null],
      ['empty', ''],
      ['spaces', '   '],
      ['tabs and newlines', '\t\n \r\n'],
      ['non-breaking space', ' '],
    ];

    blank.forEach(([label, title], i) => {
      it(`saves a draft but rejects publish: ${label} title`, async () => {
        const data = { slug: `blank-title-${i}` };
        if (title !== undefined) data.title = title;
        const created = await draft(uid, data);
        assert.ok(created.documentId, 'invalid draft should be saved');
        await assertPublishRejected(uid, created.documentId, 'title');
        assert.equal(await published(uid, created.documentId), null);
      });
    });
  });

  describe(`${name}: invalid slugs cannot publish`, () => {
    const invalid = [
      ['missing', undefined],
      ['null', null],
      ['empty', ''],
      ['uppercase', 'Acne'],
      ['underscore', 'acne_care'],
      ['dot', 'acne.care'],
      ['double hyphen', 'acne--care'],
      ['leading hyphen', '-acne'],
      ['trailing hyphen', 'acne-'],
      ['only hyphen', '-'],
      ['space', 'acne care'],
      ['surrounding space', ' acne '],
      ['slash', 'acne/care'],
      ['tilde', 'acne~care'],
      ['accented', 'ácne'],
    ];

    invalid.forEach(([label, slug], i) => {
      it(`saves a draft but rejects publish: ${label} slug`, async () => {
        const data = { title: `Invalid slug ${i}` };
        if (slug !== undefined) data.slug = slug;
        const created = await draft(uid, data);
        assert.ok(created.documentId, 'invalid draft should be saved');
        await assertPublishRejected(uid, created.documentId, 'slug');
        assert.equal(await published(uid, created.documentId), null);
      });
    });
  });

  describe(`${name}: editor-generated slugs`, () => {
    it('generates valid slugs that publish', async () => {
      const titles = [
        ['Generated One', 'generated-one'],
        ['Generated Type 2 Diabetes!', 'generated-type-2-diabetes'],
        ['Café Crème', 'cafe-creme'],
        ['Acne & Care', 'acne-and-care'],
        ['  -- Spaced -- Out --  ', 'spaced-out'],
      ];
      for (const [title, expected] of titles) {
        const slug = await generateSlug(uid, title);
        assert.equal(slug, expected);
        assert.match(slug, SLUG_RE);
        const created = await draft(uid, { title, slug });
        await publish(uid, created.documentId);
        assert.equal((await published(uid, created.documentId)).slug, expected);
      }
    });

    it('adds -1, -2 suffixes for duplicate names and they still publish', async () => {
      const title = 'Duplicate Name';
      const slugs = [];
      for (let i = 0; i < 3; i += 1) {
        const slug = await generateSlug(uid, title);
        slugs.push(slug);
        const created = await draft(uid, { title, slug });
        await publish(uid, created.documentId);
        assert.equal((await published(uid, created.documentId)).slug, slug);
      }
      assert.deepEqual(slugs, ['duplicate-name', 'duplicate-name-1', 'duplicate-name-2']);
      slugs.forEach((slug) => assert.match(slug, SLUG_RE));
    });

    it('never yields a publishable-looking but invalid slug for non-Latin-only titles', async () => {
      const title = 'मुँहासे';
      const slug = await generateSlug(uid, title);
      const created = await draft(uid, { title, slug });
      if (SLUG_RE.test(slug)) {
        await publish(uid, created.documentId);
      } else {
        // Editor must supply a slug by hand; publish is blocked until then.
        await assertPublishRejected(uid, created.documentId, 'slug');
      }
    });
  });

  describe(`${name}: invalid edits keep the previous published version`, () => {
    const invalidEdits = [
      ['blank title', { title: '   ' }, 'title'],
      ['empty title', { title: '' }, 'title'],
      ['uppercase slug', { slug: 'Bad-Slug' }, 'slug'],
      ['underscore slug', { slug: 'bad_slug' }, 'slug'],
      ['empty slug', { slug: '' }, 'slug'],
      ['double hyphen slug', { slug: 'bad--slug' }, 'slug'],
    ];

    invalidEdits.forEach(([label, edit, field], i) => {
      it(`${label}: draft saved, publish fails, published unchanged`, async () => {
        const created = await draft(uid, { title: `Stable ${i}`, slug: `stable-${i}` });
        await publish(uid, created.documentId);

        await docs(uid).update({ documentId: created.documentId, data: edit });
        const saved = await docs(uid).findOne({ documentId: created.documentId, status: 'draft' });
        for (const [key, value] of Object.entries(edit)) {
          assert.equal(saved[key], value, `draft should keep invalid ${key}`);
        }

        await assertPublishRejected(uid, created.documentId, field);

        const live = await published(uid, created.documentId);
        assert.equal(live.title, `Stable ${i}`);
        assert.equal(live.slug, `stable-${i}`);

        // Fixing the draft makes it publishable again and replaces the live version.
        await docs(uid).update({
          documentId: created.documentId,
          data: { title: `Fixed ${i}`, slug: `fixed-${i}` },
        });
        await publish(uid, created.documentId);
        const fixed = await published(uid, created.documentId);
        assert.equal(fixed.title, `Fixed ${i}`);
        assert.equal(fixed.slug, `fixed-${i}`);
      });
    });
  });
}
