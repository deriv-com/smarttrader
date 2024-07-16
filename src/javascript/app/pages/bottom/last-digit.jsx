import React from 'react';
import { Select } from '../../../../templates/_common/components/elements.jsx';

const LastDigit = () => (
    <div className='gr-parent'>
        <div id='last_digit_histo_form' className='gr-8 gr-12-m gr-centered'>
            <div className='smallfont gr-row'>
                <div className='gr-7 gr-12-m'>
                    <label htmlFor='digit_underlying'>{('Select market:')}</label>
                    <Select
                        className='smallfont'
                        id='digit_underlying'
                        options={[
                            { text: 'Bear Market Index',   value: 'RDBEAR' },
                            { text: 'Bull Market Index',   value: 'RDBULL' },
                            { text: 'Jump 10 Index',  value: 'JD10', selected: true },
                            { text: 'Jump 25 Index',  value: 'JD25' },
                            { text: 'Jump 50 Index', value: 'JD50' },
                            { text: 'Jump 75 Index', value: 'JD75' },
                            { text: 'Jump 100 Index',   value: 'JD100' },
                            { text: 'Volatility 10 (1s) Index',   value: '1HZ10V' },
                            { text: 'Volatility 10 Index',  value: 'R_10' },
                            { text: 'Volatility 25 (1s) Index',  value: '1HZ25V' },
                            { text: 'Volatility 25 Index', value: 'R_25' },
                            { text: 'Volatility 50 (1s) Index',   value: '1HZ50V' },
                            { text: 'Volatility 50 Index',  value: 'R_50' },
                            { text: 'Volatility 75 (1s) Index',  value: '1HZ75V' },
                            { text: 'Volatility 75 Index', value: 'R_75' },
                            { text: 'Volatility 100 (1s) Index',   value: '1HZ100V' },
                            { text: 'Volatility 100 Index',  value: 'R_100' },
                        ]}
    
                    />
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
        <div id='last_digit_title' className='gr-hide'><span id='digit_domain' /> - {('Last digit stats for the latest [_1] ticks on [_2]', '<span id="digit_info_count">100</span>', '<span id="digit_info_underlying" />')}</div>
    </div>
);

export default LastDigit;
