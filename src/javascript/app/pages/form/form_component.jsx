/* eslint-disable no-unused-vars */
import React from 'react';
import {
    TextField,
    InputDropdown,
    TextFieldAddon,
    DatePickerDropdown,
    Checkbox,
    SectionMessage,
} from '@deriv-com/quill-ui';
import moment from 'moment';
import { formConfig } from './form_config';
import { CurrencyDropdown } from './currencyDropdown.jsx';
import Defaults, { PARAM_NAMES } from '../trade/defaults';
import { eventDispatcher } from '../../hooks/events';
import common_functions from '../../../_common/common_functions';
import { localize } from '../../../_common/localize';
import { onlyNumericOnKeyDown, onlyNumericOnKeypress } from '../../common/event_handler';

export const FormComponent = ({ handlers, tradeData }) => {
    
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

    const config = formConfig[formName];
    const {
        start_dates,
        expiry_type_options,
        duration_data,
        duration_options,
        endtime_data,
        currency_list,
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
        element.value = value;
        eventDispatcher(element, eventType);
    };

    const createOptions = (array) => array.map((option) => ({
        text : option.charAt(0).toUpperCase() + option.slice(1),
        value: option,
    }));

    const isEmpty = (obj) => Object.keys(obj).length === 0;
    if (!config || isEmpty(tradeData)) {
        return null;
    }

    return (
        <div className='form_container'>
            {contractForms.includes(formName) && (
                <div className='form_rows'>
                    {['reset', 'highlowticks'].includes(formName) && (
                        <div className='section-msg-container'>
                            <SectionMessage status='info' message={config.infoMessage} />
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
                                <TextField {...config.barrier.props} />
                            </div>
                        </div>
                    )}

                    {['endsinout', 'staysinout'].includes(formName) && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <TextField {...config.highlowBarrier[0].props} />
                            </div>
                            <div className='form_field'>
                                <TextField {...config.highlowBarrier[1].props} />
                            </div>
                        </div>
                    )}

                    {['matchdiff', 'overunder'].includes(formName) && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <InputDropdown
                                    label={config.lastDigit.label}
                                    options={createOptions(config.lastDigit.options)}
                                    onSelectOption={(e) => handlers.handleSelect(e)}
                                    value={config.lastDigit.value}
                                />
                            </div>
                        </div>
                    )}

                    {config.tickPrediction && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <InputDropdown
                                    label={config.tickPrediction.label}
                                    options={createOptions(config.tickPrediction.options)}
                                    onSelectOption={(e) => handlers.handleSelect(e)}
                                    value={config.tickPrediction.value}
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
                                            onKeyDown={onlyNumericOnKeyDown}
                                            onChange={(e) => {
                                                updateOldField(
                                                    'amount',
                                                    e.target.value,
                                                    'input'
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className='form_field'>
                                        <CurrencyDropdown
                                            currency_list={currency_list}
                                            currency={currency}
                                            onUpdate={updateOldField}
                                        />
                                    </div>
                                </>
                                :
                                <div className='form_field'>
                                    <TextFieldAddon
                                        type='text'
                                        onKeyDown={onlyNumericOnKeyDown}
                                        onChange={(e) => {
                                            updateOldField(
                                                'amount',
                                                e.target.value,
                                                'input'
                                            );
                                        }}
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
                            <TextFieldAddon
                                addonLabel='USD'
                                addOnPosition='right'
                                label='Multiplier'
                                value={1}
                            />
                        </div>
                    )}

                    {config.allowEquals && (
                        <div className='row'>
                            <Checkbox
                                id='allow_equlas'
                                label='Allow equals'
                                name='demo_checkbox'
                                onChange={(e) => {}}
                                size='md'
                                infoIconMessage='Win payout if exit spot is also equal to entry spot.'
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormComponent;
