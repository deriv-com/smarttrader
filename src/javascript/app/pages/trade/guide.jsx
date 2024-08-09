import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@deriv-com/quill-ui';
// eslint-disable-next-line import/no-unresolved
import { LabelPairedPresentationScreenMdBoldIcon } from '@deriv/quill-icons/LabelPaired';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';
import Guide from '../../common/guide.js';
import dataManager from '../../common/data_manager.js';

const GuideBtn = () => {
    useEffect(() => {
        // Walk-through Guide
        Guide.init({
            script: 'trading',
        });
    },[]);

    return (
        <Button
            size='lg'
            className='guide-btn'
            id='onboarding-btn'
            variant='secondary'
            color='black'
            label={localize('Guide')}
            icon={<LabelPairedPresentationScreenMdBoldIcon />}
            onClick={() => {
                dataManager.setPurchase({
                    error: null,
                });
            }}
        />
    );
};

export const init = () => {
    ReactDOM.render(
        <GuideBtn />,
        getElementById('onboarding-container')
    );
};

export default init;
