import React from 'react';
import { BreakpointProvider, CustomDropdown, DropdownItem, useDropdown } from '@deriv-com/quill-ui';

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
                        close();
                    }}
                />
            ))}
        </div>
    );
};

export const NumbersDropdown = ({ value, label, start, end, elementId, onUpdate }) => (
    <BreakpointProvider>
        <CustomDropdown value={value} label={label}>
            <Content
                value={value}
                start={start}
                end={end}
                elementId={elementId}
                onUpdate={onUpdate}
            />
        </CustomDropdown>
    </BreakpointProvider>
);
