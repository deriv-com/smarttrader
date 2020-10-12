import React from 'react';
// import Wrapper from './wrapper.jsx';
import { Table } from '../../../_common/components/elements.jsx';

const RcRow = ({ string, id }) => (
    <div hide_asterisk = 'true'>
        <div className='reality-check__summary-info'><label>{string}</label></div>
        <div className='reality-check__summary-info-bold'><label id={id} /></div>
    </div>
);

// eslint-disable-next-line
const Summary = () => {
    return (
        <React.Fragment>
            <div id='reality_check_content' className='reality-check'>
                <form id='frm_reality_check'>
                    <div className = 'reality-check__header' id ='start_time' />
                    <hr className = 'reality-check__line' />
                    <div className = 'reality-check__summarysection-wrapper'>
                        <div className = 'reality-check__summary-wrapperleft'>
                            <div className='table-container'>
                                <Table
                                    className='table-vertical'
                                    data={{
                                        tbody: [
                                            [
                                                { header: it.L('Login ID') },
                                                { header: it.L('Currency') },
                                                { header: it.L('Turnover') },
                                                { header: it.L('Profit / Loss') },
                                                { header: it.L('Contracts bought') },
                                                { header: it.L('Contracts sold') },
                                                { header: it.L('Potential profit') },
                                            ],
                                            [
                                                { id: 'loginid' },
                                                { id: 'rc_currency' },
                                                { id: 'turnover' },
                                                { id: 'profit_loss' },
                                                { id: 'bought' },
                                                { id: 'sold' },
                                                { id: 'potential' },
                                            ],
                                        ],
                                    }}
                                />
                            </div>
                            <a className='btn btn--secondary reality-check__button reality-check__button-statement' id='statement' href='javascript:;'><span>{it.L('Go To Reports')}</span></a>
                        </div>
                        <div className='reality-check__summary-wrapperright'>
                            <RcRow string={it.L('Session duration:')} id='session_duration' />
                            <RcRow string={it.L('Login at:')} id='login_time' />
                            <RcRow string={it.L('Current time:')} id='current_time' />
        
                            <hr className = 'reality-check__line reality-check__line-wrapperright' />
                            <div className='reality-check__interval reality-check__interval-summary'>
                                <div htmlFor='num_reality_duration' className='reality-check__label reality-check__label-summary'>{it.L('Your preferred time interval between each report:')}</div>
                                <div>
                                    <input placeholder='Time interval' id='num_reality_duration' className = 'reality-check__interval-input' step='1' min='1' size='6' type='number' />
                                </div>
                             
                            </div>
                        </div>
                    </div>
                    <hr className = 'reality-check__line' />
                    <div className='center-text gr-padding-20 gr-child reality-check__button-wrapper'  id='reality_check_nav'>
                        <a className='btn btn--secondary reality-check__button reality-check__button-logout' id='logout' href='javascript:;'><span>{it.L('Log out')}</span></a>
                        <button className='btn btn--primary reality-check__button' type='submit'>{it.L('Continue trading')}</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Summary;
