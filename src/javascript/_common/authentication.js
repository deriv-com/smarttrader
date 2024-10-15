const oidc       = require('oidc-client-ts');
const AuthClient = require('@deriv-com/auth-client')

const getOIDCConfiguration = async () => {
    const cachedConfig = localStorage.getItem('config.oidc_configuration');
    if (cachedConfig) return JSON.parse(cachedConfig);

    const serverUrl = localStorage.getItem('config.server_url');
    const response = await fetch(`https://${serverUrl}/.well-known/openid-configuration`);

    const config = await response.json();

    localStorage.setItem('config.oidc_configuration', JSON.stringify(config));

    return config;
};

export const createManager = async () => {
    const data = await getOIDCConfiguration();
    const appId = localStorage.getItem('config.app_id')

    const userManager = new oidc.UserManager({
        authority               : data.issuer,
        client_id               : appId,
        redirect_uri            : `${window.location.origin}/en/logged_inws.html`,
        response_type           : 'code',
        scope                   : 'openid',
        post_logout_redirect_uri: data.end_session_endpoint,
        metadata                : {
            issuer                : data.issuer,
            authorization_endpoint: data.authorization_endpoint,
            token_endpoint        : data.token_endpoint,
            userinfo_endpoint     : data.userinfo_endpoint,
            end_session_endpoint  : data.end_session_endpoint,
        },
    });

    return userManager;
};

export const callAuthorizationEndpoint = async () => {
    const appId = localStorage.getItem('config.app_id')
    const redirectUri = `${window.location.origin}/en/logged_inws.html`
    const postLogoutRedirectUri = `${window.location.origin}/en/trading.html`
    userManager = await AuthClient.requestOidcAuthentication(appId, redirectUri, postLogoutRedirectUri)
};

export const callTokenEndpoint = async () => {
    const manager = await createManager();
    const user = await manager.signinCallback();

    return {
        accessToken: user.access_token,
        idToken: user.id_token
    };
};

export const callLegacyTokenEndpoint = async (accessToken) => {
    const response = await fetch('https://qa101.deriv.dev/oauth2/legacy/tokens', {
        
        method : 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();
    return data;
};

