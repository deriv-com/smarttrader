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

    const barrierIcon = (
        <Tooltip
            tooltipContent={localize(
                'Add +/– to define a barrier offset. For example, +0.005 means a barrier that\'s 0.005 higher than the entry spot.'
            )}
        >
            <StandaloneCircleInfoRegularIcon iconSize='sm' />
        </Tooltip>
    );

    const {
        barrier_data,
        barrier_indicator,
        barrier_indicator_high,
        barrier_indicator_low,
    } = barrierData;

    const barrierRegex = '[+-]?(d+(.d*)?|.d+)';

    return (
        <>
            {['touchnotouch', 'higherlower'].includes(formName) && barrier_data?.show_barrier && (
                <div className='quill-form-row'>
                    <div className='form_field'>
                        <TextField
                            label={barrier_data.label}
                            value={barrier}
                            type={barrier_data?.isOffset ? 'text' : 'number'}
                            rightIcon={barrier_data?.isOffset ? barrierIcon : null}
                            onChange={(e) =>
                                handleAmountChange(
                                    e,
                                    'barrier',
                                    barrier_data?.isOffset ? barrierRegex : null
                                )
                            }
                            message={
                                barrier_indicator &&
                                localize(`Indicator barrier: ${barrier_indicator}`)
                            }
                        />
                    </div>
                </div>
            )}

            {['endsinout', 'staysinout'].includes(formName) && barrier_data?.show_barrier_highlow && (
                <div className='quill-form-row'>
                    <div className='form_field'>
                        <TextField
                            label={barrier_data.label_high}
                            value={barrier_high}
                            type={barrier_data?.isOffsetHightLow ? 'text' : 'number'}
                            rightIcon={barrier_data?.isOffsetHightLow ? barrierIcon : null}
                            onChange={(e) => handleAmountChange(
                                e, 'barrier_high', barrier_data?.isOffsetHightLow ? barrierRegex : null
                            )}
                            message={barrier_indicator_high && localize(`Indicator barrier: ${barrier_indicator_high}`)}
                        />
                    </div>
                    <div className='form_field'>
                        <TextField
                            label={barrier_data.label_low}
                            value={barrier_low}
                            type={barrier_data?.isOffsetHightLow ? 'text' : 'number'}
                            rightIcon={barrier_data?.isOffsetHightLow ? barrierIcon : null}
                            onChange={(e) => handleAmountChange(
                                e, 'barrier_low', barrier_data?.isOffsetHightLow ? barrierRegex : null
                            )}
                            message={barrier_indicator_low && localize(`Indicator barrier: ${barrier_indicator_low}`)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default BarrierFields;
