const BinaryPjax   = require('../../../base/binary_pjax');
const Client       = require('../../../base/client');
const Header       = require('../../../base/header');
const BinarySocket = require('../../../base/socket');
const Dialog       = require('../../../common/attach_dom/dialog');
const Currency     = require('../../../common/currency');
const Validation   = require('../../../common/form_validation');
const GTM          = require('../../../../_common/base/gtm');
const localize     = require('../../../../_common/localize').localize;
const State        = require('../../../../_common/storage').State;
const urlFor       = require('../../../../_common/url').urlFor;
const isBinaryApp  = require('../../../../config').isBinaryApp;

const MetaTraderConfig = (() => {
    const configMtCompanies = (() => {
        let mt_companies;

        const initMtCompanies = () => {
            const financial_config = {
                account_type: 'financial',
                leverage    : 1000,
                short_title : localize('Financial'),
            };
            const financial_stp_config = {
                account_type: 'financial_stp',
                leverage    : 100,
                short_title : localize('Financial STP'),
            };
            const synthetic_config = {
                account_type: '',
                leverage    : 500,
                short_title : localize('Synthetic'),
            };

            return ({
                gaming: {
                    demo_synthetic: { mt5_account_type: synthetic_config.account_type, max_leverage: synthetic_config.leverage, title: localize('Demo Synthetic'), short_title: synthetic_config.short_title },
                    real_synthetic: { mt5_account_type: synthetic_config.account_type, max_leverage: synthetic_config.leverage, title: localize('Real Synthetic'), short_title: synthetic_config.short_title },
                },
                financial: {
                    demo_financial    : { mt5_account_type: financial_config.account_type, max_leverage: financial_config.leverage, title: localize('Demo Financial'), short_title: financial_config.short_title },
                    real_financial    : { mt5_account_type: financial_config.account_type, max_leverage: financial_config.leverage, title: localize('Real Financial'), short_title: financial_config.short_title },
                    demo_financial_stp: { mt5_account_type: financial_stp_config.account_type, max_leverage: financial_stp_config.leverage, title: localize('Demo Financial STP'), short_title: financial_stp_config.short_title },
                    real_financial_stp: { mt5_account_type: financial_stp_config.account_type, max_leverage: financial_stp_config.leverage, title: localize('Real Financial STP'), short_title: financial_stp_config.short_title },
                },
            });
        };

        return {
            get: () => {
                if (!mt_companies) {
                    mt_companies = initMtCompanies();
                }
                return mt_companies;
            },
        };
    })();

    const configMtFinCompanies = (() => {
        let mt_financial_companies;

        const initMtFinCompanies = () => {
            const financial_config = {
                account_type: 'financial',
                leverage    : 30,
                short_title : localize('Financial'),
            };

            return ({
                // for financial mt company with shortcode maltainvest, only offer financial account with different leverage
                financial: {
                    demo_financial: { mt5_account_type: financial_config.account_type, max_leverage: financial_config.leverage, title: localize('Demo Financial'), short_title: financial_config.short_title },
                    real_financial: { mt5_account_type: financial_config.account_type, max_leverage: financial_config.leverage, title: localize('Real Financial'), short_title: financial_config.short_title },
                },
                gaming: {
                    demo_synthetic: configMtCompanies.get().gaming.demo_synthetic,
                    real_synthetic: configMtCompanies.get().gaming.real_synthetic,
                },
            });
        };

        return {
            get: () => {
                if (!mt_financial_companies) {
                    mt_financial_companies = initMtFinCompanies();
                }
                return mt_financial_companies;
            },
        };
    })();

    // we need to check if the account type is financial or financial_stp account before returning landing_company shortcode
    // TODO: [remove-standard-advanced] remove advanced when API groups are updated
    const getMTFinancialAccountType = acc_type => `${/_(advanced|financial_stp)$/.test(acc_type) ? 'financial_stp' : 'financial'}`;
    const getOldMTFinancialAccountType = acc_type => `${/_(advanced|financial_stp)$/.test(acc_type) ? 'advanced' : 'standard'}`;

    const accounts_info = {};

    let $messages;
    const needsRealMessage = () => $messages.find('#msg_switch').html();

    const newAccCheck = (acc_type, message_selector) => (
        new Promise((resolve) => {
            const $message = $messages.find('#msg_real_financial').clone();
            const is_virtual = Client.get('is_virtual');
            const is_demo = accounts_info[acc_type].is_demo;

            if (!Client.get('currency')) {
                resolve($messages.find('#msg_set_currency').html());
            } else if (is_demo) {
                resolve();
            } else if (is_virtual) { // virtual clients can only open demo MT accounts
                resolve(needsRealMessage());
            } else {
                BinarySocket.wait('get_settings').then(() => {
                    const showElementSetRedirect = (selector) => {
                        const $el = $message.find(selector);
                        $el.setVisibility(1);
                        const $link = $el.find('a');
                        $link.attr('href', `${$link.attr('href')}#mt5_redirect=${acc_type}`);
                    };
                    const resolveWithMessage = () => {
                        $message.find(message_selector).setVisibility(1);
                        resolve($message.html());
                    };

                    const has_financial_account = Client.hasAccountType('financial', 1);
                    const is_maltainvest        = State.getResponse(`landing_company.mt_financial_company.${getMTFinancialAccountType(acc_type)}.shortcode`) === 'maltainvest' ||
                        State.getResponse(`landing_company.mt_financial_company.${getOldMTFinancialAccountType(acc_type)}.shortcode`) === 'maltainvest';
                    const is_demo_financial     = accounts_info[acc_type].account_type === 'demo' && accounts_info[acc_type].mt5_account_type; // is not demo vol account
                    const is_financial          = accounts_info[acc_type].account_type === 'financial';

                    if (is_maltainvest && (is_financial || is_demo_financial) && !has_financial_account) {
                        $message.find('.maltainvest').setVisibility(1);

                        resolveWithMessage();
                    }

                    const response_get_settings = State.getResponse('get_settings');
                    if (is_financial) {
                        const is_svg = State.getResponse(`landing_company.mt_financial_company.${getMTFinancialAccountType(acc_type)}.shortcode`) === 'svg' ||
                            State.getResponse(`landing_company.mt_financial_company.${getOldMTFinancialAccountType(acc_type)}.shortcode`) === 'svg';
                        if (is_svg) resolve();

                        let is_ok = true;
                        BinarySocket.wait('get_account_status', 'landing_company').then(async () => {
                            if (is_maltainvest && !has_financial_account) resolve();

                            const response_get_account_status = State.getResponse('get_account_status');
                            if (/financial_information_not_complete/.test(response_get_account_status.status)) {
                                showElementSetRedirect('.assessment');
                                is_ok = false;
                            } else if (/trading_experience_not_complete/.test(response_get_account_status.status)) {
                                showElementSetRedirect('.trading_experience');
                                is_ok = false;
                            }
                            if (+State.getResponse('landing_company.config.tax_details_required') === 1 && (!response_get_settings.tax_residence || !response_get_settings.tax_identification_number)) {
                                showElementSetRedirect('.tax');
                                is_ok = false;
                            }
                            if (!response_get_settings.citizen) {
                                showElementSetRedirect('.citizen');
                                is_ok = false;
                            }
                            if (!response_get_settings.account_opening_reason) {
                                showElementSetRedirect('.acc_opening_reason');
                                is_ok = false;
                            }
                            // UK Clients need to be authenticated first before they can proceed with account creation
                            if (is_ok && !isAuthenticated() && is_maltainvest && accounts_info[acc_type].mt5_account_type === 'financial' && Client.get('residence') === 'gb') {
                                $('#view_1 #btn_next').addClass('button-disabled');
                                $('#authenticate_loading').setVisibility(1);
                                await setMaltaInvestIntention();
                                $('#authenticate_loading').setVisibility(0);
                                $message.find('.authenticate').setVisibility(1);
                                is_ok = false;
                            }
                            if (is_ok && !isAuthenticated() && accounts_info[acc_type].mt5_account_type === 'financial_stp') {
                                // disable button must occur before loading
                                $('#view_1 #btn_next').addClass('button-disabled');
                                $('#authenticate_loading').setVisibility(1);
                                await setLabuanFinancialSTPIntention();
                                $('#authenticate_loading').setVisibility(0);
                                $message.find('.authenticate').setVisibility(1);
                                is_ok = false;
                            }

                            if (is_ok) resolve();
                            else resolveWithMessage();
                        });
                    } else if (accounts_info[acc_type].account_type === 'gaming') {
                        let is_ok = true;
                        BinarySocket.wait('get_account_status', 'landing_company').then(async () => {
                            const response_get_account_status = State.getResponse('get_account_status');
                            if (/financial_assessment_not_complete/.test(response_get_account_status.status)
                                && !accounts_info[acc_type].mt5_account_type // is_synthetic
                                && /high/.test(response_get_account_status.risk_classification)
                            ) {
                                showElementSetRedirect('.assessment');
                                is_ok = false;
                            }
                            if (!response_get_settings.citizen
                                && !(is_maltainvest && !has_financial_account)
                                && accounts_info[acc_type].mt5_account_type) {
                                showElementSetRedirect('.citizen');
                                is_ok = false;
                            }

                            const should_have_malta = Client.getUpgradeInfo().can_upgrade_to.includes('malta');

                            if (is_ok && is_maltainvest && should_have_malta) {
                                $('#view_1 #btn_next').addClass('button-disabled');
                                $('#authenticate_loading').setVisibility(1);
                                $message.find('.malta').setVisibility(1);
                                await setMaltaIntention();
                                $('#authenticate_loading').setVisibility(0);
                                is_ok = false;
                                resolveWithMessage();
                            } else if (is_ok) {
                                resolve();
                            } else {
                                resolveWithMessage();
                            }
                        });
                    }
                });
            }
        })
    );

    const setLabuanFinancialSTPIntention = () => new Promise((resolve) => {
        const req = {
            account_type    : 'financial',
            dry_run         : 1,
            email           : Client.get('email'),
            leverage        : 100,
            mainPassword    : 'Test1234',
            mt5_account_type: 'financial_stp',
            mt5_new_account : 1,
            name            : 'test real labuan financial stp',
        };
        BinarySocket.send(req).then((dry_run_response) => {

            if (dry_run_response.error) {
                // update account status authentication info
                BinarySocket.send({ get_account_status: 1 }, { forced: true }).then(() => {
                    resolve();
                });
            }
        });
    });

    const setMaltaIntention = () => new Promise((resolve) => {
        const req = {
            account_type    : 'gaming',
            dry_run         : 1,
            email           : Client.get('email'),
            leverage        : 100,
            mainPassword    : 'Test1234',
            mt5_account_type: 'financial',
            mt5_new_account : 1,
            name            : 'test real synthetic',
        };
        BinarySocket.send(req).then((dry_run_response) => {
            if (dry_run_response.error) {
                // update account status authentication info
                BinarySocket.send({ get_account_status: 1 }, { forced: true }).then(() => {
                    resolve();
                });
            }
        });
    });
    const setMaltaInvestIntention = () => new Promise((resolve) => {
        const req = {
            account_type    : 'financial',
            dry_run         : 1,
            email           : Client.get('email'),
            leverage        : 100,
            mainPassword    : 'Test1234',
            mt5_account_type: 'financial',
            mt5_new_account : 1,
            name            : 'test real financial',
        };
        BinarySocket.send(req).then((dry_run_response) => {
            if (dry_run_response.error) {
                // update account status authentication info
                BinarySocket.send({ get_account_status: 1 }, { forced: true }).then(() => {
                    resolve();
                });
            }
        });
    });

    const actions_info = {
        new_account: {
            title        : localize('Sign up'),
            login        : response => response.mt5_new_account.login,
            prerequisites: acc_type => (
                newAccCheck(acc_type, '#msg_metatrader_account')
            ),
            pre_submit: ($form, acc_type) => (
                new Promise((resolve) => {
                    const is_synthetic = !accounts_info[acc_type].mt5_account_type;

                    if (is_synthetic && !accounts_info[acc_type].is_demo && State.getResponse('landing_company.gaming_company.shortcode') === 'malta') {
                        Dialog.confirm({
                            id               : 'confirm_new_account',
                            localized_message: localize(['Trading contracts for difference (CFDs) on Synthetic Indices may not be suitable for everyone. Please ensure that you fully understand the risks involved, including the possibility of losing all the funds in your MT5 account. Gambling can be addictive – please play responsibly.', 'Do you wish to continue?']),
                        }).then((is_ok) => {
                            if (!is_ok) {
                                BinaryPjax.load(Client.defaultRedirectUrl());
                            }
                            resolve(is_ok);
                        });
                    } else if (!accounts_info[acc_type].is_demo && Client.get('residence') === 'es') {
                        BinarySocket.send({ get_financial_assessment: 1 }).then((response) => {
                            const { cfd_score, trading_score } = response.get_financial_assessment;
                            const passed_financial_assessment = cfd_score === 4 || trading_score >= 8;
                            let message = [
                                localize('{SPAIN ONLY}You are about to purchase a product that is not simple and may be difficult to understand: Contracts for difference and forex. As a general rule, the CNMV considers that such products are not appropriate for retail clients, due to their complexity.'),
                                localize('{SPAIN ONLY}This is a product with leverage. You should be aware that losses may be higher than the amount initially paid to purchase the product.'),
                            ];
                            if (passed_financial_assessment) {
                                message.splice(1, 0, localize('{SPAIN ONLY}However, Binary Investments (Europe) Ltd has assessed your knowledge and experience and deems the product appropriate for you.'));
                            }
                            message = message.map(str => str.replace(/{SPAIN ONLY}/, '')); // remove '{SPAIN ONLY}' from english strings
                            Dialog.confirm({
                                id               : 'spain_cnmv_warning',
                                ok_text          : localize('Acknowledge'),
                                localized_message: message,
                            }).then((is_ok) => {
                                if (!is_ok) {
                                    BinaryPjax.load(Client.defaultRedirectUrl());
                                }
                                resolve(is_ok);
                            });
                        });
                    } else {
                        resolve(true);
                    }
                })
            ),
            onSuccess: (response) => {
                GTM.mt5NewAccount(response);

                BinarySocket.send({ get_account_status: 1 }, { forced: true }).then(() => {
                    Header.displayAccountStatus();
                });

                $('#financial_authenticate_msg').setVisibility(isAuthenticationPromptNeeded());
            },
        },

        password_change: {
            title        : localize('Change Password'),
            success_msg  : response => localize('The [_1] password of account number [_2] has been changed.', [response.echo_req.password_type, getDisplayLogin(response.echo_req.login)]),
            prerequisites: () => new Promise(resolve => resolve('')),
        },
        password_reset: {
            title: localize('Reset Password'),
        },
        verify_password_reset: {
            title               : localize('Verify Reset Password'),
            success_msg         : () => localize('Please check your email for further instructions.'),
            success_msg_selector: '#frm_verify_password_reset',
            onSuccess           : (response, $form) => {
                if (isBinaryApp()) {
                    $form.find('#frm_verify_password_reset').setVisibility(0);
                    const action      = 'verify_password_reset_token';
                    const reset_token = `#frm_${action}`;
                    $form.find(reset_token).setVisibility(1);
                    Validation.init(reset_token, validations()[action]);
                }
            },
        },
        verify_password_reset_token: {
            title    : localize('Verify Reset Password'),
            onSuccess: (response, $form) => {
                $form.find('#frm_verify_password_reset_token').setVisibility(0);
                const action         = 'password_reset';
                const password_reset = `#frm_${action}`;
                $form.find(password_reset).setVisibility(1);
                Validation.init(password_reset, validations()[action]);
            },
        },
        deposit: {
            title      : localize('Deposit'),
            success_msg: (response, acc_type) => localize('[_1] deposit from [_2] to account number [_3] is done. Transaction ID: [_4]', [
                Currency.formatMoney(State.getResponse('authorize.currency'), response.echo_req.amount),
                response.echo_req.from_binary,
                accounts_info[acc_type].info.display_login,
                response.binary_transaction_id,
            ]),
            prerequisites: () => new Promise((resolve) => {
                if (Client.get('is_virtual')) {
                    resolve(needsRealMessage());
                } else {
                    BinarySocket.wait('get_account_status').then((response_status) => {
                        if (!response_status.error && /cashier_locked/.test(response_status.get_account_status.status)) {
                            resolve(localize('Your cashier is locked.')); // Locked from BO
                        } else {
                            resolve();
                        }
                    });
                }
            }),
        },
        withdrawal: {
            title      : localize('Withdraw'),
            success_msg: (response, acc_type) => localize('[_1] withdrawal from account number [_2] to [_3] is done. Transaction ID: [_4]', [
                Currency.formatMoney(getCurrency(acc_type), response.echo_req.amount),
                accounts_info[acc_type].info.display_login,
                response.echo_req.to_binary,
                response.binary_transaction_id,
            ]),
            prerequisites: acc_type => new Promise((resolve) => {
                if (Client.get('is_virtual')) {
                    resolve(needsRealMessage());
                } else if (accounts_info[acc_type].account_type === 'financial') {
                    BinarySocket.wait('get_account_status').then(() => {
                        // TODO: [remove-standard-advanced] remove standard when API groups are updated
                        if (!/svg_(standard|financial)/.test(acc_type) && isAuthenticationPromptNeeded()) {
                            resolve($messages.find('#msg_authenticate').html());
                        }

                        resolve();
                    });
                } else {
                    resolve();
                }
            }),
        },
    };

    const fields = {
        new_account: {
            txt_name         : { id: '#txt_name',          request_field: 'name' },
            txt_main_pass    : { id: '#txt_main_pass',     request_field: 'mainPassword' },
            txt_re_main_pass : { id: '#txt_re_main_pass' },
            chk_tnc          : { id: '#chk_tnc' },
            additional_fields:
                acc_type => ($.extend(
                    {
                        account_type: accounts_info[acc_type].account_type,
                        email       : Client.get('email'),
                        leverage    : accounts_info[acc_type].max_leverage,
                    },
                    accounts_info[acc_type].mt5_account_type ? {
                        mt5_account_type: accounts_info[acc_type].mt5_account_type,
                    } : {})),
        },
        password_change: {
            ddl_password_type  : { id: '#ddl_password_type', request_field: 'password_type', is_radio: true },
            txt_old_password   : { id: '#txt_old_password',  request_field: 'old_password' },
            txt_new_password   : { id: '#txt_new_password',  request_field: 'new_password' },
            txt_re_new_password: { id: '#txt_re_new_password' },
            additional_fields  :
                acc_type => ({
                    login: accounts_info[acc_type].info.login,
                }),
        },
        password_reset: {
            ddl_password_type  : { id: '#ddl_reset_password_type', request_field: 'password_type', is_radio: true },
            txt_new_password   : { id: '#txt_reset_new_password',  request_field: 'new_password' },
            txt_re_new_password: { id: '#txt_reset_re_new_password' },
            additional_fields  :
                (acc_type, token) => ({
                    login            : accounts_info[acc_type].info.login,
                    verification_code: token,
                }),
        },
        verify_password_reset: {
            additional_fields:
                () => ({
                    verify_email: Client.get('email'),
                    type        : 'mt5_password_reset',
                }),
        },
        verify_password_reset_token: {
            txt_verification_code: { id: '#txt_verification_code' },
        },
        deposit: {
            txt_amount       : { id: '#txt_amount_deposit', request_field: 'amount' },
            additional_fields:
                acc_type => ({
                    from_binary: Client.get('loginid'),
                    to_mt5     : accounts_info[acc_type].info.login,
                }),
        },
        withdrawal: {
            txt_amount       : { id: '#txt_amount_withdrawal', request_field: 'amount' },
            additional_fields:
                acc_type => ({
                    from_mt5 : accounts_info[acc_type].info.login,
                    to_binary: Client.get('loginid'),
                }),
        },
    };

    const validations = () => ({
        new_account: [
            { selector: fields.new_account.txt_name.id,          validations: [['req', { hide_asterisk: true }], 'letter_symbol', ['length', { min: 2, max: 101 }]] },
            { selector: fields.new_account.txt_main_pass.id,     validations: [['req', { hide_asterisk: true }], 'password', 'compare_to_email'] },
            { selector: fields.new_account.txt_re_main_pass.id,  validations: [['req', { hide_asterisk: true }], ['compare', { to: fields.new_account.txt_main_pass.id }]] },
        ],
        password_change: [
            { selector: fields.password_change.ddl_password_type.id,   validations: [['req', { hide_asterisk: true }]] },
            { selector: fields.password_change.txt_old_password.id,    validations: [['req', { hide_asterisk: true }]] },
            { selector: fields.password_change.txt_new_password.id,    validations: [['req', { hide_asterisk: true }], 'password', ['not_equal', { to: fields.password_change.txt_old_password.id, name1: localize('Current password'), name2: localize('New password') }], 'compare_to_email'], re_check_field: fields.password_change.txt_re_new_password.id },
            { selector: fields.password_change.txt_re_new_password.id, validations: [['req', { hide_asterisk: true }], ['compare', { to: fields.password_change.txt_new_password.id }]] },
        ],
        password_reset: [
            { selector: fields.password_reset.ddl_password_type.id,   validations: [['req', { hide_asterisk: true }]] },
            { selector: fields.password_reset.txt_new_password.id,    validations: [['req', { hide_asterisk: true }], 'password', 'compare_to_email'], re_check_field: fields.password_reset.txt_re_new_password.id },
            { selector: fields.password_reset.txt_re_new_password.id, validations: [['req', { hide_asterisk: true }], ['compare', { to: fields.password_reset.txt_new_password.id }]] },
        ],
        verify_password_reset_token: [
            { selector: fields.verify_password_reset_token.txt_verification_code.id, validations: [['req', { hide_asterisk: true }], 'token'], exclude_request: 1 },
        ],
        deposit: [
            {
                selector   : fields.deposit.txt_amount.id,
                validations: [
                    ['req', { hide_asterisk: true }],
                    ['number', {
                        type: 'float',
                        min : () => Currency.getTransferLimits(Client.get('currency'), 'min', 'mt5'),
                        max : () => {
                            const mt5_limit     = Currency.getTransferLimits(Client.get('currency'), 'max', 'mt5');
                            const balance       = Client.get('balance');
                            // if balance is 0, pass this validation so we can show insufficient funds in the next custom validation
                            return Math.min(mt5_limit, balance || mt5_limit).toFixed(Currency.getDecimalPlaces(Client.get('currency')));
                        },
                        decimals: Currency.getDecimalPlaces(Client.get('currency')),
                    }],
                    ['custom', {
                        func: () => {
                            const balance = Client.get('balance');
                            return balance && (+balance >= +$(fields.deposit.txt_amount.id).val());
                        },
                        message: localize('You have insufficient funds in your Binary account, please <a href="[_1]">add funds</a>.', urlFor('cashier')),
                    }],
                ],
            },
        ],
        withdrawal: [
            {
                selector   : fields.withdrawal.txt_amount.id,
                validations: [
                    ['req', { hide_asterisk: true }],
                    ['number', {
                        type: 'float',
                        min : () => Currency.getTransferLimits(getCurrency(Client.get('mt5_account')), 'min', 'mt5'),
                        max : () => {
                            const mt5_limit = Currency.getTransferLimits(getCurrency(Client.get('mt5_account')), 'max', 'mt5');
                            const balance   = accounts_info[Client.get('mt5_account')].info.balance;
                            // if balance is 0, pass this validation so we can show insufficient funds in the next custom validation
                            return Math.min(mt5_limit, balance || mt5_limit);
                        },
                        decimals: 2,
                    }],
                    ['custom', {
                        func: () => {
                            const balance = accounts_info[Client.get('mt5_account')].info.balance;
                            return balance && (+balance >= +$(fields.withdrawal.txt_amount.id).val());
                        },
                        message: localize('You have insufficient funds in your MT5 account.'),
                    }],
                ],
            },
        ],
    });

    const hasAccount = acc_type => (accounts_info[acc_type] || {}).info;

    const getCurrency = acc_type => accounts_info[acc_type].info.currency;

    // if you have acc_type, use accounts_info[acc_type].info.display_login
    // otherwise, use this function to format login into display login
    const getDisplayLogin = login => login.replace(/^MT[DR]?/i, '');

    const isAuthenticated = () =>
        State.getResponse('get_account_status').status.indexOf('authenticated') !== -1;

    const isAuthenticationPromptNeeded = () => {
        const authentication = State.getResponse('get_account_status.authentication');
        const { identity, needs_verification } = authentication;
        const is_need_verification = needs_verification.length;
        const is_rejected_or_expired = /^(rejected|expired)$/.test(identity.status);

        if (is_rejected_or_expired) return false;

        return is_need_verification;
    };

    return {
        accounts_info,
        actions_info,
        getMTFinancialAccountType,
        getOldMTFinancialAccountType,
        fields,
        validations,
        needsRealMessage,
        hasAccount,
        getCurrency,
        getDisplayLogin,
        isAuthenticated,
        isAuthenticationPromptNeeded,
        configMtCompanies   : configMtCompanies.get,
        configMtFinCompanies: configMtFinCompanies.get,
        setMessages         : ($msg) => { $messages = $msg; },
        getAllAccounts      : () => (
            Object.keys(accounts_info)
                .filter(acc_type => hasAccount(acc_type))
                .sort(acc_type => (accounts_info[acc_type].is_demo ? 1 : -1)) // real first
        ),
    };
})();

module.exports = MetaTraderConfig;
