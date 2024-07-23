import { Divider, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';
import React, { useEffect, useState } from 'react';
import { triggerContractChange, useContractChange } from '../../../hooks/events';
import contractManager from '../../../common/contract_manager';
import Defaults, { PARAM_NAMES } from '../defaults';

export const ContractDropdown = () => {
    const { close } = useDropdown();
    const hasContractChange  = useContractChange();
    const [data,setData] = useState(contractManager.getAll());
 
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
    
    return (
        <div className='quill-market-dropdown-container'>
            <div className='quill-market-dropdown-item-container'>
                { data?.contractsTree?.map((contract, idx) => {
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
                                        size='sm'
                                        className='contract-item-clickables'
                                    />))}
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
                                size='sm'
                                className='contract-item-clickables'
                            />
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
