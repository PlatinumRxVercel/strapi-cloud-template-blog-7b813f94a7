module.exports = ({ env }) => ({
  // Localazy plugin intentionally removed.
  'strapi-plugin-sso': {
    enabled: true,
    config: {
      GOOGLE_OAUTH_CLIENT_ID: env('GOOGLE_OAUTH_CLIENT_ID'),
      GOOGLE_OAUTH_CLIENT_SECRET: env('GOOGLE_OAUTH_CLIENT_SECRET'),
      GOOGLE_OAUTH_REDIRECT_URI: env(
        'GOOGLE_OAUTH_REDIRECT_URI',
        'http://localhost:1337/strapi-plugin-sso/google/callback'
      ),
      // Only accounts managed by the platinumrx.in Google Workspace.
      GOOGLE_GSUITE_HD: 'platinumrx.in',
    },
  },
});
