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
import { isCryptocurrency } from '../../../_common/base/currency_base.js';

export const FormComponent = () => {
    const [trade_data, setTradeData] = useState({});

    const has_trade_change = useTradeChange();
    const has_market_change = useMarketChange();
    const has_contract_change = useContractChange();
    const has_session_change = useSessionChange();

    useEffect(() => {
        setTradeData((old_data) => ({
            ...old_data,
            ...dataManager.getAllTrades(),
        }));
    }, [has_market_change, has_contract_change, has_trade_change, has_session_change]);

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
    const amount_crypto = Defaults.get('amount_crypto');
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
    } = trade_data;

    const contract_forms = [
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
        const new_date = moment(value).format('YYYY-MM-DD');
        if (new_date !== expiry_date) {
            if (!endtime_data.show_datepicker) {
                Array.from(element.options).map((option) => {
                    if (moment(option.text).format('YYYY-MM-DD') === value) {
                        option.setAttribute('selected', true);
                        option.setAttribute('data-value', new_date);
                    } else {
                        option.setAttribute('selected', false);
                        option.setAttribute('data-value', new_date);
                    }
                });
            } else {
                element.setAttribute('data-value', new_date);
            }
            eventDispatcher(element, 'change');
        }
    };

    const updateFormField = (element_id, value, event_type) => {
        const element = common_functions.getElementById(element_id);
        if (element_id === 'callputequal') {
            element.checked = !+is_equal;
        } else {
            element.value = value;
        }
        eventDispatcher(element, event_type);
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
    if (isEmpty(trade_data)) {
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

    const payout_type_options = [
        { text: localize('Stake'), value: 'stake' },
        { text: localize('Payout'), value: 'payout' },
    ];

    const formatEndDate = (date) => {
        const expriry_date_obj = endtime_data.options.find(obj => obj.value === date);
        if (expriry_date_obj) {
            return moment(date).format('ddd - DD MMM, YYYY');
        }
        return moment(endtime_data.options[0].value).format('ddd - DD MMM, YYYY');
    };

    const getAmount = () => isCryptocurrency(currency) ? amount_crypto : amount;

    return (
        <BreakpointProvider>
            <div className='quill-form-container'>
                {contract_forms.includes(form_name) && (
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
                                            element_id='date_start'
                                        />
                                    </div>
                                    {date_start !== 'now' && (
                                        <div className='form_field field-pb'>
                                            <TimePickerDropdown
                                                time={time_start}
                                                onUpdate={updateFormField}
                                                element_id='time_start'
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
                                                element_id='expiry_type'
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
                                                        element_id='duration_units'
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
                                                                value={formatEndDate(expiry_date)}
                                                                onUpdate={onExpiryDateChange}
                                                                element_id='expiry_date'
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
                                                    element_id='expiry_time'
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
                                            element_id='prediction'
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
                                            element_id='selected_tick'
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
                                            options={payout_type_options}
                                            value={findTextByValue(payout_type_options, amount_type)}
                                            onUpdate={updateFormField}
                                            element_id='amount_type'
                                        />
                                    </div>
                                    {currency_list ? (
                                        <>
                                            <div className='form_field field-pb'>
                                                <TextField
                                                    value={getAmount()}
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
                                                    element_id='currency'
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className='form_field field-pb'>
                                            <TextFieldAddon
                                                type='number'
                                                allowDecimals
                                                onChange={(e) => handleAmountChange(e, 'amount')}
                                                value={getAmount()}
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
                                                    element_id='multiplier_currency'
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
