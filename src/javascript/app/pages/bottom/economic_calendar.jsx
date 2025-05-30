import React, { useEffect, useState } from 'react';
import BinarySocket from '../../base/socket';
import { localize } from '../../../_common/localize';

const EconomicCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCalendarData = () => {
            setIsLoading(true);
            BinarySocket.send({ 
                economic_calendar: 1
            }).then((response) => {
                console.log('Economic Calendar Response:', response);
                if (response.economic_calendar) {
                    setCalendarData(response.economic_calendar.events || []);
                }
                setIsLoading(false);
            }).catch((error) => {
                console.error('Error fetching economic calendar:', error);
                setIsLoading(false);
            });
        };

        fetchCalendarData();
        
        // Refresh data every 5 minutes
        const intervalId = setInterval(fetchCalendarData, 5 * 60 * 1000);
        
        return () => clearInterval(intervalId);
    }, []);

    const headers = [
        'Date',
        'Event',
        'Currency',
        'Forecast',
        'Impact'
    ];

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getImpactClass = (impact) => {
        if (!impact) return '';
        
        const impactValue = typeof impact === 'object' ? impact.display_value : impact;
        if (!impactValue || typeof impactValue !== 'string') return '';

        const impactClasses = {
            high: 'high-impact',
            medium: 'medium-impact',
            low: 'low-impact'
        };
        return impactClasses[impactValue.toLowerCase()] || '';
    };

    const getDisplayValue = (field) => {
        if (!field) return '-';
        if (typeof field === 'object' && 'display_value' in field) {
            return field.display_value;
        }
        return field.toString();
    };

    return (
        <div className="economic-calendar">
            {isLoading ? (
                <div className="loading">{localize('Loading economic calendar data...')}</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{localize(header)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {calendarData.map((event, index) => (
                            <tr key={index}>
                                <td>{formatDate(event.release_date)}</td>
                                <td>{event.event_name}</td>
                                <td>{event.currency}</td>
                                <td>{getDisplayValue(event.forecast)}</td>
                                <td className={getImpactClass(event.impact)}>{getDisplayValue(event.impact)}</td>
                            </tr>
                        ))}
                        {calendarData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="no-data">
                                    {localize('No economic calendar events available')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EconomicCalendar;
