import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FormComponent } from './form_component.jsx';
import { getElementById } from '../../../_common/common_functions';
import {
    useSessionChange,
    useTradeChange,
} from '../../hooks/events';
import tradeManager from '../../common/trade_manager';

const ContractFormWrapper = () => {
    const [tradeData, setTradeData] = useState({});
    const hasTradeChange = useTradeChange();
    const hasSessionChange = useSessionChange();

    useEffect(() => {
        setTradeData((oldData) => ({
            ...oldData,
            ...tradeManager.getAll(),
        }));
    }, [hasTradeChange, hasSessionChange]);

    return (
        <FormComponent
            tradeData={tradeData}
        />
    );
};

export const init = () => {
    ReactDOM.render(
        <ContractFormWrapper />,
        getElementById('contract_forms_wrapper')
    );
};

export default init;
