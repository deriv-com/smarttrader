/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Button, CaptionText, Text, Tooltip } from '@deriv-com/quill-ui';
// eslint-disable-next-line import/no-unresolved
import { LabelPairedXmarkMdRegularIcon } from '@deriv/quill-icons/LabelPaired';
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

    const triggerClick = (id) => document.getElementById(id).click();
  
    if (!data?.showPurchaseResults){
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
                                {ButtonTooltipWrapper(<Button onClick={() => triggerClick('purchase_button_top')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.topPurchaseDisabled} />,data?.topDescription)}
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
                                {ButtonTooltipWrapper(<Button onClick={() => triggerClick('purchase_button_bottom')}  color='sell' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.bottomPurchaseDisabled} />,data?.bottomDescription)}
                            </div>
                        </div>
                    </div>
                    <div className='purchase-footer'>
                        <CaptionText centered dangerouslySetInnerHTML={{ __html: data?.bottomComment }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='quill-purchase-section-results'>
            <div className='top-box'>
                <div className='header-box'>
                    <Text size='xl'>{data?.pr_heading}</Text>
                    <span
                        className='close-btn'
                        onClick={() => {
                            triggerClick('close_confirmation_container');
                            purchaseManager.set({
                                showPurchaseResults: false,
                            });
                        }}
                    >
                        <LabelPairedXmarkMdRegularIcon />
                    </span>
                </div>
                <div className='body-box'>
                    <div className='description-box'>
                        <Text size='sm'>{data?.pr_description}</Text>
                    </div>
                    <div className='table-box'>
                        <div className='table-item'>
                            <Text size='sm' bold>{data?.pr_tablePayout}</Text>
                            <Text size='sm' dangerouslySetInnerHTML={{ __html: data?.pr_tablePayoutValue }} />
                        </div>
                        <div className='table-item'>
                            <Text size='sm' bold>{data?.pr_tableCost}</Text>
                            <Text size='sm' dangerouslySetInnerHTML={{ __html: data?.pr_tableCostValue }} />
                        </div>
                        <div className='table-item'>
                            <Text size='sm' bold>{data?.pr_tableProfit}</Text>
                            <Text size='sm' dangerouslySetInnerHTML={{ __html: data?.pr_tableProfitValue }} />
                        </div>
                    </div>
                    <div className='info-box'>
                        {data?.pr_barrier && <Text size='sm' dangerouslySetInnerHTML={{ __html: data.pr_barrier }} />}
                        {data?.pr_reference && <Text size='sm' dangerouslySetInnerHTML={{ __html: data.pr_reference }} />}
                        {data?.pr_showBtn && <Button
                            className='view-btn'
                            label={localize('View')}
                            onClick={() => {
                                triggerClick('contract_purchase_button');
                            }}
                        />}
                    </div>
                </div>
           
                <div id='confirmation_message'>
                    <div id='contract_purchase_spots' />
                    <div id='trade_tick_chart' />
                    <div id='digit_ticker_table' className='digit-ticker invisible' />
                </div>
            </div>
            <div className='footer-box'>
                <CaptionText>{data?.pr_balance} </CaptionText>
                <CaptionText  dangerouslySetInnerHTML={{ __html: data?.pr_balanceValue }} />
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
