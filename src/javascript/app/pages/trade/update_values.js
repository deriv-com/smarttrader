const Client          = require('../../base/client');
const purchaseManager = require('../../common/purchase_manager').default;
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
    purchaseManager.set({
        pr_tablePayout     : localize('Buy price') ,
        pr_tablePayoutValue: formatMoney(currency, Math.abs(pnl)),
        pr_tableCost       : localize('Final price'),
        pr_tableCostValue  : formatMoney(currency, final_price),
    });

    if (!final_price) {
        $profit.html($('<div/>', { text: localize('Loss') }).append($('<p/>', { html: formatMoney(currency, pnl) })));
        purchaseManager.set({
            pr_tableProfit     : localize('Loss'),
            pr_tableProfitValue: formatMoney(currency, pnl),
        });
    } else {
        $profit.html($('<div/>', { text: localize('Profit') }).append($('<p/>', { html: formatMoney(currency, profit) })));
        updateContractBalance(Client.get('balance'));
        purchaseManager.set({
            pr_tableProfit     : localize('Profit'),
            pr_tableProfitValue: formatMoney(currency, profit),
        });
    }
   
};

const updateContractBalance = (balance) => {
    $('#contract_purchase_balance').html(localize('Account balance:')).append($('<p/>', { html: formatMoney(Client.get('currency'), balance) }));
    purchaseManager.set({
        pr_balance     : localize('Account balance:'),
        pr_balanceValue: formatMoney(Client.get('currency'), balance),
    });
};

module.exports = {
    updatePurchaseStatus,
    updateContractBalance,
};
