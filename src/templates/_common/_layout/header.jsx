import React from 'react';
import { getPlatformSettings } from '../brand.config';

const platform_name = getPlatformSettings('smarttrader').name;

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
                    <div id='mobile__platform-switcher-current' className='mobile__platform-switcher-current' >
                        <div className='mobile__platform-switcher-container'>
                            <img className='header__logo mobile__platform-switcher-logo' />
                            <div className='mobile__platform-switcher-header platform__switcher-header'>{it.L('[_1]', platform_name)}</div>
                        </div>
                        <img id='mobile__platform-switcher-expand' className='mobile__platform-switcher-expand header__expand' />
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

const Header = () => (
    <div className='header'>
        <div id='platform__dropdown' className='platform__dropdown'>
            <div id='platform__list' className='platform__dropdown-list' />
        </div>
        <div id='deriv__header' className='header__menu-items'>
            <div className='header__menu-left'>
                <img id='header__hamburger' className='header__hamburger mobile-show' />
                <div id='platform__switcher' className='header__menu-item platform__switcher mobile-hide'>
                    <img className='header__logo' />
                    <div className='platform__switcher-header'>{it.L('[_1]', platform_name)}</div>
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='header__menu-item header__menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-appstore header__menu-links-item'>
                        <span>
                            <img id='appstore-icon' className='header__icon-text appstore-icon' />
                            {it.L('Trader\'s hub')}
                        </span>
                    </a>
                    <a className='url-reports-positions header__menu-links-item'>
                        <span>
                            <img className='header__icon-text reports-icon' />
                            {it.L('Reports')}
                        </span>
                    </a>
                    <a className='url-cashier-deposit header__menu-links-item'>
                        <span>
                            <img id='cashier-icon' className='header__icon-text' />
                            {it.L('Cashier')}
                        </span>
                    </a>
                </div>
            </div>
            <div className='header__menu-right client_logged_in invisible'>
                <div id='header__notification' className='header__notification header__menu-item'>
                    <div id='header__notiifcation-icon-container' className='header__notification-icon-container'>
                        <img id='header__notification-icon' className='header__notification-icon header__icon-button' />
                        <div id='header__notification-count' className='header__notification-count' />
                    </div>
                    <div id='header__notification-container' className='header__notification-container' >
                        <div className='header__notification-header'>
                            <span>{it.L('Notifications')}</span>
                            <img id='header__notification-close' className='btn__close mobile-show' />
                        </div>
                        <div id='header__notification-content' className='header__notification-content'>
                            <div id='header__notification-empty' className='header__notification-empty'>
                                <img id='header__notification-empty-img' />
                                <div className='header__notification-empty-text'>{it.L('No notifications')}</div>
                                <div className='header__notification-empty-desc'>{it.L('You have yet to receive any notifications')}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className='url-account-details header__account header__menu-item mobile-hide'>
                    <img className='header__icon-button' id='header__account-settings' />
                </a>
                <div className='header__divider mobile-hide' />
                <div className='header__menu-item header__menu-acc' id='acc_switcher'>
                    <div className='header__acc-info'>
                        <img id='header__acc-icon' className='header__acc-icon' />
                        <span className='header__acc-display'>
                            <div id='header__acc-balance' className='header__acc-balance' />
                        </span>
                        <img id='header__acc-expand' className='header__icon header__expand' />
                    </div>
                    <div id='account__switcher-dropdown' className='account__switcher-dropdown'>
                        <div className='account__switcher' id='account__switcher'>
                            <div id='acc_tabs' className='account__switcher-container'>
                                <ul className='account__switcher-tabs'>
                                    <li className='account__switcher-tab'><a href='#real_tab'>{it.L('Real')}</a></li>
                                    <li className='account__switcher-tab'><a href='#demo_tab'>{it.L('Demo')}</a></li>
                                </ul>
                                <div id='real_tab' className='account__switcher-tabs-content'>
                                    <div id='account__switcher-accordion-non-eu' className='account__switcher-accordion'>
                                        <h3>
                                            <div id='high_risk_accounts' className='account__switcher-accordion-header-text'>
                                                <span className='header__accounts-multiple'>{it.L('Deriv ')}</span>
                                                <img className='header__expand-light' />
                                            </div>
                                            <div id='low_risk_accounts_non_eu'className='account__switcher-accordion-header-text'>
                                                <span className='header__accounts-multiple'>{it.L('Non-EU Deriv ')}</span>
                                                <img className='header__expand-light' />
                                            </div>
                                        </h3>
                                        <div className='account__switcher-list' id='account__switcher-non-eu-list'>
                                            <div id='account__switcher-new-account-deriv' className='account__switcher-new-account'>
                                                <img id='add-account-icon' />
                                                <span id='add-account-text-normal' className='account__switcher-new-account-text'>{it.L('Options & Multipliers')}</span>
                                                <span id='add-account-text-eu' className='account__switcher-new-account-text'>{it.L('Multipliers')}</span>
                                                <span className= 'account__switcher-new-account-btn'><a rel='noopener noreferrer' id='url-add-account-dynamic' className='url-add-account'>{it.L('Add')}</a></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id='account__switcher-accordion-eu' className='account__switcher-accordion'>
                                        <h3>
                                            <div id='low_risk_accounts_eu' className='account__switcher-accordion-header-text'>
                                                <span>{it.L('EU Deriv account')}</span>
                                                <img className='header__expand-light' />
                                            </div>
                                        </h3>
                                        <div className='account__switcher-list' id='account__switcher-eu-list'>
                                            <div id='account__switcher-new-account-eu' className='account__switcher-new-account'>
                                                <img id='add-account-icon' />
                                                <span className='account__switcher-new-account-text'>{it.L('Multipliers')}</span>
                                                <span className= 'account__switcher-new-account-btn'><a rel='noopener noreferrer' className='url-add-account-multiplier'>{it.L('Add')}</a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id='demo_tab' className='account__switcher-tabs-content'>
                                    <div id='account__switcher-accordion-demo' className='account__switcher-accordion'>
                                        <h3>
                                            <div className='account__switcher-accordion-header-text'>
                                                <span>{it.L('Demo account')}</span>
                                                <img className='header__expand-light' />
                                            </div>
                                        </h3>
                                        <div className='account__switcher-list' id='account__switcher-demo-list' />
                                    </div>
                                </div>
                            </div>
                            <div className='account__switcher-seperator' />
                            <div className='account__switcher-total'>
                                <div className='account__switcher-total-balance'>
                                    <span className='account__switcher-total-balance-text'>{it.L('Total assets')}</span>
                                    <span id='account__switcher-total-balance-amount' className='account__switcher-total-balance-amount account__switcher-balance' />
                                </div>
                                <div className='account__switcher-total-text'>{it.L('Total assets in your Deriv accounts')}</div>
                            </div>

                            <div id='cfd-link-seperator' className='account__switcher-seperator' />
                            <div id='account__switcher-cfd' className='account__switcher-cfd'>
                                <a className='url-appstore account__switcher-cfd-link'>
                                    <span className='account__switcher-cfd-text'>{it.L('Looking for CFD accounts? Go to Trader\'s hub')}</span>
                                </a>
                            </div>
                            <div className='account__switcher-seperator' />
                            <div id='account__switcher-logout' className='account__switcher-logout'>
                                <a id='account__switcher-manage' rel='noopener noreferrer' className='url-manage-account account__switcher-manage'>
                                    <span className='account__switcher-manage-text'>{it.L('Manage accounts')}</span>
                                </a>
                                <div className='account__switcher-logout-btn logout'>
                                    <span className='account__switcher-logout-text'>{it.L('Log out')}</span>
                                    <img className='account__switcher-logout-icon logout-icon' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className='url-cashier-deposit btn btn--primary header__deposit mobile-hide'>{it.L('Deposit')}</a>
            </div>
            <div className='header__menu-right is-logout'>
                <div className='header__btn'>
                    <button id='btn__login' className='btn btn--tertiary header__btn-login'>{it.L('Log in')}</button>
                    <a id='btn__signup' className='btn btn--primary header__btn-signup' target='_blank' rel='noopener noreferrer'>{it.L('Sign up')}</a>
                </div>
            </div>
        </div>
        <MobileMenu />
    </div>
);

export default Header;
