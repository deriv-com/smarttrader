/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { Explanation } from './explanation.jsx';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useMarketChange, useContractChange } from '../../hooks/events';
import LastDigit from '../../../../templates/app/trade/last_digit.jsx';
import { localize } from '../../../_common/localize';
import contractManager from '../../common/contract_manager.js';

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
    const [hasLastDigit, setHasLastDigit] = useState(false);
    const [formName, setFormName] = useState('');
    const hasContractChange = useContractChange();
    const savedTab = sessionStorage.getItem('currentTab');
       
    useEffect(() => {
        setFormName(contractManager.get('explanationFormName'));
    }, [hasContractChange, hasMarketChange]);

    useEffect(() => {
        if (formName === 'digits' || formName === 'evenodd' || formName === 'overunder') {
            setHasLastDigit(true);
        } else {
            setHasLastDigit(false);
        }
    }, [formName]);

    useEffect(() => {
        if (savedTab !== null) {
            const tabIndex = parseInt(savedTab);
            if (tabIndex === 2 && !hasLastDigit) {
                setSelectedTab(1);
            } else {
                setSelectedTab(tabIndex);
            }
        } else {
            setSelectedTab(1);
        }
    }, [hasLastDigit]);

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
        if (selectedTab === 0 || savedTab === 0) {
            renderGraph();
        }
    }, [selectedTab, savedTab]);

    const handleChange = (e) => {
        setSelectedTab(e);
        sessionStorage.setItem('currentTab', e);

        const delay = e === '2' ? '100' : 0;
        setTimeout(() => {
            document.querySelectorAll('#trade_analysis li')[e].querySelector('a').click();
        }, delay);
    };

    const tabs = [{ label: localize('Chart') }, { label: localize('Explanation') }];

    const bottomTabOptions = hasLastDigit
        ? [...tabs, { label: localize('Last Digit Stats') }]
        : tabs;

    return (
        <>
            <div className='quill-container-centered'>
                <SegmentedControlSingleChoice
                    options={bottomTabOptions}
                    selectedItemIndex={selectedTab}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className='bottom-content-section'>
                {selectedTab === 0 && showGraph && <Graph />}
                {selectedTab === 1 && <Explanation />}
                {selectedTab === 2 && hasLastDigit && <LastDigit />}
            </div>
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
