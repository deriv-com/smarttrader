import React from 'react';
import ReactDOM from 'react-dom';
import { FormComponent } from './form_component.jsx';
import { getElementById } from '../../../_common/common_functions';

export const init = () => {
    ReactDOM.render(
        <FormComponent />,
        getElementById('contract_forms_wrapper')
    );
};

export default init;
