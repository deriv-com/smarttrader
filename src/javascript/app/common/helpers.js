import React from 'react';
import { Tooltip } from '@deriv-com/quill-ui';
import parse from 'html-react-parser';
import { getLocalTime } from '../base/clock';

const parseData = (rawData) => !rawData ?  '' :  parse(rawData);
        
const triggerClick = (query) => document.querySelector(query)?.click();

const TimeTooltipWrapper = (element, time) => {
    const localTime = getLocalTime(`${time}` || '');
    return (
        <Tooltip
            as='div'
            tooltipContent={localTime}
            tooltipPosition='left'
            variant='base'
        >
            {element}
        </Tooltip>
    );
};

export {
    parseData,
    triggerClick,
    TimeTooltipWrapper,
};

