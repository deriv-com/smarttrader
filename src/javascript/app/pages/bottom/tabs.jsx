/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import  parse  from 'html-react-parser';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { contractExplanationData } from './explanation_data.js';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useContractChange } from '../../hooks/events';
import Defaults, { PARAM_NAMES } from '../trade/defaults';
import Language from '../../../_common/language';
import Url from '../../../_common/url';
import { localize } from '../../../_common/localize.js';

const Explanation = () => {
    const language = Language.get();
    let form_name;
    form_name = Defaults.get(PARAM_NAMES.FORM_NAME) || 'risefall';
    const map_obj = { matchdiff: 'digits', callputequal: 'risefall', callput: 'higherlower' };
    form_name = map_obj[form_name] || form_name;

    const image_path = Url.urlForStatic(`images/pages/trade-explanation/${language}/`);
   
    const images = {
        risefall: {
            image1: 'rises.svg',
            image2: 'falls.svg',
        },
        higherlower: {
            image1: 'higher.svg',
            image2: 'lower.svg',
        },
        touchnotouch: {
            image1: 'touch.svg',
            image2: 'no-touch.svg',
        },
        endsinout: {
            image1: 'ends-between.svg',
            image2: 'ends-outside.svg',
        },
        staysinout: {
            image1: 'stays-between.svg',
            image2: 'goes-outside.svg',
        },
        digits: {
            image1: 'matches.svg',
            image2: 'differs.svg',
        },
        evenodd: {
            image1: 'even.svg',
            image2: 'odd.svg',
        },
        overunder: {
            image1: 'over.svg',
            image2: 'under.svg',
        },
        lookbackhigh: {
            image1: 'high-close.svg',
        },
        lookbacklow: {
            image1: 'close-low.svg',
        },
        lookbackhighlow: {
            image1: 'high-low.svg',
        },
        reset: {
            image1: 'reset-call.svg',
            image2: 'reset-put.svg',
        },
        highlowticks: {
            image1: 'high-tick.svg',
            image2: 'low-tick.svg',
        },
        runs: {
            image1: 'only-ups.svg',
            image2: 'only-downs.svg',
        },
    };
    
    return (
        <div className='tab-explanation'>
            {/* ========== Winning ========== */}
            <div id='explanation_winning'>
                <div id={`winning_${form_name}`}>
                    <h3>{localize('Winning the contract')}</h3>
                    {contractExplanationData.winning[form_name].content.map((data, idx) => (
                        <p key={idx}>{parse(data)}</p>
                    ))}
                    
                </div>
           
            </div>
    
            {/* ========== Image ========== */}
            {images[form_name] && (
                <div id='explanation_image'  >
                    <div className='gr-row'>
                        <div className='gr-2 hide-mobile' />
                        <div className='gr-4 gr-12-m padding-right' style={{ margin: 'auto' }}>
                            <img id='explanation_image_1' className='responsive' src={`${image_path}${images[form_name].image1}?${process.env.BUILD_HASH}`} />
                        </div>
                        <div className='gr-4 gr-12-m padding-left'>
                            <img id='explanation_image_2' className='responsive' src={`${image_path}${images[form_name].image2}?${process.env.BUILD_HASH}`}  />
                        </div>
                        <div className='gr-2 hide-mobile' />
                    </div>
                </div>
            )}
    
            {/* ========== Explain ========== */}
            <div id='explanation_explain' className='gr-child'>
                
                <div id={`explain_${form_name}`}>
                    <h3>{(contractExplanationData.explain[form_name].title)}</h3>
                    {contractExplanationData.explain[form_name].content.map((data, idx) => (
                        <p key={idx}>{parse(data)}</p>
                    ))}
                    {contractExplanationData.explain[form_name].title_secondary &&
                    <h3 className='secondary-title'>{(contractExplanationData.explain[form_name].title_secondary)}</h3>}
                    {contractExplanationData.explain[form_name].content_secondary &&
                            contractExplanationData.explain[form_name].content_secondary.map((data, idx) => (
                                <p key={idx}>{parse(data)}</p>
                            ))}
                        
                </div>
              
            </div>
          
            {/* ========== Note ========== */}
            {contractExplanationData.note[form_name] && (
                <p className='hint'><strong>{localize('Note')}: </strong>{contractExplanationData.note[form_name].content.map((data, idx) => (
                    <span key={idx}>{parse((data))}</span>
                ))}
            
                </p>
            )}
           
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
    const hasContractChange = useContractChange();

    useEffect(() => {
       
    }, [hasContractChange]);
  
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
