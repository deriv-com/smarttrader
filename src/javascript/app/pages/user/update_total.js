const formatMoney = require('../../common/currency').formatMoney;

let total_real = 0;
let total_virtual = 0;

const updateTotal = (total) => {
    const is_demo_tab     = $('#acc_tabs').tabs('option', 'active') === 1;
    const el_total_amount = $('#account__switcher-total-balance-amount');

    if (!el_total_amount) {
        return;
    }

    let currency = 'USD';

    if (total) {
        if (total.type === 'virtual') {
            total_virtual = total.amount;
        } else {
            total_real = total.amount;
        }
        currency = total.currency;
    }

    const display_amount = formatMoney(currency, is_demo_tab ? total_virtual : total_real);
    el_total_amount.html(display_amount);
};

module.exports = updateTotal;
