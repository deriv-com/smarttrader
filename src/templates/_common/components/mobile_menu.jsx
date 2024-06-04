import React from 'react';

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
                            <img className='header__logo' />
                            <img id='mobile__platform-switcher-expand' className='mobile__platform-switcher-expand header__expand' />
                        </div>
                    </div>
                    <div id='mobile__platform-switcher-dropdown' className='mobile__platform-switcher-dropdown' />
                </div>
                <div className='mobile__platform-switcher-lists'>
                    <div id='mobile__platform-switcher-item-appstore' className='mobile__platform-switcher-item'>
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

export default MobileMenu;
