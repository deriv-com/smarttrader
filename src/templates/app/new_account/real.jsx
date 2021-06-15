import React from 'react';
import PepDeclaration from '../_includes/pep_declaration.jsx';
import ProfessionalClient from '../_includes/professional_client.jsx';
import { Fieldset, FormRow } from '../../_common/components/forms.jsx';
import {
    Salutation,
    FirstName,
    LastName,
    DateOfBirth,
    Citizenship,
    Residence,
    AccountOpeningReason,
    AddressLine1,
    AddressLine2,
    AddressCity,
    AddressPostcode,
    AddressState,
    Jurisdiction,
    Phone,
    RiskDisclaimer,
    SecretQuestion,
    SecretAnswer,
    ClientMessage,
    Tnc,
} from '../../_common/components/forms_common_rows.jsx';

const Real = () => (
    <div className='gr-12 static_full'>
        <h1>{it.L('Real Money Account Opening')}</h1>
        <div className='notice-msg invisible' id='ukgc_age_verification'>
            <p>{it.L('Please complete the Real Account form to verify your age as required by the [_1]UK Gambling[_2] Commission (UKGC).', '<strong>', '</strong>')}</p>
        </div>
        <form id='frm_real' className='gr-padding-10'>
            <Fieldset legend={it.L('Details')}>
                <Salutation className='input-disabled' />
                <FirstName className='input-disabled' />
                <LastName className='input-disabled' />
                <DateOfBirth className='input-disabled' />
                <Citizenship row_class='invisible' />
                <div className='place_of_birth_container'>
                    <FormRow type='select' id='place_of_birth' label={it.L('Place of birth')} attributes={{ single: 'single' }} />
                </div>
                <Residence />
                <Phone />
                <AccountOpeningReason />
            </Fieldset>

            <Fieldset id='address_form' legend={it.L('Address')}>
                <p className='hint'>{it.L('Please enter your full home address to avoid authentication delays.')}</p>
                <AddressLine1 />
                <AddressLine2 />
                <AddressCity />
                <AddressState />
                <AddressPostcode />
                <p className='gr-10 gr-centered notice-msg center-text'>{it.L('Please ensure that your address is complete and accurate.')}</p>
            </Fieldset>

            <Fieldset legend={it.L('Security')} className='security'>
                <SecretQuestion />
                <SecretAnswer />
            </Fieldset>

            <PepDeclaration />
            <ProfessionalClient />
            <Jurisdiction />
            <div className='invisible' id='risk_disclaimer'>
                <RiskDisclaimer />
            </div>

            <Tnc />
        </form>

        <ClientMessage />
    </div>
);

export default Real;
