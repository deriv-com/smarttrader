import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputDropdown,
    TextFieldAddon,
    DatePickerDropdown,
    Checkbox,
    SectionMessage,
} from '@deriv-com/quill-ui';
import moment from 'moment';
import { CurrencyDropdown } from './currency-dropdown.jsx';
import { NumbersDropdown } from './numbers-dropdown.jsx';
import BarrierFields from './barrier-fields.jsx';
import { TimePickerDropdown } from './time-selection.jsx';
import Defaults, { PARAM_NAMES } from '../trade/defaults.js';
import {
    useSessionChange,
    useTradeChange,
    eventDispatcher,
} from '../../hooks/events.js';
import common_functions from '../../../_common/common_functions.js';
import { localize } from '../../../_common/localize.js';
import tradeManager from '../../common/trade_manager.js';
// import { handleNumeric } from '../../common/helpers.js';

export const FormComponent = () => {
    const [tradeData, setTradeData] = useState({});

    const hasTradeChange = useTradeChange();
    const hasSessionChange = useSessionChange();

    useEffect(() => {
        setTradeData((oldData) => ({
            ...oldData,
            ...tradeManager.getAll(),
        }));
    }, [hasTradeChange, hasSessionChange]);

    const formName = Defaults.get(PARAM_NAMES.FORM_NAME);
    const expiryType = Defaults.get(PARAM_NAMES.EXPIRY_TYPE);
    const date_start = Defaults.get(PARAM_NAMES.DATE_START);
    const time_start = Defaults.get(PARAM_NAMES.TIME_START);
    const duration_amount = Defaults.get(PARAM_NAMES.DURATION_AMOUNT);
    const duration_units = Defaults.get(PARAM_NAMES.DURATION_UNITS);
    const expiry_date = Defaults.get(PARAM_NAMES.EXPIRY_DATE);
    const expiry_time = Defaults.get(PARAM_NAMES.EXPIRY_TIME);
    const amount_type = Defaults.get(PARAM_NAMES.AMOUNT_TYPE);
    const amount = Defaults.get(PARAM_NAMES.AMOUNT);
    const currency = Defaults.get(PARAM_NAMES.CURRENCY);
    const is_equal = Defaults.get(PARAM_NAMES.IS_EQUAL);
    const prediction = Defaults.get(PARAM_NAMES.PREDICTION);
    const selected_tick = Defaults.get(PARAM_NAMES.SELECTED_TICK);
    const multiplier = Defaults.get(PARAM_NAMES.MULTIPLIER);

    const {
        start_dates,
        expiry_type_options,
        duration_data,
        duration_options,
        endtime_data,
        currency_list,
        reset_message,
    } = tradeData;

    const contractForms = [
        'risefall',
        'callputequal',
        'touchnotouch',
        'higherlower',
        'endsinout',
        'staysinout',
        'matchdiff',
        'evenodd',
        'overunder',
        'asian',
        'lookbackhigh',
        'lookbacklow',
        'lookbackhighlow',
        'reset',
        'highlowticks',
        'runs',
    ];

    const onExpiryDateChange = (value) => {
        const element = common_functions.getElementById('expiry_date');
        const newDate = moment(value).format('YYYY-MM-DD');
        if (!endtime_data.show_datepicker) {
            Array.from(element.options).map((option) => {
                if (moment(option.text).format('YYYY-MM-DD') === value) {
                    option.setAttribute('selected', true);
                    option.setAttribute('data-value', newDate);
                } else {
                    option.setAttribute('selected', false);
                    option.setAttribute('data-value', newDate);
                }
            });
        } else {
            element.setAttribute('data-value', newDate);
        }
        eventDispatcher(element, 'change');
    };

    const updateOldField = (elementId, value, eventType) => {
        const element = common_functions.getElementById(elementId);
        if (elementId === 'callputequal') {
            element.checked = !+is_equal;
        } else {
            element.value = value;
        }
        eventDispatcher(element, eventType);
    };

    const getMessage = (form) => {
        if (form === 'highlowticks') {
            return localize('This contract type only offers 5 ticks');
        }
        return null;
    };

    const handleAmountChange = (e, id) => {
    // const value = handleNumeric(e, regex);
        updateOldField(id, e.target.value, 'input');
    };

    const isEmpty = (obj) => Object.keys(obj).length === 0;
    if (isEmpty(tradeData)) {
        return null;
    }

    return (
        <div className='quill-form-container'>
            {contractForms.includes(formName) && (
                <>
                    {formName === 'highlowticks' && (
                        <div className='section-msg-container'>
                            <SectionMessage status='info' message={getMessage(formName)} />
                        </div>
                    )}
                    {formName === 'reset' && reset_message && (
                        <div className='section-msg-container'>
                            <SectionMessage status='info' message={reset_message} />
                        </div>
                    )}
                
                    <div className='quill-form-rows'>

                        {['risefall', 'callputequal'].includes(formName) && start_dates && (
                            <div className='quill-form-row'>
                                <div className='form_field'>
                                    <InputDropdown
                                        label={localize('Start Time')}
                                        options={start_dates.options}
                                        value={date_start}
                                        onSelectOption={(value) => {
                                            updateOldField('date_start', value, 'change');
                                        }}
                                    />
                                </div>
                                {date_start !== 'now' && (
                                    <div className='form_field'>
                                        <TimePickerDropdown
                                            time={time_start}
                                            onUpdate={updateOldField}
                                            elementId='time_start'
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {formName !== 'highlowticks' && (
                            <div className='quill-form-row'>
                                <div className='form_field'>
                                    <InputDropdown
                                        options={expiry_type_options}
                                        value={expiryType}
                                        onSelectOption={(value) => {
                                            updateOldField('expiry_type', value, 'change');
                                        }}
                                    />
                                </div>
                                {expiryType === 'duration' && (
                                    <>
                                        <div className='form_field'>
                                            <TextField
                                                type='number'
                                                value={duration_amount}
                                                message={duration_data?.message || ''}
                                                status={duration_data?.status}
                                                onChange={(e) => {
                                                    updateOldField(
                                                        'duration_amount',
                                                        e.target.value,
                                                        'input'
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className='form_field'>
                                            <InputDropdown
                                                options={duration_options}
                                                value={duration_units}
                                                onSelectOption={(value) => {
                                                    updateOldField('duration_units', value, 'change');
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                                {expiryType === 'endtime' && (
                                    <>
                                        {endtime_data && (
                                            <div className='form_field'>
                                                {endtime_data.show_datepicker ? (
                                                    <DatePickerDropdown
                                                        value={moment(expiry_date).format('DD/MM/YYYY')}
                                                        datePickerProps={{ minDate: new Date() }}
                                                        onSelectDate={(value) => {
                                                            onExpiryDateChange(value);
                                                        }}
                                                    />
                                                ) : (
                                                    <InputDropdown
                                                        options={endtime_data.options}
                                                        value={expiry_date}
                                                        onSelectOption={(value) => {
                                                            onExpiryDateChange(value);
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {expiry_time && (
                                            <div className='form_field'>
                                                <TimePickerDropdown
                                                    time={expiry_time}
                                                    onUpdate={updateOldField}
                                                    elementId='expiry_time'
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        <BarrierFields
                            formName={formName}
                            handleAmountChange={handleAmountChange}
                        />

                        {['matchdiff', 'overunder'].includes(formName) && (
                            <div className='quill-form-row'>
                                <div className='form_field'>
                                    <NumbersDropdown
                                        value={prediction}
                                        label={localize('Last Digit Prediction')}
                                        start={0}
                                        end={9}
                                        elementId='prediction'
                                        onUpdate={updateOldField}
                                    />
                                </div>
                            </div>
                        )}

                        {['highlowticks'].includes(formName) && (
                            <div className='quill-form-row'>
                                <div className='form_field'>
                                    <NumbersDropdown
                                        value={selected_tick}
                                        label={localize('Tick Prediction')}
                                        start={1}
                                        end={5}
                                        elementId='selected_tick'
                                        onUpdate={updateOldField}
                                    />
                                </div>
                            </div>
                        )}

                        {!['lookbackhigh', 'lookbacklow', 'lookbackhighlow'].includes(
                            formName
                        ) && (
                            <div className='quill-form-row'>
                                <div className='form_field'>
                                    <InputDropdown
                                        options={[
                                            { text: localize('Stake'), value: 'stake' },
                                            { text: localize('Payout'), value: 'payout' },
                                        ]}
                                        value={amount_type}
                                        onSelectOption={(value) => {
                                            updateOldField('amount_type', value, 'change');
                                        }}
                                    />
                                </div>

                                {currency_list ? (
                                    <>
                                        <div className='form_field'>
                                            <TextField
                                                value={amount}
                                                type='number'
                                                allowDecimals={true}
                                                onChange={(e) => handleAmountChange(e, 'amount')}
                                            />
                                        </div>
                                        <div className='form_field'>
                                            <CurrencyDropdown
                                                currency_list={currency_list}
                                                currency={currency}
                                                onUpdate={updateOldField}
                                                elementId='currency'
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className='form_field'>
                                        <TextFieldAddon
                                            type='number'
                                            allowDecimals
                                            onChange={(e) => handleAmountChange(e, 'amount')}
                                            value={amount}
                                            addonLabel={currency}
                                            addOnPosition='right'
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {['lookbackhigh', 'lookbacklow', 'lookbackhighlow'].includes(
                            formName
                        ) && (
                            <div className='quill-form-row'>
                                {currency_list ? (
                                    <>
                                        <div className='form_field'>
                                            <TextField
                                                value={multiplier}
                                                label={localize('Multiplier')}
                                                type='number'
                                                allowDecimals={true}
                                                onChange={(e) => handleAmountChange(e, 'multiplier')}
                                            />
                                        </div>
                                        <div className='form_field'>
                                            <CurrencyDropdown
                                                currency_list={currency_list}
                                                currency={currency}
                                                onUpdate={updateOldField}
                                                elementId='multiplier_currency'
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className='form_field'>
                                        <TextFieldAddon
                                            addonLabel={currency}
                                            addOnPosition='right'
                                            label={localize('Multiplier')}
                                            value={multiplier}
                                            type='number'
                                            allowDecimals={true}
                                            onChange={(e) => handleAmountChange(e, 'multiplier')}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {['risefall', 'callputequal'].includes(formName) && (
                            <div className='quill-form-row allow-equals'>
                                <Checkbox
                                    label={localize('Allow equals')}
                                    onChange={(e) => {
                                        updateOldField('callputequal', e, 'change');
                                    }}
                                    size='md'
                                    checked={+is_equal === 1}
                                    infoIconMessage={localize(
                                        'Win payout if exit spot is also equal to entry spot.'
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FormComponent;
