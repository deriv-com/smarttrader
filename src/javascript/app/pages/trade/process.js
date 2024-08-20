const refreshDropdown   = require('@binary-com/binary-style').selectDropdown;
const moment            = require('moment');
const TradingAnalysis   = require('./analysis');
const commonTrading     = require('./common');
const Contract          = require('./contract');
const Defaults          = require('./defaults');
const Durations         = require('./duration');
const GetTicks          = require('./get_ticks');
const Lookback          = require('./lookback');
const Notifications     = require('./notifications');
const Price             = require('./price');
const Reset             = require('./reset');
const StartDates        = require('./starttime').StartDates;
const Symbols           = require('./symbols');
const Tick              = require('./tick');
const NotAvailable      = require('./not-available.jsx');
const BinarySocket      = require('../../base/socket');
const dataManager       = require('../../common/data_manager.js').default;
const getMinPayout      = require('../../common/currency').getMinPayout;
const isCryptocurrency  = require('../../common/currency').isCryptocurrency;
const isEuCountry       = require('../../common/country_base').isEuCountry;
const elementInnerHtml  = require('../../../_common/common_functions').elementInnerHtml;
const getElementById    = require('../../../_common/common_functions').getElementById;
const getVisibleElement = require('../../../_common/common_functions').getVisibleElement;
const localize          = require('../../../_common/localize').localize;
const State             = require('../../../_common/storage').State;
const getPropertyValue  = require('../../../_common/utility').getPropertyValue;

