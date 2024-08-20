import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BreakpointProvider,
    CustomDropdown,
} from '@deriv-com/quill-ui';
import { MarketsDropdown, getContractName, getMarketName } from './markets-dropdown.jsx';
import { ContractDropdown } from './contracts-dropdown.jsx';
import { getElementById } from '../../../../_common/common_functions';
import { localize } from '../../../../_common/localize';
import { useContractChange, useMarketChange } from '../../../hooks/events.js';

const MarketSelector = () => {
    const [market_label, setMarketLabel] = useState(getMarketName());
    const [tradeTypeLabel, setTradeTypeLabel] = useState(getContractName());
    const has_contract_change = useContractChange();
    const has_market_change = useMarketChange();
  
    useEffect(() => {
        setTradeTypeLabel(getContractName());
    }, [has_contract_change]);

    useEffect(() => {
        setMarketLabel(getMarketName());
    }, [has_market_change]);

    return (
        <BreakpointProvider>
            <div className='quill-market-selector-container'>
                <CustomDropdown
                    containerClassName='quill-market-selector-dropdown'
                    label={localize('Market')}
                    value={market_label}
                >
                    <MarketsDropdown />
                </CustomDropdown>
                <CustomDropdown
                    containerClassName='quill-market-selector-dropdown quill-custom-contract-dropdown'
                    label={localize('Trade types')}
                    value={tradeTypeLabel}
                >
                    <ContractDropdown />
                </CustomDropdown>
            </div>
        </BreakpointProvider>
    );
};

export const init = () => {
    ReactDOM.render(
        <MarketSelector />,
        getElementById('markets-dropdown-container')
    );
};

export default init;
