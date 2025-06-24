import React from 'react';

const MobileMenu = () => (
    <div id='mobile__container' className='mobile__container mobile-show'>
        <div id='mobile__menu' className='mobile__menu'>
            <div className='mobile__menu-header'>
                <img id='mobile__menu-close' className='btn__close' />
                <div className='mobile__menu-header-wrapper'>
                    <div className='mobile__menu-header-text'>{it.L('Menu')}</div>
                    <div id='mobile__menu-language-selector' className='mobile__menu-language-selector'>
                        <img id='mobile__menu-language-flag' className='mobile__menu-language-flag' src='../images/languages/ic-flag-uk.svg' alt='English' />
                        <span id='mobile__menu-language-text' className='mobile__menu-language-text'>EN</span>
                    </div>
                </div>
            </div>
            <div id='mobile_menu-content' className='mobile__menu-content mobile__menu-content--active'>
                <div className='mobile__platform-switcher' >
                    <div id='mobile__platform-switcher-current' className='mobile__wallet-platform-switcher-current' >
                        <div className='mobile__wallet-platform-switcher-container'>
                            <img className='header__logo' />
                            <img id='mobile__platform-switcher-expand' className='mobile__platform-switcher-expand header__expand' />
                        </div>
                    </div>
                    <div id='mobile__platform-switcher-dropdown' className='mobile__platform-switcher-dropdown' />
                </div>
                <div className='mobile__platform-switcher-lists'>
                    <div className='mobile__platform-switcher-item'>
                        <a className='url-deriv-com-mobile' target='_blank' rel='noopener noreferrer' href='https://deriv.com'>
                            <img className='mobile__platform-switcher-icon deriv-com-logo-mobile' />
                            <div className='mobile__platform-switcher-text'>{'Deriv.com'}</div>
                        </a>
                    </div>
                    <div id='mobile__platform-switcher-item-appstore' className='mobile__platform-switcher-item'>
                        <a id='url-appstore' className='url-appstore'>
                            <img id='appstore-icon' className='mobile__platform-switcher-icon appstore-icon' />
                            <div className='mobile__platform-switcher-text'>{it.L('Trader\'s Hub')}</div>
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
                    <div id='mobile__platform-switcher-item-account-settings' className='mobile__platform-switcher-item client_logged_in invisible'>
                        <img className='mobile__platform-switcher-icon account-settings-icon' src='../images/pages/header/ic-account-settings.svg' alt='Account Settings' />
                        <div className='mobile__platform-switcher-text'>{it.L('Account Settings')}</div>
                        <img id='mobile__platform-switcher-icon-arrowright' className='mobile__platform-switcher-icon-right' />
                    </div>
                    <div id='mobile__platform-switcher-item-cashier' className='mobile__platform-switcher-item client_logged_in invisible'>
                        <img className='mobile__platform-switcher-icon cashier-icon' src='../images/pages/header/ic-cashier.svg' alt='Cashier' />
                        <div className='mobile__platform-switcher-text'>{it.L('Cashier')}</div>
                        <img id='mobile__platform-switcher-icon-arrowright' className='mobile__platform-switcher-icon-right' />
                    </div>
                    <div className='mobile__platform-switcher-item'>
                        <a href='https://deriv.com/help-centre' target='_blank' rel='noopener noreferrer'>
                            <img className='mobile__platform-switcher-icon help-center-icon' src='../images/pages/header/ic-help-center.svg' alt='Help center' />
                            <div className='mobile__platform-switcher-text'>{it.L('Help center')}</div>
                        </a>
                    </div>
                    <div className='mobile__platform-switcher-item client_logged_in invisible'>
                        <a href='https://app.deriv.com/account/account-limits' target='_blank' rel='noopener noreferrer'>
                            <img className='mobile__platform-switcher-icon account-limits-icon' src='../images/pages/header/ic-account-limits.svg' alt='Account limits' />
                            <div className='mobile__platform-switcher-text'>{it.L('Account limits')}</div>
                            <img className='mobile__platform-switcher-icon-right' />
                        </a>
                    </div>
                    <div className='mobile__platform-switcher-item'>
                        <a href='https://deriv.com/responsible' target='_blank' rel='noopener noreferrer'>
                            <img className='mobile__platform-switcher-icon responsible-trading-icon' src='../images/pages/header/ic-responsible-trading.svg' alt='Responsible trading' />
                            <div className='mobile__platform-switcher-text'>{it.L('Responsible trading')}</div>
                        </a>
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
            <div id='mobile__menu-content-submenu-cashier' className='mobile__menu-content-submenu mobile__menu-content client_logged_in invisible'>
                <div id='mobile__menu-content-submenu-cashier-header' className='mobile__menu-content-submenu-header mobile__platform-switcher-item'>
                    <img id='mobile__menu-content-submenu-cashier-icon-back' className='mobile__menu-content-submenu-icon' />
                    <div className='mobile__menu-content-submenu-header-text' >{it.L('Cashier')}</div>
                </div>
                <div className='mobile__menu-content-submenu-lists'>
                    <a href='https://app.deriv.com/cashier/deposit' className='mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-deposit.svg' alt='Deposit' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Deposit')}</div>
                    </a>
                    <a href='https://app.deriv.com/cashier/withdrawal' className='mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-withdrawal.svg' alt='Withdrawal' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Withdrawal')}</div>
                    </a>
                    <a href='https://app.deriv.com/cashier/payment-agent' className='mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-payment-agents.svg' alt='Payment agents' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Payment agents')}</div>
                    </a>
                    <a href='https://app.deriv.com/cashier/account-transfer' className='mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-transfer.svg' alt='Transfer' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Transfer')}</div>
                    </a>
                    <a href='https://app.deriv.com/cashier/p2p' className='mobile__menu-content-submenu-item mobile__platform-switcher-item'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-p2p.svg' alt='Deriv P2P' />
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Deriv P2P')}</div>
                    </a>
                </div>
            </div>
            <div id='mobile__menu-content-submenu-account-settings' className='mobile__menu-content-submenu mobile__menu-content client_logged_in invisible'>
                <div id='mobile__menu-content-submenu-account-settings-header' className='mobile__menu-content-submenu-header mobile__platform-switcher-item'>
                    <img id='mobile__menu-content-submenu-account-settings-icon-back' className='mobile__menu-content-submenu-icon' />
                    <div className='mobile__menu-content-submenu-header-text' >{it.L('Account Settings')}</div>
                </div>
                <div className='mobile__menu-content-submenu-lists'>
                    <div className='mobile__menu-content-submenu-category-header'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-profile.svg' alt='Profile' />
                        <div className='mobile__menu-content-submenu-category-text'>{it.L('Profile')}</div>
                    </div>
                    <a href='https://app.deriv.com/account/personal-details' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Personal details')}</div>
                    </a>
                    <div id='mobile__account-settings-languages' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Languages')}</div>
                    </div>
                    
                    <div className='mobile__menu-content-submenu-category-header'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-assessments.svg' alt='Assessments' />
                        <div className='mobile__menu-content-submenu-category-text'>{it.L('Assessments')}</div>
                    </div>
                    <a href='https://app.deriv.com/account/trading-assessment' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Trading assessment')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/financial-assessment' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Financial assessment')}</div>
                    </a>
                    
                    <div className='mobile__menu-content-submenu-category-header'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-verification.svg' alt='Verification' />
                        <div className='mobile__menu-content-submenu-category-text'>{it.L('Verification')}</div>
                    </div>
                    <a href='https://app.deriv.com/account/proof-of-identity' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Proof of identity')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/proof-of-address' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Proof of address')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/proof-of-ownership' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Proof of ownership')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/proof-of-income' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Proof of income')}</div>
                    </a>
                    
                    <div className='mobile__menu-content-submenu-category-header'>
                        <img className='mobile__menu-content-submenu-icon' src='../images/pages/header/ic-security.svg' alt='Security and safety' />
                        <div className='mobile__menu-content-submenu-category-text'>{it.L('Security and safety')}</div>
                    </div>
                    <a href='https://app.deriv.com/account/passwords' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Email and passwords')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/passkeys' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Passkeys')} <span className='mobile__menu-content-submenu-badge'>NEW!</span></div>
                    </a>
                    <a href='https://app.deriv.com/account/self-exclusion' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Self-exclusion')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/account-limits' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Account limits')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/login-history' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Login history')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/api-token' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('API token')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/connected-apps' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Connected apps')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/two-factor-authentication' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Two-factor authentication')}</div>
                    </a>
                    <a href='https://app.deriv.com/account/deactivate-account' className='mobile__menu-content-submenu-item mobile__platform-switcher-item mobile__menu-content-submenu-sub-item'>
                        <div className='mobile__menu-content-submenu-item-text'>{it.L('Close your account')}</div>
                    </a>
                </div>
            </div>
            <div id='mobile__menu-content-submenu-language' className='mobile__menu-content-submenu mobile__menu-content-submenu-language'>
                <div id='mobile__menu-content-submenu-language-header' className='mobile__menu-content-submenu-header mobile__platform-switcher-item mobile__menu-content-submenu-language-header'>
                    <img id='mobile__menu-content-submenu-language-icon-back' className='mobile__menu-content-submenu-icon' />
                    <div className='mobile__menu-content-submenu-header-text'>{it.L('Select language')}</div>
                </div>
                <div className='mobile__menu-content-submenu-lists mobile__language-grid'>
                    <div className='mobile__language-item' data-language='EN'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-uk.svg' alt='English' />
                        <div className='mobile__language-text'>English</div>
                    </div>
                    <div className='mobile__language-item' data-language='DE'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-de.svg' alt='Deutsch' />
                        <div className='mobile__language-text'>Deutsch</div>
                    </div>
                    <div className='mobile__language-item' data-language='ES'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-es.svg' alt='Español' />
                        <div className='mobile__language-text'>Español</div>
                    </div>
                    <div className='mobile__language-item' data-language='FR'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-fr.svg' alt='Français' />
                        <div className='mobile__language-text'>Français</div>
                    </div>
                    <div className='mobile__language-item' data-language='IT'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-it.svg' alt='Italiano' />
                        <div className='mobile__language-text'>Italiano</div>
                    </div>
                    <div className='mobile__language-item' data-language='PL'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-pl.svg' alt='Polish' />
                        <div className='mobile__language-text'>Polish</div>
                    </div>
                    <div className='mobile__language-item' data-language='RU'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-ru.svg' alt='Русский' />
                        <div className='mobile__language-text'>Русский</div>
                    </div>
                    <div className='mobile__language-item' data-language='TH'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-th.svg' alt='ไทย' />
                        <div className='mobile__language-text'>ไทย</div>
                    </div>
                    <div className='mobile__language-item' data-language='VI'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-vi.svg' alt='Tiếng Việt' />
                        <div className='mobile__language-text'>Tiếng Việt</div>
                    </div>
                    <div className='mobile__language-item' data-language='ZH_CN'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-zh_cn.svg' alt='简体中文' />
                        <div className='mobile__language-text'>简体中文</div>
                    </div>
                    <div className='mobile__language-item' data-language='ZH_TW'>
                        <img className='mobile__language-flag' src='../images/languages/ic-flag-zh_tw.svg' alt='繁體中文' />
                        <div className='mobile__language-text'>繁體中文</div>
                    </div>
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

export default MobileMenu;
