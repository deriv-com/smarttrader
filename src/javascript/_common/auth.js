const Utils = require('@deriv-com/utils');

export const DEFAULT_OAUTH_LOGOUT_URL = 'https://oauth.deriv.com/oauth2/sessions/logout';

export const DEFAULT_OAUTH_ORIGIN_URL = 'https://oauth.deriv.com';

export const getOAuthLogoutUrl = () => {
    const { appId, serverUrl } = Utils.WebSocketUtils.getServerInfo();

    const oauthUrl = appId && serverUrl ? `https://${serverUrl}/oauth2/sessions/logout` : DEFAULT_OAUTH_LOGOUT_URL;

    return oauthUrl;
};

export const getOAuthOrigin = () => {
    const { appId, serverUrl } = Utils.WebSocketUtils.getServerInfo();

    const oauthUrl = appId && serverUrl ? `https://${serverUrl}` : DEFAULT_OAUTH_ORIGIN_URL;

    return oauthUrl;
};

export const AuthClient = (() => {
    const isOAuth2Enabled = oAuth2GrowthbookConfig => {
        const { OAuth2EnabledApps, OAuth2EnabledAppsInitialised } = oAuth2GrowthbookConfig;
        const appId = Utils.WebSocketUtils.getAppId();

        if (OAuth2EnabledAppsInitialised) {
            const FEHydraAppIds = OAuth2EnabledApps?.length
                ? OAuth2EnabledApps[OAuth2EnabledApps.length - 1]?.enabled_for ?? []
                : [];
            return FEHydraAppIds.includes(+appId);
        }

        return false;
    };
    const getLogoutHandler = (oAuth2GrowthbookConfig, onWSLogoutAndRedirect) => {
        const isAuthEnabled = isOAuth2Enabled(oAuth2GrowthbookConfig);

        if (!isAuthEnabled) {
            console.log('lol auth2 is not enabled');
            return onWSLogoutAndRedirect;
        }

        const onMessage = async event => {
            const allowedOrigin = getOAuthOrigin();
            if (allowedOrigin === event.origin) {
                if (event.data === 'logout_complete') {
                    console.log('logout_complete calledd!');
                    onWSLogoutAndRedirect();
                }
            }
        };

        window.addEventListener('message', onMessage);

        const oAuth2Logout = async () => {
            if (!isAuthEnabled) {
                console.log('lol auth2 is not enabled');
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
            console.log('auth2 doneee');
        };

        return oAuth2Logout;
    };

    return {
        getLogoutHandler,
        isOAuth2Enabled,
    };
})();
