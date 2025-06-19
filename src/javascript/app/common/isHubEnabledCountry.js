import { LocalStore, SessionStore } from '../../_common/storage';
import ClientBase from '../../_common/base/client_base';
import { getTopLevelDomain } from '../../_common/utility';
import RemoteConfig from '../hooks/useRemoteConfig';

let remoteConfigData = null;

const initRemoteConfig = async () => {
    try {
        const { data } = await RemoteConfig.getRemoteConfig(true);
        remoteConfigData = data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize remote config:', error);
    }
};

initRemoteConfig();

/**
 * Checks if the current domain is .com AND the user has a wallet account AND their country is in the hub enabled countries list
 * @returns {Boolean} true if all conditions are met, false otherwise
 */
const isHubEnabledCountry = () => {
    const is_com_domain = getTopLevelDomain().includes('com');

    if (!is_com_domain || !ClientBase.hasWalletsAccount()) {
        return false;
    }

    if (!remoteConfigData) {
        initRemoteConfig();
        return false;
    }
    const active_loginid = SessionStore.get('active_loginid');

    if (active_loginid) {
        const client_accounts = LocalStore.getObject('client.accounts');
        const current_account = client_accounts[active_loginid];

        if (current_account && current_account.country) {
            const country = current_account.country.toLowerCase();
            
            if (remoteConfigData && remoteConfigData.hub_enabled_country_list) {
                return remoteConfigData.hub_enabled_country_list.includes(country);
            }
        }
    }

    return false;
};

export default isHubEnabledCountry;
