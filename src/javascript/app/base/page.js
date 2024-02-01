const Cookies          = require('js-cookie');
const moment           = require('moment');
const Client           = require('./client');
const Contents         = require('./contents');
const Header           = require('./header');
const Menu             = require('./menu');
const BinarySocket     = require('./socket');
const TrafficSource    = require('../common/traffic_source');
const RealityCheck     = require('../pages/user/reality_check/reality_check');
const Elevio           = require('../../_common/base/elevio');
const Login            = require('../../_common/base/login');
const elementInnerHtml = require('../../_common/common_functions').elementInnerHtml;
const getElementById   = require('../../_common/common_functions').getElementById;
const Crowdin          = require('../../_common/crowdin');
const GTM              = require('../../_common/gtm');
const Language         = require('../../_common/language');
const PushNotification = require('../../_common/lib/push_notification');
const localize         = require('../../_common/localize').localize;
const isMobile         = require('../../_common/os_detect').isMobile;
const LocalStore       = require('../../_common/storage').LocalStore;
const State            = require('../../_common/storage').State;
const scrollToTop      = require('../../_common/scroll').scrollToTop;
const toISOFormat      = require('../../_common/string_util').toISOFormat;
const Url              = require('../../_common/url');
const createElement    = require('../../_common/utility').createElement;
const isLoginPages     = require('../../_common/utility').isLoginPages;
const isProduction     = require('../../config').isProduction;
require('../../_common/lib/polyfills/array.includes');
require('../../_common/lib/polyfills/string.includes');

