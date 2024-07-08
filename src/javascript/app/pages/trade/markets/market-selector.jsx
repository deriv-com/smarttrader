import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BreakpointProvider,
    CustomDropdown,
    useDropdown,
} from '@deriv-com/quill-ui';
import { MarketsDropdown, getMarketName } from './markets-dropdown.jsx';
import { getElementById } from '../../../../_common/common_functions';
import { localize } from '../../../../_common/localize';
import { useContractChange, useMarketChange } from '../../../hooks/events.js';
import Defaults, { PARAM_NAMES } from '../defaults.js';

const Contracts = () => {
    const { close } = useDropdown();
    useEffect(() => {
        document
            .querySelectorAll('.contract-item-clickables')
            .forEach((element) => {
                element.addEventListener('click', () => {
                    close();
                });
            });
    }, []);

    return <div id='contract-injection-container' />;
};

const MarketSelector = () => {
    const [marketLabel, setMarketLabel] = useState(getMarketName());
    const [tradeTypeLabel, setTradeTypeLabel] = useState('');
    const hasContractChange = useContractChange();
    const hasMarketChange = useMarketChange();

    const observeContractDropdown = () => {
        const contractItem = document.getElementById('contract_component');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const parentElement = document.querySelector(
                    '.quill-custom-contract-dropdown .quill-custom-dropdown__content'
                );

                mutation.removedNodes.forEach((node) => {
                    if (node === parentElement) {
                        document
                            .getElementById('tradetype-dropdown')
                            .appendChild(contractItem);
                    }
                });

                mutation.addedNodes.forEach((node) => {
                    if (node === parentElement) {
                        const customDropdownContainer = document.getElementById(
                            'contract-injection-container'
                        );

                        if (customDropdownContainer) {
                            customDropdownContainer.appendChild(contractItem);
                        }
                    }
                });
            });
        });

        // If on tablet or mobile directly inject the contracts to action sheet
        const injectionContainer = document.getElementById(
            'contract-injection-container'
        );

        if (injectionContainer){
            injectionContainer.appendChild(contractItem);
        }

        observer.observe(document.body, { childList: true, subtree: true });
        return observer;
    };

    useEffect(() => {
        const contractName = decodeURIComponent(
            Defaults.get(PARAM_NAMES.CONTRACT_NAME)
        );
        setTradeTypeLabel(contractName);
    }, [hasContractChange]);

    useEffect(() => {
        setMarketLabel(getMarketName());
    }, [hasMarketChange]);

    useEffect(() => {
        const observer = observeContractDropdown();

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <BreakpointProvider>
            <div className='quill-market-selector-container'>
                <CustomDropdown
                    containerClassName='quill-market-selector-dropdown'
                    label={localize('Market')}
                    value={marketLabel}
                    id='market-dropdown'
                >
                    <MarketsDropdown />
                </CustomDropdown>
                <CustomDropdown
                    containerClassName='quill-market-selector-dropdown quill-custom-contract-dropdown'
                    label={localize('Trade types')}
                    value={tradeTypeLabel}
                >
                    <Contracts />
                </CustomDropdown>
                <div id='tradetype-dropdown'>
                    <div id='contract_component' className='contract-dropdown' />
                </div>
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
