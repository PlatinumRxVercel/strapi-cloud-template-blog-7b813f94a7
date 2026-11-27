'use strict';
const bootstrap = require("./bootstrap");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Google sign-in is only for existing admins; new people are added via Settings → Users → Invite.
    const oauth = strapi.plugin('strapi-plugin-sso').service('oauth');
    oauth.createUser = async () => {
      throw new Error('No CMS account for this email. Ask an admin to invite you.');
    };
    // Invited users stay inactive until an admin switches on "Active"; say so instead of a silent logout.
    const generateToken = oauth.generateToken;
    /** @param {{ isActive?: boolean }} user @param {any} ctx */
    oauth.generateToken = async (user, ctx) => {
      if (!user.isActive) {
        throw new Error('Your CMS account is not active yet. Kindly ask an admin to activate it.');
      }
      return generateToken.call(oauth, user, ctx);
    };
    await bootstrap();
  },
};
