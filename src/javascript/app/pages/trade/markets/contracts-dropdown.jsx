import { Divider, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';
import React, { useEffect, useRef, useState } from 'react';
import { triggerContractChange, triggerSessionChange, useContractChange } from '../../../hooks/events';
import contractManager from '../../../common/contract_manager';
import Defaults, { PARAM_NAMES } from '../defaults';

export const ContractDropdown = () => {
    const { close } = useDropdown();
    const hasContractChange  = useContractChange();
    const [data, setData] = useState(contractManager.getAll());
    const selectedRef = useRef(null);
    const containerRef = useRef(null);

    const onContractClick = (formName) => {
        if (formName === data?.formName) { return; }

        const contractElement = data?.contractElement;

        if (contractElement){
            const event = new Event('change');
            contractElement.value = formName;
            contractElement.dispatchEvent(event);
        }

        Defaults.set(PARAM_NAMES.FORM_NAME,formName);

        contractManager.set({
            formName,
        });

        triggerContractChange();
        triggerSessionChange();

        setTimeout(() => {
            close();
        }, 10);
      
    };

    useEffect(() => {
        setData(oldData => ({
            ...oldData,
            ...contractManager.getAll(),
        }));
    }, [hasContractChange]);

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
                                        selected={subtype === data?.formName}
                                        size='md'
                                        className='trade-item-selected'
                                        ref={subtype === data?.formName ? selectedRef : null}
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
                                selected={contract === data?.formName}
                                size='md'
                                className='contract-item-clickables'
                                ref={contract === data?.formName ? selectedRef : null}
                            />
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
