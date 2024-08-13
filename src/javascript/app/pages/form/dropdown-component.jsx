import React from 'react';
import { CustomDropdown, DropdownItem, useDropdown } from '@deriv-com/quill-ui';
import { setDefaultParams } from '../../common/helpers';

const DropdownContent = ({ options, value, onUpdate, element_id }) => {
    const { close } = useDropdown();

    const handleClick = (val) => {
        if (element_id === 'expiry_date') {
            onUpdate(val);
        } else {
            onUpdate(element_id, val, 'change');
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
                        setDefaultParams(element_id, item.value);
                        close();
                    }}
                />
            ))}
        </div>
    );
};
export const DropdownComponent = ({ label = '', options, value, onUpdate, element_id }) => (
    <CustomDropdown
        value={value}
        label={label}
        fullHeightOnOpen={false}
    >
        <DropdownContent
            options={options}
            value={value}
            onUpdate={onUpdate}
            element_id={element_id}
        />
    </CustomDropdown>
);
