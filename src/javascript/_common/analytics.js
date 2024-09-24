const DerivAnalytics = require('@deriv-com/analytics');

const Analytics = (() => {
    const init = () => {
        if (process.env.RUDDERSTACK_KEY && process.env.GROWTHBOOK_CLIENT_KEY && process.env.GROWTHBOOK_DECRYPTION_KEY) {
            DerivAnalytics.Analytics.initialise({
                growthbookKey          : process.env.GROWTHBOOK_CLIENT_KEY, // optional key to enable A/B tests
                growthbookDecryptionKey: process.env.GROWTHBOOK_DECRYPTION_KEY, // optional key to enable A/B tests
                rudderstackKey         : process.env.RUDDERSTACK_KEY,
            });
        }
    };

    const isGrowthbookLoaded = () => Boolean(DerivAnalytics.Analytics?.getInstances()?.ab);

    const getGrowthbookFeatureValue = ({ defaultValue, featureFlag }) => {
        const resolvedDefaultValue = defaultValue !== undefined ? defaultValue : false;
        const isGBLoaded = isGrowthbookLoaded();

        if (!isGBLoaded) return [null, false];
        if (DerivAnalytics.Analytics?.getInstances()?.ab) {
            return [DerivAnalytics.Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue), true];
        }

        return null;
    };

    const setGrowthbookOnChange = onChange => {
        const isGBLoaded = isGrowthbookLoaded();
        if (!isGBLoaded) return null;

        const onChangeRenderer = DerivAnalytics.Analytics?.getInstances().ab.GrowthBook?.setRenderer(() => {
            onChange?.();
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
