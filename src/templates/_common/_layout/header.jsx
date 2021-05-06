import React from 'react';
// import { List } from '../../_common/components/elements.jsx';

// const LanguageUl = ({ type, color }) => {
//     const id = `${type}_language`;
//     const world_color = `world-${color}`;
//     return (
//         <ul id={id}>
//             <li>
//                 <span className={`world ${world_color}`} />
//                 <div className='language-wrapper'>
//                     <span className='language' />
//                 </div>
//                 <span className='nav-caret' />
//             </li>
//         </ul>
//     );
// };
// const Account = () => (
//     <a href='javascript:;'>
//         <div className='main-account'>
//             <div className='account-type nowrap' />
//             <span className='account-id' />
//             <div className='topMenuBalance'>0</div>
//         </div>
//         <div className='nav-caret' />
//     </a>
// );

// const Topbar = () => (
//     <div id='topbar' className='no-print primary-bg-color-dark'>
//         <div className='container'>
//             <div className='gr-row'>
//                 <div id='topbar-msg' className='gr-6 gr-5-t gr-12-p gr-12-m invisible upgrademessage center-text'>
//                     <span className='gr-hide-m invisible' id='virtual-wrapper'>
//                         <span id='virtual-text'>{it.L('You\'re using a Virtual Account.')}</span>
//                     </span>
//                     <a className='pulser invisible' />
//                 </div>
//                 <div className='gr-6 gr-7-t gr-12-p gr-12-m' id='topbar-info'>
//                     <div className='gr-row'>
//                         <div className='gr-8 gr-6-m align-self-center'>
//                             <span className='no-underline nowrap' id='gmt-clock' data-balloon-pos='down' />
//                         </div>
//                         <div className='gr-1 align-self-center no-underline' data-balloon-pos='down'>
//                             <div id='network_status' />
//                         </div>
//                         <div className='gr-3 gr-5-m'>
//                             <div className='languages invisible'>
//                                 <LanguageUl type='display'  color='white' />
//                                 <LanguageUl type='select'   color='black' />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

const MobileMenu = () => (
    <div id='mobile__container' className='mobile__container mobile-show'>
        <div id='mobile__menu' className='mobile__menu'>
            <div className='mobile__menu-header'>
                <img id='mobile__menu-close' className='btn__close' />
                <div className='mobile__menu-header-text'>{it.L('Menu')}</div>
            </div>
            <div id='mobile_menu-content' className='mobile__menu-content mobile__menu-content--active'>
                <div className='mobile__platform-switcher' >
                    <div id='mobile__platform-switcher-current' className='mobile__platform-switcher-current' >
                        <div className='mobile__platform-switcher-container'>
                            <img className='header__logo mobile__platform-switcher-logo' />
                            <div className='mobile__platform-switcher-header platform__switcher-header'>{it.L('SmartTrader')}</div>
                        </div>
                        <img id='mobile__platform-switcher-expand' className='mobile__platform-switcher-expand header__expand' />
                    </div>
                    <div id='mobile__platform-switcher-dropdown' className='mobile__platform-switcher-dropdown' />
                </div>
                <div className='mobile__platform-switcher-lists'>
                    <div className='mobile__platform-switcher-item'>
                        <img id='mobile__platform-switcher-icon-trade' className='mobile__platform-switcher-icon' />
                        <div className='mobile__platform-switcher-text mobile__platform-switcher-text-bold'>{it.L('Trade')}</div>
                    </div>
                    <div id='mobile__platform-switcher-item-reports' className='mobile__platform-switcher-item client_logged_in invisible'>
                        <img className='mobile__platform-switcher-icon reports-icon' />
                        <div className='mobile__platform-switcher-text'>{it.L('Reports')}</div>
                        <img id='mobile__platform-switcher-icon-arrowright' className='mobile__platform-switcher-icon-right' />
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
                <div className='no-underline' data-balloon-pos='up'>
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
                    <div className='platform__switcher-header'>{it.L('SmartTrader')}</div>
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='header__menu-item header__menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-reports-positions header__menu-links-item'>
                        <span>
                            <img className='header__icon-text reports-icon' />
                            {it.L('Reports')}
                        </span>
                    </a>
                    <a className='url-cashier-deposit header__menu-links-item'>
                        <span>
                            <img id='cashier_icon' className='header__icon-text' />
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
                        <div id='header__acc-balance' className='header__acc-balance' />
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
                                    <div id='account__switcher-accordion-real' className='account__switcher-accordion'>
                                        <h3>
                                            <div className='account__switcher-accordion-header-text'>
                                                <span>{it.L('Deriv Accounts')}</span>
                                                <img className='header__expand-light' />
                                            </div>
                                        </h3>
                                        <div className='account__switcher-list' id='account__switcher-real-list'>
                                            <a id='account__switcher-select_currencies' rel='noopener noreferrer' className='url-add-account account__switcher-select_currencies'>
                                                <span className='account__switcher-select_currencies-text'>{it.L('Select currency')}</span>
                                            </a>
                                            <a id='account__switcher-add' rel='noopener noreferrer' className='url-add-account account__switcher-add'>
                                                <img id='add_icon' className='account__switcher-add-icon' />
                                                <span className='account__switcher-add-text'>{it.L('Add Deriv account')}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div id='demo_tab' className='account__switcher-tabs-content'>
                                    <div id='account__switcher-accordion-demo' className='account__switcher-accordion'>
                                        <h3>
                                            <div className='account__switcher-accordion-header-text'>
                                                <span>{it.L('Demo Accounts')}</span>
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
                            <div className='account__switcher-seperator' />
                            <div className='account__switcher-logout logout'>
                                <span className='account__switcher-logout-text'>{it.L('Log out')}</span>
                                <img className='account__switcher-logout-icon logout-icon' />
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
