import React from 'react';
import { CustomDropdown, DropdownItem, useDropdown } from '@deriv-com/quill-ui';
import { setDefaultParams } from '../../common/helpers';

const Content = ({ value, start, end, element_id, onUpdate }) => {
    const { close } = useDropdown();

    return (
        <div className='custom-dropdown-wrapper'>
            {Array.from({ length: end - start + 1 }).map((x, idx) => (
                <DropdownItem
                    key={start + idx}
                    label={start + idx}
                    selected={start + idx === +value}
                    onClick={() => {
                        onUpdate(element_id, start + idx, 'change');
                        setDefaultParams(element_id, start + idx);
                        close();
                    }}
                />
            ))}
        </div>
    );
};

export const NumbersDropdown = ({ value, label, start, end, element_id, onUpdate }) => (
    <CustomDropdown
        value={value}
        label={label}
        fullHeightOnOpen={false}
    >
        <Content
            value={value}
            start={start}
            end={end}
            element_id={element_id}
            onUpdate={onUpdate}
        />
    </CustomDropdown>
);
