import React from 'react';

const LanguageMenuModal = () => (
    <div id='language-menu-modal' className='invisible'>
        <div id='language-menu'>
            <div id='language-menu-header'>
                <span>{it.L('Language settings')}</span>
                <span id='language-menu-close_btn' />
            </div>
            <div id='language-menu-container'>
                <div id='language-menu-list' />
            </div>
        </div>
    </div>
);

export default LanguageMenuModal;
