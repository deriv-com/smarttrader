import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputDropdown, TextFieldAddon, DatePickerDropdown } from '@deriv-com/quill-ui';
import ReactDOM from 'react-dom';
import { formConfig } from './form_config';
import { getElementById } from '../../../_common/common_functions';
import { useContractChange, useMarketChange } from '../../hooks/events';
import Defaults, { PARAM_NAMES } from '../trade/defaults';

const FormComponent = ({ formName, handlers }) => {
    const [expiryType, setExpiryType] = useState(Defaults.get(PARAM_NAMES.EXPIRY_TYPE));

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
                                    setExpiryType(value);
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
                                    setExpiryType(value);
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

const ContractFormWrapper = (props) => {
    const { contracts, contracts_tree, selected } = props;
    
    const hasContractChange = useContractChange();
    const hasMarketChange = useMarketChange();

    const [formName, setFormName] = useState(Defaults.get(PARAM_NAMES.FORM_NAME));
    const [expiry_type, setExpiryType] = useState('duration');

    const handleStartTime = (value) => {
        console.log('Start Time selected:', value);
    };

    const handleExpiryType = (value) => {
        setExpiryType(value);
    };

    const handleSelect = (value) => {
        console.log('Option selected:', value);
    };

    const handleDateSelect = (value) => {
        console.log('Date selected:', value);
    };

    const handlers = {
        handleStartTime,
        handleExpiryType,
        handleSelect,
        handleDateSelect,
    };

    useEffect(() => {
        setFormName(Defaults.get(PARAM_NAMES.FORM_NAME));
        console.log('form changed', formName);
    }, [hasContractChange, hasMarketChange]);

    return (
        <FormComponent
            formName={Defaults.get(PARAM_NAMES.FORM_NAME)}
            handlers={handlers}
        />
    );
};

/* eslint-disable react/no-render-return-value */
export const init = (contracts, contracts_tree, selected) => {
    ReactDOM.render(
        <ContractFormWrapper contracts={contracts} contracts_tree={contracts_tree} selected={selected} />,
        getElementById('contract_forms_wrapper')
    );
};
/* eslint-enable react/no-render-return-value */

ContractFormWrapper.propTypes = {
    contracts     : PropTypes.object,
    contracts_tree: PropTypes.array,
    selected      : PropTypes.string,
};

export default init;
