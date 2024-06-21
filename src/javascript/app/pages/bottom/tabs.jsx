/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { contractExplanationData } from './explanation_data';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import Defaults from '../trade/defaults';

const Explanation = () => {
    const { FORM_NAME } = Defaults.PARAM_NAMES;
    let form_name;
    form_name = Defaults.get(FORM_NAME) || 'risefall';

    const map_obj = { matchdiff: 'digits', callputequal: 'risefall', callput: 'higherlower' };
    form_name     = map_obj[form_name] || form_name;

    return (
        <div className='tab-explanation'>
            {/* ========== Winning ========== */}
          
            <div id='explanation_winning'>
                {Object.keys(contractExplanationData.winning).map((key) => (
                    <div key={key} id={`winning_${key}`} className={form_name !== key && 'invisible'}>
                        <h3>{contractExplanationData.winning[key].title}</h3>
                        {contractExplanationData.winning[key].content.map((data, idx) => (
                            <p key={idx}>{data}</p>
                        ))}
                    </div>
                ))}
            </div>
    
            {/* ========== Image ========== */}
            <div id='explanation_image' className='invisible'>
                <div className='gr-row'>
                    <div className='gr-2 hide-mobile' />
                    <div className='gr-4 gr-12-m padding-right' style={{ margin: 'auto' }}>
                        <img id='explanation_image_1' className='responsive' />
                    </div>
                    <div className='gr-4 gr-12-m padding-left'>
                        <img id='explanation_image_2' className='responsive' />
                    </div>
                    <div className='gr-2 hide-mobile' />
                </div>
            </div>
    
            <div className='explanation_image'>
                <div className='gr-row'>
                    <div className='gr-2 hide-mobile' />
                    <div className='gr-4 gr-12-m padding-right' style={{ margin: 'auto' }}>
                        <img id='explanation_image_1' className='responsive' src='/images/pages/trade-explanation/en/rises.svg?3e9b01f8f3365272abe03784db97d968' />
                    </div>
                    <div className='gr-4 gr-12-m padding-left'>
                        <img id='explanation_image_2' className='responsive' src='/images/pages/trade-explanation/en/falls.svg?3e9b01f8f3365272abe03784db97d968' />
                    </div>
                    <div className='gr-2 hide-mobile' />
                </div>
            </div>
    
            {/* ========== Explain ========== */}
            <div id='explanation_explain' className='gr-child'>
                {Object.keys(contractExplanationData.explain).map((key) => (
                    <div key={key} id={`explain_${key}`} className={form_name !== key && 'invisible'}>
                        <h3>{contractExplanationData.explain[key].title}</h3>
                        {contractExplanationData.explain[key].content.map((data, idx) => (
                            <p key={idx}>{data}</p>
                        ))}
                        {contractExplanationData.explain[key].title_secondary &&
                            <h3>{contractExplanationData.explain[key].title_secondary}</h3>}
                        {contractExplanationData.explain[key].content_secondary &&
                            contractExplanationData.explain[key].content_secondary.map((data, idx) => (
                                <p key={idx}>{data}</p>
                            ))}
                        
                    </div>
                ))}
            </div>
          
            {/* ========== Note ========== */}
            
            {Object.keys(contractExplanationData.note).map((key) => (
                <div key={key} id='explanation_note' className={form_name !== key && 'invisible gr-padding-20 gr-child' }>
                    <p className='hint'><strong>Note: </strong>{contractExplanationData.note[key].content}</p>
                   
                </div>
            ))}
           
        </div>
      
    );
};

const Graph = () => (
    <div id='tab_graph'>
        <p className='error-msg' id='chart-error' />
        <div id='trade_live_chart'>
            <div id='webtrader_chart' />
        </div>
    </div>
);

const BottomTabs = () => {
    const [selectedTab,setSelectedTab] = useState(1);

    useEffect(() => {
        if (selectedTab === 0){
            WebtraderChart.showChart();
        } else {
            WebtraderChart.cleanupChart();
        }
    },[selectedTab]);
    return (
        <>
            <div className='quill-container-centered'>
                <SegmentedControlSingleChoice
                    options={[
                        { label: 'Chart' },
                        { label: 'Explanation' },
                    ]}
                    selectedItemIndex={selectedTab}
                    onChange={e => setSelectedTab(e)}
                />
            </div>

            {selectedTab === 0 && (
                <Graph />
            )}

            {selectedTab === 1 && (
                <div className='explanation-container'>
                    <Explanation />
                </div>
            )}
        </>);
   
};

export const init = () => {
    ReactDOM.render(
        <BottomTabs />,
        getElementById('trading_bottom_content_tabs')
    );
};

export default init;
