module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  // Set ALLOW_PASSWORD_LOGIN=true to restore email + password login if Google sign-in breaks.
  ...(env.bool('ALLOW_PASSWORD_LOGIN', true) ? [] : ['global::google-only']),
];
