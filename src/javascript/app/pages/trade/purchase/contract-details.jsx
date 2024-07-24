/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Button,  Skeleton, Text } from '@deriv-com/quill-ui';
import { LabelPairedArrowLeftMdRegularIcon } from '@deriv/quill-icons/LabelPaired';
import ContractTable from './contract-table';
import Portal from '../portal';
import purchaseManager from '../../../common/purchase_manager';
import { usePurchaseChange } from '../../../hooks/events';
import { localize } from '../../../../_common/localize';
import { Explanation } from '../../bottom/explanation';
import { TimeTooltipWrapper, triggerClick } from '../../../common/helpers';

const AuditSection = ({ data }) => {
    const auditData = {
        start: {
            title  : localize('Contract starts'),
            content: data?.auditDataStart,
        },
        end: {
            title  : localize('Contract ends'),
            content: data?.auditDataEnd,
        },
        details: {
            title  : localize('Contract details'),
            content: data?.auditDataDetails,
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
                        purchaseManager.set({
                            cd_showAudit: false,
                        });
                        triggerClick('#contract_purchase_button');
                    }}
                />
                <div className='title-box'>
                    <Text size='md' bold>
                        {localize('Audit page')}
                    </Text>
                </div>
                <Button variant='tertiary' size='lg' />
            </div>
            <div className='popup-scroller'>
                <div className='body-box'>
                    <div className='purchase-details-box'>
                        <div className='details-title'>
                            <Text centered size='md'>{data?.cd_description}</Text>
                        </div>
                        <div className='details-column'>
                            <div className='contract-info-wrapper full'>
                                {Object.keys(auditData).map(adk =>{
                                    const { title,content } = auditData[adk];

                                    if (content){
                                        return (
                                            <React.Fragment key={`audit-table-${title}-${adk}`}>
                                                <div className='table-box'>
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
                                                    {content?.map((audit,ak) =>
                                                        <React.Fragment key={`audit-${audit.tick}-${ak}`}>
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

                                    return false;
                                })}
                                <div className='table-box lg'>
                                    <Explanation explanationOnly />
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
                    purchaseManager.set({
                        showContractDetailsPopup: false,
                    });
                }}
            />
            <div className='title-box'>
                <Text size='md' bold>
                    {localize('Contract Details')}
                </Text>
            </div>
            <Button variant='tertiary' size='lg' />
        </div>
        <div className='popup-scroller'>
            <div className='body-box'>
                <div className='purchase-details-box'>
                    <div className='details-title'>
                        <Text centered size='md'>{data?.cd_description}</Text>
                    </div>
                    <div className='details-column'>
                        <div className='chart-wrapper' id={data?.cd_chartId} />
                        <ContractTable data={data} />
                    </div>
                </div>
            </div>
        </div>
    </>
);

const Contents = ({ data }) => {
    if (data?.cd_showAudit) {
        return (
            <AuditSection data={data} />
        );
    }

    return (
        <DetailsSection data={data} />
    );
};

const ContractDetails = () => {
    const hasPurchaseChange = usePurchaseChange();
    const [data, setData] = useState({});

    useEffect(() => {
        const newData = purchaseManager.getAll();

        setData((oldData) => ({
            ...oldData,
            ...newData,
        }));
    }, [hasPurchaseChange]);

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
                ) : <Contents data={data} />}
            </div>
        </Portal>
    );
};

export default ContractDetails;
