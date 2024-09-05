import React from 'react';
import ReactDOM from 'react-dom';
// import { FormComponent } from './form-component.jsx';
import ModalTest from './modal.test.jsx';
import { getElementById } from '../../../_common/common_functions.js';

export const init = () => {
    // ReactDOM.render(<FormComponent />, getElementById('contract_forms_wrapper'));
    ReactDOM.render(
        <ModalTest />,
        getElementById('contract_forms_wrapper')
    );
};

export default init;
