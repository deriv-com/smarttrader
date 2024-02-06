import React from 'react';
import { getPlatformSettings } from '../brand.config';

const platform_name = getPlatformSettings('smarttrader').name;

const WalletHeader = () => (
    <div className='wallet__header' id='wallet__header'>
        <div id='platform__dropdown' className='platform__dropdown'>
            <div id='platform__list' className='platform__dropdown-list' />
        </div>
        <div className='wallet__header-menu-items'>
            <div className='wallet__header-menu-left'>
                <img id='header__hamburger' className='header__hamburger mobile-show' />
                <div id='wallet__header-menu-item wallet__header-menu-links'>
                    <a className='url-deriv-com header__menu-links-item' target='_blank' rel='noopener noreferrer' href='https://deriv.com'>
                        <span>
                            <img className='deriv-com-logo' />
                        </span>
                    </a>
                </div>
                <div id='wallet__header-menu-item wallet__header-menu-links'>
                    <a className='url-wallet-apps header__menu-links-item'>
                        <span>
                            <img className='wallets-apps-logo' />
                        </span>
                    </a>
                </div>
                <div id='platform__switcher' className='header__menu-item platform__switcher mobile-hide'>
                    <img className='header__logo' />
                    <div className='platform__switcher-header'>{it.L('[_1]', platform_name)}</div>
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='wallet__header-menu-item wallet__header-menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-reports-positions header__menu-links-item'>
                        <span>
                            <img className='header__icon-text reports-icon' />
                            {it.L('Reports')}
                        </span>
                    </a>
                </div>
            </div>
            <div className='wallet__header-menu-right client_logged_in invisible'>
                <div id='header__notification' className='header__notification header__menu-item'>
                    <div id='header__notifcation-icon-container' className='header__notification-icon-container'>
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
            </div>
        </div>
    </div>
);

export default WalletHeader;
