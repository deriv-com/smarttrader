const {
    AppIDConstants,
    LocalStorageConstants,
    LocalStorageUtils,
    URLConstants,
    WebSocketUtils,
} = require('@deriv-com/utils');
const Analytics = require('./analytics');

export const DEFAULT_OAUTH_LOGOUT_URL = 'https://oauth.deriv.com/oauth2/sessions/logout';

export const DEFAULT_OAUTH_ORIGIN_URL = 'https://oauth.deriv.com';

const SocketURL = {
    [URLConstants.derivP2pProduction]: 'blue.derivws.com',
    [URLConstants.derivP2pStaging]   : 'red.derivws.com',
};

export const getServerInfo = () => {
    const origin = window.location.origin;
    const hostname = window.location.hostname;

    const existingAppId = LocalStorageUtils.getValue(LocalStorageConstants.configAppId);
    const existingServerUrl = LocalStorageUtils.getValue(LocalStorageConstants.configServerURL);
    // since we don't have official app_id for staging,
    // we will use the red server with app_id=62019 for the staging-p2p.deriv.com for now
    // to fix the login issue
    if (origin === URLConstants.derivP2pStaging && (!existingAppId || !existingServerUrl)) {
        LocalStorageUtils.setValue(LocalStorageConstants.configServerURL, SocketURL[origin]);
        LocalStorageUtils.setValue(LocalStorageConstants.configAppId, `${AppIDConstants.domainAppId[hostname]}`);
    }

    const serverUrl = LocalStorageUtils.getValue(LocalStorageConstants.configServerURL) || localStorage.getItem('config.server_url') || 'oauth.deriv.com';

    const appId = LocalStorageUtils.getValue(LocalStorageConstants.configAppId);
    const lang = LocalStorageUtils.getValue(LocalStorageConstants.i18nLanguage);

    return {
        appId,
        lang,
        serverUrl,
    };
};

export const getOAuthLogoutUrl = () => {
    const { appId, serverUrl } = getServerInfo();

    const oauthUrl = appId && serverUrl ? `https://${serverUrl}/oauth2/sessions/logout` : DEFAULT_OAUTH_LOGOUT_URL;

    return oauthUrl;
};

export const getOAuthOrigin = () => {
    const { appId, serverUrl } = getServerInfo();

    const oauthUrl = appId && serverUrl ? `https://${serverUrl}` : DEFAULT_OAUTH_ORIGIN_URL;

    return oauthUrl;
};

export const isOAuth2Enabled = () => {
    const [OAuth2EnabledApps, OAuth2EnabledAppsInitialised] = Analytics.getGrowthbookFeatureValue({
        featureFlag: 'hydra_be',
    });
    const appId = WebSocketUtils.getAppId();

    if (OAuth2EnabledAppsInitialised) {
        const FEHydraAppIds = OAuth2EnabledApps?.length
            ? OAuth2EnabledApps[OAuth2EnabledApps.length - 1]?.enabled_for ?? []
            : [];
        return FEHydraAppIds.includes(+appId);
    }

    return false;
};

export const getLogoutHandler = onWSLogoutAndRedirect => {
    const isAuthEnabled = isOAuth2Enabled();

    if (!isAuthEnabled) {
        return onWSLogoutAndRedirect;
    }

    const onMessage = async event => {
        const allowedOrigin = getOAuthOrigin();
        if (allowedOrigin === event.origin) {
            if (event.data === 'logout_complete') {
                await onWSLogoutAndRedirect();
            }
        }
    };

    window.addEventListener('message', onMessage);

    const oAuth2Logout = () => {
        if (!isAuthEnabled) {
            onWSLogoutAndRedirect();
            return;
        }

        let iframe = document.getElementById('logout-iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'logout-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            setTimeout(() => {
                onWSLogoutAndRedirect();
            }, 10000);
        }

        iframe.src = getOAuthLogoutUrl();
    };

    return oAuth2Logout;
};
