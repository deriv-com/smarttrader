import React from 'react';
import { TextField, InputDropdown, TextFieldAddon } from '@deriv-com/quill-ui';
import ReactDOM from 'react-dom';
import { getElementById } from '../../../_common/common_functions';

const ContractFormWrapper = () => {
    const handleSelect = (e) => {
        // eslint-disable-next-line no-alert
        alert(`selected ${e}`);
    };
    return (
        <div className='form_container'>
            <div className='form_rows'>
                <div className='row gap-8'>
                    <div className='form_field'>
                        <InputDropdown
                            options={[
                                {
                                    text : 'Duration',
                                    value: 'duration',
                                },
                                {
                                    text : 'End Time',
                                    value: 'endtime',
                                },
                            ]}
                            status='neutral'
                            value={'duration'}
                            // onSelectOption={(e) => handleSelect(e)}
                        />
                    </div>
                    <div className='form_field'>
                        <TextField type='number' value='15' message='Minimum: 7' />
                    </div>
                    <div className='form_field'>
                        <InputDropdown
                            options={[
                                {
                                    text : 'Days',
                                    value: 'days',
                                },
                            ]}
                            status='neutral'
                            value={'days'}
                            onSelectOption={(e) => handleSelect(e)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='form_field'>
                        <TextField type='number' label='Barrier' value='2318.13' />
                    </div>
                </div>
                <div className='row gap-8'>
                    <div className='form_field'>
                        <InputDropdown
                            options={[
                                {
                                    text : 'Stake',
                                    value: 'stake',
                                },
                                {
                                    text : 'Payout',
                                    value: 'payout',
                                },
                            ]}
                            status='neutral'
                            value={'stake'}
                            onSelectOption={(e) => handleSelect(e)}
                        />
                    </div>
                    <div className='form_field'>
                        <TextFieldAddon addonLabel='USD' addOnPosition='right' value='10' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const init = () => {
    ReactDOM.render(
        <ContractFormWrapper />,
        getElementById('contract_forms_wrapper')
    );
};

export default init;
