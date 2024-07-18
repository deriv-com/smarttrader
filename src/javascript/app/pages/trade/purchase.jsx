/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Button, CaptionText, Text, Tooltip } from '@deriv-com/quill-ui';
import { getElementById } from '../../../_common/common_functions';
import { usePurchaseChange } from '../../hooks/events';
import purchaseManager from '../../common/purchase_manager';
import { localize } from '../../../_common/localize';

const Purchase = () => {
    const hasPurchaseChange  = usePurchaseChange();
    const [data,setData] = useState({});
 
    useEffect(() => {
        setData(oldData => ({
            ...oldData,
            ...purchaseManager.getAll(),
        }));
        // console.log(purchaseManager.getAll);
    }, [hasPurchaseChange]);

    const displayCurrency = (referenceField) => referenceField !== '-' ? data?.currency : '';

    const ButtonTooltipWrapper = (button,description) => {
        if (!description || description === '' || data?.isPurchaseFormDisabled){
            return button;
        }
        return (
            <Tooltip
                actionText='label'
                as='div'
                tooltipContent={
                    <span className='purchase-tooltip'>{description}</span>
                }
                tooltipPosition='top'
                variant='base'
            >
                {button}
            </Tooltip>
        );
    };

    // console.log(data)

    const purchase = (id) => document.getElementById(id).click();

    return (
        <div className={`quill-purchase-section ${data?.isPurchaseFormDisabled && 'disabled'}`}>
            <div className='purchase-box'>
                <div className='purchase-header'>
                    <div className='purchase-icon-box'>
                        <div className={`contract_heading ${data?.topContractType}`} />
                        <Text size='md' centered bold> {data?.topDisplayText}</Text>
                    </div>
                    <div className='purchase-body-box'>
                        <div className='purchase-amount-box'>
                            <div className='purchase-amount-info-box'>
                                <Text size='md'>{localize('Stake')}:</Text>
                                <Text size='md' className={data.topAmountClassname} bold>{data?.topAmount} {displayCurrency(data?.topAmount)}</Text>
                            </div>
                            <div className='purchase-amount-info-box'>
                                <Text size='md'>{localize('Payout')}:</Text>
                                <Text size='md' className={data.topPayoutAmountClassname} bold>{data?.topPayoutAmount} {displayCurrency(data?.topPayoutAmount)}</Text>
                            </div>
                        </div>
                        <div className='purchase-btn-box'>
                            {ButtonTooltipWrapper(<Button onClick={() => purchase('purchase_button_top')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.topPurchaseDisabled} />,data?.topDescription)}
                        </div>
                    </div>
                </div>
                <div className='purchase-footer'>
                    <CaptionText centered dangerouslySetInnerHTML={{ __html: data?.topComment }} />
                </div>
            </div>
            <div className='purchase-box'>
                <div className='purchase-header'>
                    <div className='purchase-icon-box'>
                        <div className={`contract_heading ${data?.bottomContractType}`} />
                        <Text size='md' centered bold> {data?.bottomDisplayText}</Text>
                    </div>
                    <div className='purchase-body-box'>
                        <div className='purchase-amount-box'>
                            <div className='purchase-amount-info-box'>
                                <Text size='md'>{localize('Stake')}:</Text>
                                <Text size='md' className={data.bottomAmountClassname} bold>{data?.bottomAmount} {displayCurrency(data?.bottomAmount)}</Text>
                            </div>
                            <div className='purchase-amount-info-box'>
                                <Text size='md'>{localize('Payout')}:</Text>
                                <Text size='md'  className={data.bottomPayoutAmountClassname} bold>{data?.bottomPayoutAmount} {displayCurrency(data?.bottomPayoutAmount)}</Text>
                            </div>
                        </div>
                        <div className='purchase-btn-box'>
                            {ButtonTooltipWrapper(<Button onClick={() => purchase('purchase_button_bottom')}  color='sell' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.bottomPurchaseDisabled} />,data?.bottomDescription)}
                        </div>
                    </div>
                </div>
                <div className='purchase-footer'>
                    <CaptionText centered dangerouslySetInnerHTML={{ __html: data?.bottomComment }} />
                </div>
            </div>
        </div>
    );
};

export const init = () => {
    ReactDOM.render(
        <Purchase />,
        getElementById('purchase_container')
    );
};

export default init;
