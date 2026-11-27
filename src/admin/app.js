const GOOGLE_LOGIN = '/strapi-plugin-sso/google';

// The free edition's login page has no SSO button, so add one linking to the Google sign-in.
const addGoogleButton = () => {
  if (!location.pathname.endsWith('/auth/login') || document.getElementById('google-login')) return;
  const form = document.querySelector('form');
  if (!form) return;
  const link = Object.assign(document.createElement('a'), {
    id: 'google-login',
    href: GOOGLE_LOGIN,
    textContent: 'Continue with Google',
  });
  link.style.cssText =
    'display:block;margin-top:16px;padding:10px;border:1px solid #dcdce4;border-radius:4px;' +
    'background:#fff;color:#32324d;font-size:14px;font-weight:600;text-align:center;text-decoration:none';
  form.after(link);
};

export default {
  bootstrap() {
    // The login page is rendered in the browser (also after logout), so watch for it.
    new MutationObserver(addGoogleButton).observe(document.body, { childList: true, subtree: true });
  },
};
