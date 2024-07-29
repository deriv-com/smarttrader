import React, { useEffect, useState } from 'react';
import { BreakpointProvider, CustomDropdown, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';
import moment from 'moment/moment';
import { useTimeChange } from '../../hooks/events';
import tradeManager from "../../common/trade_manager.js";

const TimeContent = ({ time, onUpdate, elementId }) => {
    const [timeData, setTimeData] = useState();
    const hasTimeChange = useTimeChange();
    const { close } = useDropdown();

    useEffect(() => {
        setTimeData((oldData) => ({
            ...oldData,
            ...tradeManager.getAll(),
        }));

    }, [hasTimeChange]);

    useEffect(() => {
        onUpdate(elementId, '', 'click');
    },[])

    const formatTime = (timeObj) => {
        let formattedHour = timeObj.hour.toString();
        let formattedMinute = timeObj.minute.toString().padStart(2, '0');
        return `${formattedHour}:${formattedMinute}`;
    }


    const generateTimeIntervalsFromCurrentGMT = () => {
        let timeIntervals = [];
        let startTime, endTime;

        if(elementId === 'time_start') {
            let minTime = timeData?.starttime_obj?.minTime;
            let maxTime = timeData?.starttime_obj?.maxTime;
            startTime = minTime ? formatTime(minTime) : '00:00';
            endTime = maxTime ? formatTime(maxTime) : '23:55';
        }
        if(elementId === 'expiry_time') {
            let minTime = timeData?.endtime_obj?.minTime;
            let maxTime = timeData?.endtime_obj?.maxTime;
            startTime = minTime ? formatTime(minTime) : '00:00';
            endTime = maxTime ? formatTime(maxTime) : '23:55';
        }
    
        let currentTime = moment.utc(startTime, 'HH:mm');
        let endMoment = moment.utc(endTime, 'HH:mm');
        
        currentTime.minute(Math.ceil(currentTime.minute() / 5) * 5);

        while (currentTime.isBefore(endMoment) || currentTime.isSame(endMoment)) {
            let formattedTime = currentTime.format('HH:mm');
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
}) => (
    <BreakpointProvider>
        <CustomDropdown value={time}>
        <TimeContent
            time={time}
            onUpdate={onUpdate}
            elementId={elementId}
        />
        </CustomDropdown>
    </BreakpointProvider>
);