const Process = (() => {
    const {
        AMOUNT,
        AMOUNT_TYPE,
        DATE_START,
        DURATION_AMOUNT,
        DURATION_UNITS,
        CURRENCY,
        END_DATE,
        EXPIRY_DATE,
        EXPIRY_TIME,
        EXPIRY_TYPE,
        FORM_NAME,
        IS_EQUAL,
        MARKET,
        PREDICTION,
        SELECTED_TICK,
        UNDERLYING,
    } = Defaults.PARAM_NAMES;

    /*
     * This function processes the active symbols to get markets
     * and underlying list
     */
    const processActiveSymbols = (country) => {
        BinarySocket.send({ active_symbols: 'brief' }).then((response) => {
            if (!isEuCountry() && response.active_symbols && response.active_symbols.length) {
                // populate the Symbols object
                Symbols.details(response);

                const market = commonTrading.getDefaultMarket();

                // store the market
                Defaults.set(MARKET, market);

                commonTrading.displayMarkets();
                processMarket();
            } else if (country === 'gb' || country === 'im') {
                NotAvailable.init({ title: localize('SmartTrader is unavailable for this account'), body: localize('Sorry, options trading isn’t available in the United Kingdom and the Isle of Man.') });
            } else {
                NotAvailable.init({ title: localize('SmartTrader is unavailable for this account'), body: localize('Unfortunately, this trading platform is not available for EU Deriv account. Please switch to a non-EU account to continue trading.') });
            }
        });
    };

    /*
     * Function to call when market has changed
     */
    const processMarket = () => {
        // we can get market from sessionStorage as allowed market
        // is already set when this is called
        let market = Defaults.get(MARKET);
        let symbol = Defaults.get(UNDERLYING);

        // change to default market if query string contains an invalid market
        if (!market || !Symbols.underlyings()[market]) {
            market = commonTrading.getDefaultMarket();
            Defaults.set(MARKET, market);
        }
        if ((!symbol || !Symbols.underlyings()[market][symbol])) {
            symbol = undefined;
        }

        processMarketUnderlying();
    };

    /*
     * Function to call when underlying has changed
     */
    const processMarketUnderlying = () => {
        const underlying_element = document.getElementById('underlying');
        const underlying = underlying_element?.value;

        Defaults.set(UNDERLYING, underlying);

        commonTrading.showFormOverlay();

        // get ticks for current underlying
        GetTicks.request(underlying);

        Tick.clean();

        commonTrading.updateWarmChart();

        BinarySocket.clearTimeouts();

        getContracts(underlying);

        commonTrading.displayTooltip();
    };

    const getContracts = (underlying) => {
        BinarySocket.send({ contracts_for: underlying }).then((response) => {
            Notifications.hide('CONNECTION_ERROR');
            processContract(response);
        });
    };

    const hideLoading = () => {
        getElementById('trading_socket_container').classList.add('show');
        const init_logo = getElementById('trading_init_progress');

        dataManager.setContract({
            hide_page_loader: true,
        });
        
        if (init_logo && init_logo.style.display !== 'none') {
            init_logo.style.display = 'none';
            Defaults.update();
        }
    };

    const handleNotOfferedSymbol = async () => {
        const { active_symbols } = await BinarySocket.send({ active_symbols: 'brief' });
        const default_open_symbol = await Symbols.getDefaultOpenSymbol(active_symbols);

        Defaults.set(MARKET, default_open_symbol.market);
        Defaults.set(UNDERLYING, default_open_symbol.symbol);
    };

    /*
     * Function to display contract form for current underlying
     */
    const processContract = (contracts) => {
        if (getPropertyValue(contracts, ['error', 'code']) === 'InvalidSymbol') {
            Price.processForgetProposals();
            dataManager.setPurchase({
                show_purchase_results: true,
            });
            getElementById('contract_confirmation_container').style.display = 'block';
            getElementById('contracts_list').style.display = 'none';
            getElementById('confirmation_message').hide();
            const confirmation_error = getElementById('confirmation_error');
            confirmation_error.setVisibility(1);
            handleNotOfferedSymbol();
            elementInnerHtml(confirmation_error, `${contracts.error.message} <a onclick="sessionStorage.removeItem('underlying'); window.location.reload();">${localize('Please reload the page')}</a>`);
            hideLoading();

            return;
        }
        State.set('is_chart_allowed', !(contracts.contracts_for && contracts.contracts_for.feed_license && contracts.contracts_for.feed_license === 'chartonly'));

        hideLoading();

        Contract.setContracts(contracts);

        const contract_categories = Contract.contractForms();
        let formname;
        if (Defaults.get(FORM_NAME) && contract_categories && contract_categories[Defaults.get(FORM_NAME)]) {
            formname = Defaults.get(FORM_NAME);
        } else {
            const tree = commonTrading.getContractCategoryTree(contract_categories);
            if (tree[0]) {
                if (typeof tree[0] === 'object') {
                    formname = tree[0][1][0];
                } else {
                    formname = tree[0];
                }
            }
        }

        commonTrading.displayContractForms('contract_form_name_nav', contract_categories, formname);

        processContractForm(formname);

        TradingAnalysis.request();

        commonTrading.hideFormOverlay();
    };

    const processContractForm = (formname_to_set = getElementById('contract').value || Defaults.get(FORM_NAME)) => {
        setFormName(formname_to_set);

        // get updated formname
        Contract.details(Defaults.get(FORM_NAME));

        StartDates.display();

        displayPrediction();
        refreshDropdown('#prediction');
        displaySelectedTick();
        refreshDropdown('#selected_tick');
        Lookback.display();

        if (!Reset.isReset(Defaults.get(FORM_NAME))) {
            Reset.hideResetTime();
        }

        let r1;
        if (State.get('is_start_dates_displayed') && Defaults.get(DATE_START) && Defaults.get(DATE_START) !== 'now') {
            r1 = Durations.onStartDateChange(Defaults.get(DATE_START));
            if (!r1 || Defaults.get(EXPIRY_TYPE) === 'endtime') Durations.display();
        } else {
            Durations.display();
        }

        // needs to be called after durations are populated
        displayEquals();

        const currency  = Defaults.get(CURRENCY) || getVisibleElement('currency').value;
        const is_crypto = isCryptocurrency(currency);
        const amount    = is_crypto ? 'amount_crypto' : AMOUNT;
        if (Defaults.get(amount)) {
            $('#amount').val(Defaults.get(amount));
        } else {
            const default_value = getMinPayout(currency);
            Defaults.set(amount, default_value);
            getElementById('amount').value = default_value;
        }
        if (Defaults.get(AMOUNT_TYPE)) {
            commonTrading.selectOption(Defaults.get(AMOUNT_TYPE), getElementById('amount_type'));
        } else {
            Defaults.set(AMOUNT_TYPE, getElementById('amount_type').value);
        }

        getElementById('stake_option').setVisibility(1);
        refreshDropdown('#amount_type');

        if (Defaults.get(CURRENCY)) {
            commonTrading.selectOption(Defaults.get(CURRENCY), getVisibleElement('currency'));
        }

        const expiry_type        = Defaults.get(EXPIRY_TYPE) || 'duration';
        const make_price_request = onExpiryTypeChange(expiry_type);

        if (make_price_request >= 0) {
            Price.processPriceRequest();
        }
    };

    const displayPrediction = () => {
        const prediction_row = getElementById('prediction_row');
        if (Contract.form() === 'digits' && sessionStorage.getItem('formname') !== 'evenodd') {
            prediction_row.show();
            const prediction = getElementById('prediction');
            if (Defaults.get(PREDICTION)) {
                commonTrading.selectOption(Defaults.get(PREDICTION), prediction);
            } else {
                Defaults.set(PREDICTION, prediction.value);
            }
        } else {
            prediction_row.hide();
            Defaults.remove(PREDICTION);
        }
    };

    const displaySelectedTick = () => {
        const selected_tick_row       = getElementById('selected_tick_row');
        const highlowticks_expiry_row = getElementById('highlowticks_expiry_row');
        if (sessionStorage.getItem('formname') === 'highlowticks') {
            selected_tick_row.show();
            highlowticks_expiry_row.show();
            const selected_tick = getElementById('selected_tick');
            if (Defaults.get(SELECTED_TICK)) {
                commonTrading.selectOption(Defaults.get(SELECTED_TICK), selected_tick);
            } else {
                Defaults.set(SELECTED_TICK, selected_tick.value);
            }
        } else {
            selected_tick_row.hide();
            highlowticks_expiry_row.hide();
            Defaults.remove(SELECTED_TICK);
        }
    };

    const hasCallPutEqual = (contracts = getPropertyValue(Contract.contracts(), ['contracts_for', 'available']) || []) =>
        contracts.find(contract => contract.contract_category === 'callputequal');

    const displayEquals = (expiry_type = 'duration') => {
        const formname  = Defaults.get(FORM_NAME);
        const el_equals = document.getElementById('callputequal');
        const durations
            = getPropertyValue(Contract.durations(), [commonTrading.durationType(Defaults.get(DURATION_UNITS))]) || [];
        if (/^(callputequal|risefall)$/.test(formname) && (('callputequal' in durations || expiry_type === 'endtime') && hasCallPutEqual())) {
            if (+Defaults.get(IS_EQUAL)) {
                el_equals.checked = true;
            }
            el_equals.parentElement.setVisibility(1);
            dataManager.setTrade({
                show_allow_equals: true,
            });
        } else {
            el_equals.parentElement.setVisibility(0);
            dataManager.setTrade({
                show_allow_equals: false,
            });
        }
    };

    const setFormName = (formname) => {
        let formname_to_set    = formname;
        const has_callputequal = hasCallPutEqual();
        if (formname_to_set === 'callputequal' && (!has_callputequal || !+Defaults.get(IS_EQUAL))) {
            formname_to_set = 'risefall';
        } else if (formname_to_set === 'risefall' && has_callputequal && +Defaults.get(IS_EQUAL)) {
            formname_to_set = 'callputequal';
        }
        Defaults.set(FORM_NAME, formname_to_set);
        getElementById('contract').setAttribute('value', formname_to_set);
    };

    const forgetTradingStreams = () => {
        Price.processForgetProposals();
        Price.processForgetProposalOpenContract();
        processForgetTicks();
    };

    /*
     * cancel the current tick stream
     * this need to be invoked before makin
     */
    const processForgetTicks = () => {
        BinarySocket.send({ forget_all: 'ticks' });
    };

    const onExpiryTypeChange = (value) => {
        const $expiry_type    = $('#expiry_type');
        const validated_value = value && $expiry_type.find(`option[value=${value}]`).length ? value : 'duration';
        const is_edge = window.navigator.userAgent.indexOf('Edge') !== -1;
        $expiry_type.val(validated_value);

        let make_price_request = 0;
        if (validated_value === 'endtime') {
            Durations.displayEndTime();
            if (Defaults.get(EXPIRY_DATE)) {
                // if time changed, proposal will be sent there if not we should send it here
                make_price_request = Durations.selectEndDate(moment(Defaults.get(EXPIRY_DATE))) ? -1 : 1;
            }
            Defaults.remove(DURATION_AMOUNT, DURATION_UNITS);
            if (is_edge) {
                document.getSelection().empty(); // microsoft edge 18 automatically start selecting text when select expiry time after changing expiry type to end time
            }
        } else {
            StartDates.enable();
            Durations.display();
            if (Defaults.get(DURATION_UNITS)) {
                onDurationUnitChange(Defaults.get(DURATION_UNITS));
            }
            const duration_amount = Defaults.get(DURATION_AMOUNT);
            if (duration_amount && duration_amount > $('#duration_minimum').text()) {
                $('#duration_amount').val(duration_amount);
            }
            make_price_request = 1;
            Defaults.remove(END_DATE, EXPIRY_DATE, EXPIRY_TIME);
            Durations.validateMinDurationAmount();
        }
        displayEquals(validated_value);

        return make_price_request;
    };

    const onDurationUnitChange = (value) => {
        const $duration_units = $('#duration_units');
        if (!value || !$duration_units.find(`option[value=${value}]`).length) {
            return 0;
        }

        $duration_units.val(value);
        Defaults.set(DURATION_UNITS, value);

        Durations.selectUnit(value);
        Durations.populate();

        return 1;
    };

    return {
        displayEquals,
        processActiveSymbols,
        processMarket,
        processContract,
        processContractForm,
        forgetTradingStreams,
        onExpiryTypeChange,
        onDurationUnitChange,
    };
})();

module.exports = Process;
