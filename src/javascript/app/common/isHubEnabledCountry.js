import { Analytics } from '@deriv-com/analytics';
import { LocalStore, SessionStore } from '../../_common/storage';
import ClientBase from '../../_common/base/client_base';
import { getTopLevelDomain } from '../../_common/utility';

/**
 * Checks if the current domain is .com AND the user has a wallet account AND their country is in the hub enabled countries list
 * @returns {Boolean} true if all conditions are met, false otherwise
 */
const isHubEnabledCountry = () => {
    const is_com_domain = getTopLevelDomain() === 'com';
    
    console.log('is_com_domain', is_com_domain);
    console.log('ClientBase.hasWalletsAccount()', ClientBase.hasWalletsAccount());
    if (!is_com_domain || !ClientBase.hasWalletsAccount()) {
        return false;
    }
    
    const featureValue = Analytics?.getFeatureValue('hub_enabled_country_list_st', {});
    const active_loginid = SessionStore.get('active_loginid');
    
    if (active_loginid) {
        const client_accounts = LocalStore.getObject('client.accounts');
        const current_account = client_accounts[active_loginid];
        console.log(current_account.country);
        if (current_account && current_account.country) {
            const country = current_account.country.toLowerCase();
            
            if (featureValue && featureValue.hub_enabled_country_list) {
                return featureValue.hub_enabled_country_list.includes(country);
            }
        }
    }

    return false;
};

export default isHubEnabledCountry;
