/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { Explanation } from './explanation.jsx';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useMarketChange, useContractChange } from '../../hooks/events';
import LastDigit from '../../../../templates/app/trade/last_digit.jsx';
import Defaults from '../trade/defaults';

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

    useEffect(() => {
        const contractObject = {
            matchdiff   : 'digits',
            callputequal: 'risefall',
            callput     : 'higherlower',
        };
        const { FORM_NAME } = Defaults.PARAM_NAMES;

        const newFormName = Defaults.get(FORM_NAME) || 'risefall';
        const finalFormName = contractObject[newFormName] || newFormName;

        setFormName(finalFormName);
    }, [hasContractChange, hasMarketChange]);

    useEffect(() => {
        if (formName === 'digits' || formName === 'evenodd' || formName === 'overunder') {
            setHasLastDigit(true);
        } else {
            setHasLastDigit(false);
        }
    }, [formName]);

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
        const updatedTab = hasLastDigit ? 2 : selectedTab;
        sessionStorage.setItem('currentAnalysisTab', updatedTab);
        
        if (selectedTab === 0) {
            renderGraph();
        }
    }, [selectedTab]);

    const handleChange = (e) => {
        console.log(e, 'event');
        setSelectedTab(e);
       
        const delay = e === '2' ? '100' : 0;
        setTimeout(() => {
            document.querySelectorAll('#trade_analysis li')[e].querySelector('a').click();
        }, delay);
    };

    const bottomTabOptions = hasLastDigit
        ? [{ label: 'Chart' }, { label: 'Explanation' }, { label: 'Last Digit Stats' }]
        : [{ label: 'Chart' }, { label: 'Explanation' }];

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

                {selectedTab === 1 && (
                    <div className='explanation-container'>
                        <Explanation formName={formName} />
                    </div>
                )}
                {selectedTab === 2 && (
                    <LastDigit />
                )}
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
