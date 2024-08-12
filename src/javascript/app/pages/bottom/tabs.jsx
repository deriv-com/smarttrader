import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { Explanation } from './explanation.jsx';
import Graph from './graph.jsx';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useMarketChange, useContractChange } from '../../hooks/events';
import { localize } from '../../../_common/localize';
import dataManager from '../../common/data_manager.js';
import LastDigit from '../trade/last_digit.jsx';

const BottomTabs = () => {
    const hasMarketChange = useMarketChange();
    const [selectedTab, setSelectedTab] = useState(1);
    const [hasLastDigit, setHasLastDigit] = useState(false);
    const [formName, setFormName] = useState('');
    const hasContractChange = useContractChange();
    const savedTab = sessionStorage.getItem('currentTab');
    const triggerOldTabTimer = useRef();
    const [isShowGraph,setIsShowGraph] = useState(false);

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
        setFormName(dataManager.getContract('explanationFormName'));
    }, [hasContractChange, hasMarketChange]);

    useEffect(() => {
        setHasLastDigit(formName === 'digits' || formName === 'evenodd' || formName === 'overunder');
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

        triggerOldTabTimer.current = setTimeout(() => {
            triggerOldTab(selectedTab);
        }, 100);
    }, [selectedTab, savedTab]);

    useEffect(() => () => {
        clearTimeout(triggerOldTabTimer.current);
        WebtraderChart.cleanupChart();
        WebtraderChart.showChart();
    },[]);

    return (
        <>
            <div className='quill-container-centered'>
                <SegmentedControlSingleChoice
                    options={bottomTabOptions}
                    selectedItemIndex={selectedTab}
                    onChange={handleChange}
                />
            </div>
            <div className='bottom-content-section'>
                {selectedTab === 0 && <Graph
                    onUnload={() => setIsShowGraph(false)}
                    onLoad={() => setIsShowGraph(true)}
                />}
                {selectedTab === 1 && <Explanation />}
                {selectedTab === 2 && hasLastDigit && <LastDigit />}
       
                <div id='tab_graph' className={`chart-section ${isShowGraph ? '' : 'grap-hide'}`}>
                    <p className='error-msg' id='chart-error' />
                    <div id='trade_live_chart'>
                        <div id='webtrader_chart' />
                    </div>
                </div>
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
