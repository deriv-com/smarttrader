import { useEffect, useState } from 'react';
import { Analytics } from '@deriv-com/analytics';
import useIsGrowthbookIsLoaded from './useIsGrowthbookLoaded';

const useGrowthbookGetFeatureValue = ({
    defaultValue,
    featureFlag,
}) => {
    const resolvedDefaultValue = defaultValue !== undefined ? defaultValue : false;
    const [featureFlagValue, setFeatureFlagValue] = useState(
        (Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue) ?? resolvedDefaultValue)
    );
    const isGBLoaded = useIsGrowthbookIsLoaded();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.Analytics = Analytics;
        }

        if (isGBLoaded) {
            if (Analytics?.getInstances()?.ab) {
                const setFeatureValue = () => {
                    const value = Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue);
                    setFeatureFlagValue(value);
                };
                setFeatureValue();
                Analytics?.getInstances()?.ab?.GrowthBook?.setRenderer(() => {
                    setFeatureValue();
                });
            }
        }
    }, [isGBLoaded, resolvedDefaultValue, featureFlag]);
    return [featureFlagValue, isGBLoaded];
};
export default useGrowthbookGetFeatureValue;
