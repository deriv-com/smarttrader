import React from 'react';
import Notification from '../components/notification.jsx';

const MobileMenu = () => (
    <div id='mobile__container' className='mobile__container mobile-show'>
        <div id='mobile__menu' className='mobile__menu'>
            <div className='mobile__menu-header'>
                <img id='mobile__menu-close' className='btn__close' />
                <div className='mobile__menu-header-wrapper'>
                    <div className='mobile__menu-header-text'>{it.L('Menu')}</div>
                </div>
            </div>
            <div id='mobile_menu-content' className='mobile__menu-content mobile__menu-content--active'>
                <div className='mobile__platform-switcher' >
                    <div id='mobile__platform-switcher-current' className='mobile__wallet-platform-switcher-current' >
                        <div className='mobile__wallet-platform-switcher-container'>
                            <img className='header__logo mobile__wallet-platform-switcher-logo' />
                            <img id='mobile__platform-switcher-expand' className='mobile__platform-switcher-expand header__expand' />
                        </div>
                    </div>
                    <div id='mobile__platform-switcher-dropdown' className='mobile__platform-switcher-dropdown' />
                </div>
                <div className='mobile__platform-switcher-lists'>
                    <div id='mobile__platform-switcher-item-appstore' className='mobile__platform-switcher-item  client_logged_in invisible'>
                        <a id='url-appstore' className='url-appstore'>
                            <img id='appstore-icon' className='mobile__platform-switcher-icon appstore-icon' />
                            <div className='mobile__platform-switcher-text'>{it.L('Trader\'s hub')}</div>
                        </a>
                    </div>
                    <div className='mobile__platform-switcher-item'>
                        <img id='mobile__platform-switcher-icon-trade' className='mobile__platform-switcher-icon' />
                        <div className='mobile__platform-switcher-text mobile__platform-switcher-text-bold'>{it.L('Trade')}</div>
                    </div>
                    <div id='mobile__platform-switcher-item-reports' className='mobile__platform-switcher-item client_logged_in invisible'>
                        <img className='mobile__platform-switcher-icon reports-icon' />
                        <div className='mobile__platform-switcher-text'>{it.L('Reports')}</div>
                        <img id='mobile__platform-switcher-icon-arrowright' className='mobile__platform-switcher-icon-right' />
                    </div>
                    <div  id='whatsapp-mobile-drawer' className='mobile__platform-switcher-item whatsapp'>
                        <img className='mobile__platform-switcher-icon whatsapp-icon' />
                        <div className='mobile__platform-switcher-text'>{it.L('WhatsApp')}</div>
                    </div>
                    <div  id='mobile__menu-livechat' className='mobile__platform-switcher-item'>
                        <img className='mobile__platform-switcher-icon livechat-icon' />
                        <div className='mobile__platform-switcher-text'>{it.L('Live chat')}</div>
                    </div>
                    <div className='mobile__platform-switcher-item client_logged_in invisible logout'>
                        <img className='mobile__platform-switcher-icon logout-icon' />
                        <div className='mobile__platform-switcher-text'>{it.L('Log out')}</div>
                    </div>
                </div>
            </div>
            <div id='mobile__menu-content-submenu' className='mobile__menu-content-submenu mobile__menu-content client_logged_in invisible'>
                <div id='mobile__menu-content-submenu-header' className='mobile__menu-content-submenu-header mobile__platform-switcher-item'>
                    <img id='mobile__menu-content-submenu-icon-back' className='mobile__menu-content-submenu-icon' />
                    <div className='mobile__menu-content-submenu-header-text' >{it.L('Reports')}</div>
                </div>
                <div className='mobile__menu-content-submenu-lists'>
                    <a className='url-reports-positions mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img id='mobile__menu-content-submenu-icon-open' className='mobile__menu-content-submenu-icon' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Open positions')}</div>
                    </a>
                    <a className='url-reports-profit mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img id='mobile__menu-content-submenu-icon-profit' className='mobile__menu-content-submenu-icon' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Profit table')}</div>
                    </a>
                    <a className='url-reports-statement mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img id='mobile__menu-content-submenu-icon-statement' className='mobile__menu-content-submenu-icon' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Statements')}</div>
                    </a>
                </div>
            </div>
            <div className='mobile__menu-footer topbar'>
                <span className='no-underline nowrap gmt-clock' />
                <div className='no-underline'>
                    <div className='network_status' />
                </div>
            </div>
        </div>
    </div>
);

