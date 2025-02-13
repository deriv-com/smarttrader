const DerivAnalytics = require('@deriv-com/analytics');
const CountryUtils = require('@deriv-com/utils').CountryUtils;
const Cookies = require('js-cookie');
const { SessionStore, LocalStore } = require('./storage');
const Language = require('./language');
const { getAppId } = require('../config');

const Analytics = (() => {
    const init = async () => {
        const loginid = SessionStore?.get('active_loginid') || LocalStore?.get('active_loginid');
        const active_account = loginid && JSON.parse(localStorage.getItem('client.accounts') || '{}')[loginid];
        const utmData = Cookies.get('utm_data');
        const ppcCampaignCookies = utmData ? JSON.parse(utmData) : {
            utm_campaign: 'no campaign',
            utm_content : 'no content',
            utm_medium  : 'no medium',
            utm_source  : 'no source',
        };

        if (process.env.RUDDERSTACK_KEY && process.env.GROWTHBOOK_CLIENT_KEY) {
            DerivAnalytics.Analytics.initialise({
                growthbookKey    : process.env.GROWTHBOOK_CLIENT_KEY, // optional key to enable A/B tests
                rudderstackKey   : process.env.RUDDERSTACK_KEY,
                growthbookOptions: {
                    attributes: {
                        loggedIn       : !!Cookies.get('clients_information'),
                        account_type   : active_account?.account_type || 'unlogged',
                        app_id         : String(getAppId()),
                        country        : await CountryUtils.getCountry(),
                        device_language: navigator?.language || 'en-EN',
                        device_type    : window.innerWidth <= 600 ? 'mobile' : 'desktop',
                        domain         : window.location.hostname,
                        url            : window.location.href,
                        user_language  : Language.get().toLowerCase(),
                        utm_campaign   : ppcCampaignCookies?.utm_campaign,
                        utm_content    : ppcCampaignCookies?.utm_content,
                        utm_medium     : ppcCampaignCookies?.utm_medium,
                        utm_source     : ppcCampaignCookies?.utm_source,
                    },
                },
            });
        }
    };

    const isGrowthbookLoaded = () => Boolean(DerivAnalytics.Analytics?.getInstances()?.ab);

    const getGrowthbookFeatureValue = ({ defaultValue, featureFlag }) => {
        const resolvedDefaultValue = defaultValue !== undefined ? defaultValue : false;
        const isGBLoaded = isGrowthbookLoaded();

        if (!isGBLoaded) return [null, false];

        return [DerivAnalytics.Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue), true];
    };

    const setGrowthbookOnChange = onChange => {
        const isGBLoaded = isGrowthbookLoaded();
        if (!isGBLoaded) return null;

        const onChangeRenderer = DerivAnalytics.Analytics?.getInstances().ab.GrowthBook?.setRenderer(() => {
            onChange();
        });
        return onChangeRenderer;
    };

    return {
        init,
        isGrowthbookLoaded,
        getGrowthbookFeatureValue,
        setGrowthbookOnChange,
    };
})();

module.exports = Analytics;
