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
        const { accounts, balance, currency, loginid, total } = response.balance;
        if (!currency) return;

        const updateBalanceByAccountId = (account_id, updated_balance, account_currency) => {
            const el_balance_span = document.querySelector(`.account__switcher-balance-${account_id}`);

            if (el_balance_span) {
                const display_balance = formatMoney(account_currency, updated_balance);

                el_balance_span.innerHTML = display_balance;
                
                const is_virtual = /^VRT/.test(account_id);
                const is_current = Client.get('loginid') === account_id;

                if (is_current) {
                    document.getElementById('header__acc-balance').innerHTML = display_balance;
                    Client.set('balance', updated_balance);
                    PortfolioInit.updateBalance();
                }

                if (is_virtual) {
                    TopUpVirtualPopup.init(updated_balance);
                    updateTotal({
                        amount  : updated_balance,
                        currency: account_currency,
                        type    : 'virtual',
                    });
                } else {
                    const total_prop = is_virtual ? 'deriv_demo' : 'deriv';
                    
                    if (total[total_prop]) {
                        updateTotal({
                            amount  : total[total_prop].amount,
                            currency: total[total_prop].currency,
                            type    : is_virtual ? 'virtual' : 'real',
                        });
                    }
                }
            }
        };

        if (accounts) {
            Object.keys(accounts).forEach(account_id => {
                const account = accounts[account_id];
                updateBalanceByAccountId(account_id, account.balance, account.currency);
            });
        } else if (loginid) {
            updateBalanceByAccountId(loginid, balance, currency);
            Client.setTotalBalance(balance, currency);
            updateContractBalance(balance);
        }
    });
};

module.exports = updateBalance;
