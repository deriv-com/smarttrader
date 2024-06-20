import React from 'react';
import Explanation from './explanation.jsx';
import LastDigit from './last_digit.jsx';
import { TabContainer, TabsSubtabs, TabContentContainer, TabContent } from '../../_common/components/tabs.jsx';

const ArrowsMobile = ({ direction, parent }) => (
    <div className='align-self-center gr-2 gr-hide gr-show-m gr-no-gutter'>
        <img
            className={`go-${direction} gr-5 gr-no-gutter gr-centered`}
            data-parent={parent}
            src={it.url_for(`images/pages/home/arrow_${direction}.svg`)}
        />
    </div>
);

const Analysis = ({ no_graph }) => (
    <div id='trading_bottom_content'>
        <div id='trading_bottom_content_tabs' />
    </div>
);

export default Analysis;