const Page = (() => {
    const init = () => {
        State.set('is_loaded_by_pjax', false);
        GTM.init();
        Url.init();
        Elevio.init();
        PushNotification.init();
        onDocumentReady();
        Crowdin.init();
    };

    const onDocumentReady = () => {
        // LocalStorage can be used as a means of communication among
        // different windows. The problem that is solved here is what
        // happens if the user logs out or switches loginid in one
        // window while keeping another window or tab open. This can
        // lead to unintended trades. The solution is to reload the
        // page in all windows after switching loginid or after logout.

        // onLoad.queue does not work on the home page.
        // jQuery's ready function works always.
        $(document).ready(() => {
            // Cookies is not always available.
            // So, fall back to a more basic solution.
            window.addEventListener('storage', (evt) => {
                switch (evt.key) {
                    case 'active_loginid':
                        // reload the page when the client changes account on other pages.
                        if (evt.newValue === '' || !window.is_logging_in) {
                            reload();
                        }
                        break;
                    case 'client.accounts':
                        if (evt.newValue !== evt.oldValue) {
                            const removedSessionAndBalnce = (input) => {
                                const filtered_account = input
                                    .replace(/"balance":[+-]?([0-9]*[.])?[0-9]+/g, '')
                                    .replace(/"session_start":([0-9]+),/g, '');
                                return filtered_account;
                            };
                            // reload the page when the client account values(except balance and startsession) is changed on other pages.
                            const active_loginid = LocalStore.get('active_loginid');
                            const new_currency = JSON.parse(evt.newValue)[active_loginid].currency;
                            const old_currency = JSON.parse(evt.oldValue)[active_loginid].currency;

                            if (removedSessionAndBalnce(evt.newValue) !== removedSessionAndBalnce(evt.oldValue) &&
                                old_currency !== new_currency) {
                                reload();
                            }
                        }
                        break;
                    case 'new_release_reload_time':
                        if (evt.newValue !== evt.oldValue) {
                            reload(true);
                        }
                        break;
                    // no default
                }
            });
            scrollToTop();
        });
    };

    const onLoad = () => {
        if (State.get('is_loaded_by_pjax')) {
            Url.reset();
            updateLinksURL('#content');
        } else {
            init();
            if (!isLoginPages()) {
                Language.setCookie(Language.urlLang());
                const url_query_strings = Url.paramsHash();

                if (url_query_strings['data-elevio-article']) {
                    Elevio.injectElevio();
                }

                // Handle opening livechat via URL
                const is_livechat_open = url_query_strings.is_livechat_open === 'true';

                if (is_livechat_open && window.LiveChatWidget) {
                    window.LiveChatWidget.on('ready', () => {
                        window.LC_API.open_chat_window();
                    });
                }
            }
            Header.onLoad();
            Language.setCookie();
            Menu.makeMobileMenu();
            Menu.makeMobileMenuOnResize();
            updateLinksURL('body');
            recordAffiliateExposure();
            endpointNotification();
        }
        Contents.onLoad();

        if (sessionStorage.getItem('showLoginPage') && !sessionStorage.getItem('closingAccount')) {
            sessionStorage.removeItem('showLoginPage');
            Login.redirectToLogin();
        }
        if (Client.isLoggedIn()) {
            BinarySocket.wait('authorize', 'website_status', 'get_account_status').then(() => {
                RealityCheck.onLoad();
                Menu.init();
            });
        } else {
            Menu.init();
            if (!LocalStore.get('date_first_contact')) {
                BinarySocket.wait('time').then((response) => {
                    LocalStore.set('date_first_contact', toISOFormat(moment(response.time * 1000).utc()));
                });
            }
            if (!LocalStore.get('signup_device')) {
                LocalStore.set('signup_device', (isMobile() ? 'mobile' : 'desktop'));
            }
        }
        TrafficSource.setData();

        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const is_uk_residence = (Client.get('residence') === 'gb' || State.getResponse('website_status.clients_country') === 'gb');
            if (is_uk_residence || Client.get('landing_company_shortcode') === 'iom') {
                getElementById('gamstop_uk_display').setVisibility(1);
            }
        });
    };

    const recordAffiliateExposure = () => {
        const token = Url.param('t');
        if (!token || token.length !== 32) {
            return false;
        }

        const token_length  = token.length;
        const is_subsidiary = /\w{1}/.test(Url.param('s'));

        const cookie_token = Cookies.getJSON('affiliate_tracking');
        if (cookie_token) {
            // Already exposed to some other affiliate.
            if (is_subsidiary && cookie_token && cookie_token.t) {
                return false;
            }
        }

        // Record the affiliate exposure. Overwrite existing cookie, if any.
        const cookie_hash = {};
        if (token_length === 32) {
            cookie_hash.t = token.toString();
        }
        if (is_subsidiary) {
            cookie_hash.s = '1';
        }

        Cookies.set('affiliate_tracking', cookie_hash, {
            expires : 365, // expires in 365 days
            path    : '/',
            domain  : `.${location.hostname.split('.').slice(-2).join('.')}`,
            sameSite: 'none',
            secure  : true,
        });
        return true;
    };

    const reload = (forced_reload) => { window.location.reload(!!forced_reload); };

    const endpointNotification = () => {
        const server = localStorage.getItem('config.server_url');
        if (server && server.length > 0) {
            const message = `${(isProduction() ? '' :
                `${localize('This is a staging server - For testing purposes only')} - `)}
                ${localize('The server <a href="[_1]">endpoint</a> is: [_2]', [Url.urlFor('endpoint'), server])}`;

            const end_note = getElementById('end-note');
            elementInnerHtml(end_note, message);
            end_note.setVisibility(1);
        }
    };

    const showNotificationOutdatedBrowser = () => {
        const src = '//browser-update.org/update.min.js';
        if (document.querySelector(`script[src*="${src}"]`)) return;
        window.$buoop = {
            vs     : { i: 17, f: -4, o: -4, s: 9, c: 65 }, // it will support this number and above, or the latest -versions
            api    : 4,
            l      : Language.get().toLowerCase(),
            url    : 'https://browsehappy.com/',
            noclose: true, // Do not show the 'ignore' button to close the notification
            text   : localize('Your web browser ([_1]) is out of date and may affect your trading experience. Proceed at your own risk. [_2]Update browser[_3]',
                ['{brow_name}', '<a href="https://browsehappy.com/" target="_blank">', '</a>']),
            reminder: 0, // show all the time
        };
        if (document.body) {
            document.body.appendChild(createElement('script', { src }));
        }
    };

    const updateLinksURL = (container_selector) => {
        $(container_selector).find(`a[href*=".${Url.getDefaultDomain()}"]`).each(function() {
            $(this).attr('href', Url.urlForCurrentDomain($(this).attr('href')));
        });
    };

    return {
        onLoad,
        showNotificationOutdatedBrowser,
    };
})();

module.exports = Page;
