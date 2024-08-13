import React from 'react';
import { CustomDropdown, DropdownItem, DropdownTitle, useDropdown } from '@deriv-com/quill-ui';
import { setDefaultParams } from '../../common/helpers';
import { localize } from '../../../_common/localize';

const CurrencyContent = ({ currency_list, currency, onUpdate, element_id }) => {
    const { close } = useDropdown();

    const getCurrencyGroupMap = {
        fiat  : localize('Fiat'),
        crypto: localize('Crypto'),
    };

    return (
        <div className='custom-dropdown-wrapper'>
            {Object.keys(currency_list).map((key) => (
                <div key={key}>
                    <DropdownTitle label={getCurrencyGroupMap[key]} />
                    {currency_list[key].map((item) => (
                        <DropdownItem
                            key={item.value}
                            label={item.text}
                            selected={item.value === currency}
                            onClick={() => {
                                onUpdate(element_id, item.value, 'change');
                                setDefaultParams(element_id, item.value);
                                close();
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
export const CurrencyDropdown = ({ currency_list, currency, onUpdate, element_id }) => (
    <CustomDropdown
        value={currency}
        fullHeightOnOpen={false}
    >
        <CurrencyContent
            currency_list={currency_list}
            currency={currency}
            onUpdate={onUpdate}
            element_id={element_id}
        />
    </CustomDropdown>
);
