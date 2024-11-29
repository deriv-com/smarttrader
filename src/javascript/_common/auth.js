const {
    AppIDConstants,
    LocalStorageConstants,
    LocalStorageUtils,
    URLConstants,
    WebSocketUtils,
} = require('@deriv-com/utils');
const Cookies = require('js-cookie');
const requestOidcAuthentication = require('@deriv-com/auth-client').requestOidcAuthentication;
const Analytics = require('./analytics');

export const DEFAULT_OAUTH_LOGOUT_URL = 'https://oauth.deriv.com/oauth2/sessions/logout';

export const DEFAULT_OAUTH_ORIGIN_URL = 'https://oauth.deriv.com';

const LOGOUT_HANDLER_TIMEOUT = 10000;

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

    const defaultAppId = WebSocketUtils.getAppId();
    const appId = LocalStorageUtils.getValue(LocalStorageConstants.configAppId) || defaultAppId;
    const lang = LocalStorageUtils.getValue(LocalStorageConstants.i18nLanguage) || 'en';

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
    let timeout;

    if (!isAuthEnabled) {
        return onWSLogoutAndRedirect;
    }

    const cleanup = () => {
        clearTimeout(timeout);

        const iframe = document.getElementById('logout-iframe');
        if (iframe) iframe.remove();
    };

    const onMessage =  event => {
        if (event.data === 'logout_complete') {
            const domains = ['deriv.com', 'binary.sx', 'pages.dev', 'localhost'];
            const currentDomain = window.location.hostname.split('.').slice(-2).join('.');
            if (domains.includes(currentDomain)) {
                Cookies.set('logged_state', 'false', {
                    expires: 30,
                    path   : '/',
                    secure : true,
                });
            }
            onWSLogoutAndRedirect();
            window.removeEventListener('message', onMessage);
            cleanup();
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

            timeout = setTimeout(() => {
                onWSLogoutAndRedirect();
                window.removeEventListener('message', onMessage);
                cleanup();
            }, LOGOUT_HANDLER_TIMEOUT);
        }

        iframe.src = getOAuthLogoutUrl();
    };

    return oAuth2Logout;
};

export const requestSingleSignOn = async () => {
    const _requestSingleSignOn = async () => {
        // if we have previously logged in,
        // this cookie will be set by the Callback page (which is exported from @deriv-com/auth-client library) to true when we have successfully logged in from other apps
        const isLoggedInCookie = Cookies.get('logged_state') === 'true';
        const clientAccounts = JSON.parse(localStorage.getItem('client.accounts') || '{}');
        const isClientAccountsPopulated = Object.keys(clientAccounts).length > 0;
        const isAuthEnabled = isOAuth2Enabled();
        const isCallbackPage = window.location.pathname.includes('callback');
        const isEndpointPage = window.location.pathname.includes('endpoint');

        // we only do SSO if:
        // we have previously logged-in before from SmartTrader or any other apps (Deriv.app, etc) - isLoggedInCookie
        // if we are not in the callback route to prevent re-calling this function - !isCallbackPage
        // if client.accounts in localStorage is empty - !isClientAccountsPopulated
        // and if feature flag for OIDC Phase 2 is enabled - isAuthEnabled
        if (isLoggedInCookie && !isCallbackPage && !isEndpointPage && !isClientAccountsPopulated && isAuthEnabled) {
            await requestOidcAuthentication({
                redirectCallbackUri: `${window.location.origin}/en/callback`,
            });
        }
    };

    const isGrowthbookLoaded = Analytics.isGrowthbookLoaded();
    if (!isGrowthbookLoaded) {
        let retryInterval = 0;
        // this interval is to check if Growthbook is already initialised.
        // If not, keep checking it (max 10 times) and SSO if conditions are met
        const interval = setInterval(() => {
            if (retryInterval > 10) {
                clearInterval(interval);
            } else {
                const isLoaded = Analytics.isGrowthbookLoaded();
                if (isLoaded) {
                    _requestSingleSignOn();
                    clearInterval(interval);
                } else {
                    retryInterval += 1;
                }
            }
        }, 500);
    } else {
        _requestSingleSignOn();
    }
};
