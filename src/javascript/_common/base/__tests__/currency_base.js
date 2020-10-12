const expect   = require('chai').expect;
const Currency = require('../currency_base');

describe('Currency', () => {
    const currencies_config = {
        currencies_config: {
            AUD: { fractional_digits: 2, type: 'fiat' },
            EUR: { fractional_digits: 2, type: 'fiat' },
            GBP: { fractional_digits: 2, type: 'fiat' },
            USD: { fractional_digits: 2, type: 'fiat', transfer_between_accounts: { limits: { max: 2500, min: 1.00 } } },
            BTC: { fractional_digits: 8, type: 'crypto' },
        }
    };
    before(() => {
        Currency.setCurrencies(currencies_config);
    });

    describe('.formatMoney()', () => {
        it('works as expected', () => {
            expect(Currency.formatMoney('USD', '123.55')).to.eq(`123.55${Currency.formatCurrency('USD')}`);
            expect(Currency.formatMoney('GBP', '123.55')).to.eq(`123.55${Currency.formatCurrency('GBP')}`);
            expect(Currency.formatMoney('EUR', '123.55')).to.eq(`123.55${Currency.formatCurrency('EUR')}`);
            expect(Currency.formatMoney('AUD', '123.55')).to.eq(`123.55${Currency.formatCurrency('AUD')}`);
            expect(Currency.formatMoney('BTC', '0.005432110')).to.eq(`0.00543211${Currency.formatCurrency('BTC')}`);
            expect(Currency.formatMoney('BTC', '0.005432116')).to.eq(`0.00543212${Currency.formatCurrency('BTC')}`);
            expect(Currency.formatMoney('BTC', '0.00000001')).to.eq(`0.00000001${Currency.formatCurrency('BTC')}`);
            // don't remove trailing zeroes for now
            expect(Currency.formatMoney('BTC', '0.00010000')).to.eq(`0.00010000${Currency.formatCurrency('BTC')}`);
        });

        it('works with negative values', () => {
            expect(Currency.formatMoney('USD', '-123.55')).to.eq(`-123.55${Currency.formatCurrency('USD')}`);
        });

        it('works when exclude currency', () => {
            expect(Currency.formatMoney('USD', '123.55', 1)).to.eq('123.55');
        });
    });

    describe('.formatCurrency()', () => {
        it('works as expected', () => {
            expect(Currency.formatCurrency('USD')).to.eq('<span class="symbols">&nbsp;USD</span>');
        });
    });

    describe('.addComma()', () => {
        it('works as expected', () => {
            expect(Currency.addComma('123')).to.eq('123');
            expect(Currency.addComma('1234567')).to.eq('1,234,567');
        });

        it('works with decimal places', () => {
            expect(Currency.addComma('1234.5678')).to.eq('1,234.5678');
            expect(Currency.addComma('1234.5678', 2)).to.eq('1,234.57');
            expect(Currency.addComma('1234', 2)).to.eq('1,234.00');
            expect(Currency.addComma('1234.45', 0)).to.eq('1,234');
            expect(Currency.addComma('1234.56', 0)).to.eq('1,235');
        });

        it('works with negative numbers', () => {
            expect(Currency.addComma('-1234')).to.eq('-1,234');
        });

        it('handles null values', () => {
            expect(Currency.addComma()).to.eq('0');
            expect(Currency.addComma(null)).to.eq('0');
            expect(Currency.addComma(undefined)).to.eq('0');
            expect(Currency.addComma('')).to.eq('0');
        });
    });

    describe('.getDecimalPlaces()', () => {
        it('works as expected', () => {
            expect(Currency.getDecimalPlaces('AUD')).to.eq(2);
            expect(Currency.getDecimalPlaces('EUR')).to.eq(2);
            expect(Currency.getDecimalPlaces('GBP')).to.eq(2);
            expect(Currency.getDecimalPlaces('USD')).to.eq(2);
            expect(Currency.getDecimalPlaces('BTC')).to.eq(8);
        });

        it('works with undefined currencies', () => {
            expect(Currency.getDecimalPlaces('ZZZ')).to.eq(2);
        });
    });

    describe('.getCurrencies()', () => {
        it('works as expected', () => {
            expect(Currency.getCurrencies()).to.deep.eq(currencies_config.currencies_config);
        });
    });

    describe('.isCryptocurrency()', () => {
        it('works as expected', () => {
            expect(Currency.isCryptocurrency('AUD')).to.eq(false);
            expect(Currency.isCryptocurrency('EUR')).to.eq(false);
            expect(Currency.isCryptocurrency('GBP')).to.eq(false);
            expect(Currency.isCryptocurrency('USD')).to.eq(false);
            expect(Currency.isCryptocurrency('BTC')).to.eq(true);
        });

        it('works with undefined currencies', () => {
            expect(Currency.isCryptocurrency('ZZZ')).to.eq(false);
        });
    });

    describe('.getTransferLimits()', () => {
        it('returns limits based on input', () => {
            expect(Currency.getTransferLimits('USD')).to.eq('1.00');
            expect(Currency.getTransferLimits('USD', 'max')).to.eq('2500.00');
            expect(Currency.getTransferLimits('BTC')).to.eq(undefined);
            expect(Currency.getTransferLimits('BTC', 'max')).to.eq(undefined);
        })
    })
});
