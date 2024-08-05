/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Skeleton } from '@deriv-com/quill-ui';
import Portal from './portal';
import { getElementById } from '../../_common/common_functions';
import { useContractChange } from '../hooks/events';
import contractManager from '../common/contract_manager';

const PurchaseSectionLoader = ({ hideBottom }) => (
    <>
        <Skeleton.Square rounded fullWidth height={30} />
        <Skeleton.Square rounded fullWidth height={130} />
        {!hideBottom && (
            <>
                <Skeleton.Square rounded fullWidth height={30} />
                <Skeleton.Square rounded fullWidth height={130} />
            </>
        )}
    </>
);

const pageTypes = [
    {
        name: '404',
        code: '404',
    },
    {
        name: 'Trade',
        code: 'trading',
    },
    {
        name: 'Endpoint',
        code: 'endpoint',
    },
];

const Loader = () => {
    const hasContractChange  = useContractChange();

    const [loading,setLoading] = useState(true);
    
    const getPageType = () => pageTypes.find(({ code }) => window.location.pathname.includes(code)) || { name: 'Generic', code: '' };

    const page = getPageType().name;
 
    useEffect(() => {
        const hidePageLoader = contractManager.get('hidePageLoader');

        if (hidePageLoader){
            setLoading(false);
        }
           
    },[hasContractChange]);

    useEffect(() => {
        const handleLoad = () => {
            if (page !== 'Trade') {
                setLoading(false);
            }
        };
    
        window.addEventListener('load', handleLoad);
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    },[]);

    if (loading){
        return (
            <Portal>
                <div className='quill-generic-popup'>
                    <div className='main-loader'>
                        {page === 'Trade' ? (
                            <>
                                <div className='header-loader'>
                                    <div className='dropdown-loader-container'>
                                        <span className='dropdown-loader'>
                                            <Skeleton.Square height={53} rounded fullWidth />
                                        </span>
                                        <span className='dropdown-loader'>
                                            <Skeleton.Square height={53} rounded fullWidth />
                                        </span>
                                    </div>
                                    <div className='other-header-loader-container'>
                                        <Skeleton.Square height={53} width={80} rounded  />
                                        <Skeleton.Square height={53} width={105} rounded  />
                                    </div>
                                </div>
                                <div className='body-loader'>
                                    <div className='trade-section-loader'>
                                        <Skeleton.Square height={370} rounded fullWidth />
                                    </div>
                                    <div className='purchase-section-loader'>
                                        <PurchaseSectionLoader />
                                    </div>
                                </div>
                                <div className='footer-loader'>
                                    <Skeleton.Square height={50} width={245} rounded  />
                                </div>
                            </>
                        ) : (
                            <Skeleton.Square height={300} fullWidth rounded  />
                        )}
                    </div>
                </div>
            </Portal>
 
        );
    }

    return <></>;
};

export const init = () => {
    ReactDOM.render(
        <Loader />,
        getElementById('app-loader')
    );
};

export default init;
