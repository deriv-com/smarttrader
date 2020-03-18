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

const Header = () => (
    <div className='header'>
        <div id='platform__dropdown' className='platform__dropdown'>
            <div id='platform__list' className='platform__dropdown-list' />
        </div>
        <div id='deriv__header' className='header__menu-items'>
            <div className='header__menu-left'>
                <div id='platform__switcher' className='header__menu-item platform__switcher'>
                    <img id='logo' className='header__logo' />
                    <div className='platform__switcher-header'>{it.L('SmartTrader')}</div>
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='header__menu-item header__menu-links is-login'>
                    <a className='header__menu-links-item' href='https://deriv.app/reports/positions'>
                        <span>
                            <img id='reports_icon' className='header__icon-text' />
                            {it.L('Reports')}
                        </span>
                    </a>
                    <a className='header__menu-links-item' href='https://deriv.app/cashier/deposit'>
                        <span>
                            <img id='cashier_icon' className='header__icon-text' />
                            {it.L('Cashier')}
                        </span>
                    </a>
                </div>
            </div>
            <div className='header__menu-right is-login'>
                <a href='https://deriv.app/account/personal-details'>
                    <img className='header__menu-item header__icon-button' id='header__account-settings' />
                </a>
                <div className='header__divider' />
                <div className='header__menu-item header__menu-acc' id='acc_switcher'>
                    <div className='header__acc-info'>
                        <img id='header__acc-icon' />
                        <div id='header__acc-balance' className='header__acc-balance' />
                        <img id='header__acc-expand' className='header__icon header__expand' />
                    </div>
                    <div className='header__acc-list account__switcher' id='account__switcher'>
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
                                        <a href='https://deriv.app/redirect?action=add_account' target='_blank' rel='noopener noreferrer' id='account__switcher-add' className='account__switcher-add'>
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
                        <div id='logout' className='account__switcher-logout'>
                            <span className='account__switcher-logout-text'>{it.L('Log out')}</span>
                            <img id='account__switcher-logout-icon' className='account__switcher-logout-icon' />
                        </div>
                    </div>
                </div>
                <a className='btn btn--primary header__deposit' href='https://deriv.app/cashier/deposit'>{it.L('Deposit')}</a>
            </div>
            <div className='header__menu-right is-logout'>
                <div className='header__btn'>
                    <button id='btn__login' className='btn btn--tertiary header__btn-login'>{it.L('Log in')}</button>
                    <a className='btn btn--primary header__btn-signup' target='_blank' rel='noopener noreferrer' href='https://deriv.com/signup/'>{it.L('Sign up')}</a>
                </div>
            </div>
        </div>
    </div>
);

export default Header;
