import React from 'react';
import ReactDOM from 'react-dom';

import { Callback } from '@deriv-com/auth-client';

import Cookies from 'js-cookie';
import moment from 'moment';
import Client from '../../base/client';
import BinarySocket from '../../base/socket';
import GTM from '../../../_common/base/gtm';
import { get as getLanguage } from '../../../_common/language';
import { isStorageSupported, removeCookies } from '../../../_common/storage';
import { urlFor } from '../../../_common/url';
import { getPropertyValue } from '../../../_common/utility';
import { getElementById } from '../../../_common/common_functions';

const map_names = {
    country             : 'residence',
    landing_company_name: 'landing_company_shortcode',
};

const storeClientAccounts = (tokens, account_list) => {
    // Parse url for loginids, tokens, and currencies returned by OAuth

    // Clear all accounts before entering the loop
    Client.clearAllAccounts();

    account_list.forEach(account => {
        Object.keys(account).forEach(param => {
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
        const token = tokens[`token${i}`];
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

const CallbackContainer = () => {
    const onLoginSuccess = async tokens => {
        let redirect_url;
        BinarySocket.send({ authorize: tokens.token1 }).then(response => {
            const account_list = getPropertyValue(response, ['authorize', 'account_list']);
            if (
                isStorageSupported(localStorage) &&
                isStorageSupported(sessionStorage) &&
                account_list
            ) {
                // redirect url
                redirect_url = sessionStorage.getItem('redirect_url');
                sessionStorage.removeItem('redirect_url');

                storeClientAccounts(tokens, account_list);
            } else {
                Client.doLogout({ logout: 1 });
            }

            // redirect back
            let set_default = true;
            const allowed_urls = [
                urlFor('user/metatrader'),
                urlFor('home'),
                Client.defaultRedirectUrl(),
            ];
            // Extract pathnames from allowed URLs for comparison
            const allowed_paths = allowed_urls.map(url => {
                try {
                    return new URL(url, window.location.origin).pathname;
                } catch (e) {
                    return url; // fallback to original if URL parsing fails
                }
            });
            
            // Enhanced URL validation to prevent client-side redirect attacks
            if (redirect_url) {
                try {
                    const url = new URL(redirect_url, window.location.origin);
                    // Only allow whitelisted paths and same-origin URLs
                    if (
                        url.origin === window.location.origin &&
                        allowed_paths.includes(url.pathname)
                    ) {
                        set_default = false;
                    } else {
                        redirect_url = null; // Untrusted URL, fallback to default
                    }
                } catch (error) {
                    // Invalid URL format, use default
                    redirect_url = null;
                }
            }

            if (set_default) {
                const language = getLanguage();
                const lang_cookie = Cookies.get('language') || language;
                redirect_url =
                    Client.isAccountOfType('financial') || Client.isOptionsBlocked()
                        ? urlFor('user/metatrader')
                        : Client.defaultRedirectUrl();
                if (lang_cookie && lang_cookie !== language) {
                    redirect_url = redirect_url.replace(
                        new RegExp(`/${language}/`, 'i'),
                        `/${lang_cookie.toLowerCase()}/`
                    );
                }
            }
            
            // Validate URL before setting href and redirecting to prevent client-side URL redirect attacks
            let safeRedirectUrl = redirect_url;
            try {
                const finalUrl = new URL(redirect_url, window.location.origin);
                if (finalUrl.origin !== window.location.origin) {
                    safeRedirectUrl = Client.defaultRedirectUrl();
                }
            } catch (error) {
                safeRedirectUrl = Client.defaultRedirectUrl();
            }
            
            getElementById('loading_link').setAttribute('href', safeRedirectUrl);
            window.location.replace(safeRedirectUrl); // need to redirect not using pjax
        });
    };

    // eslint-disable-next-line no-console
    return <Callback onSignInSuccess={onLoginSuccess} onSignInError={console.error} />;
};

export const init = () => {
    ReactDOM.render(<CallbackContainer />, document.getElementById('callback_container'));
};

export default init;
