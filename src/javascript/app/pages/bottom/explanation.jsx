import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { SectionMessage, Skeleton, Text } from '@deriv-com/quill-ui';
import { contractExplanationData } from './data/explanation.js';
import Language from '../../../_common/language';
import Url from '../../../_common/url';
import { localize } from '../../../_common/localize.js';
import contractManager from '../../common/contract_manager.js';
import { useContractChange } from '../../hooks/events.js';

export const Explanation = ({ explanationOnly = false }) => {

    const [formName,setFormName] = useState(null);

    const hasContractChanges = useContractChange();

    useEffect(() => {
        const actualFormName = contractManager.get('explanationFormName');
        setFormName(null);
        
        setTimeout(() => {
            setFormName(actualFormName);
        }, 500);
       
    },[hasContractChanges]);

    const language = Language.get();
    const image_path = Url.urlForStatic(
        `images/pages/trade-explanation/${language}/`
    );
    const Notes = () => (
        <>
            <strong>{localize('Note')}: </strong>
            {contractExplanationData.note[formName].content.map((data, idx) => (
                <span key={idx}>{parse(data)}</span>
            ))}
        </>
    );

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

    if (formName) {
        return (
            <div className='tab-explanation'>
                {/* ========== Winning ========== */}
                {!explanationOnly && (
                    <>
                        <div id='explanation_winning'>
                            <div id={`winning_${formName}`}>
                                <div className='explanation-heading'>
                                    <Text size='lg' bold >{localize('Winning the contract')}</Text>
                                </div>
                                <div className='explanation-content'>
                                    {contractExplanationData.winning[formName].content.map(
                                        (data, idx) => (
                                            <Text size='md' key={idx}>{parse(data)}</Text>
                                        )
                                    )}
                                </div>
                                
                            </div>
                        </div>
                          
                        {/* ========== Image ========== */}
                        {images[formName] && (
                            <div id='explanation_image'>
                                <div className='gr-row'>
                                    <div className='gr-2 hide-mobile' />
                                    <div
                                        className='gr-4 gr-12-m padding-right'
                                        style={{ margin: 'auto' }}
                                    >
                                        <img
                                            id='explanation_image_1'
                                            className='responsive'
                                            src={`${image_path}${images[formName].image1}?${process.env.BUILD_HASH}`}
                                        />
                                    </div>
                                    {images[formName].image2 && (
                                        <div className='gr-4 gr-12-m padding-left'>
                                            <img
                                                id='explanation_image_2'
                                                className='responsive'
                                                src={`${image_path}${images[formName].image2}?${process.env.BUILD_HASH}`}
                                            />
                                        </div>
                                    )}
                                   
                                    <div className='gr-2 hide-mobile' />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ========== Explain ========== */}
                <div id='explanation_explain' className='gr-child'>
                    <div id={`explain_${formName}`}  >
                        <div className='explanation-heading'>
                            <Text size='lg' bold >{contractExplanationData.explain[formName].title}</Text>
                        </div>
                        <div className='explanation-content'>
                            {contractExplanationData.explain[formName].content.map(
                                (data, idx) => (
                                    <Text size='md' key={idx}>{parse(data)}</Text>
                                )
                            )}
                        </div>
                        
                        {contractExplanationData.explain[formName].title_secondary && (
                            <div className='explanation-heading secondary-heading'>
                                <Text size='lg' bold>
                                    {contractExplanationData.explain[formName].title_secondary}
                                </Text>
                            </div>
                        )}
                        
                        {contractExplanationData.explain[formName].content_secondary && (
                            <div className='explanation-content'>
                                {contractExplanationData.explain[formName].content_secondary.map(
                                    (data, idx) => (
                                        <Text size='md' key={idx}>{parse(data)}</Text>
                                    )
                                )}
                            </div>
                        )}
                       
                    </div>
                </div>

                {/* ========== Note ========== */}
                {!explanationOnly && (
                    contractExplanationData.note[formName] && (
                        <SectionMessage status='info' message={<Notes />} size='sm' />
                    )
                )}
            </div>
        );
    }
    
    if (explanationOnly){
        return (
            <div className='explanation-container-loader'>
                <Skeleton.Square width={250} height={50} rounded />
                <Skeleton.Square fullWidth height={30} rounded />
                <Skeleton.Square fullWidth height={30} rounded />
                <Skeleton.Square fullWidth height={30} rounded />
            </div>);
    }
    
    return (
        <div className='explanation-container-loader'>
            <Skeleton.Square width={250} height={50} rounded />
            <Skeleton.Square fullWidth height={30} rounded />
            <Skeleton.Square fullWidth height={30} rounded />
            <Skeleton.Square fullWidth height={30} rounded />
            <div className='section-loaders'>
                <Skeleton.Square width={300} height={195} rounded />
                <Skeleton.Square width={300} height={195} rounded />
            </div>
            <Skeleton.Square width={250} height={50} rounded />
            <Skeleton.Square fullWidth height={30} rounded />
            <Skeleton.Square fullWidth height={30} rounded />
            <Skeleton.Square fullWidth height={30} rounded />
            <Skeleton.Square fullWidth height={120} rounded />
        </div>
    );
    
};
