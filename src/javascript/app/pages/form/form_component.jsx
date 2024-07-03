import React from 'react';
import { TextField, InputDropdown, TextFieldAddon, DatePickerDropdown } from '@deriv-com/quill-ui';
import { formConfig } from './form_config';
import Defaults, { PARAM_NAMES } from '../trade/defaults';

export const FormComponent = ({ formName, handlers }) => {
    const expiryType = Defaults.get(PARAM_NAMES.EXPIRY_TYPE);
    const config = formConfig[formName];

    if (!config) {
        return null;
    }

    return (
        <div className='form_container'>
            {formName === 'risefall' && (
                <div className='form_rows'>
                    <div className='row gap-8'>
                        <div className='form_field'>
                            <InputDropdown
                                label={config.startTime.label}
                                options={config.startTime.options}
                                status='neutral'
                                value={config.startTime.defaultValue}
                                onSelectOption={handlers.handleStartTime}
                            />
                        </div>
                    </div>
                    <div className='row gap-8'>
                        <div className='form_field'>
                            <InputDropdown
                                options={config.expiryType.options}
                                status='neutral'
                                value={expiryType || config.expiryType.defaultValue}
                                onSelectOption={(value) => {
                                    handlers.handleExpiryType(value);
                                }}
                            />
                        </div>
                        {expiryType === 'duration' &&
                            <>
                                <div className='form_field'>
                                    <TextField type='number' value='15' message='Minimum: 15' />
                                </div>
                                <div className='form_field'>
                                    <InputDropdown
                                        options={[
                                            {
                                                text : 'minutes',
                                                value: 'minutes',
                                            },
                                            {
                                                text : 'hours',
                                                value: 'hours',
                                            },
                                            {
                                                text : 'days',
                                                value: 'days',
                                            },
                                        ]}
                                        status='neutral'
                                        value='minutes'
                                        onSelectOption={(e) => handlers.handleSelect(e)}
                                    />
                                </div>
                            </>
                        }
                        {expiryType === 'endtime' &&
                            <>
                                <div className='form_field'>
                                    <DatePickerDropdown
                                        onSelectDate={(e) => handlers.handleDateSelect(e) }
                                        status='neutral'
                                    />
                                </div>
                                <div className='form_field'>
                                    <TextField label='Time' />
                                </div>
                            </>
                        }
                    </div>
                    <div className='row gap-8'>
                        {config.payoutType.map(field => (
                            <div className='form_field' key={field.type}>
                                {field.component === 'InputDropdown' &&
                                    <InputDropdown {...field.props} onSelectOption={(e) => handlers.handleSelect(e)} />
                                }
                                {field.component === 'TextFieldAddon' &&
                                    <TextFieldAddon {...field.props} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {formName === 'touchnotouch' && (
                <div className='form_rows'>
                    <div className='row gap-8'>
                        <div className='form_field'>
                            <InputDropdown
                                options={config.expiryType.options}
                                status='neutral'
                                value={expiryType || config.expiryType.defaultValue}
                                onSelectOption={(value) => {
                                    handlers.handleExpiryType(value);
                                }}
                            />
                        </div>
                        {expiryType === 'duration' &&
                            <>
                                <div className='form_field'>
                                    <TextField type='number' value='15' message='Minimum: 15' />
                                </div>
                                <div className='form_field'>
                                    <InputDropdown
                                        options={[
                                            {
                                                text : 'minutes',
                                                value: 'minutes',
                                            },
                                            {
                                                text : 'hours',
                                                value: 'hours',
                                            },
                                            {
                                                text : 'days',
                                                value: 'days',
                                            },
                                        ]}
                                        status='neutral'
                                        value={'minutes'}
                                        onSelectOption={(e) => handlers.handleSelect(e)}
                                    />
                                </div>
                            </>
                        }
                        {expiryType === 'endtime' &&
                            <>
                                <div className='form_field'>
                                    <DatePickerDropdown
                                        onSelectDate={(e) => handlers.handleDateSelect(e) }
                                        status='neutral'
                                    />
                                </div>
                                <div className='form_field'>
                                    <TextField label='Time' />
                                </div>
                            </>
                        }
                    </div>
                    <div className='row'>
                        <div className='form_field'>
                            <TextField {...config.barrier.props} />
                        </div>
                    </div>
                    <div className='row gap-8'>
                        {config.payoutType.map(field => (
                            <div className='form_field' key={field.type}>
                                {field.component === 'InputDropdown' &&
                                    <InputDropdown {...field.props} onSelectOption={(e) => handlers.handleSelect(e)} />
                                }
                                {field.component === 'TextFieldAddon' &&
                                    <TextFieldAddon {...field.props} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormComponent;
