const { tradeManager } = require('./trade_manager').default;
const CurrencyBase = require('../../_common/base/currency_base');
const localize     = require('../../_common/localize').localize;

const getCurrencyFullName = (currency) => CurrencyBase.isCryptocurrency(currency) ? `${CurrencyBase.getCurrencyName(currency)} (${CurrencyBase.getCurrencyDisplayCode(currency)})` : currency;

const getCurrencyList = (currencies) => {
    const currency_list = {
        fiat  : [],
        crypto: [],
    };
    const $currencies       = $('<select/>');
    const $fiat_currencies  = $('<optgroup/>', { label: localize('Fiat') });
    const $cryptocurrencies = $('<optgroup/>', { label: localize('Crypto') });

    currencies.forEach((currency) => {
        const currency_name = getCurrencyFullName(currency);
        (CurrencyBase.isCryptocurrency(currency) ? $cryptocurrencies : $fiat_currencies)
            .append($('<option/>', { value: currency, text: currency_name }));
        if (CurrencyBase.isCryptocurrency(currency)) {
            currency_list.crypto.push({ value: currency, text: currency_name });
        } else {
            currency_list.fiat.push({ value: currency, text: currency_name });
        }
    });
    tradeManager.set({
        currency_list,
    });

    return $currencies.append($fiat_currencies.children().length ? $fiat_currencies : '').append($cryptocurrencies.children().length ? $cryptocurrencies : '');
};

const getCurrencyNameList = (currencies) => {
    const currencies_name_list = [];
    currencies.forEach((currency) => {
        const currency_name = getCurrencyFullName(currency);
        currencies_name_list.push(currency_name);
    });
    return currencies_name_list;
};

module.exports = Object.assign({
    getCurrencyList,
    getCurrencyNameList,
    getCurrencyFullName,
}, CurrencyBase);
