import { useEffect, useState } from 'react';
import { Analytics } from '@deriv-com/analytics';

const useIsGrowthbookIsLoaded = () => {
    const [isGBLoaded, setIsGBLoaded] = useState(false);

    useEffect(() => {
        let checksCounter = 0;
        const analyticsInterval = setInterval(() => {
            if (checksCounter > 20) {
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

export default useIsGrowthbookIsLoaded;
