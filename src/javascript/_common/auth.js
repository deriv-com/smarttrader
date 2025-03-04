const {
    AppIDConstants,
    LocalStorageConstants,
    LocalStorageUtils,
    URLConstants,
    WebSocketUtils,
} = require('@deriv-com/utils');
const Cookies = require('js-cookie');
const requestOidcAuthentication = require('@deriv-com/auth-client').requestOidcAuthentication;
const requestOidcSilentAuthentication = require('@deriv-com/auth-client').requestOidcSilentAuthentication;
const OAuth2Logout = require('@deriv-com/auth-client').OAuth2Logout;
const Analytics = require('./analytics');
const Language  = require('./language');

export const DEFAULT_OAUTH_LOGOUT_URL = 'https://oauth.deriv.com/oauth2/sessions/logout';

export const DEFAULT_OAUTH_ORIGIN_URL = 'https://oauth.deriv.com';

const SocketURL = {
    [URLConstants.derivP2pProduction]: 'blue.derivws.com',
    [URLConstants.derivP2pStaging]   : 'red.derivws.com',
};

const getUserBrowser = () => {
    // We can't rely only on navigator.userAgent.index, the verification order is also important
    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf('Edg') !== -1) {
        return 'Edge';
    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox';
    }
    return 'unknown';
};

const isSafariBrowser = () => getUserBrowser() === 'Safari';


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

export const requestOauth2Logout = async onWSLogoutAndRedirect => {
    const currentLanguage = Language.get();

    await OAuth2Logout({
        WSLogoutAndRedirect  : onWSLogoutAndRedirect,
        redirectCallbackUri  : `${window.location.origin}/${currentLanguage}/callback`,
        postLogoutRedirectUri: `${window.location.origin}/${currentLanguage}/trading`,
    });
};

export const requestSingleLogout = async (onWSLogoutAndRedirect) => {
    const requestSingleLogoutImpl = async () => {
        // NOTE: We don't check for logged_state anymore in non-Safari browsers
        // for non-Safari browsers, front channels will help us log out in SmartTrader when we log out from other applications like Deriv.app
        if (!isSafariBrowser()) return
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
    // This is the legacy SSO/SLO method for auto logging-in (SSO) and auto logging-out by checking logged_state cookie
    // This method is only for Safari browsers
    const requestWithLoggedState = async () => {
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
        // Check if any account or its linked account is missing a token
        const shouldRequestSignOn =
          isLoggedInCookie &&
          !isCallbackPage &&
          !isEndpointPage &&
          (!isClientAccountsPopulated) &&
          isAuthEnabled;

        if (shouldRequestSignOn) {
            const currentLanguage = Language.get();
            await requestOidcAuthentication({
                redirectCallbackUri: `${window.location.origin}/${currentLanguage}/callback`,
            });
        }
    };

    // This is the new SSO method for auto logging-in (SSO) and auto logging-out by using silent login
    // Front channels triggered by Hydra (on src/root_files/app/front-channel.html) 
    // will help us auto log out in SmartTrader when we log out from other applications like Deriv.app
    const requestWithSilentLogin = async () => {
        const clientAccounts = JSON.parse(localStorage.getItem('client.accounts') || '{}');
        const isClientAccountsPopulated = Object.keys(clientAccounts).length > 0;
        const isAuthEnabled = isOAuth2Enabled();
        const isCallbackPage = window.location.pathname.includes('callback');
        const isEndpointPage = window.location.pathname.includes('endpoint');
    
        // we only do SSO if:
        // if client.accounts in localStorage is empty - !isClientAccountsPopulated
        // if we are not in the callback/endpoint route to prevent re-calling this function - !isCallbackPage && !isEndpointPage
        // and if feature flag for OIDC Phase 2 is enabled - isAuthEnabled
        // Check if any account or its linked account is missing a token
        const shouldRequestSignOn =
          !isCallbackPage &&
          !isEndpointPage &&
          (!isClientAccountsPopulated) &&
          isAuthEnabled;
    
        if (shouldRequestSignOn) {
            const currentLanguage = Language.get();
    
            window.addEventListener(
                'message',
                message => {
                    if (message.data?.event === 'login_successful') {
                        requestOidcAuthentication({
                            redirectCallbackUri: `${window.location.origin}/${currentLanguage}/callback`,
                        });
                    }
                },
                false
            );
    
            await requestOidcSilentAuthentication({
                redirectSilentCallbackUri: `${window.location.origin}/silent-callback.html`,
                redirectCallbackUri: `${window.location.origin}/${currentLanguage}/callback`,
            });
        }
    }
    

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
                    if (isSafariBrowser()) {
                        requestWithLoggedState();
                    } else {
                        requestWithSilentLogin();
                    }
                    clearInterval(interval);
                } else {
                    retryInterval += 1;
                }
            }
        }, 500);
    } else {
        if (isSafariBrowser()) {
            requestWithLoggedState();
        } else {
            requestWithSilentLogin();
        }
    }
};
