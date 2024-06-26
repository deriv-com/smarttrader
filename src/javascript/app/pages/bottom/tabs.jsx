/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { Explanation } from './explanation.jsx';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useMarketChange } from '../../hooks/events';

const Graph = () => (
    <div id='tab_graph' className='chart-section'>
        <p className='error-msg' id='chart-error' />
        <div id='trade_live_chart'>
            <div id='webtrader_chart' />
        </div>
    </div>
);

const BottomTabs = () => {
    const hasMarketChange = useMarketChange();
    const [selectedTab, setSelectedTab] = useState(1);
    const [showGraph, setShowGraph] = useState(true);

    useEffect(() => {
        const savedTab = sessionStorage.getItem('currentAnalysisTab');
        if (savedTab !== null) {
            setSelectedTab(Number(savedTab));
        }
    }, []);

    const renderGraph = (callback) => {
        setTimeout(() => {
            WebtraderChart.cleanupChart();
            WebtraderChart.showChart();

            if (typeof callback === 'function') {
                callback();
            }
        }, 100);
    };

    const resetGraph = () => {
        setShowGraph(false);

        renderGraph(() => {
            setShowGraph(true);
        });
    };

    useEffect(() => {
        resetGraph();
    }, [hasMarketChange]);

    useEffect(() => {
        sessionStorage.setItem('currentAnalysisTab', selectedTab);
        if (selectedTab === 0) {
            renderGraph();
        }
    }, [selectedTab]);

    return (
        <>
            <div className='quill-container-centered'>
                <SegmentedControlSingleChoice
                    options={[{ label: 'Chart' }, { label: 'Explanation' }]}
                    selectedItemIndex={selectedTab}
                    onChange={(e) => setSelectedTab(e)}
                />
            </div>

            {selectedTab === 0 && showGraph && <Graph />}

            {selectedTab === 1 && (
                <div className='explanation-container'>
                    <Explanation />
                </div>
            )}
        </>
    );
};

export const init = () => {
    ReactDOM.render(
        <BottomTabs />,
        getElementById('trading_bottom_content_tabs')
    );
};

export default init;
