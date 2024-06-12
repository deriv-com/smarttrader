import React from 'react';
import { Select } from '../../_common/components/elements.jsx';

const  { Button, Heading } = require('@deriv-com/quill-ui');

const LastDigit = () => (
    <div className='gr-parent'>
        <Button label='this is Quill Button' />
        <Heading.H1>QUILL H1</Heading.H1>
        <Heading.H2>QUILL H2</Heading.H2>
        <Heading.H3>QUILL H3</Heading.H3>
        <Heading.H4>QUILL H4</Heading.H4>
        <div id='last_digit_histo_form' className='gr-8 gr-12-m gr-centered'>
            <div className='smallfont gr-row'>
                <div className='gr-7 gr-12-m'>
                    <label htmlFor='digit_underlying'>{it.L('Select market:')}</label>
                    <select className='smallfont' id='digit_underlying' />
                </div>
                <div className='gr-5 gr-12-m'>
                    <label htmlFor='tick_count'>{it.L('Number of ticks:')}</label>
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
        <div id='last_digit_title' className='gr-hide'><span id='digit_domain' /> - {it.L('Last digit stats for the latest [_1] ticks on [_2]', '<span id="digit_info_count">100</span>', '<span id="digit_info_underlying" />')}</div>
    </div>
);

export default LastDigit;
