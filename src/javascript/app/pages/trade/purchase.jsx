/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import parse from 'html-react-parser';
import {  Button, CaptionText, SectionMessage, Skeleton, Text, Tooltip } from '@deriv-com/quill-ui';
import { LabelPairedArrowLeftMdRegularIcon, LabelPairedXmarkMdRegularIcon } from '@deriv/quill-icons/LabelPaired';
import { StandaloneCircleInfoRegularIcon } from '@deriv/quill-icons/Standalone';
import Defaults, { PARAM_NAMES } from './defaults';
import Portal from './portal';
import { getElementById } from '../../../_common/common_functions';
import { useContractChange, usePurchaseChange } from '../../hooks/events';
import purchaseManager from '../../common/purchase_manager';
import { localize } from '../../../_common/localize';
import { getLocalTime } from '../../base/clock';

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

    const TimeTooltipWrapper = (element,time) => {
        const localTime = getLocalTime(time || '');
        return (
            <Tooltip
                as='div'
                tooltipContent={localTime}
                tooltipPosition='left'
                variant='base'
            >
                {element}
            </Tooltip>
        );
    };

    const parseData = (rawData) => {
        if (!rawData) return '';
        return parse(rawData);
    };
        
    const triggerClick = (id) => document.getElementById(id).click();

    if (showPopup){
        return (
            <Portal>
                <div className='quill-purchase-popup'>
                    {!data?.cd_description ? (
                        <div className='body-box'>
                            <div className='loader-box'>
                                <Skeleton.Square fullWidth height={24} rounded />
                                <div className='body-loader'>
                                    <Skeleton.Square fullWidth height={495} rounded />
                                    <Skeleton.Square width={'360px'} height={670} rounded />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='header-box'>
                                <Button
                                    variant='tertiary'
                                    size='lg'
                                    icon={<LabelPairedArrowLeftMdRegularIcon    />}
                                    color='black'
                                    onClick={() => {
                                        setShowPopup(false);
                                        purchaseManager.set({
                                            showContractDetailsPopup: false,
                                        });
                                    }}
                                />
                                <div className='title-box'>
                                    <Text size='md' bold>{localize('Contract Details')}</Text>
                                </div>
                                <Button variant='tertiary' size='lg' />
                            </div>
                            <div className='body-box'>
                                <div className='purchase-details-box'>
                                    <div className='details-title'>
                                        <Text size='md'>{data?.cd_description}</Text>
                                    </div>
                                    <div className='details-column'>
                                        <div className='chart-wrapper' id={data?.cd_chartId} />
                                        <div className='contract-info-wrapper'>
                                            <div className='table-box'>
                                                <Text size='md' bold centered>
                                                    {localize('Contract Information')}
                                                </Text>
                                            </div>
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{localize('Contract type')}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_contractType}</Text>
                                                </div>
                                            </div>
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{localize('Transaction ID')}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    {data?.cd_transaction_ids &&
                                                    Object.keys(data?.cd_transaction_ids).map(tik => {
                                                        const transactionName = (tik === 'buy') ? localize('Buy') : localize('Sell');
                                                        return (
                                                            <Text size='sm' key={`${transactionName}-${tik}`}>{data?.cd_transaction_ids[tik]} ({transactionName})</Text>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{localize('Start time')}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    {TimeTooltipWrapper(<Text size='sm'>{data?.cd_startTime}</Text>,data?.cd_startTime)}
                                                </div>
                                            </div>
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{localize('Remaining time')}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_remainingTime}</Text>
                                                </div>
                                            </div>
                                            {data?.cd_showEntrySpot && (
                                                <div className='table-box'>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{localize('Entry spot')}</Text>
                                                    </div>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{data?.cd_entrySpot}</Text>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_barrierLabel}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_barrier}</Text>
                                                </div>
                                            </div>
                                            {data?.cd_showBarrierReset && (
                                                <div className='table-box'>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{localize('Reset barrier')}</Text>
                                                    </div>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{data?.cd_barrierReset}</Text>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_payoutLabel}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    <Text size='sm'>{parseData(data.cd_payout)}</Text>
                                                </div>
                                            </div>
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{localize('Purchase price')}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    <Text size='sm'>{parseData(data.cd_purchasePrice)}</Text>
                                                </div>
                                            </div>
                                            <div className='table-box'>
                                                <Text size='md' bold centered>
                                                    {data?.cd_currentLabel}
                                                </Text>
                                            </div>
                                            {!data?.cd_contractEnded && (
                                                <div className='table-box'>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{data?.cd_spotLabel}</Text>
                                                    </div>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{data?.cd_currentSpot}</Text>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_endLabel || data?.cd_spotTimeLabel}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    {TimeTooltipWrapper(<Text size='sm'>{data?.cd_endDate || data?.cd_currentDate}</Text>,data?.cd_endDate || data?.cd_currentDate)}
                                                </div>
                                            </div>
                                            {!data?.cd_contractEnded && (
                                                <div className='table-box'>
                                                    <div className='table-item'>
                                                        <Text size='sm'>{localize('Current time')}</Text>
                                                    </div>
                                                    <div className='table-item'>
                                                        {TimeTooltipWrapper(<Text size='sm'>{data?.cd_currentTime}</Text>,data?.cd_currentTime)}
                                                    </div>
                                                </div>
                                            )}
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_indicativeLabel}</Text>
                                                </div>
                                                <div className='table-item'>
                                                    <Text size='sm'>{parseData(data.cd_indicativePrice)}</Text>
                                                </div>
                                            </div>
                                            <div className='table-box'>
                                                <div className='table-item'>
                                                    <Text size='sm'>{data?.cd_profitLossLabel}</Text>
                                                </div>
                                                <div className='table-item profit-loss'>
                                                    <Text size='sm' className={data?.cd_profitLossClass}>{parseData(data.cd_profitLoss)}</Text>
                                                </div>
                                            </div>

                                            {data?.cd_contractEnded ? (
                                                <>
                                                    <div className='table-box lg'>
                                                        <Button variant='secondary' size='lg' label={localize('Audit')} color='black' onClick={() => document.querySelector('.link-audit').click()} />
                                                    </div>
                                                    {data?.cd_sellMsg  && (
                                                        <div className='table-box'>
                                                            <SectionMessage  className='info-msg' size='sm' status='info' message={parseData(data.cd_sellMsg)} icon={<StandaloneCircleInfoRegularIcon iconSize='sm' />} />
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                data?.cd_infoMsg && (
                                                    <div className='table-box'>
                                                        <SectionMessage  className='info-msg' size='sm' status='info' message={parseData(data.cd_infoMsg)} icon={<StandaloneCircleInfoRegularIcon iconSize='sm' />} />
                                                    </div>
                                                )
                                            )}
                                            
                                            {data?.cd_showSell && (
                                                <>
                                                    <div className='table-box lg'>
                                                        <Button variant='secondary' size='lg' label={data?.cd_sellLabel} color='black' onClick={() => triggerClick('sell_at_market')} />
                                                    </div>
                                                    <div className='table-box lg'>
                                                        <SectionMessage  className='info-msg' size='sm' status='info' message={parseData(data.cd_sellInfo)} icon={<StandaloneCircleInfoRegularIcon iconSize='sm' />} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Portal>
        );
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
                                    {ButtonTooltipWrapper(<Button onClick={() => triggerClick('purchase_button_middle')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.middlePurchaseDisabled} />,data?.middleDescription)}
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
                                        {ButtonTooltipWrapper(<Button onClick={() => triggerClick('purchase_button_top')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.topPurchaseDisabled} />,data?.topDescription)}
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
                                        {ButtonTooltipWrapper(<Button onClick={() => triggerClick('purchase_button_bottom')}  color='sell' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.bottomPurchaseDisabled} />,data?.bottomDescription)}
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
                                            <Button variant='tertiary' size='lg' label={localize('Log in here')} onClick={() => triggerClick('authorization_error_btn_login')} />
                                        </>
                                    )}
                                </>
                            ) : (
                                <span className='error-message'>
                                    <Text size='md' centered>{data?.error.message}</Text>
                                </span>
                            )}
                            {data?.error.code === 'InsufficientBalance' && (
                                <Button label={localize('Deposit now')} size='md' onClick={() => document.querySelector('.url-cashier-deposit').click()} />
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
                        {data?.pr_tablePayoutValue && (
                            <div className='table-item'>
                                <Text size='sm' bold>{data?.pr_tablePayout}</Text>
                                <Text size='sm' centered >{parseData(data.pr_tablePayoutValue)}</Text>
                            </div>
                        )}
                        { data.pr_tableCostValue && (
                            <div className='table-item'>
                                <Text size='sm' bold>{data?.pr_tableCost}</Text>
                                <Text size='sm' centered >{parseData(data.pr_tableCostValue)}</Text>
                            </div>
                        )}
                        { data.pr_tableProfitValue && (
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
                                triggerClick('contract_purchase_button');
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
