import React from 'react';
import parse from 'html-react-parser';
import { contractExplanationData } from './data/explanation.js';
import Language from '../../../_common/language';
import Url from '../../../_common/url';
import { localize } from '../../../_common/localize.js';

export const Explanation = ({ formName }) => {
    const language = Language.get();
   
    const image_path = Url.urlForStatic(
        `images/pages/trade-explanation/${language}/`
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

    if (formName){
        return (
            <div className='tab-explanation'>
                {/* ========== Winning ========== */}
                <div id='explanation_winning'>
                    <div id={`winning_${formName}`}>
                        <h3>{localize('Winning the contract')}</h3>
                        {contractExplanationData.winning[formName].content.map(
                            (data, idx) => (
                                <p key={idx}>{parse(data)}</p>
                            )
                        )}
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
                            <div className='gr-4 gr-12-m padding-left'>
                                <img
                                    id='explanation_image_2'
                                    className='responsive'
                                    src={`${image_path}${images[formName].image2}?${process.env.BUILD_HASH}`}
                                />
                            </div>
                            <div className='gr-2 hide-mobile' />
                        </div>
                    </div>
                )}

                {/* ========== Explain ========== */}
                <div id='explanation_explain' className='gr-child'>
                    <div id={`explain_${formName}`}>
                        <h3>{contractExplanationData.explain[formName].title}</h3>
                        {contractExplanationData.explain[formName].content.map(
                            (data, idx) => (
                                <p key={idx}>{parse(data)}</p>
                            )
                        )}
                        {contractExplanationData.explain[formName].title_secondary && (
                            <h3 className='secondary-title'>
                                {contractExplanationData.explain[formName].title_secondary}
                            </h3>
                        )}
                        {contractExplanationData.explain[formName].content_secondary &&
            contractExplanationData.explain[formName].content_secondary.map(
                (data, idx) => <p key={idx}>{parse(data)}</p>
            )}
                    </div>
                </div>

                {/* ========== Note ========== */}
                {contractExplanationData.note[formName] && (
                    <p className='hint'>
                        <strong>{localize('Note')}: </strong>
                        {contractExplanationData.note[formName].content.map((data, idx) => (
                            <span key={idx}>{parse(data)}</span>
                        ))}
                    </p>
                )}
            </div>
        );
    }

    return <></>;
};
