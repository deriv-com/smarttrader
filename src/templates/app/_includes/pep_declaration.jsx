import React from 'react';
import { Fieldset } from '../../_common/components/forms.jsx';

const PepDeclaration = ({ className, row_id }) => (
    <Fieldset
        legend={it.L('Real accounts are not available to politically exposed persons (PEPs).')}
        className={`fieldset_margin_top ${className}`}
        id={row_id}
    >
        <div className='gr-12'>
            <p>{it.L('A politically exposed person (PEP) is someone appointed with a prominent public position. Close associates and family members of a PEP are also considered to be PEPs.')}</p>
        </div>
        <div className='gr-padding-10 gr-12'>
            <input id='pep_declaration' type='checkbox' />
            <label htmlFor='pep_declaration'>
                {it.L('I am not a PEP, and I have not been a PEP in the last 12 months.')}
            </label>
        </div>
    </Fieldset>
);

export default PepDeclaration;
