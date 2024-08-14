/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, SectionMessage, Text } from '@deriv-com/quill-ui';
import { StandaloneCircleInfoRegularIcon } from '@deriv/quill-icons/Standalone';
import { localize } from '../../../../_common/localize';
import { parseData, TimeTooltipWrapper, triggerClick } from '../../../common/helpers';

const ContractTable = ({ data }) => (
    <div className='contract-info-wrapper'>
        <div className='table-box'>
            <Text size='md' bold centered>
                {localize('Contract information')}
            </Text>
        </div>
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{localize('Contract type')}</Text>
            </div>
            <div className='table-item'>
                <Text size='sm'>{data?.cd_contract_type}</Text>
            </div>
        </div>
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{localize('Transaction ID')}</Text>
            </div>
            <div className='table-item'>
                {data?.cd_transaction_ids &&
                Object.keys(data?.cd_transaction_ids).map((tik) => {
                    const transaction_name =
                    tik === 'buy' ? localize('Buy') : localize('Sell');
                    return (
                        <Text size='sm' key={`${transaction_name}-${tik}`}>
                            {data?.cd_transaction_ids[tik]} ({transaction_name})
                        </Text>
                    );
                })}
            </div>
        </div>
        {data?.cd_purchase_time && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Purchase time')}</Text>
                </div>
                <div className='table-item'>
                    {TimeTooltipWrapper(
                        <Text size='sm'>{data.cd_purchase_time}</Text>,
                        data.cd_purchase_time
                    )}
                </div>
            </div>
        )}
        {data?.cd_start_time && !data?.sold_before_start && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Start time')}</Text>
                </div>
                <div className='table-item'>
                    {TimeTooltipWrapper(
                        <Text size='sm'>{data.cd_start_time}</Text>,
                        data.cd_start_time
                    )}
                </div>
            </div>
        )}
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{localize('Remaining time')}</Text>
            </div>
            <div className='table-item'>
                <Text size='sm'>{data?.cd_remainingTime}</Text>
            </div>
        </div>
        {data?.cd_show_entry_spot && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Entry spot')}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_entry_spot}</Text>
                </div>
            </div>
        )}
        {data?.cd_barrier && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrier_label}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrier}</Text>
                </div>
            </div>
        )}
        {data?.cd_show_barrier_low && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Low barrier')}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrier_low}</Text>
                </div>
            </div>
        )}
        {data?.cd_show_barrier_reset && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Reset barrier')}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrier_reset}</Text>
                </div>
            </div>
        )}
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{data?.cd_payout_label}</Text>
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
                <Text size='sm'>{parseData(data.cd_purchase_price)}</Text>
            </div>
        </div>
        <div className='table-box'>
            <Text size='md' bold centered>
                {data?.cd_current_label}
            </Text>
        </div>
        {data?.cd_show_current_spot && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_spot_label}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_current_spot}</Text>
                </div>
            </div>
        )}
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{data?.cd_end_label || data?.cd_spot_time_label}</Text>
            </div>
            <div className='table-item'>
                {TimeTooltipWrapper(
                    <Text size='sm'>{data?.cd_end_date || data?.cd_current_date}</Text>,
                    data?.cd_end_date || data?.cd_current_date
                )}
            </div>
        </div>
        {!data?.cd_contract_ended && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Current time')}</Text>
                </div>
                <div className='table-item'>
                    {TimeTooltipWrapper(
                        <Text size='sm'>{data?.cd_current_time}</Text>,
                        data?.cd_current_time
                    )}
                </div>
            </div>
        )}
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{data?.cd_indicative_label}</Text>
            </div>
            <div className='table-item'>
                <Text size='sm'>{parseData(data.cd_indicative_price)}</Text>
            </div>
        </div>
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{data?.cd_profit_loss_label}</Text>
            </div>
            <div className='table-item profit-loss'>
                <Text size='sm' className={data?.cd_profit_loss_class}>
                    {parseData(data.cd_profit_loss)}
                </Text>
            </div>
        </div>
       
        {data?.cd_contract_ended ? (
            <>
                {(data?.cd_show_audit_button && !data?.cd_show_audit) && (
                    <div className='table-box lg'>
                        <Button
                            variant='secondary'
                            size='lg'
                            label={localize('Audit')}
                            color='black'
                            onClick={() => document.querySelector('.link-audit').click()}
                        />
                    </div>
                )}
                {data?.cd_sell_msg && (
                    <div className='table-box'>
                        <SectionMessage
                            className='info-msg'
                            size='sm'
                            status='info'
                            message={parseData(data.cd_sell_msg)}
                        />
                    </div>
                )}
            </>
        ) : (
            data?.cd_info_msg && (
                <div className='table-box'>
                    <SectionMessage
                        className='info-msg'
                        size='sm'
                        status='info'
                        message={parseData(data.cd_info_msg)}
                    />
                </div>
            )
        )}

        {data?.cd_show_sell && (
            <div className='table-box lg'>
                <Button
                    variant='secondary'
                    size='lg'
                    label={data?.cd_sell_label}
                    color='black'
                    onClick={() => triggerClick('#sell_at_market')}
                />
                {data?.cd_error_msg && (
                    <SectionMessage
                        className='info-msg'
                        size='sm'
                        status='warning'
                        message={parseData(data.cd_error_msg)}
                    />
                )}
                {data?.cd_sell_info && (
                    <SectionMessage
                        className='info-msg'
                        size='sm'
                        status='info'
                        message={parseData(data.cd_sell_info)}
                        icon={<StandaloneCircleInfoRegularIcon iconSize='sm' />}
                    />
                )}
            </div>
        )}
    </div>
);

export default ContractTable;
