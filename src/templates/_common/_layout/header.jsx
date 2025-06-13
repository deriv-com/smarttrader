import React from 'react';
import { Skeleton } from '@deriv-com/quill-ui';
import Notification from '../components/notification.jsx';
import MobileMenu from '../components/mobile_menu.jsx';

const Header = () => (
    <div className='header' id='regular__header'>
        <div id='platform__dropdown' className='platform__dropdown'>
            <div id='platform__list' className='platform__dropdown-list' />
        </div>
        <div id='deriv__header' className='header__menu-items'>
            <div className='header__menu-left'>
                <span className='header__hamburger--container'>
                    <img id='header__hamburger' className='header__hamburger mobile-show' />
                </span>
                <div className='header-menu-item header-menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-deriv-com' target='_blank' rel='noopener noreferrer' href='https://deriv.com'>
                        <img className='deriv-com-logo' />
                    </a>
                </div>
                <div className='header-menu-item header-menu-links is-logout'>
                    <a className='url-deriv-com' target='_blank' rel='noopener noreferrer' href='https://deriv.com'>
                        <img className='deriv-com-logo' />
                    </a>
                </div>
                <div className='header-divider is-logout mobile-hide' />
                <div className='header__menu-item header__menu-links mobile-hide'>
                    <a className='url-appstore header__menu-links-item'>
                        <span className='header__menu-item--label'>
                            <img id='appstore-icon' className='header__icon-text appstore-icon' />
                            {it.L('Trader\'s hub')}
                        </span>
                    </a>
                </div>
                <div id='platform__switcher' className='header__menu-item platform__switcher mobile-hide'>
                    <img className='header__logo' />
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='header__menu-item header__menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-reports-positions header__menu-links-item'>
                        <span className='header__menu-item--label'>
                            <img className='header__icon-text reports-icon' />
                            {it.L('Reports')}
                        </span>
                    </a>
                    <a className='url-cashier-deposit header__menu-links-item'>
                        <span className='header__menu-item--label'>
                            <img id='cashier-icon' className='header__icon-text' />
                            {it.L('Cashier')}
                        </span>
                    </a>
                </div>
            </div>
            <div className='header__menu-right client_logged_in invisible'>
                <Notification />
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
                                <a className='url-appstore-cfd account__switcher-cfd-link'>
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
                    {/* <Skeleton.Square width={72} height={32} className='btn header__btn-login skeleton-btn-login' />
                    <Skeleton.Square width={72} height={32} className='btn header__btn-login skeleton-btn-signup' /> */}
                            
                    <button id='btn__login' className='btn btn--tertiary header__btn-login'>{it.L('Log in')}</button>
                    <a id='btn__signup' className='btn btn--primary header__btn-signup' target='_blank' rel='noopener noreferrer'>{it.L('Sign up')}</a>
                </div>
            </div>
        </div>
        <MobileMenu />
    </div>
);

export default Header;
