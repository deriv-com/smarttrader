import { useEffect, useState } from 'react';
import { Analytics } from '@deriv-com/analytics';
import getFeatureFlag from '../common/getFeatureFlag';

const useGrowthbookGetFeatureValue = ({
    defaultValue,
    featureFlag,
}) => {
    const resolvedDefaultValue = defaultValue !== undefined ? defaultValue : false;
    const [featureFlagValue, setFeatureFlagValue] = useState(false);
    const [isGBLoaded, setIsGBLoaded] = useState(false);

    if (typeof window !== 'undefined') {
        window.Analytics = Analytics;
    }

    useEffect(() => {
        const fetchFeatureFlag = async () => {
            const is_enabled = await getFeatureFlag(
                featureFlag,
                resolvedDefaultValue
            );
            setFeatureFlagValue(is_enabled);
            setIsGBLoaded(true);
        };

        fetchFeatureFlag();
    }, []);

    return [featureFlagValue, isGBLoaded];
};
export default useGrowthbookGetFeatureValue;
