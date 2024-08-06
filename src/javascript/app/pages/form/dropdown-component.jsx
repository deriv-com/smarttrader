import React from 'react';
import { CustomDropdown, DropdownItem, useDropdown } from '@deriv-com/quill-ui';

const DropdownContent = ({ options, value, onUpdate, elementId }) => {
    const { close } = useDropdown();

    const handleClick = (val) => {
        if (elementId === 'expiry_date') {
            onUpdate(val);
        } else {
            onUpdate(elementId, val, 'change');
        }
    };

    return (
        <div className='custom-dropdown-wrapper'>
            {options.map((item) => (
                <DropdownItem
                    key={item.value}
                    label={item.text}
                    selected={(item.value === value || item.text === value)}
                    onClick={() => {
                        handleClick(item.value);
                        close();
                    }}
                />
            ))}
        </div>
    );
};
export const DropdownComponent = ({ label = '', options, value, onUpdate, elementId }) => (
    <CustomDropdown
        value={value}
        label={label}
        fullHeightOnOpen={false}
    >
        <DropdownContent
            options={options}
            value={value}
            onUpdate={onUpdate}
            elementId={elementId}
        />
    </CustomDropdown>
);
