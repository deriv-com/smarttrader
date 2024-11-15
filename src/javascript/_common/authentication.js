const AuthClient = require("@deriv-com/auth-client");

export const callAuthorizationEndpoint = async () => {
  const redirectCallbackUri = `${window.location.origin}/en/callback.html`;
  const postLogoutRedirectUri = `${window.location.origin}/en/trading.html`;

  // NOTE: Remove the .html for staging
  await AuthClient.requestOidcAuthentication({
    redirectCallbackUri,
    postLogoutRedirectUri,
  });
};
