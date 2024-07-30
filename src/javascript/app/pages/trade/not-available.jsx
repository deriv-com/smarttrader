import React from 'react';
import ReactDOM from 'react-dom';
import { Text, Button } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { localize } from '../../../_common/localize.js';

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
                onClick={() => {
                    document.querySelector('.header__acc-icon').click();
                    // eslint-disable-next-line no-console
                    console.log(document.querySelector('.header__acc-icon'));
                    // window.accSwitcher = getElementById('acc_switcher');
                    // console.log(window.)
                }}
                size='lg'
            >
                {localize('Switch to another account')}
            </Button>
        </section>
    </div>
);

export const init = ({ ...props }) => {
    ReactDOM.render(<NotAvailable {...props} />, getElementById('content'));
};

export default init;
