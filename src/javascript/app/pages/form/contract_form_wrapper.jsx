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

    const handleStartTime = (value) => {
        console.log('Start Time selected:', value);
    };

    const handleSelect = (value) => {
        console.log('Option selected:', value);
    };

    const handleDateSelect = (value) => {
        console.log('Date selected:', value);
    };

    const handlers = {
        handleStartTime,
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
