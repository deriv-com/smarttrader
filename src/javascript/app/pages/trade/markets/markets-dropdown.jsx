import React, { useEffect, useRef, useState } from 'react';
import {
    DropdownItem,
    SearchField,
    Tab,
    DropdownTitle,
    Divider,
    useDropdown,
} from '@deriv-com/quill-ui';
import { getElementById } from '../../../../_common/common_functions';
import Symbols from '../symbols';
import ActiveSymbols, {
    marketOrder,
    sortObjectByKeys,
    derived,
} from '../../../common/active_symbols';
import Defaults, { PARAM_NAMES } from '../defaults';
import { triggerMarketChange } from '../../../hooks/events';
import { localize } from '../../../../_common/localize';
import contractManager from '../../../common/contract_manager';

export const getMarketName = () => {
    const obj =  ActiveSymbols.getMarkets();
    const symbolKey = Defaults.get(PARAM_NAMES.UNDERLYING) || 'frxAUDJPY';
    
    // Find the market and submarket where the symbolKey exists
    const marketKey = Object.keys(obj).find(market =>
        Object.keys(obj[market].submarkets).some(submarket =>
            obj[market].submarkets[submarket].symbols?.[symbolKey]
        )
    );

    // Return the display value if found
    const displayValue = obj[marketKey]?.submarkets?.[Object.keys(obj[marketKey].submarkets).find(submarket =>
        obj[marketKey].submarkets[submarket].symbols?.[symbolKey]
    )]?.symbols[symbolKey]?.display;

    return displayValue || '';

};

export const getContractName = () => {
    const data = contractManager.getAll();
    let name = '';
    // eslint-disable-next-line consistent-return
    data?.contractsTree?.forEach((contract) => {
        if (typeof contract === 'object') {
            contract[1].forEach((subtype) => {
                if (subtype === data?.formName){
                    name =  data?.contracts[subtype];
                }
            
            });
        
        } else if (contract === data?.formName){
            name = data?.contracts[contract];
        }
       
    });

    return name;
};

export const MarketsDropdown = () => {
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
    const underlyings = Symbols.getAllSymbols() || {};

    const { close: closeMarketDropdown } = useDropdown();

    const filterMarkets = () => {
        const data = JSON.parse(JSON.stringify(defaultMarkets));
        const searchStr = searchKey?.toLowerCase();
        let foundMatchingSymbol = false;

        Object.keys(data).forEach((marketKey) => {
            const market = data[marketKey];

            Object.keys(market.submarkets).forEach((submarketKey) => {
                const submarket = market.submarkets[submarketKey];
                const subMarketName = submarket.name.toLowerCase();

                // If submarket name matches to search key then don't filter children
                if (!subMarketName.includes(searchStr)) {
                    Object.keys(submarket.symbols).forEach((symbolKey) => {
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
    }, [searchKey]);

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
            const marketDivs = container.querySelectorAll('div[data-id]');
            let closestMarket = '';
            let closestOffset = Infinity;
    
            marketDivs.forEach((div) => {
                const containerMiddle = container.scrollTop + container.clientHeight / 2;
    
                const distanceToMiddle = Math.abs((div.offsetTop + div.offsetHeight / 2) - containerMiddle);
    
                if (distanceToMiddle < closestOffset) {
                    closestOffset = distanceToMiddle;
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

        // Old Trigger
        const underlyingElement = getElementById('underlying');
        const event = new Event('change');
        underlyingElement.value = underlying;
        underlyingElement.setAttribute('data-text', underlyings[underlying]);
        underlyingElement.dispatchEvent(event);

        closeMarketDropdown();
    };

    return (
        <div className='quill-market-dropdown-container'>
            <div className='quill-market-dropdown-search-container'>
                <SearchField
                    inputSize='sm'
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder={localize('Search...')}
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
                    className='quill-market-dropdown-item-container market-item-container'
                    id='quill-market-dropdown-list'
                    ref={itemsContainer}
                >
                    {Object.keys(markets).map((ik) => {
                        const market = markets[ik];
                        const { submarkets } = market;
                       
                        const sortedSubmarketKeys = Object.keys(submarkets).sort((a, b) => {
                            if (a === 'major_pairs') return -1;
                            if (b === 'major_pairs') return 1;
                            if (a === 'minor_pairs') return -1;
                            if (b === 'minor_pairs') return 1;
                            return 0;
                        });

                        return (
                            <div id={`${ik}-dropdown-list`} key={ik} data-id={ik}>
                                {sortedSubmarketKeys.map((sk) => {
                                    const submarket = submarkets[sk];
                                    const { symbols, name } = submarket;

                                    return (
                                        <React.Fragment key={sk}>
                                            <DropdownTitle label={name} />
                                            {Object.keys(symbols).map((yk) => {
                                                const symbol = symbols[yk];
                                                const { display } = symbol;
                                                const isSelected = yk === selectedMarket;

                                                return (
                                                    <DropdownItem
                                                        key={yk}
                                                        onClick={() => handleUnderlyingClick(yk)}
                                                        label={display}
                                                        selected={isSelected}
                                                        size='md'
                                                    />
                                                );
                                            })}
                                            <Divider />
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

