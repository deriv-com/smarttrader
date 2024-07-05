import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { FormComponent } from './form_component';
import { getElementById } from '../../../_common/common_functions';
import { useContractChange, useMarketChange } from '../../hooks/events';
import Defaults, { PARAM_NAMES } from '../trade/defaults';

const ContractFormWrapper = () => {
    // const { contracts, contracts_tree, selected } = props;
    // console.log(props);
    
    const hasContractChange = useContractChange();
    const hasMarketChange = useMarketChange();

    const [formName, setFormName] = useState(Defaults.get(PARAM_NAMES.FORM_NAME));
    const [expiry_type, setExpiryType] = useState(Defaults.get(PARAM_NAMES.EXPIRY_TYPE) || 'duration');

    const { EXPIRY_TYPE, DURATION_UNITS } = Defaults.PARAM_NAMES;

    console.log(DURATION_UNITS);
    console.log(Defaults.get(PARAM_NAMES.DURATION_UNITS));

    const handleStartTime = (value) => {
        console.log('Start Time selected:', value);
    };

    const handleExpiryType = (value) => {
        Defaults.set(EXPIRY_TYPE, value);
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
    }, [hasContractChange, hasMarketChange]);

    return (
        <FormComponent
            formName={formName}
            handlers={handlers}
            expiryType={expiry_type}
        />
    );
};

export const init = (contracts, contracts_tree, selected) => {
    ReactDOM.render(
        <ContractFormWrapper contracts={contracts} contracts_tree={contracts_tree} selected={selected} />,
        getElementById('contract_forms_wrapper')
    );
};

export default init;
