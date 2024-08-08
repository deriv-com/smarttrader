import React, { useEffect, useState } from 'react';
import { CustomDropdown, DropdownItem, useDropdown } from '@deriv-com/quill-ui';
import moment from 'moment/moment';
import { useTimeChange } from '../../hooks/events';
import dataManager from '../../common/data_manager.js';
import { setDefaultParams, setMinMaxTime } from '../../common/helpers.js';

const TimeContent = ({ time, onUpdate, elementId }) => {
    const [startTimeData, setStartTimeData] = useState();
    const [expiryTimeData, setExpiryTimeData] = useState();
    const hasTimeChange = useTimeChange();
    const { close } = useDropdown();

    useEffect(() => {
        setStartTimeData(dataManager.getTrade('starttime_obj'));
        setExpiryTimeData(dataManager.getTrade('expirytime_obj'));
    }, [hasTimeChange]);

    const formatTime = (timeObj) => {
        const formattedHour = timeObj.hour.toString();
        const formattedMinute = timeObj.minute.toString().padStart(2, '0');
        return `${formattedHour}:${formattedMinute}`;
    };

    const generateTimeIntervalsFromCurrentGMT = () => {
        const timeIntervals = [];
        let startTime, endTime;

        if (elementId === 'time_start') {
            const minTime = startTimeData?.minTime;
            const maxTime = startTimeData?.maxTime;
            startTime = minTime && !isNaN(minTime.hour) && !isNaN(minTime.minute) ? formatTime(minTime) : '00:00';
            endTime = maxTime && !isNaN(maxTime.hour) && !isNaN(maxTime.minute) ? formatTime(maxTime) : '23:55';
        }
        if (elementId === 'expiry_time') {
            const minTime = expiryTimeData?.minTime;
            const maxTime = expiryTimeData?.maxTime;
            startTime = minTime && !isNaN(minTime.hour) && !isNaN(minTime.minute) ? formatTime(minTime) : '00:00';
            endTime = maxTime && !isNaN(maxTime.hour) && !isNaN(maxTime.minute) ? formatTime(maxTime) : '23:55';
        }
    
        const currentTime = moment.utc(startTime, 'HH:mm');
        const endMoment = moment.utc(endTime, 'HH:mm');
        
        currentTime.minute(Math.ceil(currentTime.minute() / 5) * 5);

        while (currentTime.isBefore(endMoment) || currentTime.isSame(endMoment)) {
            const formattedTime = currentTime.format('HH:mm');
            timeIntervals.push(formattedTime);
            currentTime.add(5, 'minutes');
        }
        return timeIntervals;
    };

    return (
        <div className='custom-dropdown-wrapper'>
            {generateTimeIntervalsFromCurrentGMT().map((item) => (
                <DropdownItem
                    key={item}
                    label={item}
                    selected={item === time}
                    onClick={() => {
                        onUpdate(elementId, item, 'change');
                        setDefaultParams(elementId, item);
                        close();
                    }}
                />
            ))}
        </div>
    );
};
export const TimePickerDropdown = ({
    time,
    onUpdate,
    elementId,
}) => {
    const handleOpen = (id) => {
        if (id === 'expiry_time') {
            setMinMaxTime(id, 1);
        } else {
            setMinMaxTime(id);
        }
    };

    return (
        <CustomDropdown
            label='GMT'
            value={time}
            onClickDropdown={() => handleOpen(elementId)}
            fullHeightOnOpen={false}
        >
            <TimeContent
                time={time}
                onUpdate={onUpdate}
                elementId={elementId}
            />
        </CustomDropdown>
    );
};
