import React from 'react';
import ReactDOM from 'react-dom';

import { Callback } from '@deriv-com/auth-client';

import Cookies from 'js-cookie';
import moment from 'moment';
import Client from '../../base/client';
import BinarySocket from '../../base/socket';
import GTM from '../../../_common/base/gtm';
import { get as getLanguage, urlLang } from '../../../_common/language';
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
            if (redirect_url) {
                const allowed_domains = ['example.com', 'deriv.com']; // Add trusted domains here
                const url_object = new URL(redirect_url, window.location.origin);
                const is_trusted_domain = allowed_domains.some(domain => url_object.hostname.endsWith(domain));

                if (!is_trusted_domain) {
                    redirect_url = null; // Invalidate the redirect URL if not trusted
                } else {
                    const do_not_redirect = [
                        'reset_passwordws',
                        'lost_passwordws',
                        'change_passwordws',
                        'home',
                       '404',
                   ];
                   const reg = new RegExp(do_not_redirect.join('|'), 'i');
                   if (reg.test(redirect_url) || urlFor('') === redirect_url) {
                       redirect_url = null; // Invalidate if it matches disallowed paths
                   } else {
                       set_default = false;
                   }
               }
            }
            if (set_default) {
                const lang_cookie = urlLang(redirect_url) || Cookies.get('language');
                const language = getLanguage();
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
            getElementById('loading_link').setAttribute('href', redirect_url);
            
            window.location.replace(redirect_url); // need to redirect not using pjax
        });
    };

    // eslint-disable-next-line no-console
    return <Callback onSignInSuccess={onLoginSuccess} onSignInError={console.error} />;
};

export const init = () => {
    ReactDOM.render(<CallbackContainer />, document.getElementById('callback_container'));
};

export default init;
