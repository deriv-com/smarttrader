const Cookies            = require('js-cookie');
const moment             = require('moment');
const Client             = require('./client');
const BinarySocket       = require('./socket');
const GTM                = require('../../_common/base/gtm');
const SocketCache        = require('../../_common/base/socket_cache');
const getElementById     = require('../../_common/common_functions').getElementById;
const getLanguage        = require('../../_common/language').get;
const urlLang            = require('../../_common/language').urlLang;
const isStorageSupported = require('../../_common/storage').isStorageSupported;
const removeCookies      = require('../../_common/storage').removeCookies;
const paramsHash         = require('../../_common/url').paramsHash;
const urlFor             = require('../../_common/url').urlFor;
const getPropertyValue   = require('../../_common/utility').getPropertyValue;
const Auth               = require('../../_common/authentication');
const DerivIFrame        = require('../pages/deriv_iframe.jsx');

const LoggedInHandler = (() => {
    const onLoad = async () => {
        SocketCache.clear();
        parent.window.is_logging_in = 1; // this flag is used in base.js to prevent auto-reloading this page
        const params = paramsHash(window.location.href);

        const { accessToken } = await Auth.callTokenEndpoint(params.code, params.state);

        const tokens = await Auth.callLegacyTokenEndpoint(accessToken);

        // const isLoggedIn = () => (
        //     !isEmptyObject(getAllAccountsObject()) &&
        //     get('loginid') &&
        //     get('token')
        // );
        // localStorage.setItem('loginid', )

        let redirect_url;
        BinarySocket.send({ authorize: tokens.token1 }).then((response) => {
            const account_list = getPropertyValue(response, ['authorize', 'account_list']);
            if (isStorageSupported(localStorage) && isStorageSupported(sessionStorage) && account_list) {
                // redirect url
                redirect_url = sessionStorage.getItem('redirect_url');
                sessionStorage.removeItem('redirect_url');

                storeClientAccounts(tokens, account_list);
            } else {
                Client.doLogout({ logout: 1 });
            }

            // redirect back
            let set_default = true;
            if (redirect_url) {
                const do_not_redirect = ['reset_passwordws', 'lost_passwordws', 'change_passwordws', 'home', '404'];
                const reg             = new RegExp(do_not_redirect.join('|'), 'i');
                if (!reg.test(redirect_url) && urlFor('') !== redirect_url) {
                    set_default = false;
                }
            }
            if (set_default) {
                const lang_cookie = urlLang(redirect_url) || Cookies.get('language');
                const language    = getLanguage();
                redirect_url      = (Client.isAccountOfType('financial') || Client.isOptionsBlocked())
                    ? urlFor('user/metatrader')
                    : Client.defaultRedirectUrl();
                if (lang_cookie && lang_cookie !== language) {
                    redirect_url = redirect_url.replace(new RegExp(`/${language}/`, 'i'), `/${lang_cookie.toLowerCase()}/`);
                }
            }
            getElementById('loading_link').setAttribute('href', redirect_url);
            window.location.href = redirect_url; // need to redirect not using pjax
        });
    };

    // store consistent names with other API calls
    // API_V4: send consistent names
    const map_names = {
        country             : 'residence',
        landing_company_name: 'landing_company_shortcode',
    };

    const storeClientAccounts = (tokens, account_list) => {
        // Parse url for loginids, tokens, and currencies returned by OAuth

        // Clear all accounts before entering the loop
        Client.clearAllAccounts();

        account_list.forEach((account) => {
            Object.keys(account).forEach((param) => {
                if (param === 'loginid') {
                    if (!Client.get('loginid') && !account.is_disabled && !account.is_virtual) {
                        Client.set(param, account[param]);
                    }
                } else {
                    const param_to_set = map_names[param] || param;
                    const value_to_set = typeof account[param] === 'undefined' ? '' : account[param];
                    Client.set(param_to_set, value_to_set, account.loginid);
                }
            });
        });

        let i = 1;
        while (tokens[`acct${i}`]) {
            const loginid = tokens[`acct${i}`];
            const token   = tokens[`token${i}`];
            if (loginid && token) {
                Client.set('token', token, loginid);
            }
            i++;
        }

        // if didn't find any login ID that matched the above condition
        // or the selected one doesn't have a token, set the first one
        if (!Client.get('loginid') || !Client.get('token')) {
            Client.set('loginid', tokens.acct1 || account_list[0].loginid);
        }

        if (Client.isLoggedIn()) {
            GTM.setLoginFlag('log_in');
            Client.set('session_start', parseInt(moment().valueOf() / 1000));
            // Remove cookies that were set by the old code
            removeCookies('email', 'login', 'loginid', 'loginid_list', 'residence');
        }
    };

    return {
        onLoad,
    };
})();

module.exports = LoggedInHandler;
