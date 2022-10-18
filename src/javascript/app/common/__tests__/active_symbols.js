const deep          = require('deep-diff'); // eslint-disable-line import/no-extraneous-dependencies
const activeSymbols = require('../active_symbols');
const { expect }    = require('../../../_common/__tests__/tests_common');

/*
    There is a market called forex, which has a submarket called major_pairs, which has a symbol called frxEURUSD
*/

const expected_markets_str = `{
    "forex": {
        "name": "Forex",
        "is_active": 1,
        "subgroup_name": "None",
        "submarkets": {
            "major_pairs": {
                "name": "Major Pairs",
                "is_active": 1,
                "symbols": {
                    "frxEURUSD": {
                        "display": "EUR/USD",
                        "symbol_type": "forex",
                        "is_active": 1,
                        "pip": 0.00001,
                        "market": "forex",
                        "submarket": "major_pairs"
                    }
                }
            }
        }
    },
    "baskets": {
        "name": "Baskets",
        "is_active": 1,
        "subgroup_name": "Derived",
        "submarkets": {
            "forex_basket": {
                "name": "Forex Basket",
                "is_active": 1,
                "symbols": {
                    "WLDAUD": {
                        "display": "AUD Basket",
                        "symbol_type": "forex_basket",
                        "is_active": 1,
                        "pip": 0.001,
                        "market": "synthetic_index",
                        "submarket": "forex_basket"
                    }
                }
            },
        }
    }
}`

const active_symbols = [
    {
        allow_forward_starting: 1,
        display_name: "EUR/USD",
        display_order: 78,
        exchange_is_open: 1,
        is_trading_suspended: 0,
        market: "forex",
        market_display_name: "Forex",
        pip: 0.00001,
        subgroup: "none",
        subgroup_display_name: "None",
        submarket: "major_pairs",
        submarket_display_name: "Major Pairs",
        symbol: "frxEURUSD",
        symbol_type: "forex",
    }, {
        allow_forward_starting: 0,
        display_name: "AUD Basket",
        display_order: 78,
        exchange_is_open: 1,
        is_trading_suspended: 0,
        market: "synthetic_index",
        market_display_name: "Derived",
        pip: 0.001,
        subgroup: "baskets",
        subgroup_display_name: "Baskets",
        submarket: "forex_basket",
        submarket_display_name: "Forex Basket",
        symbol: "WLDAUD",
        symbol_type: "forex_basket",
    }
];

const set_checks = (obj) => {
    if (obj instanceof Object) {
        delete obj.is_active;
        delete obj.display;
        Object.keys(obj).forEach((key) => {
            if (obj[key] instanceof Object) {
                set_checks(obj[key]);
            }
        });
    }
    return obj;
};

describe('ActiveSymbols', () => {
    it('Should have all functions that are being tested', () => {
        expect(activeSymbols).to.have.any.of.keys(['getMarkets', 'getSubmarkets', 'getMarketsList', 'getTradeUnderlyings', 'getSymbolNames']);
    });
    it('Should have correct keys in getMarkets return value', () => {
        const markets = activeSymbols.getMarkets(active_symbols);
        expect(markets).to.be.an('Object')
            .and.to.have.property('forex');
        expect(markets).to.have.property('baskets');
        expect(markets).to.not.have.property('commodities');
        expect(markets.forex).to.have.property('name')
            .and.to.be.a('String');
        expect(markets.forex).to.have.property('is_active')
            .and.to.be.a('Number');
        expect(markets.forex).to.have.property('submarkets')
            .and.to.be.an('Object');
        expect(markets.baskets).to.have.property('subgroup_name')
            .and.to.be.a('String');
    });
    it('Should getSubmarkets have major_pairs and forex_basket as a key, but not forex and baskets', () => {
        const submarkets = activeSymbols.getSubmarkets(active_symbols);
        expect(submarkets).to.be.an('Object')
        expect(submarkets).to.have.property('major_pairs');
        expect(submarkets).to.have.property('forex_basket');
        expect(submarkets).to.not.have.property('forex');
        expect(submarkets).to.not.have.property('baskets');
    });
    it('Should getMarketsList have forex_basket, major_pairs, forex and baskets as keys', () => {
        const market_list = activeSymbols.getMarketsList(active_symbols);
        expect(market_list).to.be.an('Object')
            .and.to.have.all.of.keys(['forex_basket', 'major_pairs', 'forex', 'baskets']);
    });
    it('Should return correct values in getTradeUnderlyings', () => {
        const trade_underlyings = activeSymbols.getTradeUnderlyings(active_symbols);
        expect(trade_underlyings).to.be.an('Object')
            .and.to.have.property('forex')
            .and.to.have.property('frxEURUSD')
            .and.to.have.any.of.keys(['is_active', 'display', 'market', 'submarket']);
        expect(trade_underlyings).to.have.property('major_pairs')
            .and.to.have.property('frxEURUSD')
            .and.to.have.any.of.keys(['is_active', 'display', 'market', 'submarket']);
        expect(trade_underlyings).to.be.an('Object')
            .and.to.have.property('forex_basket')
            .and.to.have.property('WLDAUD')
            .and.to.have.any.of.keys(['is_active', 'display', 'market', 'submarket']);
        expect(trade_underlyings).to.have.property('forex_basket')
            .and.to.have.property('WLDAUD')
            .and.to.have.any.of.keys(['is_active', 'display', 'market', 'submarket']);
    });
    it('Should getSymbolNames have all symbol names', () => {
        const names = activeSymbols.getSymbolNames(active_symbols);
        expect(names).to.be.an('Object')
            .and.to.have.property('frxEURUSD');
        expect(names).to.have.property('WLDAUD');
    });
    it.skip('Should getMarkets output match the market snapshot', () => {
        const markets   = activeSymbols.getMarkets(active_symbols);
        const deep_diff = deep(set_checks(markets), set_checks(JSON.parse(expected_markets_str)));
        if (deep_diff) {
            deep_diff.forEach((diff) => {
                expect(diff).to.have.property('kind')
                    .and.not.to.be.equal('E');
            });
        }
    });
});
