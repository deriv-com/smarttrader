const formatMoney = require('../../common/currency').formatMoney;
const Client      = require('../../base/client');

let total_real = 0;
let total_virtual = 0;
let total_currency_virtual = 'USD';
let total_currency_real;

const updateTotal = (total) => {
    const is_demo_tab                 = $('#acc_tabs').tabs('option', 'active') === 1;
    const el_total_amount             = $('#account__switcher-total-balance-amount');
    const all_login_ids               = Client.getAllLoginids();
    const real_accounts               = all_login_ids.filter((loginid) => !/^VRT/.test(loginid));
    const more_than_one_real_account  = real_accounts.length > 1;

    if (!el_total_amount) {
        return;
    }
    if (total) {
        if (total.type === 'virtual') {
            total_virtual = total.amount;
            total_currency_virtual = total.currency;
        } else {
            total_real = total.amount;
            total_currency_real = total.currency;
        }
    }
    if (more_than_one_real_account) total_currency_real = 'USD';
    if (!['USD', 'EUR', 'GBP', 'AUD'].includes(total_currency_real)) {
        total_currency_real = 'USD';
    }

    const show_currency = is_demo_tab ? total_currency_virtual : total_currency_real;
    const display_total = is_demo_tab ? total_virtual : total_real;
    const display_amount = formatMoney(show_currency, display_total);
    el_total_amount.html(display_amount);
};

module.exports = updateTotal;
