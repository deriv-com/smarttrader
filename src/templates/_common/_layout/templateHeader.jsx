import React from 'react';

const TemplateHeader = () => (
    <div id='template_header' className='header'>
        <div className='header__menu-items'>
            <div className='header__menu-left'>
                <div id='platform__switcher' className='header__menu-item platform__switcher mobile-hide'>
                    <img className='header__logo' />
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
            </div>
        </div>
    </div>
);

export default TemplateHeader;
