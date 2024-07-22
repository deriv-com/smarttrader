import React from 'react';
import parse from 'html-react-parser';
import { Select } from '../../_common/components/elements.jsx';
import { localize } from '../../../javascript/_common/localize.js';

const LastDigit = () => (
    <div className='gr-parent'>
        <div id='last_digit_histo_form' className='gr-8 gr-12-m gr-centered'>
            <div className='smallfont gr-row'>
                <div className='gr-7 gr-12-m'>
                    <label htmlFor='digit_underlying'>{('Select market:')}</label>
                    <select className='smallfont' id='digit_underlying' />
                </div>
                <div className='gr-5 gr-12-m'>
                    <label htmlFor='tick_count'>{('Number of ticks:')}</label>
                    <Select
                        className='smallfont'
                        id='tick_count'
                        options={[
                            { text: '25',   value: '25' },
                            { text: '50',   value: '50' },
                            { text: '100',  value: '100', selected: true },
                            { text: '500',  value: '500' },
                            { text: '1000', value: '1000' },
                        ]}
                    />
                </div>
            </div>
        </div>
        <div id='last_digit_histo' className='gr-8 gr-12-m gr-centered' />
        <div id='last_digit_title' className='gr-hide'>
            <span id='digit_domain' />
            - {parse(localize('Last digit stats for the latest [_1] ticks on [_2]', ['<span id="digit_info_count">100</span>', '<span id="digit_info_underlying" />']))}
        </div>
    </div>
);

export default LastDigit;
