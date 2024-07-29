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
                <Text size='sm'>{data?.cd_contractType}</Text>
            </div>
        </div>
        <div className='table-box'>
            <div className='table-item'>
                <Text size='sm'>{localize('Transaction ID')}</Text>
            </div>
            <div className='table-item'>
                {data?.cd_transaction_ids &&
          Object.keys(data?.cd_transaction_ids).map((tik) => {
              const transactionName =
              tik === 'buy' ? localize('Buy') : localize('Sell');
              return (
                  <Text size='sm' key={`${transactionName}-${tik}`}>
                      {data?.cd_transaction_ids[tik]} ({transactionName})
                  </Text>
              );
          })}
            </div>
        </div>
        {data?.cd_purchaseTime && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Purchase time')}</Text>
                </div>
                <div className='table-item'>
                    {TimeTooltipWrapper(
                        <Text size='sm'>{data.cd_purchaseTime}</Text>,
                        data.cd_purchaseTime
                    )}
                </div>
            </div>
        )}
        {data?.cd_startTime && !data?.soldBeforeStart && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Start time')}</Text>
                </div>
                <div className='table-item'>
                    {TimeTooltipWrapper(
                        <Text size='sm'>{data.cd_startTime}</Text>,
                        data.cd_startTime
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
        {data?.cd_barrier && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrierLabel}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrier}</Text>
                </div>
            </div>
        )}
        {data?.cd_showBarrierLow && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Low barrier')}</Text>
                </div>
                <div className='table-item'>
                    <Text size='sm'>{data?.cd_barrierLow}</Text>
                </div>
            </div>
        )}
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
        {data?.cd_showCurrentSpot && (
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
                {TimeTooltipWrapper(
                    <Text size='sm'>{data?.cd_endDate || data?.cd_currentDate}</Text>,
                    data?.cd_endDate || data?.cd_currentDate
                )}
            </div>
        </div>
        {!data?.cd_contractEnded && (
            <div className='table-box'>
                <div className='table-item'>
                    <Text size='sm'>{localize('Current time')}</Text>
                </div>
                <div className='table-item'>
                    {TimeTooltipWrapper(
                        <Text size='sm'>{data?.cd_currentTime}</Text>,
                        data?.cd_currentTime
                    )}
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
                <Text size='sm' className={data?.cd_profitLossClass}>
                    {parseData(data.cd_profitLoss)}
                </Text>
            </div>
        </div>
       
        {data?.cd_contractEnded ? (
            <>
                {(data?.cd_showAuditBtn && !data?.cd_showAudit) && (
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
                {data?.cd_sellMsg && (
                    <div className='table-box'>
                        <SectionMessage
                            className='info-msg'
                            size='sm'
                            status='info'
                            message={parseData(data.cd_sellMsg)}
                        />
                    </div>
                )}
            </>
        ) : (
            data?.cd_infoMsg && (
                <div className='table-box'>
                    <SectionMessage
                        className='info-msg'
                        size='sm'
                        status='info'
                        message={parseData(data.cd_infoMsg)}
                    />
                </div>
            )
        )}

        {data?.cd_showSell && (
            <>
                <div className='table-box lg'>
                    <Button
                        variant='secondary'
                        size='lg'
                        label={data?.cd_sellLabel}
                        color='black'
                        onClick={() => triggerClick('#sell_at_market')}
                    />
                    {data?.cd_errorMsg && (
                        <SectionMessage
                            className='info-msg'
                            size='sm'
                            status='warning'
                            message={parseData(data.cd_errorMsg)}
                        />
                    )}
                    {data?.cd_sellInfo && (
                        <SectionMessage
                            className='info-msg'
                            size='sm'
                            status='info'
                            message={parseData(data.cd_sellInfo)}
                            icon={<StandaloneCircleInfoRegularIcon iconSize='sm' />}
                        />
                    )}
                </div>
            </>
        )}
    </div>
);

export default ContractTable;
