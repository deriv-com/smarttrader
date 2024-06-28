import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { DropdownItem, SearchField, Tab, Text } from '@deriv-com/quill-ui';
import { getElementById } from '../../../../_common/common_functions';
import Symbols from '../symbols';
import {
    marketOrder,
    sortObjectByKeys,
    derived,
} from '../../../common/active_symbols';
import Defaults, { PARAM_NAMES } from '../defaults';
import { triggerMarketChange } from '../../../hooks/events';

const MarketsDropdown = () => {
    const { UNDERLYING } = PARAM_NAMES;
    const [defaultMarkets, setDefaultMarkets] = useState({});
    const [markets, setMarkets] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [activeMarket, setActiveMarket] = useState('forex');
    const [selectedMarket, setSelectedMarket] = useState(
        Defaults.get(UNDERLYING)
    );
    const [searchKey, setSearchKey] = useState('');
    const itemsContainer = useRef(null);
    const isScrolling = useRef(false);

    const filterMarkets = () => {
        const data = JSON.parse(JSON.stringify(defaultMarkets));
        const searchStr = searchKey?.toLowerCase();
        let foundMatchingSymbol = false;

        Object.keys(data).forEach(marketKey => {
            const market = data[marketKey];

            Object.keys(market.submarkets).forEach(submarketKey => {
                const submarket = market.submarkets[submarketKey];
                const subMarketName = submarket.name.toLowerCase();

                // If submarket name matches to search key then don't filter children
                if (!subMarketName.includes(searchStr)){
                    Object.keys(submarket.symbols).forEach(symbolKey => {
                        const symbol = submarket.symbols[symbolKey];
                        const displayName = symbol.display.toLowerCase();
                    
                        if (!displayName.includes(searchStr)) {
                            delete submarket.symbols[symbolKey];
                        } else {
                            foundMatchingSymbol = true;
                        }
                    });
                } else {
                    foundMatchingSymbol = true;
                }

                if (Object.keys(submarket.symbols).length === 0) {
                    delete market.submarkets[submarketKey];
                }
            });
           
            if (Object.keys(market.submarkets).length === 0) {
                delete data[marketKey];
            }
        });
    
        // If no matching symbols were found, return the original markets object
        if (!foundMatchingSymbol) {
            return defaultMarkets;
        }
    
        return data;
    };

    useEffect(() => {
        setMarkets(filterMarkets());
    },[searchKey]);

    useEffect(() => {
        const marketList = Symbols.markets();
        const originalMarkets = sortObjectByKeys(marketList, marketOrder);
        setDefaultMarkets(originalMarkets);
        setMarkets(originalMarkets);
        setIsMounted(true);
    }, []);

    // Handle selecting of tabs on scroll
    useEffect(() => {
        const container = itemsContainer.current;

        const checkActiveMarket = () => {
            const marketDivs = container.querySelectorAll('div');
            let closestMarket = '';
            let closestOffset = Infinity;

            marketDivs.forEach((div) => {
                const paddingOffset = 110;
                const offsetTop = div.offsetTop - container.scrollTop - paddingOffset;

                if (offsetTop <= 0 && Math.abs(offsetTop) < Math.abs(closestOffset)) {
                    closestOffset = offsetTop;
                    closestMarket = div.getAttribute('data-id');
                }
            });

            if (closestMarket) {
                setActiveMarket(closestMarket);
            }
        };

        const handleScroll = () => {
            if (!isScrolling.current) {
                checkActiveMarket();
            }
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [isMounted]);

    const getactiveMarketIndex = () => Object.keys(markets).indexOf(activeMarket);

    const scrollToMarketByIndex = (index) => {
        isScrolling.current = true;
        const container = itemsContainer.current;

        if (container) {
            const marketDivs = container ? container.children : [];
            if (marketDivs[index]) {
                const offsetTop = marketDivs[index].offsetTop - container.offsetTop;
                container.scrollTo({
                    top     : offsetTop,
                    behavior: 'smooth',
                });
            }
            setTimeout(() => {
                isScrolling.current = false;
            }, 1000);
        }
    };

    const handleUnderlyingClick = (underlying) => {
        Defaults.set(UNDERLYING, underlying);
        setSelectedMarket(underlying);
        triggerMarketChange();
    };

    return (
        <div className='quill-market-dropdown-container'>
            <div className='quill-market-dropdown-search-container'>
                <SearchField
                    inputSize='sm'
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder='Search...'
                    value=''
                    variant='fill'
                />
            </div>
            <div className='quill-market-dropdown-tab-container'>
                <Tab.Container
                    size='md'
                    contentStyle='hug'
                    selectedTabIndex={getactiveMarketIndex()}
                    onTabClick={(e) => scrollToMarketByIndex(e)}
                >
                    <Tab.List>
                        {Object.keys(markets).map((ik) => {
                            const market = markets[ik];
                            const marketName = derived.includes(ik)
                                ? `Derived (${market.name})`
                                : market.name;
                            return <Tab.Trigger key={ik}>{marketName}</Tab.Trigger>;
                        })}
                    </Tab.List>
                </Tab.Container>
                <div
                    className='quill-market-dropdown-item-container'
                    id='quill-market-dropdown-list'
                    ref={itemsContainer}
                >
                    {Object.keys(markets).map((ik) => {
                        const market = markets[ik];
                        const { submarkets } = market;

                        return (
                            <div id={`${ik}-dropdown-list`} key={ik} data-id={ik}>
                                {Object.keys(submarkets).map((sk) => {
                                    const submarket = submarkets[sk];
                                    const { symbols, name } = submarket;

                                    return (
                                        <React.Fragment key={sk}>
                                            {
                                                <Text size='md' bold className='market-item-heading'>
                                                    {name}
                                                </Text>
                                            }
                                            {Object.keys(symbols).map((yk) => {
                                                const symbol = symbols[yk];
                                                const { display } = symbol;

                                                return (
                                                    <DropdownItem
                                                        key={yk}
                                                        className=''
                                                        onClick={() => handleUnderlyingClick(yk)}
                                                        label={display}
                                                        selected={yk === selectedMarket}
                                                        size='sm'
                                                    />
                                                );
                                            })}
                                            <hr />
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const init = () => {
    ReactDOM.render(
        <MarketsDropdown />,
        getElementById('markets-dropdown-container')
    );
};

export default init;
