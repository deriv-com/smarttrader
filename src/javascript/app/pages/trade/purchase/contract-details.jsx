/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Button, Skeleton, Text } from '@deriv-com/quill-ui';
import { LabelPairedArrowLeftMdRegularIcon } from '@deriv/quill-icons/LabelPaired';
import ContractTable from './contract-table';
import Portal from '../../portal';
import dataManager from '../../../common/data_manager';
import { usePurchaseChange } from '../../../hooks/events';
import { localize } from '../../../../_common/localize';
import { Explanation } from '../../bottom/explanation';
import { TimeTooltipWrapper, triggerClick } from '../../../common/helpers';

const resetPopupData = (is_audit_reset = false) => {
    const audit_reset_object = {
        cd_show_audit : false,
        audit_data_end: [],
    };
     
    const contract_reset_object = {
        ...audit_reset_object,
        show_contract_details_popup: false,
        cd_show_sell               : false,
        cd_contract_ended          : false,
        cd_show_audit_button       : false,
        cd_sell_msg                : null,
        cd_info_msg                : null,
    };
  
    dataManager.setPurchase({
        ...(is_audit_reset ? { ...audit_reset_object } : contract_reset_object),
    });
};

const AuditSection = ({ data }) => {
    const audit_data = {
        start: {
            title  : localize('Contract starts'),
            content: data?.audit_data_start,
        },
        end: {
            title  : localize('Contract ends'),
            content: data?.audit_data_end,
        },
        details: {
            title  : localize('Contract details'),
            content: data?.audit_data_details,
        },
    };

    return (
        <>
            <div className='header-box'>
                <Button
                    variant='tertiary'
                    size='lg'
                    icon={<LabelPairedArrowLeftMdRegularIcon />}
                    color='black'
                    onClick={() => {
                        resetPopupData(true);
                        triggerClick('#contract_purchase_button');
                    }}
                />
                <div className='title-box'>
                    <Text size='md' bold>
                        {localize('Audit page')}
                    </Text>
                </div>
                <div className='spacer' />
            </div>
            <div className='popup-scroller'>
                <div className='body-box'>
                    <div className='purchase-details-box'>
                        <div className='details-title'>
                            <Text centered size='md'>{data?.cd_description}</Text>
                        </div>
                        <div className='details-column'>
                            <div className='contract-info-wrapper full'>
                                {Object.keys(audit_data).map(audit_data_key =>{
                                    const { title, content } = audit_data[audit_data_key];
                                  
                                    if (content?.length) {
                                        return (
                                            <React.Fragment key={`audit-table-${title}-${audit_data_key}`}>
                                                <div className='table-box' >
                                                    <Text size='md' bold centered>
                                                        {title}
                                                    </Text>
                                                </div>
                                                <div className='table-container'>
                                                    <div className='table-item'>
                                                        <div className='item-header' />
                                                        <div className='item-content'>
                                                            <span className='item-inner'>
                                                                <Text size='sm' bold>{ localize('Spot')}</Text>
                                                            </span>
                                                            <span className='item-inner'>
                                                                <Text size='sm' bold>{localize('Spot time (GMT)') }</Text>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {content?.map((audit, audit_key) =>
                                                        <React.Fragment key={`audit-${audit.tick}-${audit_key}`}>
                                                            <div className='table-item'>
                                                                <div className='item-header'>
                                                                    <Text size='sm' bold>{ audit?.name}</Text>
                                                                </div>
                                                                <div className={`item-content ${audit?.color}`}>
                                                                    <span className='item-inner'>
                                                                        <Text size='sm' bold={!!audit?.name}>{ audit?.tick}</Text>
                                                                    </span>
                                                                    <span className='item-inner'>
                                                                        {TimeTooltipWrapper(
                                                                            <Text size='sm' bold={!!audit?.name}>{audit?.date}</Text>,
                                                                            audit?.date
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        );
                                    }

                                    return null;
                                })}
                                <div className='table-box lg'>
                                    <Explanation explanation_only />
                                </div>
                            </div>
                            <ContractTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const DetailsSection = ({ data }) => (
    <>
        <div className='header-box'>
            <Button
                variant='tertiary'
                size='lg'
                icon={<LabelPairedArrowLeftMdRegularIcon />}
                color='black'
                onClick={() => {
                    resetPopupData(false);
                }}
            />
            <div className='title-box'>
                <Text size='md' bold>
                    {localize('Contract Details')}
                </Text>
            </div>
            <div className='spacer' />
        </div>
        <div className='popup-scroller'>
            <div className='body-box'>
                <div className='purchase-details-box'>
                    <div className='details-title'>
                        <Text centered size='md'>{data?.cd_description}</Text>
                    </div>
                    <div className='details-column'>
                        <div className='chart-wrapper' id={data?.cd_chart_id} />
                        <ContractTable data={data} />
                    </div>
                </div>
            </div>
        </div>
    </>
);

const Contents = ({ data }) => {
    if (data?.cd_show_audit) {
        return (
            <AuditSection data={data} />
        );
    }

    return (
        <DetailsSection data={data} />
    );
};

const ContractDetails = () => {
    const has_purchase_change = usePurchaseChange();
    const [data, setData] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                resetPopupData(false);
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [has_purchase_change]);

    useEffect(() => {
        const new_data = dataManager.getAllPurchases();

        setData((old_data) => ({
            ...old_data,
            ...new_data,
        }));
    }, [has_purchase_change]);

    return (
        <Portal>
            <div className='quill-purchase-popup'>
                {!data?.cd_description ? (
                    <div className='body-box'>
                        <div className='loader-box'>
                            <Skeleton.Square fullWidth height={24} rounded />
                            <div className='body-loader'>
                                <Skeleton.Square fullWidth height={495} rounded />
                                <Skeleton.Square width={360} height={670} rounded />
                            </div>
                        </div>
                    </div>
                ) : <Contents data={data} />}
            </div>
        </Portal>
    );
};

export default ContractDetails;
