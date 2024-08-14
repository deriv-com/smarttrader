import { Divider, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';
import React, { useEffect, useRef, useState } from 'react';
import { triggerContractChange, useContractChange } from '../../../hooks/events';
import dataManager from '../../../common/data_manager';
import Defaults, { PARAM_NAMES } from '../defaults';

export const ContractDropdown = () => {
    const { close } = useDropdown();
    const has_contract_change  = useContractChange();
    const [data, setData] = useState(dataManager.getAllContracts());
    const selectedRef = useRef(null);
    const containerRef = useRef(null);
    const closeDropdownTimer = useRef();

    const onContractClick = (form_name) => {
        if (form_name === data?.form_name) {
            close();
            return;
        }

        const contract_element = data?.contract_element;

        if (contract_element) {
            const event = new Event('change');
            contract_element.value = form_name;
            contract_element.dispatchEvent(event);
        }

        Defaults.set(PARAM_NAMES.FORM_NAME, form_name);

        dataManager.setContract({
            form_name,
        });

        triggerContractChange();

        closeDropdownTimer.current = setTimeout(() => {
            close();
        }, 10);
    };

    useEffect(() => () => clearTimeout(closeDropdownTimer.current), []);

    useEffect(() => {
        setData(oldData => ({
            ...oldData,
            ...dataManager.getAllContracts(),
        }));
    }, [has_contract_change]);

    useEffect(() => {
        if (selectedRef.current && containerRef.current) {
            const selectedRect = selectedRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const offset = 96;
            if (selectedRect.top < containerRect.top + offset || selectedRect.bottom > containerRect.bottom) {
                containerRef.current.scrollTo({
                    top     : containerRef.current.scrollTop + selectedRect.top - containerRect.top - offset,
                    behavior: 'auto',
                });
            }
        }
    }, [data]);

    return (
        <div className='quill-market-dropdown-container' >
            <div className='quill-market-dropdown-item-container' ref={containerRef}>
                {data?.contractsTree?.map((contract, idx) => {
                    if (typeof contract === 'object') {
                        return (
                            <React.Fragment key={idx}>
                                <DropdownTitle label={data?.contracts[contract[0]]} />
                                {contract[1].map((subtype, i) => (
                                    <DropdownItem
                                        key={i}
                                        onClick={() => onContractClick(subtype)}
                                        label={data?.contracts[subtype]}
                                        selected={subtype === data?.form_name}
                                        size='md'
                                        className='trade-item-selected'
                                        ref={subtype === data?.form_name ? selectedRef : null}
                                    />
                                )
                                )}
                                <Divider />
                            </React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment key={idx}>
                            <DropdownTitle label={data?.contracts[contract]} />
                            <DropdownItem
                                onClick={() => onContractClick(contract)}
                                label={data?.contracts[contract]}
                                selected={contract === data?.form_name}
                                size='md'
                                className='contract-item-clickables'
                                ref={contract === data?.form_name ? selectedRef : null}
                            />
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
