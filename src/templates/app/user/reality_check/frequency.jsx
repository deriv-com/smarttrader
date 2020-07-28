import React from 'react';
import Wrapper from './wrapper.jsx';

const Frequency = () => (
    <React.Fragment>
        <Wrapper>
            <div className = 'reality-check__label'>{it.L('Options trading can become a real addiction, as can any other activity pushed to its limits. To avoid the danger of such an addiction, we provide a reality-check that gives you a summary of your trades and accounts on a regular basis.')}</div>
            <div className = 'reality-check__label'>{it.L('Would you like to check your statement first? [_1]Check Statement[_2]', '<a href="javascript:;" id="statement" className = "reality-check__label reality-check__label-link">', '</a>')}</div>
        </Wrapper>
    </React.Fragment>
);

export default Frequency;
