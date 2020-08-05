import React from 'react';

const Form = () => (
    <React.Fragment>
        <form id='frm_reality_check'>
            <hr className = 'reality-check__line reality-check__line-short' />
            <div className='reality-check__interval'>
                <div htmlFor='num_reality_duration' className='reality-check__label'>{it.L('Please specify your preferred interval reality check in minutes:')}</div>
                <div>
                    <input placeholder= 'Time interval' id='num_reality_duration' className = 'reality-check__interval-input' step='1' min='1' size='6' type='number' />
                </div>
            </div>
            <hr className = 'reality-check__line' />
            <div className='center-text gr-padding-20 gr-child reality-check__button-wrapper'  id='reality_check_nav'>
                <a className='btn btn--secondary reality-check__button reality-check__button-logout' id='logout' href='javascript:;'><span>{it.L('Log out')}</span></a>
                <button className='btn btn--primary reality-check__button' type='submit'>{it.L('Continue trading')}</button>
            </div>
        </form>
    </React.Fragment>
);

export default Form;