const WalletHeader = () => (
    <div className='wallet__header' id='wallet__header'>
        <div id='platform__dropdown' className='platform__dropdown'>
            <div id='platform__list' className='platform__dropdown-list' />
        </div>
        <div className='wallet__header-menu-items'>
            <div className='wallet__header-menu-left'>
                <img id='header__hamburger' className='header__hamburger mobile-show' />
                <div className='wallet__header-menu-item wallet__header-menu-links mobile-hide'>
                    <a className='url-deriv-com' target='_blank' rel='noopener noreferrer' href='https://deriv.com'>
                        <img className='deriv-com-logo' />
                    </a>
                </div>
                <div className='wallet__header-menu-item wallet__header-menu-links mobile-hide'>
                    <a className='url-wallet-apps'>
                        <img className='wallet-apps-logo' />
                    </a>
                </div>
                <div id='platform__switcher' className='header__menu-item platform__switcher mobile-hide'>
                    <img className='header__logo' />
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='header__menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-reports-positions header__menu-links-item'>
                        <span>
                            <img className='header__icon-text reports-icon' />
                            {it.L('Reports')}
                        </span>
                    </a>
                </div>
            </div>
            <div id='wallet__header-menu-right' className='wallet__header-menu-right client_logged_in invisible'>
                <Notification />
                <a className='url-account-details header__account header__menu-item mobile-hide'>
                    <img className='header__icon-button' id='header__account-settings' />
                </a>
                <div className='header__divider mobile-hide' />
                <div className='header__menu-item header__menu-acc' id='wallet_switcher'>
                    <div className='header__acc-info'>
                        <img src='/images/pages/header/wallets/ic-wallets-deriv-apps.svg' className='mobile-hide' />
                        <img id='header__acc-icon-mobile-currency' className='mobile-show header__acc-icon-mobile-currency' />
                        <img id='header__acc-icon--currency' className='header__acc-icon--currency mobile-hide' />
                        <span className='header__acc-display'>
                            <div id='header__acc-balance' className='header__acc-balance header__acc-balance-wallet' />
                        </span>
                        <img id='header__acc-expand' className='header__icon header__expand' />
                    </div>
                    <div className='wallet__switcher' id='wallet__switcher'>
                        <div id='wallet__switcher-dropdown' className='wallet__switcher-dropdown'>
                            <div className='wallet__switcher-header'>
                                <h4 className='wallet__switcher-header--text'>
                                    {it.L('Deriv Apps accounts')}
                                </h4>
                                <img id='wallet__switcher-close' className='btn__close mobile-show' />
                            </div>
                            <div className='wallet__switcher-accounts-container'>
                                <div id='wallet__switcher-accounts-list' className='wallet__switcher-accounts-list' />
                                <div className='wallet__switcher-accounts-btn-container'>
                                    <a id='wallet__switcher-accounts-btn' className='url-casher-deposit btn btn--primary wallet__switcher-accounts-btn mobile-show'>
                                        {it.L('Manage funds')}
                                    </a>
                                </div>
                            </div>
                            <div className='wallet__switcher-footer'>
                                <div>
                                    {it.L('Looking for CFDs? Go to Trader\'s hub')}
                                </div>
                                <a className='url-wallet-apps'>
                                    <img src='/images/pages/header/ic-chevron-right.svg' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <a className='url-cashier-deposit btn btn--primary header__deposit mobile-hide'>{it.L('Manage funds')}</a>
            </div>
        </div>
        <MobileMenu />
    </div>
);

export default WalletHeader;
