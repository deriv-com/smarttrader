const FormManager    = require('./form_manager');
const Header         = require('../base/header');
const BinaryPjax     = require('../base/binary_pjax');
const Client         = require('../base/client');
const param          = require('../../_common/url').param;
const localize       = require('../../_common/localize').localize;
const ClientBase     = require('../../_common/base/client_base');
const BinarySocket   = require('../base/socket');
const getElementById = require('../../_common/common_functions').getElementById;
const urlFor         = require('../../_common/url').urlFor;

const AccountOpening = (() => {
    const redirectAccount = () => {
        const upgrade_info = Client.getUpgradeInfo();
        if (!upgrade_info.can_upgrade) {
            BinaryPjax.loadPreviousUrl();
            return -1;
        }
        const real_account_signup_target = param('account_type');
        const is_in_correct_path = upgrade_info.can_upgrade_to.some(lc => lc === real_account_signup_target);
        if (!is_in_correct_path) {
            const upgradable_accounts_count = upgrade_info.can_upgrade_to.length;
            if (upgradable_accounts_count > 1) {
                BinaryPjax.load('user/accounts');
            } else if (upgradable_accounts_count === 1) {
                window.location.replace(urlFor('/new_account/real_account', `account_type=${upgrade_info.can_upgrade_to[0]}`));
            }
            return 1;
        }
        return 0;
    };

    const showResponseError = (response) => {
        getElementById('loading').setVisibility(0);
        getElementById('real_account_wrapper').setVisibility(1);
        const $notice_box = $('#client_message').find('.notice-msg');
        $('#submit-message').empty();
        $notice_box.text(response.msg_type === 'sanity_check' ? localize('There was some invalid character in an input field.') : response.error.message).end()
            .setVisibility(1);
        $.scrollTo($notice_box, 500, { offset: -150 });
    };

    const setCurrencyForFinancialAccount = async (currency_to_set) => {
        sessionStorage.removeItem('new_financial_account_set_currency');
        await BinarySocket.wait('authorize');
        const response = await BinarySocket.send({ set_account_currency: currency_to_set });
        if (response.error) {
            showResponseError(response);
        } else {
            Client.set('currency', currency_to_set);
            BinarySocket.send({ balance: 1 });
            BinarySocket.send({ payout_currencies: 1 }, { forced: true });
            Header.displayAccountStatus();
            setTimeout(() => { window.location.replace(urlFor('user/set-currency') || urlFor('trading')); }, 500); // need to redirect not using pjax
        }
    };

    const createNewAccount = async (account_details, submit_button) => {
        FormManager.disableButton(submit_button);
        const is_maltainvest_account = !!account_details.new_account_maltainvest;
        const currency = account_details.currency;
        delete account_details.tax_identification_confirm;
        delete account_details.tnc;
        delete account_details.pep_declaration;
        if (is_maltainvest_account) delete account_details.currency;

        const response = await BinarySocket.send(account_details);
        if (response.error) showResponseError(response);
        else {
            localStorage.setItem('is_new_account', 1);
            const email = Client.get('email');
            const loginid = response[is_maltainvest_account ? 'new_account_maltainvest' : 'new_account_real'].client_id;
            const token = response[is_maltainvest_account ? 'new_account_maltainvest' : 'new_account_real'].oauth_token;
            ClientBase.setNewAccount({ email, loginid, token });
            // Set currency after account is created for Maltainvest only
            if (is_maltainvest_account) {
                sessionStorage.setItem('new_financial_account_set_currency', currency);
                window.location.reload();
            } else window.location.replace(urlFor('user/set-currency'));
        }
        FormManager.enableButton(submit_button);
    };

    const showHidePulser = (should_show) => { $('.upgrademessage').children('a').setVisibility(should_show); };

    const registerPepToggle = () => {
        $('#pep_declaration_note_toggle').off('click').on('click', (e) => {
            e.stopPropagation();
            $('#pep_declaration_note_toggle').toggleClass('open');
            $('#pep_declaration_note').slideToggle();
        });
    };

    return {
        createNewAccount,
        redirectAccount,
        registerPepToggle,
        setCurrencyForFinancialAccount,
        showHidePulser,
    };
})();

module.exports = AccountOpening;

