import React from 'react';
import Form from './form.jsx';

const Wrapper = ({ children }) => (
    <React.Fragment>
        <div id='reality_check_content' className='reality-check'>
            <div className = 'reality-check__header'>{it.L('Trading statictics report')}</div>
            <hr className = 'reality-check__line' />
            {children}
            <Form />
        </div>
    </React.Fragment>
);

export default Wrapper;
