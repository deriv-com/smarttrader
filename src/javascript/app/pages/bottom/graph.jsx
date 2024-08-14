import React, { useEffect, useState } from 'react';
import { Skeleton } from '@deriv-com/quill-ui';

const Graph = ({ onLoad, onUnload }) => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        const mountTimer = setTimeout(() => {
            setMounted(true);
            onLoad?.();
        }, 1000);

        return () => {
            onUnload?.();
            clearTimeout(mountTimer);
        };
    }, []);

    if (!isMounted) {
        return <Skeleton.Square rounded height={300} />;
    }

    return <></>;
    
};

export default Graph;
