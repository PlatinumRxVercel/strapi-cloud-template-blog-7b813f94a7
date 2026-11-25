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
    strapi.plugin('strapi-plugin-sso').service('oauth').createUser = async () => {
      throw new Error('No CMS account for this email. Ask an admin to invite you.');
    };
    await bootstrap();
  },
};
