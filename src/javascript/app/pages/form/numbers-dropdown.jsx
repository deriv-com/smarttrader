import React from 'react';
import { CustomDropdown, DropdownItem, useDropdown } from '@deriv-com/quill-ui';
import { setDefaultParams } from '../../common/helpers';

const Content = ({ value, start, end, elementId, onUpdate }) => {
    const { close } = useDropdown();

    return (
        <div className='custom-dropdown-wrapper'>
            {Array.from({ length: end - start + 1 }).map((x, idx) => (
                <DropdownItem
                    key={start + idx}
                    label={start + idx}
                    selected={start + idx === +value}
                    onClick={() => {
                        onUpdate(elementId, start + idx, 'change');
                        setDefaultParams(elementId, start + idx);
                        close();
                    }}
                />
            ))}
        </div>
    );
};

export const NumbersDropdown = ({ value, label, start, end, elementId, onUpdate }) => (
    <CustomDropdown
        value={value}
        label={label}
        fullHeightOnOpen={false}
        containerClassName='input-wrapper-container'
    >
        <Content
            value={value}
            start={start}
            end={end}
            elementId={elementId}
            onUpdate={onUpdate}
        />
    </CustomDropdown>
);
