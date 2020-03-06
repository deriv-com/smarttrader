const formatMoney           = require('../../common/currency').formatMoney;
const Client                = require('../../base/client');

const updateTotal = (total = Client.getTotalBalance()) => {
    const is_demo_tab = $('#acc_tabs').tabs('option', 'active') === 1;
    const virtual_total = $('.account__switcher-balance-virtual')[0];
    const total_amount = $('#account__switcher-total-balance-amount');

    if (!virtual_total || !total_amount) {
        return;
    }

    if (is_demo_tab) {
        total_amount.html(formatMoney('USD', virtual_total.textContent)).addClass('account__switcher-balance-virtual');
    } else {
        total_amount.html(formatMoney('USD', total)).removeClass('account__switcher-balance-virtual');
    }
};

module.exports = updateTotal;
