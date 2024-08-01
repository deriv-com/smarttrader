const Defaults                   = require('./defaults');
const Symbols                    = require('./symbols');
const Tick                       = require('./tick');
const marketsElement             = require('./markets.jsx');
const GuideElement               = require('./guide.jsx');
const PurchaseElement            = require('./purchase/purchase.jsx');
const MarketSelectorElement      = require('./markets/market-selector.jsx');
const FormsWrapperElement        = require('../form/contract-form-wrapper.jsx');
const TabsElement                = require('../bottom/tabs.jsx');
const formatMoney                = require('../../common/currency').formatMoney;
const ActiveSymbols              = require('../../common/active_symbols');
const purchaseManager            = require('../../common/purchase_manager.js').default;
const contractManager            = require('../../common/contract_manager.js').default;
const elementInnerHtml           = require('../../../_common/common_functions').elementInnerHtml;
const getElementById             = require('../../../_common/common_functions').getElementById;
const localize                   = require('../../../_common/localize').localize;
const urlFor                     = require('../../../_common/url').urlFor;
const cloneObject                = require('../../../_common/utility').cloneObject;

/*
 * This contains common functions we need for processing the response
 */

const commonTrading = (() => {
    /*
     * display contract form as element of ul
     */
    let contracts_element = null;
    const {
        AMOUNT,
        AMOUNT_TYPE,
        DATE_START,
        DURATION_UNITS,
        DURATION_VALUE,
        CURRENCY,
        EXPIRY_DATE,
        EXPIRY_TIME,
        EXPIRY_TYPE,
        FORM_NAME,
        MARKET,
        PREDICTION,
        TIME_START,
        UNDERLYING,
    } = Defaults.PARAM_NAMES;

    const displayContractForms = (id, elements, selected) => {
        if (!id || !elements || !selected) return;

        const all_contracts = cloneObject(elements);
        delete all_contracts.callputequal; // don't include callputequal in contract drop-down
        const contracts_tree   = getContractCategoryTree(all_contracts);
        const contract_to_show = /^(callputequal)$/.test(selected) ? 'risefall' : selected;

        if (!contracts_element) {
            contractManager.set({
                contractsTree  : contracts_tree,
                contracts      : all_contracts,
                formName       : selected || Defaults.get('formname'),
                contractElement: getElementById('contract'),
            });
        } else { // Update the component.
            contracts_element.updater.enqueueSetState(contracts_element, {
                contracts_tree,
                contracts: all_contracts,
                formname : contract_to_show || Defaults.get(FORM_NAME),
            });
        }
        FormsWrapperElement.init();
    };

    const displayMarkets = () => {
        marketsElement.init();
        // All other Quill refactored components
        TabsElement.init();
        MarketSelectorElement.init();
        GuideElement.init();
        PurchaseElement.init();
    };

    /*
     * This maps the form name and barrierCategory we display on
     * trading form to the actual we send it to backend
     * for e.g risefall is mapped to callput with barrierCategory euro_atm
     */
    const getFormNameBarrierCategory = (form_name = '') => {
        let name    = form_name;
        let barrier = '';
        if (/higherlower/.test(form_name)) {
            name    = 'callput';
            barrier = 'euro_non_atm';
        } else if (/callputequal/.test(form_name)) {
            barrier = 'euro_atm';
        } else if (/risefall|callput/.test(form_name)) {
            name    = 'callput';
            barrier = 'euro_atm';
        } else if (/overunder|evenodd|matchdiff/.test(form_name)) {
            name = 'digits';
        } else if (/lookback/.test(form_name)) {
            name = 'lookback';
        } else if (/reset/.test(form_name)) {
            name = 'reset';
        }
        return {
            form_name       : name,
            barrier_category: barrier,
        };
    };

    /*
     * This maps the contract type to where we display on trading form
     * and as there is no mapping on server side so need to create it
     * on front end
     *
     * for example we display CALL on top and PUT to bottom
     */
    const obj = {
        CALL        : 'top',
        PUT         : 'bottom',
        CALLE       : 'top',
        PUTE        : 'bottom',
        ASIANU      : 'top',
        ASIAND      : 'bottom',
        DIGITMATCH  : 'top',
        DIGITDIFF   : 'bottom',
        DIGITEVEN   : 'top',
        DIGITODD    : 'bottom',
        DIGITOVER   : 'top',
        DIGITUNDER  : 'bottom',
        EXPIRYRANGEE: 'top',
        EXPIRYMISSE : 'bottom',
        EXPIRYRANGE : 'top',
        EXPIRYMISS  : 'bottom',
        RANGE       : 'top',
        UPORDOWN    : 'bottom',
        ONETOUCH    : 'top',
        NOTOUCH     : 'bottom',
        LBFLOATCALL : 'middle',
        LBFLOATPUT  : 'middle',
        LBHIGHLOW   : 'middle',
        RESETCALL   : 'top',
        RESETPUT    : 'bottom',
        TICKHIGH    : 'top',
        TICKLOW     : 'bottom',
        RUNHIGH     : 'top',
        RUNLOW      : 'bottom',
    };

    const contractTypeDisplayMapping = type => (type ? obj[type] : 'top');

    const showHideOverlay = (el, display) => {
        getElementById(el).style.display = display;
    };

    /*
     * hide contract confirmation overlay container
     */
    const hideOverlayContainer = () => {
        showHideOverlay('contract_confirmation_container', 'none');
        showHideOverlay('contracts_list', 'flex');
        $('.purchase_button').text(localize('Purchase'));
        purchaseManager.set({
            showPurchaseResults: false,
        });
    };

    const getContractCategoryTree = (elements) => {
        let tree = [
            ['callput',
                ['risefall', 'higherlower'],
            ],
            'touchnotouch',
            ['inout',
                ['endsinout', 'staysinout'],
            ],
            'asian',
            ['digits',
                ['matchdiff', 'evenodd', 'overunder'],
            ],
            ['lookback',
                ['lookbackhigh', 'lookbacklow', 'lookbackhighlow'],
            ],
            'reset',
            'highlowticks',
            ['runs', ['runs']],
        ];

        if (elements) {
            tree = tree.map((e) => {
                let value = e;
                if (typeof value === 'object') {
                    value[1] = value[1].filter(value1 => elements[value1]);
                    if (!value[1].length) {
                        value = '';
                    }
                } else if (!elements[value]) {
                    value = '';
                }
                return value;
            });
            tree = tree.filter(v => v.length);
        }
        return tree;
    };

    /*
     * resets price movement color changing, to prevent coloring on some changes
     * coloring will continue on the next proposal responses
     */
    const resetPriceMovement = () => {
        const btns = document.getElementsByClassName('purchase_button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].setAttribute('data-display_value', '');
            btns[i].setAttribute('data-payout', '');
        }
    };

    const toggleActiveCatMenuElement = (nav, event_element_id) => {
        const event_element = getElementById(event_element_id);
        const li_elements   = nav.querySelectorAll('.active, .a-active');
        const classes       = event_element.classList;
        let i,
            len;

        if (!classes.contains('active')) {
            for (i = 0, len = li_elements.length; i < len; i++) {
                li_elements[i].classList.remove('active');
                li_elements[i].classList.remove('a-active');
            }
            classes.add('a-active');

            i          = 0;
            let parent = event_element.parentElement;
            while (parent && parent.id !== nav.id && i < 10) {
                if (parent.tagName === 'LI') {
                    parent.classList.add('active');
                }
                parent = parent.parentElement;
                i++;
            }
        }
    };

    /*
     * display the profit and return of bet under each trade container
     */
    const displayCommentPrice = (node, currency, type, payout,position) => {
        if (node && type && payout) {
            const profit         = payout - type;
            const return_percent = (profit / type) * 100;
            const comment        = `${localize('Net profit')}: ${formatMoney(currency, profit)} | ${localize('Return')} ${return_percent.toFixed(1)}%`;

            if (isNaN(profit) || isNaN(return_percent)) {
                node.hide();
            } else {
                node.show();
                elementInnerHtml(node, comment);
                purchaseManager.set({
                    [`${position}Comment`]: comment,
                });
            }
        }
    };

    /*
     * This is used in case where we have input and we don't want to fire
     * event on every change while user is typing for example in case of amount if
     * we want to change 10 to 1000 i.e. two zeros so two input events will be fired
     * normally, this will delay the event based on delay specified in milliseconds
     *
     * Reference
     * http://davidwalsh.name/javascript-debounce-function
     */
    const debounce = (func, wait, immediate) => {
        let timeout;
        const delay = wait || 500;
        return function (...args) {
            const context  = this;
            const later    = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const call_now = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, delay);
            if (call_now) func.apply(context, args);
        };
    };

    /*
     * check if selected market is allowed for current user
     */
    const getDefaultMarket = () => {
        let mkt       = Defaults.get(MARKET);
        const markets = Symbols.markets(1);
        if (!mkt || !markets[mkt]) {
            const sorted_markets = Object.keys(Symbols.markets()).filter(v => markets[v].is_active)
                .sort((a, b) => getMarketsOrder(a) - getMarketsOrder(b));
            mkt                  = sorted_markets[0] || Object.keys(Symbols.markets())[0];
        }
        return mkt;
    };

    // Order
    const market_order = {
        basket_index   : 1,
        forex          : 2,
        synthetic_index: 3,
        indices        : 4,
        stocks         : 5,
        commodities    : 6,
    };

    const getMarketsOrder = market => market_order[market] || 100;

    /*
     * this is invoked when submit button is clicked and prevents reloading of page
     */
    const addEventListenerForm = () => {
        getElementById('websocket_form').addEventListener('submit', (evt) => {
            evt.currentTarget.classList.add('submitted');
            evt.preventDefault();
            return false;
        }, false);
    };

    /*
     * this creates a button, clicks it, and destroys it to invoke the listener
     */
    const submitForm = (form) => {
        const button         = form.ownerDocument.createElement('input');
        button.style.display = 'none';
        button.type          = 'submit';
        form.appendChild(button).click();
        form.removeChild(button);
    };

    /*
     * sort the duration in ascending order
     */
    const duration_config = {
        t: { order: 1, type: 'tick' },
        s: { order: 2, type: 'intraday' },
        m: { order: 3, type: 'intraday' },
        h: { order: 4, type: 'intraday' },
        d: { order: 5, type: 'daily' },
    };

    const displayTooltip = () => {
        const tip = getElementById('symbol_tip');
        if (tip) {
            const market = ActiveSymbols.getSymbols()[Defaults.get(UNDERLYING)]?.market;
            const map_to_section_id = {
                forex          : 'forex',
                indices        : 'indices',
                stocks         : 'otc-stocks-and-indices',
                commodities    : 'commodities',
                synthetic_index: 'synthetic-indices',
            };
            tip.setAttribute('href', urlFor('/get-started/binary-options', `anchor=${map_to_section_id[market]}#range-of-markets`));
        }
    };

    const selectOption = (option, select) => {
        if (!select) return false;

        const options = select.getElementsByTagName('option');
        let contains  = 0;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === option && !options[i].hasAttribute('disabled')) {
                contains = 1;
                break;
            }
        }
        if (contains) {
            select.value = option;
            return true;
        }

        return false;
    };

    const chart_config = {
        type              : 'line',
        lineColor         : '#606060',
        fillColor         : false,
        spotColor         : '#00f000',
        minSpotColor      : '#f00000',
        maxSpotColor      : '#0000f0',
        highlightSpotColor: '#ffff00',
        highlightLineColor: '#000000',
        spotRadius        : 1.25,
    };

    let $chart;

    const updateWarmChart = () => {
        $chart      = $chart && $chart.length ? $chart : $('#trading_worm_chart');
        const spots = Object.keys(Tick.spots()).sort((a, b) => a - b).map(v => Tick.spots()[v]);
        if ($chart && typeof $chart.sparkline === 'function') {
            $chart.sparkline(spots, chart_config);
            if (spots.length) {
                $chart.show();
            } else {
                $chart.hide();
            }
        }
    };

    const reloadPage = () => {
        Defaults.remove(
            AMOUNT,
            AMOUNT_TYPE,
            DATE_START,
            DURATION_UNITS,
            DURATION_VALUE,
            CURRENCY,
            FORM_NAME,
            EXPIRY_DATE,
            EXPIRY_TIME,
            EXPIRY_TYPE,
            MARKET,
            PREDICTION,
            TIME_START,
            UNDERLYING,
        );
        location.reload();
    };

    const timeIsValid = ($element) => {
        const end_time_value = getElementById('expiry_time').value;
        const $invalid_time  = $('#invalid-time');

        if ($element.attr('id') === 'expiry_time' && end_time_value &&
            !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(end_time_value)) {
            $element.addClass('error-field');
            if ($invalid_time.length === 0) {
                $('#expiry_type_endtime').parent().append($('<p>', { class: 'error-msg', id: 'invalid-time', text: localize('Time is in the wrong format.') }));
            }
            return false;
        }

        $element.removeClass('error-field');
        $invalid_time.remove();

        $element.removeClass('error-field');
        $('#end_time_validation').remove();
        return true;
    };

    const requireHighstock = callback => (
        require.ensure([], (require) => {
            const Highstock = require('highstock-release');
            return callback(Highstock);
        }, 'highstock')
    );

    return {
        getFormNameBarrierCategory,
        contractTypeDisplayMapping,
        hideOverlayContainer,
        getContractCategoryTree,
        resetPriceMovement,
        toggleActiveCatMenuElement,
        displayCommentPrice,
        debounce,
        getDefaultMarket,
        addEventListenerForm,
        submitForm,
        displayTooltip,
        selectOption,
        updateWarmChart,
        reloadPage,
        displayContractForms,
        displayMarkets,
        timeIsValid,
        requireHighstock,
        showPriceOverlay: () => {
            showHideOverlay('loading_container2', 'block');
            purchaseManager.set({
                isPurchaseFormDisabled: true,
            });
        },
        hidePriceOverlay: () => {
            showHideOverlay('loading_container2', 'none');
            purchaseManager.set({
                isPurchaseFormDisabled: false,
            });
        },
        hideFormOverlay: () => { showHideOverlay('loading_container3', 'none'); },
        showFormOverlay: () => { showHideOverlay('loading_container3', 'block'); },
        durationOrder  : duration => duration_config[duration].order,
        durationType   : duration => (duration_config[duration] || {}).type,
        clean          : () => { $chart = null; contracts_element = null; },
    };
})();

module.exports = commonTrading;
