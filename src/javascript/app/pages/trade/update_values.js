const Client          = require('../../base/client');
const dataManager     = require('../../common/data_manager').default;
const formatMoney     = require('../../common/currency').formatMoney;
const localize        = require('../../../_common/localize').localize;

const updatePurchaseStatus = (final_price, pnl, profit, localized_contract_status) => {
    $('#contract_purchase_heading').text(localized_contract_status);
    const $payout  = $('#contract_purchase_payout');
    const $cost    = $('#contract_purchase_cost');
    const $profit  = $('#contract_purchase_profit');
    const currency = Client.get('currency');

    $payout.html($('<div/>', { text: localize('Buy price') }).append($('<p/>', { html: formatMoney(currency, Math.abs(pnl)) })));
    $cost.html($('<div/>', { text: localize('Final price') }).append($('<p/>', { html: formatMoney(currency, final_price) })));
    dataManager.setPurchase({
        pr_heading         : localized_contract_status,
        pr_table_payout     : localize('Buy price') ,
        pr_table_payout_value: formatMoney(currency, Math.abs(pnl)),
        pr_table_cost       : localize('Final price'),
        pr_table_cost_value  : formatMoney(currency, final_price),
    });

    if (!final_price) {
        $profit.html($('<div/>', { text: localize('Loss') }).append($('<p/>', { html: formatMoney(currency, pnl) })));
        dataManager.setPurchase({
            pr_table_profit     : localize('Loss'),
            pr_table_profit_value: formatMoney(currency, pnl),
        });
    } else {
        $profit.html($('<div/>', { text: localize('Profit') }).append($('<p/>', { html: formatMoney(currency, profit) })));
        updateContractBalance(Client.get('balance'));
        dataManager.setPurchase({
            pr_table_profit     : localize('Profit'),
            pr_table_profit_value: formatMoney(currency, profit),
        });
    }
   
};

const updateContractBalance = (balance) => {
    $('#contract_purchase_balance').html(localize('Account balance:')).append($('<p/>', { html: formatMoney(Client.get('currency'), balance) }));
    dataManager.setPurchase({
        pr_balance     : localize('Account balance:'),
        pr_balance_value: formatMoney(Client.get('currency'), balance),
    });
};

module.exports = {
    updatePurchaseStatus,
    updateContractBalance,
};
