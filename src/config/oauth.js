// OAuth Configuration
export const OAUTH_CONFIG = {
  google: {
    clientId: '193083169842-163fkm0ckgn3hhbf6t09a3428ntlg595.apps.googleusercontent.com',
    redirectUri: `${window.location.origin}/auth`,
    scope: 'openid email profile'
  },
  github: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth`,
    scope: 'user:email'
  }
};

// Google OAuth URLs
export const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_CONFIG.google.clientId}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.google.redirectUri)}&response_type=code&scope=${encodeURIComponent(OAUTH_CONFIG.google.scope)}&access_type=offline&prompt=consent`;

// GitHub OAuth URLs  
export const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${OAUTH_CONFIG.github.clientId}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.github.redirectUri)}&scope=${encodeURIComponent(OAUTH_CONFIG.github.scope)}`;
