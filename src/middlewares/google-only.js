'use strict';

const PASSWORD_ROUTES = new Set([
  '/admin/login',
  '/admin/register',
  '/admin/register-admin',
  '/admin/forgot-password',
  '/admin/reset-password',
]);

module.exports = () => async (ctx, next) => {
  // Strapi's router matches paths case-insensitively, so normalise before checking.
  const path = ctx.path.toLowerCase().replace(/\/+$/, '');

  if (PASSWORD_ROUTES.has(path)) {
    return ctx.forbidden('Password login is disabled. Sign in with Google.');
  }

  return next();
};
