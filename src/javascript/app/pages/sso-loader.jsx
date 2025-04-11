import Cookies from 'js-cookie';
import appLoader from './loader.jsx';

export const init = () => {
    const loggedState = Cookies.get('logged_state');
    const clientAccounts = JSON.parse(
        localStorage.getItem('client.accounts') || '{}'
    );

    const url_params = new URLSearchParams(window.location.search);
    const account = url_params.get('account');
    if (account) {
        sessionStorage.setItem('account', account);
    }

    const isClientAccountsPopulated = Object.keys(clientAccounts).length > 0;
    const willEventuallySSO =
        loggedState === 'true' && !isClientAccountsPopulated;
    const isSilentLoginExcluded =
        window.location.pathname.includes('callback') ||
        window.location.pathname.includes('endpoint');

    if (willEventuallySSO && !isSilentLoginExcluded) {
        appLoader();
    }

};

export default init;
