// growthbook.js
import { useState, useEffect } from 'react';

import { Analytics } from '@deriv-com/analytics';

export const useIsGrowthbookIsLoaded = () => {
    const [isGBLoaded, setIsGBLoaded] = useState(false);

    useEffect(() => {
        let checksCounter = 0;
        const analyticsInterval = setInterval(() => {
            // Check if the analytics instance is available for 10 seconds before setting the feature flag value
            if (checksCounter > 20) {
                // If the analytics instance is not available after 10 seconds, clear the interval
                clearInterval(analyticsInterval);
                return;
            }
            checksCounter += 1;
            if (Analytics?.getInstances()?.ab) {
                setIsGBLoaded(true);
                clearInterval(analyticsInterval);
            }
        }, 500);

        return () => {
            clearInterval(analyticsInterval);
        };
    }, []);

    return isGBLoaded;
};

export const useGrowthbookGetFeatureValue = ({ defaultValue, featureFlag }) => {
    const resolvedDefaultValue = defaultValue !== undefined ? defaultValue : false;
    const [featureFlagValue, setFeatureFlagValue] = useState(
        Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue) ?? resolvedDefaultValue
    );
    const isGBLoaded = useIsGrowthbookIsLoaded();

    useEffect(() => {
        if (isGBLoaded) {
            if (Analytics?.getInstances()?.ab) {
                const setFeatureValue = () => {
                    const value = Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue);
                    setFeatureFlagValue(value);
                };
                setFeatureValue();
                Analytics?.getInstances()?.ab?.GrowthBook?.setRenderer(() => {
                    // this will be called whenever the feature flag value changes and acts as a event listener
                    setFeatureValue();
                });
            }
        }
    }, [isGBLoaded, resolvedDefaultValue, featureFlag]);

    return [featureFlagValue, isGBLoaded];
};
