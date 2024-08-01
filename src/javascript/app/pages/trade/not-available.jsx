import React from 'react';
import ReactDOM from 'react-dom';
import { Text, Button } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';
import contractManager from '../../common/contract_manager.js';

const NotAvailable = ({ title, body }) => (
    <div className='not-available-container'>
        <section className='not-available-section'>
            <Text size='xl' bold centered>
                {title}
            </Text>
            <Text size='lg' centered>
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
            >
                {localize('Switch to another account')}
            </Button>
        </section>
    </div>
);

export const init = ({ ...props }) => {
    contractManager.set({
        isPageLoading: false,
    });
    ReactDOM.render(<NotAvailable {...props} />, getElementById('content'));
};

export default init;
