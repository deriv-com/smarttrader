import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { FormComponent } from './form_component';
import { getElementById } from '../../../_common/common_functions';
import {
    useContractChange,
    useMarketChange,
    useSessionChange,
    useTradeChange,
} from '../../hooks/events';
// import Defaults, { PARAM_NAMES } from '../trade/defaults';
import tradeManager from '../../common/trade_manager';

const ContractFormWrapper = () => {
    const [tradeData, setTradeData] = useState({});
    const hasTradeChange = useTradeChange();
    const hasContractChange = useContractChange();
    const hasMarketChange = useMarketChange();
    const hasSessionChange = useSessionChange();

    useEffect(() => {
        // setFormName(Defaults.get(PARAM_NAMES.FORM_NAME));

        // setStartDates(JSON.parse(sessionStorage.getItem('start_dates')));
    }, [hasContractChange, hasMarketChange, hasSessionChange]);

    useEffect(() => {
        setTradeData((oldData) => ({
            ...oldData,
            ...tradeManager.getAll(),
        }));
    }, [hasTradeChange, hasSessionChange]);

    // const [formName, setFormName] = useState(Defaults.get(PARAM_NAMES.FORM_NAME));
    // const [expiry_type, setExpiryType] = useState(Defaults.get(PARAM_NAMES.EXPIRY_TYPE) || 'duration');
    // const [startDates, setStartDates] = useState({});

    // const { EXPIRY_TYPE, DURATION_UNITS } = Defaults.PARAM_NAMES;

    // console.log(DURATION_UNITS);
    // console.log(Defaults.get(PARAM_NAMES.DURATION_UNITS));

    const handleStartTime = (value) => {
        console.log('Start Time selected:', value);
    };

    const handleExpiryType = (value) => {
        // Defaults.set(EXPIRY_TYPE, value);
        // setExpiryType(value);
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

    return (
        <FormComponent
            // formName={formName}
            handlers={handlers}
            // expiryType={expiry_type}
            tradeData={tradeData}
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
