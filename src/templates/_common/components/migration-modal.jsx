import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from '@deriv-com/quill-ui';

const { localize } = require('../../../javascript/_common/localize');

const getHomeLoginUrl = () => {
    const hostname   = window.location.hostname;
    const is_staging = /staging-smarttrader/.test(hostname);
    const tld_match  = hostname.match(/deriv\.(com|me|be)/);
    const tld        = tld_match ? tld_match[1] : 'com';
    const subdomain  = is_staging ? 'staging-home' : 'home';
    return `https://${subdomain}.deriv.${tld}/dashboard/login`;
};

const getHelpCentreUrl = () => {
    const hostname  = window.location.hostname;
    const tld_match = hostname.match(/deriv\.(com|me|be)/);
    const tld       = tld_match ? tld_match[1] : 'com';
    return `https://trade.deriv.${tld}/help-centre`;
};

const MigrationModalComponent = () => {
    const is_mobile = window.innerWidth < 770;

    return (
        <Modal
            isOpened
            isNonExpandable
            isMobile={is_mobile}
            showHandleBar={false}
            showCrossIcon={false}
            disableCloseOnOverlay
            showPrimaryButton={false}
            hasFooter={false}
            className='migration-modal'
        >
            <Modal.Header
                image={
                    <img
                        src='/images/pages/header/ic_smarttrader.png'
                        alt='SmartTrader'
                        width={96}
                        height={96}
                    />
                }
                className='migration-modal__header'
            />
            <Modal.Body>
                <div className='migration-modal__content'>
                    <p className='migration-modal__title'>
                        {localize('Your platform has been upgraded')}
                    </p>
                    <p className='migration-modal__description'>
                        {localize('We\'ve made improvements to give you a better trading experience. Please log in again to continue.')}
                    </p>
                    <Button
                        className='migration-modal__cta'
                        color='coral'
                        fullWidth
                        label={localize('Log in')}
                        size='lg'
                        variant='primary'
                        onClick={() => window.location.assign(getHomeLoginUrl())}
                    />
                    <p className='migration-modal__support'>
                        {localize('Having trouble logging in?')}{' '}
                        <a
                            className='migration-modal__support-link'
                            href={getHelpCentreUrl()}
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            {localize('Contact support')}
                        </a>
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const MigrationModal = (() => {
    let container = null;

    const show = () => {
        if (container) return;
        container = document.createElement('div');
        container.id = 'migration_modal_container';
        document.body.appendChild(container);
        ReactDOM.render(<MigrationModalComponent />, container);
    };

    const remove = () => {
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.remove();
            container = null;
        }
    };

    return { show, remove };
})();

export default MigrationModal;
