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

const Loader = () => {
    const hasContractChange  = useContractChange();

    const [loading,setLoading] = useState(true);
 
    useEffect(() => {
        const hidePageLoader = contractManager.get('hidePageLoader');

        if (hidePageLoader){
            setLoading(false);
        }
           
    },[hasContractChange]);

    useEffect(() => {
        window.addEventListener('load', () => {
            setLoading(false);
        });
    });

    if (loading){
        return (
            <Portal>
                <div className='quill-generic-popup'>
                    <div className='main-loader'>
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
