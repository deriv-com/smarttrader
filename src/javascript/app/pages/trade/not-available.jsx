import React from 'react';
import ReactDOM from 'react-dom';
import { Text, Button } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';

const NotAvailable = ({
    title = localize('SmartTrader is unavailable for this account'),
    body = localize('Unfortunately, this trading platform is not available for EU Deriv account. Please switch to a non-EU account to continue trading.'),
}) => (
    <div className='not-available-container'>
        <section className='not-available-section'>
            <Text size='xl' bold centered>
                {title}
            </Text>
            <Text size='lg' centered>
                {body}
            </Text>
            <Button onClick={() => getElementById('acc_switcher').click()} size='lg'>
                {localize('Switch to another account')}
            </Button>
        </section>
    </div>
);

export const init = ({ ...props }) => {
    document.body.appendChild(Object.assign(document.createElement('div'), { id: 'unavailable-content', className: 'quill-generic-popup' }));
    ReactDOM.render(<NotAvailable {...props} />, getElementById('content'));
};

export default init;
