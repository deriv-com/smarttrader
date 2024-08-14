import React, { useEffect, useRef, useState } from 'react';
import {
    DropdownItem,
    SearchField,
    Tab,
    DropdownTitle,
    Divider,
    useDropdown,
} from '@deriv-com/quill-ui';
import Symbols from '../symbols';
import ActiveSymbols, {
    marketOrder,
    sortObjectByKeys,
    derived,
} from '../../../common/active_symbols';
import Defaults, { PARAM_NAMES } from '../defaults';
import { triggerMarketChange } from '../../../hooks/events';
import { localize } from '../../../../_common/localize';
import dataManager from '../../../common/data_manager';

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
    const data = dataManager.getAllContracts('contract');
    let name = '';
    // eslint-disable-next-line consistent-return
    data?.contracts_tree?.forEach((contract) => {
        if (typeof contract === 'object') {
            contract[1].forEach((subtype) => {
                if (subtype === data?.actualFormName) {
                    name =  data?.contracts[subtype];
                }
            
            });
        
        } else if (contract === data?.actualFormName) {
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
    const disableScrollTimer = useRef();

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

        return () => clearTimeout(disableScrollTimer.current);
    }, []);

    // Handle selecting of tabs on scroll
    useEffect(() => {
        const container = itemsContainer.current;
    
        const checkActiveMarket = () => {
            const marketDivs = container.querySelectorAll('div');
            let closestMarket = '';
            let closestOffset = Infinity;
    
            marketDivs.forEach((div) => {
                const paddingOffset = 120;
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
            disableScrollTimer.current = setTimeout(() => {
                isScrolling.current = false;
            }, 1000);
        }
    };

    const handleUnderlyingClick = (underlying) => {
        Defaults.set(UNDERLYING, underlying);
        setSelectedMarket(underlying);
        triggerMarketChange();

        // Trigger the old form to enable other required effects from it
        document.querySelectorAll('.symbol_name').forEach(el => el.id === underlying && el.click());

        closeMarketDropdown();
    };

    useEffect(() => {
        if (isMounted && itemsContainer.current) {
            const paddingOffset = 96;
            const container = itemsContainer.current;
            const selectedElement = container.querySelector('.market-item-selected');
            if (selectedElement) {
                const offsetTop = selectedElement.offsetTop - container.offsetTop - paddingOffset;
                container.scrollTo({
                    top     : offsetTop,
                    behavior: 'auto',
                });
            }
                
        }
    
        const goToActiveMarket = () => {
            const container = itemsContainer.current;
            let selectedElement = container.querySelector('.market-item-selected');
        
            while (selectedElement && selectedElement !== document) {
                if (selectedElement.tagName === 'DIV' && selectedElement.hasAttribute('data-id')) {
                    const market =  selectedElement.getAttribute('data-id');
                    setActiveMarket(market);
                }
                selectedElement = selectedElement.parentElement;
            }
        };
    
        if (searchKey === '') {
            goToActiveMarket();
        }

    }, [isMounted, markets]);

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
                        {Object.keys(markets).map((market_key) => {
                            const market = markets[market_key];
                            const marketName = derived.includes(market_key)
                                ? `Derived (${market.name})`
                                : market.name;
                            return <Tab.Trigger key={market_key}>{marketName}</Tab.Trigger>;
                        })}
                    </Tab.List>
                </Tab.Container>
                <div
                    className='quill-market-dropdown-item-container market-item-container'
                    id='quill-market-dropdown-list'
                    ref={itemsContainer}
                >
                    {Object.keys(markets).map((market_key) => {
                        const market = markets[market_key];
                        const { submarkets } = market;

                        const sortedSubmarketKeys = Object.keys(submarkets).sort((a, b) => {
                            const pairs = ['major_pairs', 'minor_pairs'];
                            if (pairs.includes(a)) return -1;
                            if (pairs.includes(b)) return 1;
                            return 0;
                        });

                        return (
                            <div id={`${market_key}-dropdown-list`} key={market_key} data-id={market_key}>
                                {sortedSubmarketKeys.map((sub_market_key) => {
                                    const submarket = submarkets[sub_market_key];
                                    const { symbols, name } = submarket;

                                    return (
                                        <React.Fragment key={sub_market_key}>
                                            <DropdownTitle label={name} />
                                            {Object.keys(symbols).map((symbol_key) => {
                                                const symbol = symbols[symbol_key];
                                                const { display } = symbol;
                                                const isSelected = symbol_key === selectedMarket;

                                                return (
                                                    <DropdownItem
                                                        key={symbol_key}
                                                        onClick={() => handleUnderlyingClick(symbol_key)}
                                                        label={display}
                                                        selected={isSelected}
                                                        className={isSelected && 'market-item-selected'}
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

