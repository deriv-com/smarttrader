import React, { useState, useEffect } from 'react';
import {
    TextField,
    Tooltip,
} from '@deriv-com/quill-ui';
// eslint-disable-next-line import/no-unresolved
import { StandaloneCircleInfoRegularIcon } from '@deriv/quill-icons/Standalone';
import { useBarrierChange } from '../../hooks/events.js';
import tradeManager from '../../common/trade_manager.js';
import { localize } from '../../../_common/localize.js';
import Defaults, { PARAM_NAMES } from '../trade/defaults.js';

const BarrierFields = ({ formName, handleAmountChange }) => {
    const [barrierData, setBarrierData] = useState();
    const hasBarrierChange = useBarrierChange();

    const barrier = Defaults.get(PARAM_NAMES.BARRIER);
    const barrier_high = Defaults.get(PARAM_NAMES.BARRIER_HIGH);
    const barrier_low = Defaults.get(PARAM_NAMES.BARRIER_LOW);

    useEffect(() => {
        setBarrierData((oldData) => ({
            ...oldData,
            ...tradeManager.getAll(),
        }));
    }, [hasBarrierChange]);

    if (!barrierData) return null;

    const TooltipWrapper = (tooltipContent, description) => (
        <Tooltip
            tooltipContent={
                <span className='barrier-tooltip'>{tooltipContent}</span>
            }
        >
            {description}
        </Tooltip>
    );

    const barrierIcon = TooltipWrapper(
        localize(
            'Add +/– to define a barrier offset. For example, +0.005 means a barrier that\'s 0.005 higher than the entry spot.'
        ),
        <StandaloneCircleInfoRegularIcon iconSize='sm' />
    );

    const {
        barrier_data,
        barrier_indicator,
        barrier_indicator_high,
        barrier_indicator_low,
        barrier_error,
    } = barrierData;

    const barrierRegex = '[+-]?(d+(.d*)?|.d+)';

    const getMessage = (indicative, type) => {
        const tooltipContent = localize('This is an indicative barrier. Actual barrier will be the entry spot plus the barrier offset.');
        let description;
        if (type === 'high' && barrier_error) {
            return localize('High barrier must be higher than low barrier');
        } else if (indicative) {
            description =
                <span className='barrier-indicator'>
                    {`${localize('Indicative barrier')} : ${indicative}`}
                </span>;
        }
        return TooltipWrapper(tooltipContent, description);
    };

    return (
        <>
            {['touchnotouch', 'higherlower'].includes(formName) &&
            barrier_data?.show_barrier &&
            barrier && (
                <div className='quill-form-row'>
                    <div className={`form_field ${!barrier_data?.isOffset ? 'row-pb' : ''}`}>
                        <TextField
                            label={barrier_data.label}
                            value={barrier}
                            type={barrier_data?.isOffset ? 'text' : 'number'}
                            allowDecimals
                            rightIcon={barrier_data?.isOffset && barrierIcon}
                            onChange={(e) =>
                                handleAmountChange(
                                    e,
                                    'barrier',
                                    barrier_data?.isOffset ? barrierRegex : null
                                )
                            }
                            status={barrier_error ? 'error' : 'neutral'}
                            message={getMessage(barrier_indicator)}
                        />
                    </div>
                </div>
            )}

            {['endsinout', 'staysinout'].includes(formName) &&
            barrier_data?.show_barrier_highlow &&
            barrier_high && barrier_low && (
                <div className='quill-form-row'>
                    <div className={`form_field ${!barrier_data?.isOffsetHightLow ? 'row-pb' : ''}`}>
                        <TextField
                            label={barrier_data.label_high}
                            value={barrier_high}
                            type={barrier_data?.isOffsetHightLow ? 'text' : 'number'}
                            allowDecimals
                            rightIcon={barrier_data?.isOffsetHightLow && barrierIcon}
                            onChange={(e) => handleAmountChange(
                                e, 'barrier_high', barrier_data?.isOffsetHightLow ? barrierRegex : null
                            )}
                            status={barrier_error ? 'error' : 'neutral'}
                            message={getMessage(barrier_indicator_high, 'high')}
                        />
                    </div>
                    <div className={`form_field ${!barrier_data?.isOffsetHightLow ? 'row-pb' : ''}`}>
                        <TextField
                            label={barrier_data.label_low}
                            value={barrier_low}
                            type={barrier_data?.isOffsetHightLow ? 'text' : 'number'}
                            allowDecimals
                            rightIcon={barrier_data?.isOffsetHightLow && barrierIcon}
                            onChange={(e) => handleAmountChange(
                                e, 'barrier_low', barrier_data?.isOffsetHightLow ? barrierRegex : null
                            )}
                            message={getMessage(barrier_indicator_low)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default BarrierFields;
