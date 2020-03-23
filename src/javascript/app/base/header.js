// const BinaryPjax               = require('./binary_pjax');
const Client                   = require('./client');
const BinarySocket             = require('./socket');
const showHidePulser           = require('../common/account_opening').showHidePulser;
const updateTotal              = require('../pages/user/update_total');
const getLandingCompanyValue   = require('../../_common/base/client_base').getLandingCompanyValue;
const isAuthenticationAllowed  = require('../../_common/base/client_base').isAuthenticationAllowed;
const GTM                      = require('../../_common/base/gtm');
const Login                    = require('../../_common/base/login');
const SocketCache              = require('../../_common/base/socket_cache');
// const elementInnerHtml         = require('../../_common/common_functions').elementInnerHtml;
const getElementById           = require('../../_common/common_functions').getElementById;
const localize                 = require('../../_common/localize').localize;
const localizeKeepPlaceholders = require('../../_common/localize').localizeKeepPlaceholders;
const State                    = require('../../_common/storage').State;
const Url                      = require('../../_common/url');
const applyToAllElements       = require('../../_common/utility').applyToAllElements;
const createElement            = require('../../_common/utility').createElement;
const findParent               = require('../../_common/utility').findParent;
const template                 = require('../../_common/utility').template;

const header_icon_base_path = '/images/pages/header/';

