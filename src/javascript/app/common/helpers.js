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

const handleNumeric = (event, regexString) => {
    let inputValue = event.target.value;
    const regex = new RegExp(regexString) || /[^0-9.]/g;

    // Remove characters that do not match the regex
    inputValue = inputValue
        .split('')
        .filter((char, index, array) => {
            const tempValue = array.slice(0, index + 1).join('');
            return !regex.test(tempValue);
        })
        .join('');

    // Ensure only one sign character is allowed at the start
    if (inputValue.match(/[+-]/g) && inputValue.match(/[+-]/g).length > 1) {
        inputValue = inputValue.replace(/[+-]/g, '');
    }

    // Ensure only one decimal point is allowed
    const decimalCount = (inputValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
        inputValue = inputValue.replace(/\./g, (match, offset) =>
            offset === inputValue.indexOf('.') ? match : ''
        );
    }

    return inputValue;
};

export {
    parseData,
    triggerClick,
    TimeTooltipWrapper,
    handleNumeric,
};

