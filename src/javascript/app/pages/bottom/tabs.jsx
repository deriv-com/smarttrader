/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SegmentedControlSingleChoice, Skeleton } from '@deriv-com/quill-ui';
import { Explanation } from './explanation.jsx';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useMarketChange, useContractChange } from '../../hooks/events';

import { localize } from '../../../_common/localize';
import contractManager from '../../common/contract_manager.js';
import LastDigit from '../trade/last_digit.jsx';

const Graph = ({ renderGraph }) => {
    const [isMounted,setMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
            setTimeout(() => {
                renderGraph();
            }, 1000);
        }, 1000);
    },[]);

    if (isMounted){
        return (
            <div id='tab_graph' className='chart-section'>
                <p className='error-msg' id='chart-error' />
                <div id='trade_live_chart'>
                    <div id='webtrader_chart' />
                </div>
            </div>
        );
    }

    return <Skeleton.Square rounded fullWidth height={300} />;
};

const BottomTabs = () => {
    const hasMarketChange = useMarketChange();
    const [selectedTab, setSelectedTab] = useState(1);
    const [hasLastDigit, setHasLastDigit] = useState(false);
    const [formName, setFormName] = useState('');
    const hasContractChange = useContractChange();
    const savedTab = sessionStorage.getItem('currentTab');

    const renderGraph = (callback) => {
        setTimeout(() => {
            WebtraderChart.cleanupChart();
            WebtraderChart.showChart();

            if (typeof callback === 'function') {
                callback();
            }
        }, 100);
    };

    const handleChange = (e) => {
        setSelectedTab(e);
        sessionStorage.setItem('currentTab', e);
    };

    const triggerOldTab = id => {
        document.querySelectorAll('#trade_analysis li')?.[id]?.querySelector('a').click();
    };

    const tabs = [{ label: localize('Chart') }, { label: localize('Explanation') }];

    const bottomTabOptions = hasLastDigit
        ? [...tabs, { label: localize('Last Digit Stats') }]
        : tabs;

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

    useEffect(() => {
        const oppositeTab = (selectedTab + 1) > 2 ? 0 : (selectedTab + 1);
      
        triggerOldTab(oppositeTab);

        setTimeout(() => {
            triggerOldTab(selectedTab);
        }, 100);
    }, [selectedTab, savedTab]);

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
                {selectedTab === 0 && <Graph renderGraph={renderGraph} />}
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