const Header = (() => {
    const notifications = [];
    let is_full_screen = false;
    const fullscreen_map = {
        event    : ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'],
        element  : ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'],
        fnc_enter: ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'],
        fnc_exit : ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'],
    };

    const onLoad = () => {
        populateAccountsList();
        bindPlatform();
        bindClick();
        bindSvg();
        if (Client.isLoggedIn()) {
            displayAccountStatus();
        }
        fullscreen_map.event.forEach(event => {
            document.addEventListener(event, onFullScreen, false);
        });
    };

    const onUnload = () => {
        fullscreen_map.event.forEach(event => {
            document.removeEventListener(event, onFullScreen);
        });
    };

    const onFullScreen = () => {
        is_full_screen = fullscreen_map.element.some(el => document[el]);
    };

    const bindSvg = () => {
        const add       = getElementById('add_icon');
        const cashier   = getElementById('cashier_icon');
        const account   = getElementById('header__account-settings');
        const menu      = getElementById('header__hamburger');
        const close     = getElementById('btn__close');
        const bell      = getElementById('header__notification-icon');
        const trade     = getElementById('mobile__platform-switcher-icon-trade');
        const arrow     = getElementById('mobile__platform-switcher-icon-arrowright');
        const back      = getElementById('mobile__menu-content-submenu-icon-back');
        const open      = getElementById('mobile__menu-content-submenu-icon-open');
        const profit    = getElementById('mobile__menu-content-submenu-icon-profit');
        const statement = getElementById('mobile__menu-content-submenu-icon-statement');

        applyToAllElements('.header__expand', (el) => {
            el.src = Url.urlForStatic(`${header_icon_base_path}ic-chevron-down.svg`);
        });
        // TODO : Change to light arrow down icon
        applyToAllElements('.header__expand-light', (el) => {
            el.src = Url.urlForStatic(`${header_icon_base_path}ic-chevron-down.svg`);
        });

        applyToAllElements('.header__logo', (el) => {
            el.src = Url.urlForStatic(`${header_icon_base_path}logo_smart_trader.svg`);
        });

        applyToAllElements('.logout-icon', (el) => {
            el.src = Url.urlForStatic(`${header_icon_base_path}ic-logout.svg`);
        });

        applyToAllElements('.reports-icon', (el) => {
            el.src = Url.urlForStatic(`${header_icon_base_path}ic-reports.svg`);
        });

        cashier.src    = Url.urlForStatic(`${header_icon_base_path}ic-cashier.svg`);
        account.src    = Url.urlForStatic(`${header_icon_base_path}ic-user-outline.svg`);
        add.src        = Url.urlForStatic(`${header_icon_base_path}ic-add-circle.svg`);
        bell.src       = Url.urlForStatic(`${header_icon_base_path}ic-bell.svg`);
        menu.src       = Url.urlForStatic(`${header_icon_base_path}ic-hamburger.svg`);
        close.src      = Url.urlForStatic(`${header_icon_base_path}ic-close.svg`);
        trade.src      = Url.urlForStatic(`${header_icon_base_path}ic-trade.svg`);
        arrow.src      = Url.urlForStatic(`${header_icon_base_path}ic-chevron-right.svg`);
        back.src       = Url.urlForStatic(`${header_icon_base_path}ic-chevron-left.svg`);
        open.src       = Url.urlForStatic(`${header_icon_base_path}ic-portfolio.svg`);
        profit.src     = Url.urlForStatic(`${header_icon_base_path}ic-profit-table.svg`);
        statement.src  = Url.urlForStatic(`${header_icon_base_path}ic-statement.svg`);

    };

    const bindPlatform = () => {
        // Web
        const platform_list = getElementById('platform__list');

        // Mobile
        const mobile_platform_list = getElementById('mobile__platform-switcher-dropdown');
        if (platform_list.hasChildNodes()) {
            return;
        }
        const platforms = {
            dtrader: {
                name     : 'DTrader',
                desc     : 'A whole new trading experience on a powerful yet easy to use platform.',
                link     : 'https://deriv.app',
                icon     : 'ic-brand-dtrader.svg',
                on_mobile: true,
            },
            dbot: {
                name     : 'DBot',
                desc     : 'Automated trading at your fingertips. No coding needed.',
                link     : 'https://deriv.app/bot',
                icon     : 'ic-brand-dbot.svg',
                on_mobile: false,
            },
            dmt5: {
                name     : 'DMT5',
                desc     : 'The platform of choice for professionals worldwide.',
                link     : 'https://deriv.app/mt5',
                icon     : 'ic-brand-dmt5.svg',
                on_mobile: true,

            },
            smarttrader: {
                name     : 'SmartTrader',
                desc     : 'Trade the world\'s markets with a simple and familiar platform.',
                link     : '#',
                icon     : 'logo_smart_trader.svg',
                on_mobile: true,
            },
        };

        Object.keys(platforms).forEach(key => {
            const platform = platforms[key];
            const platform_div = createElement('a', { class: `platform__list-item ${key === 'smarttrader' ? 'platform__list-item--active' : ''}`, href: platform.link });
            const platform_icon = createElement('img', { src: `${Url.urlForStatic(`${header_icon_base_path}${platform.icon}`)}`, class: 'platform__list-item-icon' });
            const platform_text_container = createElement('div', { class: 'platform__list-item-text ' });
            const platform_name = createElement('div', { text: platform.name, class: 'platform__list-item-name' });
            const platform_desc = createElement('div', { text: platform.desc, class: 'platform__list-item-desc' });

            platform_div.appendChild(platform_icon);
            platform_text_container.appendChild(platform_name);
            platform_text_container.appendChild(platform_desc);
            platform_div.appendChild(platform_text_container);

            if (platform.on_mobile) {
                mobile_platform_list.appendChild(platform_div.cloneNode(true));
            }
            platform_list.appendChild(platform_div);
        });
    };

    const bindClick = () => {
        // const logo = getElementById('logo');
        // logo.removeEventListener('click', logoOnClick);
        // logo.addEventListener('click', logoOnClick);

        const btn_login = getElementById('btn__login');
        btn_login.removeEventListener('click', loginOnClick);
        btn_login.addEventListener('click', loginOnClick);

        applyToAllElements('.logout', (el) => {
            el.removeEventListener('click', logoutOnClick);
            el.addEventListener('click', logoutOnClick);
        });

        const mobile_menu_overlay = getElementById('mobile__container');
        const mobile_menu         = getElementById('mobile__menu');
        const hamburger_menu      = getElementById('header__hamburger');
        const mobile_menu_active  = 'mobile__container--active';
        const showMobileMenu = (shouldShow) => {
            if (shouldShow) {
                mobile_menu_overlay.classList.add(mobile_menu_active);
                document.body.classList.add('stop-scrolling');
            } else {
                mobile_menu_overlay.classList.remove(mobile_menu_active);
                document.body.classList.remove('stop-scrolling');
            }
        };

        // Notificatiopn Event
        const notification_bell      = getElementById('header__notification');
        const notification_container = getElementById('header__notification-container');
        const notification_active    = 'header__notification-container--show';
        const showNotification       = (should_open) => {
            notification_container.toggleClass(notification_active, should_open);
        };

        notification_bell.addEventListener('click', (event) => {
            if (notification_container.classList.contains(notification_active)
                && !notification_container.contains(event.target)) {
                showNotification(false);
            } else {
                showNotification(true);
            }
        });

        hamburger_menu.addEventListener('click', () => showMobileMenu(true));
        applyToAllElements('#btn__close', (el) => {
            el.addEventListener('click', () => showMobileMenu(false));
        });

        // Platform Switcher Event
        const platform_switcher_arrow  = getElementById('platform__switcher-expand');
        const platform_switcher        = getElementById('platform__switcher');
        const platform_dropdown        = getElementById('platform__dropdown');
        const platform__list           = getElementById('platform__list');
        const platform_dropdown_active = 'platform__dropdown--show';
        const showPlatformSwitcher     = (should_open) => {
            if (should_open) {
                platform_dropdown.classList.add(platform_dropdown_active);
                platform_switcher_arrow.classList.add('rotated');
                document.body.classList.add('stop-scrolling');
            } else {
                platform_dropdown.classList.remove(platform_dropdown_active);
                platform_switcher_arrow.classList.remove('rotated');
                document.body.classList.remove('stop-scrolling');
            }
        };

        applyToAllElements('.platform__list-item', (el) => {
            el.addEventListener('click', () => {
                showPlatformSwitcher(false);
            });
        });

        platform_switcher.addEventListener('click', () => {
            if (platform_dropdown.classList.contains(platform_dropdown_active)) {
                showPlatformSwitcher(false);
            } else {
                showPlatformSwitcher(true);
            }
        });

        // Mobile Platform Switcher Event
        const mobile_platform_switcher_current  = getElementById('mobile__platform-switcher-current');
        const mobile_platform_switcher          = getElementById('mobile__platform-switcher-expand');
        const mobile_platform_switcher_dropdown = getElementById('mobile__platform-switcher-dropdown');
        const mobile_platform_switcher_active   = 'mobile__platform-switcher-dropdown--show';
        const showMobilePlatformSwitcher        = (shouldShow) => {
            if (shouldShow) {
                mobile_platform_switcher.classList.add('rotated');
                mobile_platform_switcher_dropdown.classList.add(mobile_platform_switcher_active);
            } else {
                mobile_platform_switcher.classList.remove('rotated');
                mobile_platform_switcher_dropdown.classList.remove(mobile_platform_switcher_active);
            }
        };

        mobile_platform_switcher_current.addEventListener('click', () => {
            if (mobile_platform_switcher_dropdown.classList.contains(mobile_platform_switcher_active)) {
                showMobilePlatformSwitcher(false);
            } else {
                showMobilePlatformSwitcher(true);
            }
        });

        // Account Switcher Event
        const acc_switcher              = getElementById('acc_switcher');
        const account_switcher          = getElementById('account__switcher');
        const account_switcher_dropdown = getElementById('account__switcher-dropdown');
        const acc_expand                = getElementById('header__acc-expand');
        const account_switcher_active   = 'account__switcher-dropdown--show';
        const showAccountSwitcher       = (should_open) => {
            if (should_open) {
                account_switcher_dropdown.classList.add(account_switcher_active);
                acc_expand.classList.add('rotated');
            } else {
                account_switcher_dropdown.classList.remove(account_switcher_active);
                acc_expand.classList.remove('rotated');
            }
        };

        acc_switcher.addEventListener('click', (event) => {
            if (!account_switcher_dropdown.contains(event.target)) {
                if (account_switcher_dropdown.classList.contains(account_switcher_active)) {
                    showAccountSwitcher(false);
                } else {
                    showAccountSwitcher(true);
                }

                if (platform_dropdown.classList.contains(platform_dropdown_active)) {
                    showPlatformSwitcher(false);
                }
            }
        });

        // Mobile account switcher click outside
        account_switcher_dropdown.addEventListener('click', (event) => {
            if (!account_switcher.contains(event.target)) {
                showAccountSwitcher(false);
            }
        });

        // Mobile reports menu
        const report_menu       = getElementById('mobile__platform-switcher-item-reports');
        const menu              = getElementById('mobile_menu-content');
        const submenu           = getElementById('mobile__menu-content-submenu');
        const back              = getElementById('mobile__menu-content-submenu-header');
        const submenu_active    = 'mobile__menu-content-submenu--active';
        const menu_active       = 'mobile__menu-content--active';
        const showMobileSubmenu = (shouldShow) => {
            if (shouldShow) {
                submenu.classList.add(submenu_active);
                menu.classList.remove(menu_active);
            } else {
                submenu.classList.remove(submenu_active);
                menu.classList.add(menu_active);
            }
        };

        report_menu.addEventListener('click', () => {
            showMobileSubmenu(true);
        });

        back.addEventListener('click', () => {
            showMobileSubmenu(false);
        });

        // OnClickOutisde Event Handle
        document.addEventListener('click', (event) => {
            // Platform Switcher
            if (!platform_switcher.contains(event.target)
                && !platform__list.contains(event.target)
                && platform_dropdown.classList.contains(platform_dropdown_active)) {
                showPlatformSwitcher(false);
            }

            // Account Switcher
            if (!account_switcher_dropdown.contains(event.target)
                && !acc_switcher.contains(event.target)
                && account_switcher_dropdown.classList.contains(account_switcher_active)) {
                showAccountSwitcher(false);
            }

            // Mobile Menu
            if (!mobile_menu.contains(event.target)
                && !hamburger_menu.contains(event.target)
                && mobile_menu_overlay.classList.contains(mobile_menu_active)) {
                showMobilePlatformSwitcher(false);
                showMobileMenu(false);
            }

            // Notification
            if (!notification_container.contains(event.target)
                && !notification_bell.contains(event.target)
                && notification_container.classList.contains(notification_active)) {
                showNotification(false);
            }
        });

        const topbar_fullscreen = getElementById('topbar-fullscreen');
        topbar_fullscreen.removeEventListener('click', toggleFullscreen);
        topbar_fullscreen.addEventListener('click', toggleFullscreen);
    };

    const toggleFullscreen = () => {
        const to_exit = is_full_screen;
        const el = to_exit ? document : document.documentElement;
        const fncToCall = fullscreen_map[to_exit ? 'fnc_exit' : 'fnc_enter'].find(fnc => el[fnc]);

        if (fncToCall) {
            el[fncToCall]();
        } else {
            is_full_screen = false; // fullscreen API is not enabled
        }
    };

    // const logoOnClick = () => {
    //     if (Client.isLoggedIn()) {
    //         const url = Client.isAccountOfType('financial') ? Url.urlFor('user/metatrader') : Client.defaultRedirectUrl();
    //         BinaryPjax.load(url);
    //     } else {
    //         BinaryPjax.load(Url.urlFor(''));
    //     }
    // };

    const loginOnClick = (e) => {
        e.preventDefault();
        Login.redirectToLogin();
    };

    const logoutOnClick = () => {
        Client.sendLogoutRequest();
    };

    const populateAccountsList = () => {
        if (!Client.isLoggedIn()) return;
        BinarySocket.wait('authorize', 'website_status', 'balance').then(() => {
            const loginid_real_select = createElement('div');
            const loginid_demo_select = createElement('div');
            Client.getAllLoginids().forEach((loginid) => {
                if (!Client.get('is_disabled', loginid) && Client.get('token', loginid)) {
                    // const account_title  = Client.getAccountTitle(loginid);
                    const is_real        = !Client.getAccountType(loginid); // this function only returns virtual/gaming/financial types
                    const currency       = Client.get('currency', loginid);
                    // const localized_type = localize('[_1] Account', is_real && currency ? currency : account_title);
                    const icon           = `${Url.urlForStatic(`${header_icon_base_path}ic-currency-${is_real ? currency.toLowerCase() : 'virtual'}.svg`)}`;
                    const is_current     = loginid === Client.get('loginid');

                    if (is_current) { // default account
                        // applyToAllElements('.account-type', (el) => { elementInnerHtml(el, localized_type); });
                        // applyToAllElements('.account-id', (el) => { elementInnerHtml(el, loginid); });
                        applyToAllElements('#header__acc-icon', (el) => {
                            el.src = icon;
                        });
                    }

                    const account           = createElement('div', { class: `account__switcher-acc ${is_current ? 'account__switcher-acc--active' : ''}`, 'data-value': loginid });
                    const account_icon      = createElement('img', { src: icon });
                    const account_detail    = createElement('span', { text: is_real ? currency : 'Demo' });
                    const account_loginid   = createElement('div', { class: 'account__switcher-loginid', text: loginid });
                    const account_balance   = createElement('span', { class: `account__switcher-balance account__switcher-balance-${is_real ? currency : 'virtual'}` });

                    account_detail.appendChild(account_loginid);
                    account.appendChild(account_icon);
                    account.appendChild(account_detail);
                    account.appendChild(account_balance);

                    if (is_real) {
                        loginid_real_select.appendChild(account);
                    } else {
                        loginid_demo_select.appendChild(account);
                    }

                    // const link    = createElement('a', { href: `${'javascript:;'}`, 'data-value': loginid });
                    // const li_type = createElement('li', { text: localized_type });

                    // li_type.appendChild(createElement('div', { text: loginid }));
                    // link.appendChild(li_type);
                    // loginid_select.appendChild(link).appendChild(createElement('div', { class: 'separator-line-thin-gray' }));
                }
                applyToAllElements('#account__switcher-real-list', (el) => {
                    el.insertBefore(loginid_real_select, el.firstChild);
                    applyToAllElements('div.account__switcher-acc', (ele) => {
                        ele.removeEventListener('click', loginIDOnClick);
                        ele.addEventListener('click', loginIDOnClick);
                    }, '', el);
                    bindAccordion('#account__switcher-accordion-real');
                });
                applyToAllElements('#account__switcher-demo-list', (el) => {
                    el.insertBefore(loginid_demo_select, el.firstChild);
                    applyToAllElements('div.account__switcher-acc', (ele) => {
                        ele.removeEventListener('click', loginIDOnClick);
                        ele.addEventListener('click', loginIDOnClick);
                    }, '', el);
                    bindAccordion('#account__switcher-accordion-demo');
                });
            });
            bindTabs();
        });
    };

    const bindTabs = () => {
        const is_virtual_tab = /^VRT/.test(Client.get('loginid'));

        $('#acc_tabs').tabs({
            active: is_virtual_tab ? 1 : 0,
            activate() {
                updateTotal();
            },
        });
    };

    const bindAccordion = (selector) => {
        $(selector).accordion({
            heightStyle: 'content',
            collapsible: true,
            active     : 0,
        });
    };

    const loginIDOnClick =  (e) => {
        e.preventDefault();
        const el_loginid = findParent(e.target, 'div.account__switcher-acc');
        if (el_loginid) {
            el_loginid.setAttribute('disabled', 'disabled');
            switchLoginid(el_loginid.getAttribute('data-value'));
        }
    };

    const switchLoginid = (loginid) => {
        if (!loginid || loginid.length === 0) return;
        const token = Client.get('token', loginid);
        if (!token || token.length === 0) {
            Client.sendLogoutRequest(true);
            return;
        }

        sessionStorage.setItem('active_tab', '1');
        // set local storage
        GTM.setLoginFlag('account_switch');
        Client.set('loginid', loginid);
        SocketCache.clear();
        setTimeout(() => window.location.reload(), 0);
    };

    const upgradeMessageVisibility = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings', 'get_account_status').then(() => {
            const upgrade_msg = document.getElementsByClassName('upgrademessage');

            if (!upgrade_msg) {
                return;
            }

            const showUpgrade = (url, localized_text) => {
                applyToAllElements(upgrade_msg, (el) => {
                    el.setVisibility(1);
                    applyToAllElements('a', (ele) => {
                        ele.html(createElement('span', { text: localized_text })).setVisibility(1).setAttribute('href', Url.urlFor(url));
                    }, '', el);
                });
            };

            const showUpgradeBtn = (url, localized_text) => {
                applyToAllElements(upgrade_msg, (el) => {
                    el.setVisibility(1);
                    applyToAllElements('a.button', (ele) => {
                        ele.html(createElement('span', { text: localized_text })).setVisibility(1).setAttribute('href', Url.urlFor(url));
                    }, '', el);
                });
            };

            const upgrade_info     = Client.getUpgradeInfo();
            const show_upgrade_msg = upgrade_info.can_upgrade;
            const upgrade_link_txt = upgrade_info.type === 'financial'
                ? localize('Click here to open a Financial Account')
                : localize('Click here to open a Real Account');
            const upgrade_btn_txt  = upgrade_info.type === 'financial'
                ? localize('Open a Financial Account')
                : localize('Open a Real Account');

            if (Client.get('is_virtual')) {
                applyToAllElements(upgrade_msg, (el) => {
                    el.setVisibility(1);
                    const span = el.getElementsByTagName('span')[0];
                    if (span) {
                        span.setVisibility(1);
                    }
                    applyToAllElements('a', (ele) => { ele.setVisibility(0); }, '', el);
                });

                if (show_upgrade_msg) {
                    showUpgrade(upgrade_info.upgrade_link, upgrade_link_txt);
                    showUpgradeBtn(upgrade_info.upgrade_link, upgrade_btn_txt);
                } else {
                    applyToAllElements(upgrade_msg, (el) => {
                        applyToAllElements('a', (ele) => {
                            ele.setVisibility(0).innerHTML = '';
                        }, '', el);
                    });
                }
            } else if (show_upgrade_msg) {
                getElementById('virtual-wrapper').setVisibility(0);
                showUpgrade(upgrade_info.upgrade_link, upgrade_link_txt);
                showUpgradeBtn(upgrade_info.upgrade_link, upgrade_btn_txt);

                if (/new_account/.test(window.location.href)) {
                    showHidePulser(0);
                }
            } else {
                applyToAllElements(upgrade_msg, (el) => { el.setVisibility(0); });
            }
            showHideNewAccount(upgrade_info);
        });
    };

    const showHideNewAccount = (upgrade_info) => {
        if (upgrade_info.can_upgrade || upgrade_info.can_open_multi) {
            $('#account__switcher-add').addClass('account__switcher-add--active');
            // changeAccountsText(1, localize('Create Account'));
        } else {
            $('#account__switcher-add').removeClass('account__switcher-add--active');
            // changeAccountsText(0, localize('Accounts List'));
        }
    };

    // const changeAccountsText = (add_new_style, localized_text) => {
    //     const user_accounts = getElementById('user_accounts');
    //     user_accounts.classList[add_new_style ? 'add' : 'remove']('create_new_account');
    //     applyToAllElements('li', (el) => { elementTextContent(el, localized_text); }, '', user_accounts);
    // };

    const displayNotification = ({ key, type, title, message, button_text, button_link }) => {
        // const msg_notification = getElementById('msg_notification');
        // const platform_switcher = getElementById('platform__dropdown');
        // if (msg_notification.getAttribute('data-code') === 'STORAGE_NOT_SUPPORTED') return;

        // msg_notification.html(message);
        // msg_notification.setAttribute('data-message', message);
        // msg_notification.setAttribute('data-code', msg_code);

        // if (msg_notification.offsetParent) {
        //     msg_notification.toggleClass('error', is_error);
        // } else {
        //     $(msg_notification).slideDown(500, () => { if (is_error) msg_notification.classList.add('error'); });
        // }

        // // Removed once notification feature is implemented
        // platform_switcher.style.top = `${51 + 26}px`;

        if (notifications.some(notification => notification === key)) return;

        const notification_content = getElementById('header__notification-content');
        const notification_item    = createElement('div', { class: 'header__notification-content-item', 'notification-key': key });
        const notification_icon    = createElement('img', { src: Url.urlForStatic(`${header_icon_base_path}ic-alert-${type || 'info'}.svg`) });
        const notification_message = createElement('div', { class: 'header__notification-content-message' });
        const notification_title   = createElement('div', { text: title, class: 'header__notification-content-title' });
        const notification_text    = createElement('div', { html: message, class: 'header__notification-content-desc' });

        notification_message.appendChild(notification_title);
        notification_message.appendChild(notification_text);
        notification_item.appendChild(notification_icon);
        if (button_text && button_link) {
            const notification_button  = createElement('a', { text: button_text, class: 'btn btn--secondary header__notification-btn', href: button_link });
            notification_message.appendChild(notification_button);
        }
        notification_item.appendChild(notification_message);
        notification_content.appendChild(notification_item);
        notifications.push(key);
        updateNotificationCount();
    };

    const hideNotification = (key) => {
        // const msg_notification = getElementById('msg_notification');
        // const platform_switcher = getElementById('platform__dropdown');
        // if (/^(STORAGE_NOT_SUPPORTED|MFSA_MESSAGE)$/.test(msg_notification.getAttribute('data-code')) ||
        //     msg_code && msg_notification.getAttribute('data-code') !== msg_code) {
        //     return;
        // }

        // if (msg_notification.offsetParent) {
        //     msg_notification.classList.remove('error');
        //     $(msg_notification).slideUp(500, () => {
        //         elementInnerHtml(msg_notification, '');
        //         msg_notification.removeAttribute('data-message data-code');
        //     });
        // }

        // // Removed once notification feature is implemented
        // platform_switcher.style.top = '51px';

        if (!notifications.some(notification => notification === key)) return;

        notifications.splice(notifications.indexOf(key), 1);

        const removed_item = document.querySelector(`div[notification-key="${key}"]`);
        applyToAllElements('#header__notification-content', (el) => {
            el.removeChild(removed_item);
        });
        updateNotificationCount();
    };

    const updateNotificationCount = () => {
        applyToAllElements('#header__notification-count', (el) => {
            const notification_length = notifications.length;
            el.html(notification_length);
            if (notifications.length) {
                el.style.display = 'flex';
                el.html(notifications.length);
            } else {
                el.style.display = 'none';
                
            }
        });

        applyToAllElements('#header__notification-empty', (el) => {
            if (notifications.length) {
                el.style.display = 'none';
            } else {
                el.style.display = 'block';
            }
        });
    };

    const displayAccountStatus = () => {
        BinarySocket.wait('get_account_status', 'authorize', 'landing_company').then(() => {
            let authentication,
                get_account_status,
                status;
            const is_svg          = Client.get('landing_company_shortcode') === 'svg';
            const loginid         = Client.get('loginid') || {};
            const landing_company = State.getResponse('landing_company');
            const requirements    = getLandingCompanyValue(loginid, landing_company, 'requirements');
            const necessary_withdrawal_fields = is_svg
                ? requirements.withdrawal
                : [];
            const necessary_signup_fields = is_svg
                ? requirements.signup.map(field => (field === 'residence' ? 'country' : field))
                : [];

            const hasMissingRequiredField = () => {
                // eslint-disable-next-line no-nested-ternary
                const required_fields = is_svg ? [ ...necessary_signup_fields, ...necessary_withdrawal_fields ]
                    : Client.isAccountOfType('financial') ? [
                        'account_opening_reason',
                        'address_line_1',
                        'address_city',
                        'phone',
                        'tax_identification_number',
                        'tax_residence',
                        ...(Client.get('residence') === 'gb' || Client.get('landing_company_shortcode') === 'iom' ? ['address_postcode'] : []),
                    ] : [];

                const get_settings = State.getResponse('get_settings');
                return required_fields.some(field => !get_settings[field]);
            };

            const buildMessage = (string, path) => template(string, [`<a class="header__notification-link" href="${path}">`, '</a>']);
            const buildSpecificMessage = (string, additional) => template(string, [...additional]);
            const hasStatus = (string) => status &&
                (status.findIndex(s => s === string) < 0 ? Boolean(false) : Boolean(true));
            const hasVerification = (string) => {
                const { identity, document, needs_verification } = authentication;
                if (!identity || !document || !needs_verification || !isAuthenticationAllowed()) {
                    return false;
                }
                const verification_length = needs_verification.length || 0;
                let result = false;

                switch (string) {
                    case 'authenticate': {
                        result = verification_length && document.status === 'none' && identity.status === 'none';
                        break;
                    }
                    case 'needs_poi': {
                        result = verification_length
                            && needs_verification.includes('identity')
                            && !needs_verification.includes('document')
                            && identity.status !== 'rejected'
                            && identity.status !== 'expired';
                        break;
                    }
                    case 'needs_poa': {
                        result = verification_length
                            && needs_verification.includes('document')
                            && !needs_verification.includes('identity')
                            && document.status !== 'rejected'
                            && document.status !== 'expired';
                        break;
                    }
                    case 'poi_expired': {
                        result = identity.status === 'expired';
                        break;
                    }
                    case 'poa_expired': {
                        result = document.status === 'expired';
                        break;
                    }
                    /* case 'unsubmitted': {
                        result = verification_length === 2 && identity.status === 'none' && document.status === 'none';
                        break;
                    }
                    case 'expired': {
                        result = verification_length === 2 && (identity.status === 'expired' && document.status === 'expired');
                        break;
                    }
                    case 'expired_identity': {
                        result = verification_length && identity.status === 'expired';
                        break;
                    }
                    case 'expired_document': {
                        result = verification_length && document.status === 'expired';
                        break;
                    }
                    case 'rejected': {
                        result = verification_length === 2 && (identity.status !== 'none' || document.status !== 'none');
                        break;
                    }
                    case 'rejected_identity': {
                        result = verification_length && (identity.status === 'rejected' || identity.status === 'suspected');
                        break;
                    }
                    case 'rejected_document': {
                        result = verification_length && (document.status === 'rejected' || document.status === 'suspected');
                        break;
                    }
                    case 'identity': {
                        result = verification_length && identity.status === 'none';
                        break;
                    }
                    case 'document': {
                        result = verification_length && document.status === 'none';
                        break;
                    } */
                    default:
                        break;
                }

                return result;
            };

            // const has_no_tnc_limit = is_svg;

            const formatDate = (date) => {
                const date_obj = new Date(date * 1000);
                return `${String(date_obj.getDate()).padStart(2, '0')}/${String(date_obj.getMonth() + 1).padStart(2, '0')}/${date_obj.getFullYear()}`;
            };

            const messages = {
                currency             : () => ({ key: 'currency', title: localize('Set account currency'), message: localize('Please set the currency of your account to enable trading.'), type: 'danger', button_text: 'Set Currency', button_link: 'https://deriv.app/redirect?action=add_account' }),
                excluded_until       : () => ({ key: 'exluded_until', title: localize('Self-exclusion'), message: buildSpecificMessage(localizeKeepPlaceholders('You have opted to be excluded from Binary.com until [_1]. Please [_2]contact us[_3] for assistance.'), [`${formatDate(Client.get('excluded_until') || new Date())}`, '<a class="header__notification-link" href="https://www.deriv.com/contact-us/">', '</a>']), type: 'danger' }),
                authenticate         : () => ({ key: 'authenticate', title: localize('Authenticate'), message: localize('Authenticate your account now to take full advantage of all payment methods available.'), type: 'info', button_text: 'Authenticate', button_link: 'https://deriv.app/account/proof-of-identity' }),
                cashier_locked       : () => ({ key: 'cashier_locked', title: localize('Cashier disabled'), message: localize('Deposits and withdrawals have been disabled on your account. Please check your email for more details.'), type: 'warning' }),
                withdrawal_locked    : () => ({ key: 'withdrawal_locked', title: localize('Withdrawal disabled'), message: localize('Withdrawals have been disabled on your account. Please check your email for more details.'), type: 'warning' }),
                mt5_withdrawal_locked: () => ({ key: 'mt5_withdrawal_locked', title: localize('MT5 withdrawal disabled'), message: localize('MT5 withdrawals have been disabled on your account. Please check your email for more details.'), type: 'warning' }),
                document_needs_action: () => ({ key: 'document_needs_action', title: localize('Authentication failed'), message: buildMessage(localizeKeepPlaceholders('[_1]Your Proof of Identity or Proof of Address[_2] did not meet our requirements. Please check your email for further instructions.'), 'https://deriv.app/account/proof-of-identity'), type: 'warning' }),
                unwelcome            : () => ({ key: 'unwelcome', title: localize('Trading and deposit disabled'), message: buildMessage(localizeKeepPlaceholders('Trading and deposits have been disabled on your account. Kindly contact [_1]customer support[_2] for assistance.'), 'https://www.deriv.com/contact-us/'), type: 'danger' }),
                mf_retail            : () => ({ key: 'mf_retail', title: localize('Digital options trading disabled'), message: buildMessage(localizeKeepPlaceholders('Digital Options Trading has been disabled on your account. Kindly contact [_1]customer support[_2] for assistance.'), 'https://www.deriv.com/contact-us/'), type: 'danger' }),
                financial_limit      : () => ({ key: 'financial_limit', title: localize('Remove deposit limits'), message: buildMessage(localizeKeepPlaceholders('Please set your [_1]30-day turnover limit[_2] to remove deposit limits.'), 'user/security/self_exclusionws'), type: 'warning' }), // TODO: handle this when self exclusion is available
                risk                 : () => ({ key: 'risk', title: localize('Withdrawal and trading limits'), message: buildMessage(localizeKeepPlaceholders('Please complete the [_1]financial assessment form[_2] to lift your withdrawal and trading limits.'), 'https://deriv.app/account/financial-assessment'), type: 'warning' }),
                tax                  : () => ({ key: 'tax', title: localize('Complete details'), message: buildMessage(localizeKeepPlaceholders('Please [_1]complete your account profile[_2] to lift your withdrawal and trading limits.'), 'https://deriv.app/account/personal-details'), type: 'danger' }),
                tnc                  : () => ({ key: 'tnc', title: localize('Term & conditions updated'), message: buildMessage(localizeKeepPlaceholders('Please accept our [_1]updated Terms and Conditions[_2] to proceed.'), 'https://www.deriv.com/terms-and-conditions/'), type: 'warning' }),
                required_fields      : () => ({ key: 'requried_fields', title: localize('Complete details'), message: localize('Please complete your Personal Details before you proceed.'), type: 'danger' }),
                needs_poi            : () => ({ key: 'needs_poi', title: localize('Proof of identity required'), message: localize('Please submit your proof of identity.'), type: 'warning' }),
                needs_poa            : () => ({ key: 'needs_poa', title: localize('Proof of address required'), message: localize('Please submit your proof of address.'), type: 'warning' }),
                poi_expired          : () => ({ key: 'needs_poi', title: localize('Proof of identity'), message: localize('Proof of identity expired'), type: 'danger' }),
                poa_expired          : () => ({ key: 'needs_poa', title: localize('Proof of address'), message: localize('Proof of address expired'), type: 'danger' }),
                // residence            : () => ({ key: 'residence', title: localize('Country of residence'), message: buildMessage(localizeKeepPlaceholders('Please set [_1]country of residence[_2] before upgrading to a real-money account.'), type: 'danger' }),
                // poa_rejected         : () => ({ key: 'poa_expired', title: localize('Proff of address'), message: localize('Your documents for proof of address is expired. Please submit again.'), type: 'danger'}),
                // unsubmitted          : () => ({ title: localize('Set account currency'), message: localize('Please set the currency of your account to enable trading.'), type: 'danger', button_text: 'Click test', button_link: 'https://deriv.app/account/proof-of-identity' }),
                // expired              : () => buildSpecificMessage(localizeKeepPlaceholders('Your [_1]proof of identity[_3] and [_2]proof of address[_3] have expired.'),                                                   ['<a href=\'https://deriv.app/account/proof-of-identity\'>', '<a href=\'https://deriv.app/account/proof-of-address\'>', '</a>']),
                // expired_identity     : () => buildMessage(localizeKeepPlaceholders('Your [_1]proof of identity[_2] has expired.'),                                                                                         'https://deriv.app/account/proof-of-identity'),
                // expired_document     : () => buildMessage(localizeKeepPlaceholders('Your [_1]proof of address[_2] has expired.'),                                                                                          'https://deriv.app/account/proof-of-address'),
                // rejected             : () => buildSpecificMessage(localizeKeepPlaceholders('Your [_1]proof of identity[_3] and [_2]proof of address[_3] have not been verified. Please check your email for details.'),    ['<a href=\'https://deriv.app/account/proof-of-identity\'>', '<a href=\'https://deriv.app/account/proof-of-address\'>', '</a>']),
                // rejected_identity    : () => buildMessage(localizeKeepPlaceholders('Your [_1]proof of identity[_2] has not been verified. Please check your email for details.'),                                          'https://deriv.app/account/proof-of-identity'),
                // rejected_document    : () => buildMessage(localizeKeepPlaceholders('Your [_1]proof of address[_2] has not been verified. Please check your email for details.'),                                           'https://deriv.app/account/proof-of-address'),
                // identity             : () => buildMessage(localizeKeepPlaceholders('Please submit your [_1]proof of identity[_2].'),                                                                                       'https://deriv.app/account/proof-of-identity'),
                // document             : () => buildMessage(localizeKeepPlaceholders('Please submit your [_1]proof of address[_2].'),                                                                                        'https://deriv.app/account/proof-of-address'),
                // tnc                  : () => buildMessage(has_no_tnc_limit
                //     ? localizeKeepPlaceholders('Please [_1]accept the updated Terms and Conditions[_2].')
                //     : localizeKeepPlaceholders('Please [_1]accept the updated Terms and Conditions[_2] to lift your deposit and trading limits.'), 'https://deriv.app'),
            };

            const validations = {
                currency             : () => !Client.get('currency'),
                excluded_until       : () => Client.get('excluded_until'),
                authenticate         : () => hasVerification('authenticate'),
                cashier_locked       : () => hasStatus('cashier_locked'),
                withdrawal_locked    : () => hasStatus('withdrawal_locked'),
                mt5_withdrawal_locked: () => hasStatus('mt5_withdrawal_locked'),
                document_needs_action: () => hasStatus('document_needs_action'),
                unwelcome            : () => hasStatus('unwelcome'),
                mf_retail            : () => Client.get('landing_company_shortcode') === 'maltainvest' && hasStatus('professional'),
                financial_limit      : () => hasStatus('max_turnover_limit_not_set'),
                risk                 : () => Client.getRiskAssessment(),
                tax                  : () => Client.shouldCompleteTax(),
                tnc                  : () => Client.shouldAcceptTnc(),
                required_fields      : () => hasMissingRequiredField(),
                needs_poi            : () => hasVerification('needs_poi'),
                needs_poa            : () => hasVerification('needs_poa'),
                poi_expired          : () => hasVerification('poi_expired'),
                poa_expired          : () => hasVerification('poa_expired'),
                /* residence            : () => !Client.get('residence'),
                poa_rejected         : () => hasVerification('poa_rejected'),
                unsubmitted          : () => hasVerification('unsubmitted'),
                expired              : () => hasVerification('expired'),
                expired_identity     : () => hasVerification('expired_identity'),
                expired_document     : () => hasVerification('expired_document'),
                rejected             : () => hasVerification('rejected'),
                rejected_identity    : () => hasVerification('rejected_identity'),
                rejected_document    : () => hasVerification('rejected_document'),
                identity             : () => hasVerification('identity'),
                document             : () => hasVerification('document'),
                required_fields      : () => hasMissingRequiredField(),
                residence            : () => !Client.get('residence'),
                risk                 : () => Client.getRiskAssessment(),
                tax                  : () => Client.shouldCompleteTax(),
                tnc                  : () => Client.shouldAcceptTnc(), */
            };

            // real account checks in order
            const check_statuses_real = [
                'currency',
                'excluded_until',
                'authenticate',
                'cashier_locked',
                'withdrawal_locked',
                'mt5_withdrawal_locked',
                'document_needs_action',
                'unwelcome',
                'mf_retail',
                'financial_limit',
                'risk',
                'tax',
                'tnc',
                'required_fields',
                'needs_poi',
                'needs_poa',
                'poi_expired',
                'poa_expired',
                /* 'poa_rejected',
                'unsubmitted',
                'expired',
                'expired_identity',
                'expired_document',
                'rejected',
                'rejected_identity',
                'rejected_document',
                'identity',
                'document', */
            ];

            /* const check_statuses_mf_mlt = [
                'excluded_until',
                'tnc',
                'required_fields',
                'financial_limit',
                'risk',
                'tax',
                'unsubmitted',
                'expired',
                'expired_identity',
                'expired_document',
                'rejected',
                'rejected_identity',
                'rejected_document',
                'identity',
                'document',
                'unwelcome',
                'cashier_locked',
                'withdrawal_locked',
                'mt5_withdrawal_locked',
                'authenticate',
            ]; */

            // virtual checks
            // const check_statuses_virtual = [
            //     'residence',
            // ];

            const checkStatus = (check_statuses) => {
                const notified = check_statuses.some((check_type) => {
                    if (validations[check_type]()) {
                        displayNotification(messages[check_type]());
                        // return true;
                    }
                    // return false;
                });
                if (!notified) hideNotification();
            };

            if (!Client.get('is_virtual')) {
            //     checkStatus(check_statuses_virtual);
            // } else {
                const el_account_status = createElement('span', { class: 'authenticated', 'data-balloon': localize('Account Authenticated'), 'data-balloon-pos': 'down' });
                BinarySocket.wait('website_status', 'get_account_status', 'get_settings', 'balance').then(() => {
                    authentication = State.getResponse('get_account_status.authentication') || {};
                    get_account_status = State.getResponse('get_account_status') || {};
                    status             = get_account_status.status;
                    /* if (Client.get('landing_company_shortcode') === 'maltainvest' || Client.get('landing_company_shortcode') === 'malta' || Client.get('landing_company_shortcode') === 'iom') {
                        checkStatus(check_statuses_mf_mlt);
                    /* } else { */
                    checkStatus(check_statuses_real);
                    // }
                    const is_fully_authenticated = hasStatus('authenticated') && !+get_account_status.prompt_client_to_authenticate;
                    $('.account-id')[is_fully_authenticated ? 'append' : 'remove'](el_account_status);
                });
            }
        });
    };

    return {
        onLoad,
        onUnload,
        populateAccountsList,
        upgradeMessageVisibility,
        displayNotification,
        hideNotification,
        displayAccountStatus,
        loginOnClick,
    };
})();

module.exports = Header;
