import React, { useEffect, useState } from 'react';
import {
    TextField,
    TextFieldAddon,
    DatePickerDropdown,
    Checkbox,
    SectionMessage,
    BreakpointProvider,
} from '@deriv-com/quill-ui';
import moment from 'moment';
import { CurrencyDropdown } from './currency-dropdown.jsx';
import { NumbersDropdown } from './numbers-dropdown.jsx';
import BarrierFields from './barrier-fields.jsx';
import { TimePickerDropdown } from './time-selection.jsx';
import { DropdownComponent } from './dropdown-component.jsx';
import Defaults, { PARAM_NAMES } from '../trade/defaults.js';
import {
    useSessionChange,
    useTradeChange,
    eventDispatcher,
    useMarketChange,
    useContractChange,
} from '../../hooks/events.js';
import common_functions from '../../../_common/common_functions.js';
import { localize } from '../../../_common/localize.js';
import dataManager from '../../common/data_manager.js';
import { setDefaultParams } from '../../common/helpers.js';

export const FormComponent = () => {
    const [tradeData, setTradeData] = useState({});

    const hasTradeChange = useTradeChange();
    const hasMarketChange = useMarketChange();
    const hasContractChange = useContractChange();
    const hasSessionChange = useSessionChange();

    useEffect(() => {
        setTradeData((oldData) => ({
            ...oldData,
            ...dataManager.getAllTrades(),
        }));
    }, [hasMarketChange, hasContractChange, hasTradeChange, hasSessionChange]);

    const form_name = Defaults.get(PARAM_NAMES.FORM_NAME);
    const expiry_type = Defaults.get(PARAM_NAMES.EXPIRY_TYPE);
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
        show_allow_equals,
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
        if (newDate !== expiry_date) {
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
        }
    };

    const updateFormField = (elementId, value, eventType) => {
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
        updateFormField(id, e.target.value, 'input');
        setDefaultParams(id, e.target.value);
    };

    const findTextByValue = (arr, value) => arr.find(item => item.value === value)?.text || null;
    
    const isEmpty = (obj) => Object.keys(obj).length === 0;
    if (isEmpty(tradeData)) {
        return null;
    }

    const getMinMaxDate = () => {
        const { minDate: min, maxDate: max } = endtime_data.datepicker_config;
        const today = new Date();
    
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + min);
    
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + max);
    
        return { minDate, maxDate };
    };

    const payoutTypeOptions = [
        { text: localize('Stake'), value: 'stake' },
        { text: localize('Payout'), value: 'payout' },
    ];

    return (
        <BreakpointProvider>
            <div className='quill-form-container'>
                {contractForms.includes(form_name) && (
                    <>
                        {form_name === 'highlowticks' && (
                            <div className='section-msg-container'>
                                <SectionMessage status='info' message={getMessage(form_name)} />
                            </div>
                        )}
                        {form_name === 'reset' && reset_message && (
                            <div className='section-msg-container'>
                                <SectionMessage status='info' message={reset_message} />
                            </div>
                        )}
                    
                        <div className='quill-form-rows'>
                            {['risefall', 'callputequal'].includes(form_name) && start_dates && date_start && (
                                <div className='quill-form-row'>
                                    <div className='form_field field-pb'>
                                        <DropdownComponent
                                            label={localize('Start Time')}
                                            options={start_dates.options}
                                            value={findTextByValue(start_dates.options, date_start)}
                                            onUpdate={updateFormField}
                                            elementId='date_start'
                                        />
                                    </div>
                                    {date_start !== 'now' && (
                                        <div className='form_field field-pb'>
                                            <TimePickerDropdown
                                                time={time_start}
                                                onUpdate={updateFormField}
                                                elementId='time_start'
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {form_name !== 'highlowticks' && (
                                <>
                                    <div className='quill-form-row'>
                                        <div className='form_field field-pb'>
                                            <DropdownComponent
                                                options={expiry_type_options}
                                                value={findTextByValue(expiry_type_options, expiry_type)}
                                                onUpdate={updateFormField}
                                                elementId='expiry_type'
                                            />
                                        </div>
                                        {expiry_type === 'duration' && (
                                            <>
                                                <div className={`form_field ${!duration_data?.message ? 'field-pb' : ''}`}>
                                                    <TextField
                                                        type='number'
                                                        value={duration_amount}
                                                        message={duration_data?.message || ''}
                                                        status={duration_data?.status || 'neutral'}
                                                        onChange={(e) => {
                                                            updateFormField(
                                                                'duration_amount',
                                                                e.target.value,
                                                                'input'
                                                            );
                                                            setDefaultParams('duration_amount', e.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div className='form_field field-pb'>
                                                    <DropdownComponent
                                                        options={duration_options}
                                                        value={findTextByValue(duration_options, duration_units)}
                                                        onUpdate={updateFormField}
                                                        elementId='duration_units'
                                                    />
                                                </div>
                                            </>
                                        )}
                                        {expiry_type === 'endtime' && (
                                            <>
                                                {endtime_data && (
                                                    <div className='form_field field-pb'>
                                                        {endtime_data.show_datepicker ? (
                                                            <DatePickerDropdown
                                                                value={moment(expiry_date).format('DD/MM/YYYY')}
                                                                datePickerProps={{
                                                                    minDate: getMinMaxDate().minDate,
                                                                    maxDate: getMinMaxDate().maxDate,
                                                                }}
                                                                onSelectDate={(value) => {
                                                                    onExpiryDateChange(value);
                                                                }}
                                                            />
                                                        ) : (
                                                            <DropdownComponent
                                                                options={endtime_data.options}
                                                                value={expiry_date}
                                                                onUpdate={onExpiryDateChange}
                                                                elementId='expiry_date'
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {expiry_type === 'endtime' && expiry_time && (
                                        <div className='quill-form-row'>
                                            <div className='form_field field-pb'>
                                                <TimePickerDropdown
                                                    time={expiry_time}
                                                    onUpdate={updateFormField}
                                                    elementId='expiry_time'
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <BarrierFields
                                form_name={form_name}
                                handleAmountChange={handleAmountChange}
                            />

                            {['matchdiff', 'overunder'].includes(form_name) && (
                                <div className='quill-form-row'>
                                    <div className='form_field field-pb'>
                                        <NumbersDropdown
                                            value={prediction}
                                            label={localize('Last Digit Prediction')}
                                            start={0}
                                            end={9}
                                            elementId='prediction'
                                            onUpdate={updateFormField}
                                        />
                                    </div>
                                </div>
                            )}

                            {['highlowticks'].includes(form_name) && (
                                <div className='quill-form-row'>
                                    <div className='form_field field-pb'>
                                        <NumbersDropdown
                                            value={selected_tick}
                                            label={localize('Tick Prediction')}
                                            start={1}
                                            end={5}
                                            elementId='selected_tick'
                                            onUpdate={updateFormField}
                                        />
                                    </div>
                                </div>
                            )}

                            {!['lookbackhigh', 'lookbacklow', 'lookbackhighlow'].includes(
                                form_name
                            ) && (
                                <div className='quill-form-row'>
                                    <div className='form_field field-pb'>
                                        <DropdownComponent
                                            options={payoutTypeOptions}
                                            value={findTextByValue(payoutTypeOptions, amount_type)}
                                            onUpdate={updateFormField}
                                            elementId='amount_type'
                                        />
                                    </div>

                                    {currency_list ? (
                                        <>
                                            <div className='form_field field-pb'>
                                                <TextField
                                                    value={amount}
                                                    type='number'
                                                    allowDecimals={true}
                                                    onChange={(e) => handleAmountChange(e, 'amount')}
                                                />
                                            </div>
                                            <div className='form_field field-pb'>
                                                <CurrencyDropdown
                                                    currency_list={currency_list}
                                                    currency={currency}
                                                    onUpdate={updateFormField}
                                                    elementId='currency'
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className='form_field field-pb'>
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
                                form_name
                            ) && (
                                <div className='quill-form-row'>
                                    {currency_list ? (
                                        <>
                                            <div className='form_field field-pb'>
                                                <TextField
                                                    value={multiplier}
                                                    label={localize('Multiplier')}
                                                    type='number'
                                                    allowDecimals={true}
                                                    onChange={(e) => handleAmountChange(e, 'multiplier')}
                                                />
                                            </div>
                                            <div className='form_field field-pb'>
                                                <CurrencyDropdown
                                                    currency_list={currency_list}
                                                    currency={currency}
                                                    onUpdate={updateFormField}
                                                    elementId='multiplier_currency'
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className='form_field field-pb'>
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

                            {show_allow_equals && (
                                <div className='quill-form-row allow-equals'>
                                    <Checkbox
                                        label={localize('Allow equals')}
                                        id='allow_equals'
                                        onChange={(e) => {
                                            updateFormField('callputequal', e, 'change');
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
        </BreakpointProvider>
    );
};

export default FormComponent;
