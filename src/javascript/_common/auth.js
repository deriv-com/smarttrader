const {
    AppIDConstants,
    LocalStorageConstants,
    LocalStorageUtils,
    URLConstants,
    WebSocketUtils,
} = require('@deriv-com/utils');
const Cookies = require('js-cookie');
const requestOidcAuthentication = require('@deriv-com/auth-client').requestOidcAuthentication;
const OAuth2Logout = require('@deriv-com/auth-client').OAuth2Logout;
const Analytics = require('./analytics');
const Language  = require('./language');

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

export const requestOauth2Logout = onWSLogoutAndRedirect => {
    const currentLanguage = Language.get();

    OAuth2Logout({
        WSLogoutAndRedirect  : onWSLogoutAndRedirect,
        redirectCallbackUri  : `${window.location.origin}/${currentLanguage}/callback`,
        postLogoutRedirectUri: `${window.location.origin}/${currentLanguage}/trading`,
    });
};

export const requestSingleLogout = async (onWSLogoutAndRedirect) => {
    const requestSingleLogoutImpl = async () => {
        const isLoggedOutCookie = Cookies.get('logged_state') === 'false';
        const clientAccounts = JSON.parse(localStorage.getItem('client.accounts') || '{}');
        const isClientAccountsPopulated = Object.keys(clientAccounts).length > 0;
        const isAuthEnabled = isOAuth2Enabled();
        const isCallbackPage = window.location.pathname.includes('callback');
        const isEndpointPage = window.location.pathname.includes('endpoint');

        if (isLoggedOutCookie && isClientAccountsPopulated && isAuthEnabled && !isCallbackPage && !isEndpointPage) {
            await requestOauth2Logout(onWSLogoutAndRedirect);
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
                    requestSingleLogoutImpl();
                    clearInterval(interval);
                } else {
                    retryInterval += 1;
                }
            }
        }, 500);
    } else {
        requestSingleLogoutImpl();
    }
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
            const currentLanguage = Language.get();
            const urlParams = new URLSearchParams(window.location.search);
            const account = sessionStorage.getItem('account') ||
                          urlParams.get('account') ||
                          localStorage.getItem('account');
            await requestOidcAuthentication({
                redirectCallbackUri: `${window.location.origin}/${currentLanguage}/callback?account=${account}`,
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
