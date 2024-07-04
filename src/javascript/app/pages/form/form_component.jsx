import React from 'react';
import { TextField, InputDropdown, TextFieldAddon, DatePickerDropdown } from '@deriv-com/quill-ui';
import { formConfig } from './form_config';
import Defaults, { PARAM_NAMES } from '../trade/defaults';

export const FormComponent = ({ formName, handlers }) => {
    console.log(formName);
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
                                {config.expiryType.duration.map(field => (
                                    <div className='form_field' key={field.id}>
                                        {field.component === 'TextField' &&
                                            <TextField {...field.props} />
                                        }
                                        {field.component === 'InputDropdown' &&
                                            <InputDropdown
                                                status='neutral'
                                                {...field.props}
                                                onSelectOption={(e) => handlers.handleSelect(e)}
                                            />
                                        }
                                    </div>
                                ))}
                            </>
                        }
                        {expiryType === 'endtime' &&
                            <>
                                {config.expiryType.endtime.map(field => (
                                    <div className='form_field' key={field.id}>
                                        {field.component === 'DatePickerDropdown' &&
                                            <DatePickerDropdown
                                                onSelectDate={(e) => handlers.handleDateSelect(e) }
                                            />
                                        }
                                    </div>
                                ))}
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

            {(formName === 'touchnotouch' || formName === 'higherlower')  && (
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
                                {config.expiryType.duration.map(field => (
                                    <div className='form_field' key={field.id}>
                                        {field.component === 'TextField' &&
                                            <TextField {...field.props} />
                                        }
                                        {field.component === 'InputDropdown' &&
                                            <InputDropdown
                                                status='neutral'
                                                {...field.props}
                                                onSelectOption={(e) => handlers.handleSelect(e)}
                                            />
                                        }
                                    </div>
                                ))}
                            </>
                        }
                        {expiryType === 'endtime' &&
                            <>
                                {config.expiryType.endtime.map(field => (
                                    <div className='form_field' key={field.id}>
                                        {field.component === 'DatePickerDropdown' &&
                                            <DatePickerDropdown
                                                onSelectDate={(e) => handlers.handleDateSelect(e) }
                                            />
                                        }
                                    </div>
                                ))}
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
