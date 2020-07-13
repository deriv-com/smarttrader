import React from 'react';

// Use custom modal as styling is much different from dialog.js.
const EuBlockedModal = () => (
    <div id='eu-client-blocked-modal' className='invisible'>
        <div id='eu-client-blocked'>
            <div id='eu-client-blocked-header'>
                <span>{it.L('Whoops!')}</span>
            </div>
            <div id='eu-client-blocked-message'>
                {it.L('You cannot use your real money account with Deriv at this time.')}
            </div>
            <div id='eu-client-blocked-buttons'>
                <a
                    id='eu-client-blocked-back-to-binary'
                    className='btn btn--link'
                    rel='noopener noreferrer'
                >
                    <span>{it.L('Back to main website')}</span>
                </a>
                <button
                    id='eu-client-blocked-switch-to-demo'
                    className='btn btn--primary'
                >
                    {it.L('Continue with Demo Account')}
                </button>
            </div>
        </div>
    </div>
);

export default EuBlockedModal;
