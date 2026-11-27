module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Strapi Cloud serves HTTPS through a proxy: trust its X-Forwarded-Proto so secure cookies work.
  // maxIpsCount: 1 takes the client IP the proxy appended, not the spoofable left-most one.
  proxy: { koa: true, maxIpsCount: 1 },
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  mcp: {
    enabled: true,
  },
});
