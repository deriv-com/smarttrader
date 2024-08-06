import React from 'react';
import ReactDOM from 'react-dom';
import { Text, Button } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';
import dataManager from '../../common/data_manager.js';

const NotAvailable = ({ title, body }) => (
    <div className='not-available-container'>
        <section className='not-available-section'>
            <Text size='xl' bold centered color='not-available-section-text'>
                {title}
            </Text>
            <Text size='lg' centered color='not-available-section-text'>
                {body}
            </Text>
            <Button
                onClick={(e) => {
                    setTimeout(() => {
                        document.getElementById('acc_switcher').click();
                    }, 10);
                    e.preventDefault();
                }}
                size='lg'
                label={localize('Switch to another account')}
            />
        </section>
    </div>
);

export const init = ({ ...props }) => {
    dataManager.set({
        hidePageLoader: true,
    }, 'contract');
    ReactDOM.render(<NotAvailable {...props} />, getElementById('content'));
};

export default init;
