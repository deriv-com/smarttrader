import React from 'react';
import { BreakpointProvider, CustomDropdown, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';

const CurrencyContent = ({ currency_list, currency, onUpdate, elementId }) => {
    const { close } = useDropdown();

    return (
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
                                onUpdate(elementId, item.value, 'change');
                                close();
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
export const CurrencyDropdown = ({ currency_list, currency, onUpdate, elementId }) => (
    <BreakpointProvider>
        <CustomDropdown value={currency}>
            <CurrencyContent
                currency_list={currency_list}
                currency={currency}
                onUpdate={onUpdate}
                elementId={elementId}
            />
        </CustomDropdown>
    </BreakpointProvider>
);
