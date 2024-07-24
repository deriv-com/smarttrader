/* eslint-disable no-unused-vars */
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
import { CurrencyDropdown } from './currencyDropdown.jsx';
import { NumbersDropdown } from './numbersDropdown.jsx';
import Defaults, { PARAM_NAMES } from '../trade/defaults';
import { eventDispatcher } from '../../hooks/events';
import common_functions from '../../../_common/common_functions';
import { localize } from '../../../_common/localize';
import tradeManager from '../../common/trade_manager.js';
import { handleNumeric } from '../../common/event_handler';

export const FormComponent = ({ tradeData }) => {
    
    const formName = Defaults.get(PARAM_NAMES.FORM_NAME);
    const expiryType = Defaults.get(PARAM_NAMES.EXPIRY_TYPE);
    const date_start = Defaults.get(PARAM_NAMES.DATE_START);
    const duration_amount = Defaults.get(PARAM_NAMES.DURATION_AMOUNT);
    const duration_units = Defaults.get(PARAM_NAMES.DURATION_UNITS);
    const expiry_date = Defaults.get(PARAM_NAMES.EXPIRY_DATE);
    const expiry_time = Defaults.get(PARAM_NAMES.EXPIRY_TIME);
    const amount_type = Defaults.get(PARAM_NAMES.AMOUNT_TYPE);
    const amount = Defaults.get(PARAM_NAMES.AMOUNT);
    const currency = Defaults.get(PARAM_NAMES.CURRENCY);
    const is_equal = Defaults.get(PARAM_NAMES.IS_EQUAL);
    const barrier = Defaults.get(PARAM_NAMES.BARRIER);
    const barrier_high = Defaults.get(PARAM_NAMES.BARRIER_HIGH);
    const barrier_low = Defaults.get(PARAM_NAMES.BARRIER_LOW);
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
        highBarrierProps,
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

    const setDefaults = (param, value) => {
        Defaults.set(param, value);
        // triggerSessionChange();
    };

    const onExpiryDateChange = (value) => {
        // debugger;
        const element = common_functions.getElementById('expiry_date');
        const newDate = moment(value).format('YYYY-MM-DD');
        if (!endtime_data.show_datepicker) {
            Array.from(element.options).map(option => {
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

    const validateHighBarrier = () => {
        let highBarrierData = {};
        if (+barrier_high <= +barrier_low) {
            highBarrierData.message = localize(
                'High barrier must be higher than low barrier'
            );
            highBarrierData.status = 'error';
        } else {
            highBarrierData = {};
        }
        tradeManager.set({ highBarrierProps: highBarrierData });
    };

    const getMessage = (form) => {
        if (form === 'highlowticks') {
            return localize('This contract type only offers 5 ticks');
        } else if (form === 'reset') {
            return localize('The reset time is 30 seconds'); // TODO
        }
        return null;
    };

    const handleAmountChange = (e, id) => {
        const value = handleNumeric(e);
        updateOldField(id, value, 'input');
    };

    const isEmpty = (obj) => Object.keys(obj).length === 0;
    if (isEmpty(tradeData)) {
        return null;
    }

    return (
        <div className='form_container'>
            {contractForms.includes(formName) && (
                <div className='form_rows'>
                    {['reset', 'highlowticks'].includes(formName) && (
                        <div className='section-msg-container'>
                            <SectionMessage status='info' message={getMessage(formName)} />
                        </div>
                    )}

                    {['risefall', 'callputequal'].includes(formName) && start_dates && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <InputDropdown
                                    label={localize('Start Time')}
                                    options={start_dates.options}
                                    value={date_start}
                                    onSelectOption={(value) => {
                                        setDefaults(PARAM_NAMES.DATE_START, value);
                                        updateOldField('date_start', value, 'change');
                                    }}
                                />
                            </div>
                            {Defaults.get(PARAM_NAMES.DATE_START) !== 'now' && (
                                <div className='form_field'>
                                    <TextFieldAddon
                                        value={Defaults.get(PARAM_NAMES.TIME_START)}
                                        addonLabel='GMT'
                                        addOnPosition='right'
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {formName !== 'highlowticks' && (
                        <div className='row gap-8'>
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
                                                        setDefaults(PARAM_NAMES.EXPIRY_DATE, value);
                                                        onExpiryDateChange(value);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {expiry_time && (
                                        <div className='form_field'>
                                            <TextFieldAddon
                                                value={expiry_time}
                                                addonLabel='GMT'
                                                addOnPosition='right'
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {['touchnotouch', 'higherlower'].includes(formName) && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <TextField
                                    label={localize('Barrier')}
                                    value={barrier}
                                    type='number'
                                    allowDecimals={true}
                                    onChange={(e) => handleAmountChange(e, 'barrier')}
                                />
                            </div>
                        </div>
                    )}

                    {['endsinout', 'staysinout'].includes(formName) && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <TextField
                                    type='number'
                                    allowDecimals={true}
                                    label={localize('High barrier')}
                                    value={barrier_high}
                                    onChange={(e) => {
                                        handleAmountChange(e, 'barrier_high');
                                        // validateHighBarrier();
                                    }}
                                    // message={highBarrierProps?.message}
                                    // status={highBarrierProps?.status}
                                />
                            </div>
                            <div className='form_field'>
                                <TextField
                                    label={localize('Low barrier')}
                                    value={barrier_low}
                                    type='number'
                                    allowDecimals={true}
                                    onChange={(e) => {
                                        handleAmountChange(e, 'barrier_low');
                                        // validateHighBarrier();
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {['matchdiff', 'overunder'].includes(formName) && (
                        <div className='row gap-8'>
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
                        <div className='row gap-8'>
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
                        <div className='row gap-8'>
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

                            {currency_list ?
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
                                :
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
                            }
                        </div>
                    )}

                    {['lookbackhigh', 'lookbacklow', 'lookbackhighlow'].includes(
                        formName
                    ) && (
                        <div className='row gap-8'>
                            {currency_list ?
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
                                :
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
                            }
                        </div>
                    )}

                    {['risefall', 'callputequal'].includes(formName) && (
                        <div className='row'>
                            <Checkbox
                                label={localize('Allow equals')}
                                onChange={(e) => {
                                    updateOldField('callputequal', e, 'change');
                                }}
                                size='md'
                                checked={+is_equal === 1}
                                infoIconMessage={localize('Win payout if exit spot is also equal to entry spot.')}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormComponent;
