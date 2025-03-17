import React from 'react';
import SSOLoader from '../../../templates/_common/components/sso_loader';
import Cookies from 'js-cookie';
import ReactDOM from 'react-dom';

export const init = () => {
    const loggedState = Cookies.get('logged_state');
    const clientAccounts = JSON.parse(
        localStorage.getItem('client.accounts') || '{}'
    );
    const isClientAccountsPopulated = Object.keys(clientAccounts).length > 0;
    const willEventuallySSO =
        loggedState === 'true' && !isClientAccountsPopulated;
    const isSilentLoginExcluded =
        window.location.pathname.includes('callback') ||
        window.location.pathname.includes('endpoint');

    if (!willEventuallySSO || isSilentLoginExcluded) {
        return null;
    }

    ReactDOM.render(
        <SSOLoader />,
        document.getElementById('sso_loader_container')
    );
};

export default init;
