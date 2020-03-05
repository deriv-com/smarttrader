import React from 'react';

const DerivIFrame = () => {
    let url;
    
    if (/^smarttrader-staging\.deriv\.app$/i.test(window.location.hostname)) {
        url = 'https://staging.deriv.app/localstorage-sync.html';
    } else if (/^smarttrader\.deriv\.app$/i.test(window.location.hostname)) {
        url = 'https://deriv.app/localstorage-sync.html';
    } else {
        return null;
    }

    return (
        <iframe
            id='localstorage-sync'
            src={url}
            style={{ display: 'none', visibility: 'hidden' }}
        />
    );
};

export default DerivIFrame;
