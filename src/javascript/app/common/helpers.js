import React from 'react';
import { Tooltip } from '@deriv-com/quill-ui';
import parse from 'html-react-parser';
import moment from 'moment';
// import tradeManager from './trade_manager';
import dataManager from './data_manager';
import { getLocalTime } from '../base/clock';
import common_independent from '../pages/trade/common_independent';

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

const setMinMaxTime = (selector, check_end_time) => {
    const $date_start        = $('#date_start');
    const $time_start        = $('#time_start');
    let min_time, max_time;

    if ($date_start && $date_start.val()) {
        const date_start_val    = $date_start.val();
        const moment_date_start = moment.unix(date_start_val).utc();
        const moment_now        = (window.time || moment.utc()).clone();

        if (check_end_time) {
            const min_max_time = common_independent.getMinMaxTimeEnd($date_start, $time_start, moment_now);

            min_time = min_max_time.minTime;
            max_time = min_max_time.maxTime;
        } else if (moment_date_start.isSame(moment_now, 'day')) {
            min_time = moment_now.clone();
        }
    }
    const init_obj = { selector };
    if (min_time) {
        init_obj.minTime = min_time.clone();
    }
    if (max_time) {
        init_obj.maxTime = max_time.clone();
    }

    setMinMaxTimeObj(init_obj);
};

const setMinMaxTimeObj = (options) => {
    const time_now = moment.utc(window.time).clone();
    const starttime_obj = {};
    const expirytime_obj = {};
    const obj_config = {};

    if (options.minTime) {
        options.minTime = options.minTime === 'now' ? time_now : moment.utc(options.minTime);
        if (options.minTime.isBefore(time_now) &&
            (!options.maxTime || time_now.unix() !== options.maxTime.unix())) {
            options.minTime = time_now;
        }
        if (options.useLocalTime) options.minTime = options.minTime.local();

        if (options.minTime.minutes() > 55) {
            options.minTime.minutes(60);
        }
        obj_config.minTime = { hour: parseInt(options.minTime.hour()), minute: parseInt(options.minTime.minute()) };
        if (options.selector === 'time_start') {
            starttime_obj.minTime = obj_config.minTime;
        }
        if (options.selector === 'expiry_time') {
            expirytime_obj.minTime = obj_config.minTime;
        }
    }

    if (options.maxTime) {
        options.maxTime = moment.utc(options.maxTime);
        let minute      = parseInt(options.maxTime.minute());
        let hour        = parseInt(options.maxTime.hour());

        if (!(hour === 0 && minute === 0) && !(hour === 23 && minute === 55)) {
            hour   = minute < 5 ? hour - 1 : hour;
            minute = minute < 5 ? 55 : Math.ceil((minute - 5) / 5) * 5;
        }

        obj_config.maxTime = { hour, minute };
        if (options.selector === '#time_start') {
            starttime_obj.maxTime = obj_config.maxTime;
        }
        if (options.selector === '#expiry_time') {
            expirytime_obj.maxTime = obj_config.maxTime;
        }
    }

    dataManager.set({
        starttime_obj,
        expirytime_obj,
    }, 'trade', 'time');
};

export {
    parseData,
    triggerClick,
    TimeTooltipWrapper,
    setMinMaxTime,
};

