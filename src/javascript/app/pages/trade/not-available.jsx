import React from 'react';
import ReactDOM from 'react-dom';
import { Text } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';

const NotAvailable = () => (
    <div className='container'>
        <section className='not-available-wrapper'>
            <Text size='xl' bold centered className='text-width'>
                {localize('SmartTrader is unavailable for this account')}
            </Text>
            <Text size='lg' centered className='text-width'>
                {localize(
                    'Unfortunately, this trading platform is not available for EU Deriv account. Please switch to a non-EU account to continue trading.'
                )}
            </Text>
        </section>
    </div>
);

export const init = () => {
    ReactDOM.render(<NotAvailable />, getElementById('content'));
};

export default init;
