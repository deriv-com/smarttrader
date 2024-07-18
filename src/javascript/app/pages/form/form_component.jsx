import React from 'react';
import {
    TextField,
    InputDropdown,
    TextFieldAddon,
    DatePickerDropdown,
    Checkbox,
    SectionMessage,
} from '@deriv-com/quill-ui';
import { formConfig } from './form_config';
import Defaults, { PARAM_NAMES } from '../trade/defaults';
import { eventDispatcher, triggerSessionChange } from '../../hooks/events';
import common_functions from '../../../_common/common_functions';

export const FormComponent = ({ handlers, tradeData }) => {
    
    const expiryType = Defaults.get(PARAM_NAMES.EXPIRY_TYPE);
    const formName = Defaults.get(PARAM_NAMES.FORM_NAME);
    const config = formConfig[formName];
    console.log(formName, tradeData);
    const { expiry_type_options } = tradeData;

    const contractForms = [
        'risefall',
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
        triggerSessionChange();
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

                    {(['risefall'].includes(formName) && tradeData.start_dates?.has_now) &&
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <InputDropdown
                                    label={config.startTime.label}
                                    options={tradeData.start_dates.options}
                                    status='neutral'
                                    value={Defaults.get(PARAM_NAMES.DATE_START).toString()}
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
                    }

                    {config.expiryType && formName !== 'highlowticks' && (
                        <div className='row gap-8'>
                            <div className='form_field'>
                                <InputDropdown
                                    options={expiry_type_options}
                                    status='neutral'
                                    value={expiryType || config.expiryType.defaultValue}
                                    onSelectOption={(value) => {
                                        handlers.handleExpiryType(value);
                                    }}
                                />
                            </div>
                            {expiryType === 'duration' && (
                                <>
                                    {config.expiryType.duration.map((field) => (
                                        <div className='form_field' key={field.id}>
                                            {field.component === 'TextField' && (
                                                <TextField {...field.props} />
                                            )}
                                            {field.component === 'InputDropdown' && (
                                                <InputDropdown
                                                    status='neutral'
                                                    {...field.props}
                                                    onSelectOption={(e) => handlers.handleSelect(e)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                            {expiryType === 'endtime' && (
                                <>
                                    {config.expiryType.endtime.map((field) => (
                                        <div className='form_field' key={field.id}>
                                            {field.component === 'DatePickerDropdown' && (
                                                <DatePickerDropdown
                                                    onSelectDate={(e) => handlers.handleDateSelect(e)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <div className='form_field'>
                                        <TextFieldAddon
                                            value='12:40'
                                            addonLabel='GMT'
                                            addOnPosition='right'
                                        />
                                    </div>
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

                    {config.payoutType && (
                        <div className='row gap-8'>
                            {config.payoutType.map((field) => (
                                <div className='form_field' key={field.id}>
                                    {field.component === 'InputDropdown' && (
                                        <InputDropdown
                                            {...field.props}
                                            onSelectOption={(e) => handlers.handleSelect(e)}
                                        />
                                    )}
                                    {field.component === 'TextFieldAddon' && (
                                        <TextFieldAddon {...field.props} />
                                    )}
                                </div>
                            ))}
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
                                onChange={(e) => {
                                    console.log(e);
                                }}
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
