import React from 'react';

const Notification = () => (
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
);

export default Notification;
