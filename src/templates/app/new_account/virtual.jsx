import React from 'react';
import { FormRow, Fieldset } from '../../_common/components/forms.jsx';
import FormVerificationCode from '../_includes/form_verification_code.jsx';

const Virtual = () => (
    <div className='gr-12 static_full'>
        <h1>{it.L('Create New Virtual-money Account')}</h1>

        <FormVerificationCode />

        <form id='virtual-form' className='gr-padding-10 invisible'>
            <Fieldset legend={it.L('Details')}>
                <FormRow type='select' id='residence' className='invisible' label={it.L('Country of residence')} attributes={{ single: 'single' }}  />
                <FormRow
                    autoComplete='new-password'
                    type='password'
                    has_password_meter
                    id='client_password'
                    label={it.L('New password')}
                />

                <div className='gr-8 gr-push-4 gr-12-m gr-push-0-m center-text-m'>
                    <p className='hint password--hint'>
                        {it.L('Strong passwords contain at least 8 characters, combine uppercase and lowercase letters, numbers, and symbols.')}
                    </p>
                </div>

                <FormRow
                    type='checkbox'
                    checked
                    id='email_consent'
                    row_class='invisible'
                    label_row_id='email_consent_label'
                    label={it.L('Receive news and special offers')}
                />
            </Fieldset>

            <div className='center-text'>
                <button className='button' type='submit'>{it.L('Create new virtual-money account')}</button>
                <p className='errorfield invisible' id='error-account-opening' />
            </div>
        </form>
    </div>
);

export default Virtual;
