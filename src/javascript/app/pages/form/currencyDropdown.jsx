import React from 'react';
import { BreakpointProvider, CustomDropdown, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';

const CurrencyContent = ({ currency_list, currency, onUpdate }) => {
    const { close } = useDropdown();

    return (
        <CustomDropdown value={currency}>
            <div className='custom-dropdown-wrapper'>
                {Object.keys(currency_list).map((key) => (
                    <div key={key}>
                        <DropdownTitle label={key.toLocaleUpperCase()} />
                        {currency_list[key].map((item) => (
                            <DropdownItem
                                key={item.value}
                                label={item.text}
                                selected={item.value === currency}
                                onClick={() => {
                                    onUpdate('currency', item.value, 'change');
                                    close();
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </CustomDropdown>
    );
};
export const CurrencyDropdown = ({ currency_list, currency, onUpdate }) => (
    <BreakpointProvider>
        <CurrencyContent
            currency_list={currency_list}
            currency={currency}
            onUpdate={onUpdate}
        />
    </BreakpointProvider>
);
