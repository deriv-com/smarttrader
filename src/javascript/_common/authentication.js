const oidc = require("oidc-client-ts");
const AuthClient = require("@deriv-com/auth-client");

export const callAuthorizationEndpoint = async () => {
  const redirectUri = `${window.location.origin}/en/logged_inws.html`;
  const postLogoutRedirectUri = `${window.location.origin}/en/trading`;
  // NOTE: Remove the .html for staging
  await AuthClient.requestOidcAuthentication(
    redirectUri,
    postLogoutRedirectUri
  );
};

export const callTokenEndpoint = async () => {
  const redirectUri = `${window.location.origin}/en/logged_inws.html`;
  const postLogoutRedirectUri = `${window.location.origin}/en/trading`;

  const { accessToken } = await AuthClient.requestOidcToken(
    redirectUri,
    postLogoutRedirectUri
  );

  return {
    accessToken,
  };
};

export const callLegacyTokenEndpoint = async (accessToken) => {
  const tokens = await AuthClient.requestLegacyToken(accessToken);

  return tokens;
};

export const callLogoutSilent = async () => {
  await AuthClient.logoutSilent();
};
