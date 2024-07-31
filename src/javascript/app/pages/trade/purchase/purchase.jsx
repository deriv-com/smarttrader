/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Button, CaptionText,  Skeleton, Text, Tooltip } from '@deriv-com/quill-ui';
import {  LabelPairedXmarkMdRegularIcon } from '@deriv/quill-icons/LabelPaired';
import ContractDetails from './contract-details';
import Defaults, { PARAM_NAMES } from '../defaults';
import { getElementById } from '../../../../_common/common_functions';
import { useContractChange, usePurchaseChange } from '../../../hooks/events';
import purchaseManager from '../../../common/purchase_manager';
import { localize } from '../../../../_common/localize';

import { parseData, triggerClick } from '../../../common/helpers';

const Purchase = () => {
    const hasPurchaseChange  = usePurchaseChange();
    const hasContractChange  = useContractChange();

    const [data,setData] = useState({});
    const [isLookBack,setIsLookBack] = useState(false);
    const [showPopup,setShowPopup] = useState(false);
    
    const isloading = () => !data?.topAmount && !data?.middleAmount && !data?.bottomAmount;
 
    useEffect(() => {
        const newData = purchaseManager.getAll();

        setShowPopup(!!newData?.showContractDetailsPopup);
        setData(oldData => ({
            ...oldData,
            ...newData,
        }));
    }, [hasPurchaseChange]);

    useEffect(() => {
        const formName = Defaults.get(PARAM_NAMES.FORM_NAME);

        const lookbacks = ['lookbacklow','lookbackhigh','lookbackhighlow'];

        setIsLookBack(lookbacks.includes(formName));
      
    },[hasContractChange]);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
       
        return () => {
            document.body.style.overflow = '';
        };
    }, [showPopup]);

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

    if (showPopup){
        return <ContractDetails />;
    }

    if (isloading() || (!data?.showPurchaseResults && data?.isPurchaseFormDisabled)){
        return (
            <div className='quill-purchase-section'>
                <Skeleton.Square rounded fullWidth height={30} />
                <Skeleton.Square rounded fullWidth height={130} />
                {!isLookBack && (
                    <>
                        <Skeleton.Square rounded fullWidth height={30} />
                        <Skeleton.Square rounded fullWidth height={130} />
                    </>
                )}
            </div>);
    }
  
    if (!data?.showPurchaseResults){
        return (
            <div className={`quill-purchase-section ${data?.isPurchaseFormDisabled && 'disabled'}`}>
                {data?.showMidPurchase ? (
                    <div className='purchase-box'>
                        <div className='purchase-header'>
                            <div className='purchase-icon-box'>
                                <div className={`contract_heading ${data?.middleContractType}`} />
                                <Text size='md' centered bold> {data?.middleDisplayText}</Text>
                            </div>
                            <div className='purchase-body-box'>
                                <div className='purchase-amount-box'>
                                    <div className='purchase-amount-info-box'>
                                        <Text size='md'>{localize('Stake')}:</Text>
                                        <Text size='md' className={data.middleAmountClassname} bold>{data?.middleAmount} {displayCurrency(data?.middleAmount)}</Text>
                                    </div>
                                    <div className='purchase-amount-info-box'>
                                        <Text size='md'>{localize('Multiplier')}:</Text>
                                        <Text size='md' bold>{data?.middleMultiplier} {displayCurrency(data?.middleMultiplier)}</Text>
                                    </div>
                                </div>
                                <div className='purchase-btn-box'>
                                    {ButtonTooltipWrapper(<Button onClick={() => triggerClick('#purchase_button_middle')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.middlePurchaseDisabled} />,data?.middleDescription)}
                                </div>
                            </div>
                        </div>
                        <div className='purchase-footer'>
                            <CaptionText centered >{parseData(data.middleComment)}</CaptionText>
                        </div>
                    </div>
                ) : (
                    <>
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
                                        {ButtonTooltipWrapper(<Button onClick={() => triggerClick('#purchase_button_top')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.topPurchaseDisabled} />,data?.topDescription)}
                                    </div>
                                </div>
                            </div>
                            <div className='purchase-footer'>
                                <CaptionText centered >{parseData(data.topComment)}</CaptionText>
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
                                        {ButtonTooltipWrapper(<Button onClick={() => triggerClick('#purchase_button_bottom')}  color='sell' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.bottomPurchaseDisabled} />,data?.bottomDescription)}
                                    </div>
                                </div>
                            </div>
                                
                            <div className='purchase-footer'>
                                <CaptionText centered >{parseData(data.bottomComment)}</CaptionText>
                            </div>
                            
                        </div>
                    </>
                )}
            </div>
        );
    }

    if (data?.error){
        return (
            <div className='quill-purchase-section-results'>
                <div className='top-box'>
                    <div className='header-box'>
                        <Text size='xl'>{data?.error?.title}</Text>
                        <span
                            className='close-btn'
                            onClick={() => {
                                triggerClick('#close_confirmation_container');
                                purchaseManager.set({
                                    showPurchaseResults: false,
                                });
                            }}
                        >
                            <LabelPairedXmarkMdRegularIcon />
                        </span>
                    </div>
      
                    <div className='body-box'>
                        <div className='error-box'>
                            {data?.error?.isCustom ? (
                                <>
                                    {data?.error.code === 'AuthorizationRequired' && (
                                        <>
                                            <Button
                                                variant='primary'
                                                size='lg'
                                                label={localize('Open a free account')}
                                                onClick={() => window.location.href = data?.error.signupUrl}
                                            />
                                            <Text size='sm'>{localize('Already have an account?')}</Text>
                                            <Button variant='tertiary' size='lg' label={localize('Log in here')} onClick={() => triggerClick('#authorization_error_btn_login')} />
                                        </>
                                    )}
                                </>
                            ) : (
                                <span className='error-message'>
                                    <Text size='md' centered>{data?.error.message}</Text>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>);
    }

    return (
        <div className='quill-purchase-section-results'>
            <div className='top-box'>
                <div className='header-box'>
                    <Text size='xl'>{data?.pr_heading}</Text>
                    <span
                        className='close-btn'
                        onClick={() => {
                            triggerClick('#close_confirmation_container');
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
                        {data?.pr_tablePayoutValue && (
                            <div className='table-item'>
                                <Text size='sm' bold>{data?.pr_tablePayout}</Text>
                                <Text size='sm' centered >{parseData(data.pr_tablePayoutValue)}</Text>
                            </div>
                        )}
                        { data?.pr_tableCostValue && (
                            <div className='table-item'>
                                <Text size='sm' bold>{data?.pr_tableCost}</Text>
                                <Text size='sm' centered >{parseData(data.pr_tableCostValue)}</Text>
                            </div>
                        )}
                        { data?.pr_tableProfitValue && data?.pr_showTableProfit && (
                            <div className='table-item'>
                                <Text size='sm' bold>{data?.pr_tableProfit}</Text>
                                <Text size='sm' centered>{parseData(data.pr_tableProfitValue)}</Text>
                            </div>
                        )}
                    </div>
                    <div className='info-box'>
                        {data?.pr_barrier && <Text size='sm' >{parseData(data.pr_barrier)}</Text>}
                        {data?.pr_reference && <Text size='sm' >{parseData(data.pr_reference)}</Text>}
                        {data?.pr_showBtn && <Button
                            className='view-btn'
                            label={localize('View')}
                            onClick={() => {
                                triggerClick('#contract_purchase_button');
                            }}
                        />}
                    </div>
                </div>
         
                <div id='confirmation_message' className='analysis-box'>
                    <div id='contract_purchase_spots' />
                    <div id='trade_tick_chart' />
                    <div id='digit_ticker_table' className='digit-ticker invisible' />
                </div>
            </div>
            <div className='footer-box'>
                <CaptionText>{data?.pr_balance} </CaptionText>
                <CaptionText >{parseData(data.pr_balanceValue)}</CaptionText>
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
