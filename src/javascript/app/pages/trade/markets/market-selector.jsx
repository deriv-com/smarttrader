import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CustomDropdown } from '@deriv-com/quill-ui';
import { MarketsDropdown, getMarketName } from './markets-dropdown.jsx';
import { getElementById } from '../../../../_common/common_functions';
import { localize } from '../../../../_common/localize';
import { useContractChange, useMarketChange } from '../../../hooks/events.js';
import Defaults, { PARAM_NAMES } from '../defaults.js';

const MarketSelector = () => {
    const [marketLabel, setMarketLabel] = useState(getMarketName());
    const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
    const [isContractDropdownOpen, setIsContractDropdownOpen] = useState(false);
    const [tradeTypeLabel, setTradeTypeLabel] = useState('');
    const hasContractChange = useContractChange();
    const hasMarketChange = useMarketChange();

    const contractDropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (
            contractDropdownRef.current &&
      !contractDropdownRef.current.contains(event.target)
        ) {
            setIsContractDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const contractName = decodeURIComponent(
            Defaults.get(PARAM_NAMES.CONTRACT_NAME)
        );
        setTradeTypeLabel(contractName);
        setIsContractDropdownOpen(false);
    }, [hasContractChange]);

    useEffect(() => {
        setMarketLabel(getMarketName());
        setMarketDropdownOpen(false);
    }, [hasMarketChange]);

    return (
        <div className='quill-market-selector-container'>
            <CustomDropdown
                containerClassName='quill-market-selector-dropdown'
                label={localize('Market')}
                value={marketLabel}
            >
                <MarketsDropdown />
            </CustomDropdown>
            <div ref={contractDropdownRef} className='quill-market-selector-dropdown'>
                <CustomDropdown
                    label={localize('Trade types')}
                    value={tradeTypeLabel}
                    onClickDropdown={() => setIsContractDropdownOpen((e) => !e)}
                />
                <div
                    id='contract_component'
                    className={`contract-dropdown ${
                        isContractDropdownOpen && 'contract-dropdown-open'
                    }`}
                />
            </div>
        </div>
    );
};

export const init = () => {
    ReactDOM.render(
        <MarketSelector />,
        getElementById('markets-dropdown-container')
    );
};

export default init;
