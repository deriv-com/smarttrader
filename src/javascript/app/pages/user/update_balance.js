const PortfolioInit         = require('./account/portfolio/portfolio.init');
const updateTotal           = require('./update_total');
const updateContractBalance = require('../trade/update_values').updateContractBalance;
const Client                = require('../../base/client');
const BinarySocket          = require('../../base/socket');
const formatMoney           = require('../../common/currency').formatMoney;
const TopUpVirtualPopup     = require('../../pages/user/account/top_up_virtual/pop_up');
const getPropertyValue      = require('../../../_common/utility').getPropertyValue;

const updateBalance = (response) => {
    if (getPropertyValue(response, 'error')) {
        return;
    }
    BinarySocket.wait('website_status').then(() => {
        const loginid        = response.balance.loginid;
        const balance        = response.balance.balance;
        const currency       = response.balance.currency;
        const total          = response.balance.total.real.amount;
        const total_currency = response.balance.total.real.currency;
        const is_current     = Client.get('loginid') === loginid;
        const is_virtual     = /^VRT/.test(loginid);
        if (!currency) {
            return;
        }

        const view = formatMoney(currency, balance);
        if (is_current) {
            $('#header__acc-balance').html(view);
            Client.set('balance', balance);
            PortfolioInit.updateBalance();
        }

        if (is_virtual) {
            $('.account__switcher-balance-virtual').html(view);
            TopUpVirtualPopup.init(balance);
        } else {
            $(`.account__switcher-balance-${currency}`).html(view);
        }

        Client.setTotalBalance(total, total_currency);
        updateTotal({ amount: total , currency: total_currency });
        updateContractBalance(balance);
        // $('#header__acc-balance, .topMenuBalance, .binary-balance').html(view)
        //     .css('visibility', 'visible');
    });
};

module.exports = updateBalance;
