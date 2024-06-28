const isEmptyObject = require('../../_common/utility').isEmptyObject;

const submarket_order = {
    forex          : 0,
    major_pairs    : 1,
    minor_pairs    : 2,
    indices        : 3,
    asia_oceania   : 4,
    europe_africa  : 5,
    americas       : 6,
    otc_index      : 7,
    stocks         : 8,
    au_otc_stock   : 9,
    ge_otc_stock   : 10,
    india_otc_stock: 11,
    uk_otc_stock   : 12,
    us_otc_stock   : 13,
    commodities    : 14,
    metals         : 15,
    energy         : 16,
    synthetic_index: 17,
    random_index   : 18,
    random_daily   : 19,
    random_nightly : 20,
};

const marketOrder = [
    'forex',
    'indices',
    'cryptocurrency',
    'commodities',
    'baskets',
    'synthetics',
];

const derived = ['baskets','synthetics'];

const ActiveSymbols = (() => {
    const groupBy = (xs, key) => (
        xs.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {})
    );

    const extend = (a, b) => {
        if (!a || !b) return null;
        Object.keys(b).forEach((key) => {
            a[key] = b[key];
        });
        return a;
    };

    const clone = obj => extend({}, obj);

    let markets    = {};
    let submarkets = {};
    let symbols    = {};

    const getMarkets = (all_symbols) => {
        if (!isEmptyObject(markets)) {
            return clone(markets);
        }

        const all_markets = groupBy(all_symbols, 'market');
        const derived_markets = groupBy(all_markets.synthetic_index, 'subgroup');
        delete all_markets.synthetic_index;
        const final_markets = { ...all_markets, ...derived_markets };
        
        Object.keys(final_markets).forEach((key) => {
            const market_name    = key;
            const market_symbols = final_markets[key];
            const symbol         = market_symbols[0];
            markets[market_name] = {
                name         : symbol.market === 'synthetic_index' ? symbol.subgroup_display_name : symbol.market_display_name,
                is_active    : !symbol.is_trading_suspended && symbol.exchange_is_open,
                subgroup_name: symbol.subgroup_display_name !== 'None' ? symbol.market_display_name : symbol.subgroup_display_name,
                subgroup     : symbol.subgroup !== 'none' ? symbol.market : symbol.subgroup,
            };
            getSubmarketsForMarket(market_symbols, markets[market_name]);
        });
        return clone(markets);
    };

    const clearData = () => {
        markets    = {};
        symbols    = {};
        submarkets = {};
    };

    const getSubmarketsForMarket = (all_symbols, market) => {
        if (!isEmptyObject(market.submarkets)) {
            return clone(market.submarkets);
        }
        market.submarkets = {};

        const all_submarkets = groupBy(all_symbols, 'submarket');

        Object.keys(all_submarkets).forEach((key) => {
            const submarket_name    = key;
            const submarket_symbols = all_submarkets[key];
            const symbol            = submarket_symbols[0];

            market.submarkets[submarket_name] = {
                name     : symbol.submarket_display_name,
                is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
            };

            getSymbolsForSubmarket(submarket_symbols, market.submarkets[submarket_name]);
        });
        return clone(market.submarkets);
    };

    const getSymbolsForSubmarket = (all_symbols, submarket) => {
        if (isEmptyObject(submarket.symbols)) {
            submarket.symbols = {};
            all_symbols.forEach((symbol) => {
                submarket.symbols[symbol.symbol] = {
                    display    : symbol.display_name,
                    symbol_type: symbol.symbol_type,
                    is_active  : !symbol.is_trading_suspended && symbol.exchange_is_open,
                    pip        : symbol.pip,
                    market     : symbol.market !== 'synthetic_index' ? symbol.market : symbol.subgroup,
                    submarket  : symbol.submarket,
                };
            });
        }
        return clone(submarket.symbols);
    };

    const getSubmarkets = (active_symbols) => {
        if (isEmptyObject(submarkets)) {
            const all_markets = getMarkets(active_symbols);
            Object.keys(all_markets).forEach((key) => {
                const market         = all_markets[key];
                const all_submarkets = getSubmarketsForMarket(active_symbols, market);
                extend(submarkets, all_submarkets);
            });
        }
        return clone(submarkets);
    };

    const getSymbols = (active_symbols) => {
        if (isEmptyObject(symbols)) {
            const all_submarkets = getSubmarkets(active_symbols);
            Object.keys(all_submarkets).forEach((key) => {
                const submarket   = all_submarkets[key];
                const all_symbols = getSymbolsForSubmarket(active_symbols, submarket);
                extend(symbols, all_symbols);
            });
        }
        return clone(symbols);
    };

    const getSymbolsForMarket = (active_symbols, market) => {
        const all_symbols = getSymbols(active_symbols);

        const filtered_symbols = Object.keys(all_symbols)
            // only keep the symbols of the currently selected market
            .filter(symbol => all_symbols[symbol].market === market)
            // sort them by the submarket order defined
            .sort((symbol_a, symbol_b) =>
                sortSubmarket(all_symbols[symbol_a].submarket, all_symbols[symbol_b].submarket)
            )
            // make it into an object again with all needed data
            .reduce((obj, symbol) => ({
                ...obj,
                [symbol]: all_symbols[symbol],
            }), {});

        return clone(filtered_symbols);
    };

    const sortSubmarket = (a, b) => {
        if (submarket_order[a] > submarket_order[b]) {
            return 1;
        } else if (submarket_order[a] < submarket_order[b]) {
            return -1;
        }
        return 0;
    };

    const getMarketsList = (active_symbols) => {
        const trade_markets_list = {};
        extend(trade_markets_list, getMarkets(active_symbols));
        extend(trade_markets_list, getSubmarkets(active_symbols));
        return trade_markets_list;
    };
    
    const getAvailableUnderlyings = (markets_list) => {
        const markets_list_clone = clone(markets_list);

        Object.keys(markets_list_clone).forEach(market_key => {
            Object.keys(markets_list_clone[market_key].submarkets).forEach(submarket_key => {
                if (Object.keys(markets_list_clone[market_key].submarkets[submarket_key].symbols).length === 0) {
                    delete markets_list_clone[market_key].submarkets[submarket_key];
                }
            });
            if (Object.keys(markets_list_clone[market_key].submarkets).length === 0){
                delete markets_list_clone[market_key];
            }
        });
        if (Object.keys(markets_list_clone).length === 0) return [];
        return markets_list_clone;
    };

    const getTradeUnderlyings = (active_symbols) => {
        const trade_underlyings = {};
        const all_symbols       = getSymbols(active_symbols);
        Object.keys(all_symbols).forEach((key) => {
            const symbol = all_symbols[key];
            if (!trade_underlyings[symbol.market]) {
                trade_underlyings[symbol.market] = {};
            }
            if (!trade_underlyings[symbol.submarket]) {
                trade_underlyings[symbol.submarket] = {};
            }
            trade_underlyings[symbol.market][key]    = symbol;
            trade_underlyings[symbol.submarket][key] = symbol;
        });
        return trade_underlyings;
    };

    const getSymbolNames = (active_symbols) => {
        const all_symbols = clone(getSymbols(active_symbols));
        Object.keys(all_symbols).forEach((key) => {
            all_symbols[key] = all_symbols[key].display;
        });
        return all_symbols;
    };

    const sortObjectByKeys = (obj, order) => {
        const orderedObj = {};
        const remainingObj = {};
    
        // Add keys in the specified order
        order.forEach(key => {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
                orderedObj[key] = obj[key];
            }
        });
    
        // Add any remaining keys that were not specified in the order array
        Object.keys(obj).forEach(key => {
            // eslint-disable-next-line no-prototype-builtins
            if (!orderedObj.hasOwnProperty(key)) {
                remainingObj[key] = obj[key];
            }
        });
    
        // Combine ordered keys and remaining keys
        return { ...orderedObj, ...remainingObj };
    };

    return {
        getMarkets,
        getSubmarkets,
        getMarketsList,
        getTradeUnderlyings,
        getSymbolNames,
        clearData,
        getSymbols,
        getSymbolsForMarket,
        sortSubmarket,
        getAvailableUnderlyings,
        marketOrder,
        derived,
        sortObjectByKeys,
    };
})();

module.exports = ActiveSymbols;
