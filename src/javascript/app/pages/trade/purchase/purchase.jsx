/* eslint-disable import/no-unresolved */
import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Button, CaptionText,  Skeleton, Text, Tooltip } from '@deriv-com/quill-ui';
import {  LabelPairedXmarkMdRegularIcon } from '@deriv/quill-icons/LabelPaired';
import parse from 'html-react-parser';
import ContractDetails from './contract-details';
import Defaults, { PARAM_NAMES } from '../defaults';
import { getElementById } from '../../../../_common/common_functions';
import { useContractChange, usePurchaseChange } from '../../../hooks/events';
import dataManager from '../../../common/data_manager';
import { localize } from '../../../../_common/localize';

import { parseData, triggerClick } from '../../../common/helpers';

const Purchase = () => {
    const has_purchase_change  = usePurchaseChange();
    const has_contract_change  = useContractChange();

    const [data,setData] = useState({});
    const [is_look_back, setIsLookBack] = useState(false);
    const [show_popup, setShowPopup] = useState(false);
    const purchase_positions = ['top','bottom'];
    
    const isloading = () => !data?.top_amount && !data?.middle_amount && !data?.bottom_amount;

    const hidePurchaseResults = () =>
        dataManager.setPurchase({
            show_purchase_results: false,
            error                : null,
            cd_error_msg         : null,
            cd_show_audit_button : false,
            cd_contract_ended    : false,
            audit_data_end       : [],
            cd_info_msg          : null,
        });
 
    useEffect(() => {
        const new_data = dataManager.getAllPurchases();

        setShowPopup(!!new_data?.show_contract_details_popup);

        setData(old_data => ({
            ...old_data,
            ...new_data,
        }));
       
    }, [has_purchase_change]);

    useEffect(() => {
        const form_name = Defaults.get(PARAM_NAMES.FORM_NAME);

        const lookbacks = ['lookbacklow', 'lookbackhigh', 'lookbackhighlow'];

        setIsLookBack(lookbacks.includes(form_name));
      
    }, [has_contract_change]);

    useEffect(() => {
        document.body.style.overflow = show_popup ? 'hidden' : '';
       
        return () => {
            document.body.style.overflow = '';
        };
    }, [show_popup]);

    const displayCurrency = (referenceField) => referenceField !== '-' ? data?.currency : '';

    const ButtonTooltipWrapper = (button,description) => {
        if (!description || description === '' || data?.is_purchase_form_disabled) {
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

    if (show_popup) {
        return <ContractDetails />;
    }

    if (isloading() || (!data?.show_purchase_results && data?.is_purchase_form_disabled)) {
        return (
            <div className='quill-purchase-section'>
                <Skeleton.Square rounded fullWidth height={30} />
                <Skeleton.Square rounded fullWidth height={130} />
                {!is_look_back && (
                    <>
                        <Skeleton.Square rounded fullWidth height={30} />
                        <Skeleton.Square rounded fullWidth height={130} />
                    </>
                )}
            </div>);
    }
    
    if (!data?.show_purchase_results && !data?.error) {
        return (
            <div className={`quill-purchase-section ${data?.is_purchase_form_disabled && 'disabled'}`}>
                {data?.show_mid_purchase ? (
                    <div className='purchase-box'>
                        <div className='purchase-header'>
                            <div className='purchase-icon-box'>
                                <div className={`contract_heading ${data?.middle_contract_type}`} />
                                <Text size='md' centered bold> {data?.middle_display_text}</Text>
                            </div>
                            <div className='purchase-body-box'>
                                <div className='purchase-amount-box'>
                                    <div className='purchase-amount-info-box'>
                                        <Text size='md'>{localize('Stake')}:</Text>
                                        <Text size='md' className={data.middle_amount_classname} bold>{data?.middle_amount} {displayCurrency(data?.middle_amount)}</Text>
                                    </div>
                                    <div className='purchase-amount-info-box'>
                                        <Text size='md'>{localize('Multiplier')}:</Text>
                                        <Text size='md' bold>{data?.middle_multiplier} {displayCurrency(data?.middle_multiplier)}</Text>
                                    </div>
                                </div>
                                <div className='purchase-btn-box'>
                                    {ButtonTooltipWrapper(<Button onClick={() => triggerClick('#purchase_button_middle')} color='purchase' size='lg' label={localize('Purchase')} fullWidth  disabled={data?.middle_purchase_disabled} />,data?.middle_description)}
                                </div>
                            </div>
                        </div>
                        <div className='purchase-footer'>
                            <CaptionText centered>{parseData(data.middle_comment)}</CaptionText>
                        </div>
                    </div>
                ) : (
                    <>
                        {purchase_positions.map(position => {
                            const contract_type  = data?.[`${position}_contract_type`];
                            const display_text  = data?.[`${position}_display_text`];
                            const amount  = data?.[`${position}_amount`];
                            const amount_classname  = data?.[`${position}_amount_classname`];
                            const payout_amount_classname  = data?.[`${position}_payout_amount_classname`];
                            const payout_amount  = data?.[`${position}_payout_amount`];
                            const purchase_disabled  = data?.[`${position}_purchase_disabled`];
                            const description  = data?.[`${position}_description`];
                            const comment  = data?.[`${position}_comment`];
                        
                            return (
                                <Fragment key={`purchase-action-${position}`}>
                                    <div className='purchase-box'>
                                        <div className='purchase-header'>
                                            <div className='purchase-icon-box'>
                                                <div className={`contract_heading ${contract_type}`} />
                                                <Text size='md' centered bold> {display_text}</Text>
                                            </div>
                                          
                                            <div className='purchase-body-box'>
                                                <div className='purchase-amount-box'>
                                                    <div className='purchase-amount-info-box'>
                                                        <Text size='md'>{localize('Stake')}:</Text>
                                                        <Text size='md' className={amount_classname} bold>{amount} {displayCurrency(amount)}</Text>
                                                    </div>
                                                    <div className='purchase-amount-info-box'>
                                                        <Text size='md'>{localize('Payout')}:</Text>
                                                        <Text size='md' className={payout_amount_classname} bold>{payout_amount} {displayCurrency(payout_amount)}</Text>
                                                    </div>
                                                </div>
                                              
                                                <div className='purchase-btn-box'>
                                                    {ButtonTooltipWrapper(<Button onClick={() => triggerClick(`#purchase_button_${position}`)} color={position === 'top' ? 'purchase' : 'sell'} size='lg' label={localize('Purchase')} fullWidth  disabled={purchase_disabled} />,description)}
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className='purchase-footer'>
                                            <CaptionText centered>{parseData(comment)}</CaptionText>
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}
                    </>
                )}
            </div>
        );
    }

    if (data?.error) {
        return (
            <div className='quill-purchase-section-results'>
                <div className='top-box'>
                    <div className='header-box'>
                        <Text size='xl'>{data?.error?.title}</Text>
                        <span
                            className='close-btn'
                            onClick={() => {
                                triggerClick('#close_confirmation_container');
                                hidePurchaseResults();
                            }}
                        >
                            <LabelPairedXmarkMdRegularIcon />
                        </span>
                    </div>
      
                    <div className='body-box'>
                        <div className='error-box'>
                            {data?.error?.is_custom ? (
                                <>
                                    {data?.error.code === 'AuthorizationRequired' && (
                                        <>
                                            <Button
                                                variant='primary'
                                                size='lg'
                                                label={localize('Open a free account')}
                                                onClick={() => window.location.href = data?.error.signup_url}
                                            />
                                            <Text size='sm'>{localize('Already have an account?')}</Text>
                                            <Button variant='tertiary' size='lg' label={localize('Log in here')} onClick={() => triggerClick('#authorization_error_btn_login')} />
                                        </>
                                    )}
                                    {data?.error.code === 'InsufficientBalance' && (
                                        <>
                                            <Text size='sm'>{data?.error?.message}</Text>
                                            <Text size='sm'>{
                                                parse(
                                                    localize('Do you want to top up for another [_1]? If not, you can do this later on the [_2]Cashier page[_3], too.', ['$10,000.00', '<a id=\'top_up_cashier_redirect\' href=\'\'>', '</a>'])
                                                )}
                                            </Text>
                                            <Button
                                                variant='primary'
                                                size='lg'
                                                label={localize('Top up')}
                                                onClick={() => {
                                                    data?.error?.action?.();
                                                    hidePurchaseResults();
                                                }}
                                            />
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
                            hidePurchaseResults();
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
                        {data?.pr_table_payout_value && (
                            <div className='table-item'>
                                <Text size='sm' centered bold>{data?.pr_table_payout}</Text>
                                <Text size='sm' centered >{parseData(data.pr_table_payout_value)}</Text>
                            </div>
                        )}
                        { data?.pr_table_cost_value && (
                            <div className='table-item'>
                                <Text size='sm' centered bold>{data?.pr_table_cost}</Text>
                                <Text size='sm' centered >{parseData(data.pr_table_cost_value)}</Text>
                            </div>
                        )}
                        { data?.pr_table_profit_value && data?.pr_show_table_profit && (
                            <div className='table-item'>
                                <Text size='sm' centered bold>{data?.pr_table_profit}</Text>
                                <Text size='sm' centered>{parseData(data.pr_table_profit_value)}</Text>
                            </div>
                        )}
                    </div>
                    <div className='info-box'>
                        {data?.pr_barrier && <Text size='sm' >{parseData(data.pr_barrier)}</Text>}
                        {data?.pr_reference && <Text size='sm' >{parseData(data.pr_reference)}</Text>}
                        {data?.pr_show_button && <Button
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
                <CaptionText >{parseData(data.pr_balance_value)}</CaptionText>
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
