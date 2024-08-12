import React, { useEffect, useState } from 'react';
import { Skeleton } from '@deriv-com/quill-ui';

const Graph = ({ renderGraph }) => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        const mountTimer = setTimeout(() => {
            setTimeout(() => {
                renderGraph();
            }, 1000);
            setMounted(true);
        }, 1000);

        return () => clearTimeout(mountTimer);
    }, [renderGraph]);

    if (isMounted) {
        return (
            <div id='tab_graph' className='chart-section'>
                <p className='error-msg' id='chart-error' />
                <div id='trade_live_chart'>
                    <div id='webtrader_chart' />
                </div>
            </div>
        );
    }

    return <Skeleton.Square rounded height={300} />;
};

export default Graph;
