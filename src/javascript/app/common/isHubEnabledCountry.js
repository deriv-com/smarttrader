import { Analytics } from "@deriv-com/analytics";
import { LocalStore, SessionStore } from "../../_common/storage";
import ClientBase from "../../_common/base/client_base";
import { getTopLevelDomain } from "../../_common/utility";

/**
 * Checks if the current domain is .com AND the user has a wallet account AND their country is in the hub enabled countries list
 * @returns {Boolean} true if all conditions are met, false otherwise
 */
const isHubEnabledCountry = () => {
  const is_com_domain = getTopLevelDomain().includes("com");

  if (!is_com_domain || !ClientBase.hasWalletsAccount()) {
    return false;
  }

  const featureValue = {
    hub_enabled_country_list: [
      "aq",
      "tm",
      "dz",
      "gp",
      "kn",
      "lc",
      "bs",
      "tw",
      "rs",
      "am",
      "pg",
      "gn",
      "al",
      "gd",
      "sr",
      "gy",
      "mk",
      "td",
      "is",
      "gm",
      "ad",
      "cv",
      "mr",
      "bz",
      "sc",
      "cf",
    ],
  };
  //Analytics?.getFeatureValue('hub_enabled_country_list_st', {});
  const active_loginid = SessionStore.get("active_loginid");

  if (active_loginid) {
    const client_accounts = LocalStore.getObject("client.accounts");
    const current_account = client_accounts[active_loginid];

    if (current_account && current_account.country) {
      const country = current_account.country.toLowerCase();
  console.log(
    "Hub Countries",
    featureValue.hub_enabled_country_list,
    "Client Country",
    country
  );
      if (featureValue && featureValue.hub_enabled_country_list) {
        console.log("Country", country);
        return featureValue.hub_enabled_country_list.includes(country);
      }
    }
  }

  return false;
};

export default isHubEnabledCountry;
