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
    const has_market_change = useMarketChange();
    const [selected_tab, setSelectedTab] = useState(1);
    const [has_last_digit, setHasLastDigit] = useState(false);
    const [form_name, setFormName] = useState('');
    const has_contract_change = useContractChange();
    const saved_tab = sessionStorage.getItem('currentTab');
    const [is_show_graph, setIsShowGraph] = useState(false);
    const trigger_old_tab_timer = useRef();

    const handleChange = (e) => {
        setSelectedTab(e);
        sessionStorage.setItem('currentTab', e);
    };

    const triggerOldTab = id => {
        document.querySelectorAll('#trade_analysis li')?.[id]?.querySelector('a').click();
    };

    const tabs = [{ label: localize('Chart') }, { label: localize('Explanation') }];

    const bottom_tab_options = has_last_digit
        ? [...tabs, { label: localize('Last Digit Stats') }]
        : tabs;

    useEffect(() => {
        setFormName(dataManager.getContract('explanationFormName'));
    }, [has_contract_change, has_market_change]);

    useEffect(() => {
        setHasLastDigit(form_name === 'digits' || form_name === 'evenodd' || form_name === 'overunder');
    }, [form_name]);

    useEffect(() => {
        if (saved_tab !== null) {
            const tab_index = parseInt(saved_tab);
            if (tab_index === 2 && !has_last_digit) {
                setSelectedTab(1);
            } else {
                setSelectedTab(tab_index);
            }
        } else {
            setSelectedTab(1);
        }
    }, [has_last_digit]);

    useEffect(() => {
        const opposite_tab = (selected_tab + 1) > 2 ? 0 : (selected_tab + 1);
      
        triggerOldTab(opposite_tab);

        trigger_old_tab_timer.current = setTimeout(() => {
            triggerOldTab(selected_tab);
        }, 100);
    }, [selected_tab, saved_tab]);

    useEffect(() => () => {
        clearTimeout(trigger_old_tab_timer.current);
        WebtraderChart.cleanupChart();
        WebtraderChart.showChart();
    },[]);

    return (
        <>
            <div className='quill-container-centered'>
                <SegmentedControlSingleChoice
                    options={bottom_tab_options}
                    selectedItemIndex={selected_tab}
                    onChange={handleChange}
                />
            </div>
            <div className='bottom-content-section'>
                {selected_tab === 0 && <Graph
                    onUnload={() => setIsShowGraph(false)}
                    onLoad={() => setIsShowGraph(true)}
                />}
                {selected_tab === 1 && <Explanation />}
                {selected_tab === 2 && has_last_digit && <LastDigit />}
       
                <div id='tab_graph' className={`chart-section ${is_show_graph ? '' : 'grap-hide'}`}>
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
