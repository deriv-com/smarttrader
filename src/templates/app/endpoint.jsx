import React from 'react';
import { Fieldset, FormRow } from '../_common/components/forms.jsx';

const Endpoint = () => (
    <div className='endpoint-config static-page-layout  static_full'>
        <div className='static-content'>
            <h1>{it.L('Change API Endpoint')}</h1>
            <div className='gr-padding-10'>
                <form id='frm_endpoint'>
                    <Fieldset legend={it.L('Details')}>
                        <FormRow
                            id='server_url'
                            className='input-class'
                            type='text'
                            label={it.L('Server')}
                            attributes={{ maxLength: 30 }}
                            hint={it.L('e.g. frontend.derivws.com')}
                        />
                        <FormRow
                            id='app_id'
                            className='input-class'
                            type='text'
                            label={it.L('OAuth App ID')}
                            attributes={{ maxLength: 7 }}
                            hint={it.L(
                                'You have to register and get App ID before you can use different OAuth server for authentication. For more information refer to OAuth details on https://api.deriv.com/.'
                            )}
                        />
                    </Fieldset>
                    <div className='center-text'>
                        <button
                            className='button submit-button'
                            id='new_endpoint'
                            type='submit'
                        >
                            {it.L('Submit')}
                        </button>
                        <a className='button' id='reset_endpoint'>
                            <span className='button'>
                                {it.L('Reset to original settings')}
                            </span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

export default Endpoint;
