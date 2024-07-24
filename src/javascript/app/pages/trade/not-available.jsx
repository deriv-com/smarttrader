import React from 'react';
import ReactDOM from 'react-dom';
import { Text, Button } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';

const NotAvailable = () => (
    <div className='not-available-container'>
        <section className='not-available-section'>
            <Text size='xl' bold centered>
                {localize('SmartTrader is unavailable for this account')}
            </Text>
            <Text size='lg' centered>
                {localize(
                    'Unfortunately, this trading platform is not available for EU Deriv account. Please switch to a non-EU account to continue trading.'
                )}
            </Text>
            <Button onClick={() => getElementById('acc_switcher').click()} size='lg'>Switch to another account</Button>
        </section>
    </div>
);

export const init = () => {
    ReactDOM.render(<NotAvailable />, getElementById('content'));
};

export default init;
