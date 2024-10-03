import React from 'react';
import ReactDOM from 'react-dom';
import { isOAuth2Enabled } from '../../_common/auth';

const DerivIFrame = () => (
    <iframe
        id='localstorage-sync'
        style={{ display: 'none', visibility: 'hidden' }}
        sandbox='allow-same-origin allow-scripts'
    />
);

export const init = () => {
    const isAuthEnabled = isOAuth2Enabled();

    if (!isAuthEnabled) ReactDOM.render(<DerivIFrame />, document.getElementById('deriv_iframe'));
};

export default init;
