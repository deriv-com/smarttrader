const getFormNameBarrierCategory = require('./common').getFormNameBarrierCategory;
const localize                   = require('../../../_common/localize').localize;
const getPropertyValue           = require('../../../_common/utility').getPropertyValue;
const isEmptyObject              = require('../../../_common/utility').isEmptyObject;

/*
 * Contract object mocks the trading form we have on our website
 * It parses the contracts json we get from socket.send({contracts_for: 'R_50'})
 * and gives back barriers, startDate, durations etc
 *
 *
 * Usage:
 *
 * use `Contract.details` to populate this object
 *
 * then use
 *
 * `Contract.durations()` to get durations like seconds, hours etc
 * `Contract.open()` `Contract.close()`
 * `Contract.barriers` if applicable for current underlying
 */

const CATEGORY_TYPES = {
    callput      : [{ category: 'risefall', barrier: 'euro_atm' }, { category: 'higherlower', barrier: 'euro_non_atm' }],
    touchnotouch : ['touchnotouch'],
    inout        : ['endsinout', 'staysinout'],
    asian        : ['asians'],
    digits       : ['matchdiff', 'evenodd', 'overunder'],
    reset        : ['resetcall' , 'resetput'],
    highlowticks : ['highlowticks'],
    runs         : ['runs'],
    lookback     : ['lookbackhigh', 'lookbacklow', 'lookbackhighlow'],
    callputspread: ['callputspread'],
};

const CATEGORY_NAMES = {
    callput      : 'Up/Down',
    touchnotouch : 'Touch/No Touch',
    inout        : 'In/Out',
    asian        : 'Asians',
    digits       : 'Digits',
    reset        : 'Reset Call/Reset Put',
    callputspread: 'Call Spread/Put Spread',
    highlowticks : 'High/Low Ticks',
    runs         : 'Only Ups/Only Downs',
    lookback     : 'Lookbacks',
};

const CATEGORY_ITEMS = {
    inout          : 'In/Out',
    endsinout      : 'Ends Between/Ends Outside',
    staysinout     : 'Stays Between/Goes Outside',
    risefall       : 'Rise/Fall',
    higherlower    : 'Higher/Lower',
    touchnotouch   : 'Touch/No Touch',
    matchdiff      : 'Matches/Differs',
    evenodd        : 'Even/Odd',
    overunder      : 'Over/Under',
    lookbackhigh   : 'High-Close',
    lookbacklow    : 'Close-Low',
    lookbackhighlow: 'High-Low',
    resetcall      : 'Reset Call',
    resetput       : 'Reset Put',
    highlowticks   : 'High/Low Ticks',
    asians         : 'Asians',
    runs           : 'Only Ups/Only Downs',
    callputspread  : 'Call Spread/Put Spread',
};

const Contract = (() => {
    const contract_type = {};

    let contract_details = {};
    let barriers         = {};
    let durations        = {};
    let start_dates      = {};

    let open,
        close,
        form,
        barrier;

    const populateDurations = (current_contract) => {
        const current_category = current_contract.contract_category;
        const expiry_type      = current_contract.expiry_type;
        const barrier_category = current_contract.barrier_category;
        const start_type       = current_contract.start_type;
        const max_duration     = current_contract.max_contract_duration;
        const min_duration     = current_contract.min_contract_duration;

        if (!durations[expiry_type]) {
            durations[expiry_type] = {};
        }

        if (!durations[expiry_type][current_category]) {
            durations[expiry_type][current_category] = {};
        }

        if (!durations[expiry_type][current_category][barrier_category]) {
            durations[expiry_type][current_category][barrier_category] = {};
        }

        if (!durations[expiry_type][current_category][barrier_category][start_type]) {
            durations[expiry_type][current_category][barrier_category][start_type] = {};
        }

        durations[expiry_type][current_category][barrier_category][start_type].max_contract_duration = max_duration;

        durations[expiry_type][current_category][barrier_category][start_type].min_contract_duration = min_duration;
    };

    const details = (form_name) => {
        const contracts = Contract.contracts().contracts_for;

        if (!contracts) return;

        start_dates = { has_spot: 0, list: [] };
        durations   = {};
        open        = contracts.open;
        close       = contracts.close;

        const form_barrier = getFormNameBarrierCategory(form_name);
        form               = form_barrier.form_name;
        if (!form) {
            return;
        }
        barrier = form_barrier.barrier_category;

        contracts.available.forEach((current_obj) => {
            const contract_category = current_obj.contract_category;
            // for callput and callputequals, populate duration for both
            if (form === contract_category || (/callput/.test(form) && /callput/.test(contract_category))) {
                if (barrier) {
                    if (barrier === current_obj.barrier_category) {
                        populateDurations(current_obj);
                    }
                } else {
                    populateDurations(current_obj);
                }
            }
            if (form === contract_category) {
                if (current_obj.forward_starting_options && current_obj.start_type === 'forward' && sessionStorage.formname !== 'higherlower') {
                    start_dates.list = current_obj.forward_starting_options;
                } else if (current_obj.start_type === 'spot') {
                    start_dates.has_spot = 1;
                }

                const symbol = current_obj.underlying_symbol;
                if (current_obj.barrier_category && current_obj.barrier_category !== 'non_financial') {
                    if (!getPropertyValue(barriers, symbol)) {
                        barriers[symbol] = {};
                    }
                    if (!getPropertyValue(barriers[symbol], contract_category)) {
                        barriers[symbol][contract_category] = {};
                    }
                    if (!getPropertyValue(barriers[symbol][contract_category], current_obj.expiry_type)) {
                        barriers[symbol][contract_category][current_obj.expiry_type] = {};
                    }
                    if (current_obj.barriers === 1) {
                        barriers[symbol][contract_category][current_obj.expiry_type] = {
                            count           : 1,
                            barrier         : current_obj.barrier,
                            barrier_category: current_obj.barrier_category,
                        };
                    } else if (current_obj.barriers === 2) {
                        barriers[symbol][contract_category][current_obj.expiry_type] = {
                            count           : 2,
                            barrier         : current_obj.high_barrier,
                            barrier1        : current_obj.low_barrier,
                            barrier_category: current_obj.barrier_category,
                        };
                    }
                }

                if (!contract_type[contract_category]) {
                    contract_type[contract_category] = {};
                }

                const type = current_obj.contract_type;
                if (!getPropertyValue(contract_type[contract_category], type)) {
                    contract_type[contract_category][type] =
                        localize(current_obj.contract_display /* localize-ignore */); // handled in static_strings_app.js
                }
            }
        });

        if (barrier) {
            if (barriers && barriers[form] && barriers[form].barrier_category !== barrier) {
                barriers = {};
            }
        }
    };

    const categoryMaker = (category, contract_barrier) => {
        const object = {
            category,
            barrier: contract_barrier,
        };
        return object;
    };

    const getContractCategories = () => {
        const contracts           = Contract.contracts().contracts_for;
        const contract_categories = {};
        contracts.available.forEach((current_obj) => {
            const contract_category = current_obj.contract_category;
            const contract_barrier  = current_obj.barrier_category;
            const contract_display  = current_obj.contract_category_display;
            const current_contract  = { category: contract_category, barrier: contract_barrier };
            if (contract_category && !getPropertyValue(contract_categories, current_contract)) {
                /* eslint-disable max-len */
                contract_categories[contract_category] = categoryMaker(localize(contract_display /* localize-ignore */), contract_barrier);
                Object.keys(CATEGORY_TYPES).forEach(category => {
                    const categoryRegEx = new RegExp(category, 'gi');
                    if (contract_category.match(categoryRegEx)) {
                        contract_categories[category] = categoryMaker(localize(CATEGORY_NAMES[category] /* localize-ignore */), contract_barrier);
                        CATEGORY_TYPES[category].forEach(t => {
                            if (t.category) {
                                if (t.barrier === current_obj.barrier_category) {
                                    contract_categories[t.category] = categoryMaker(localize(CATEGORY_ITEMS[t.category] /* localize-ignore */), t.barrier);
                                }
                            } else {
                                contract_categories[t] = categoryMaker(localize(CATEGORY_ITEMS[t] /* localize-ignore */), contract_barrier);
                            }
                        });
                    }

                });
                /* eslint-disable max-len */

            }
        });
        return contract_categories;
    };

    const getContractForms = () => {
        const contract_categories  = getContractCategories();
        const trade_contract_forms = {};
        if (!contract_categories) return null;
        Object.keys(contract_categories).forEach(element => {
            trade_contract_forms[element] = contract_categories[element].category;
        });
        if (isEmptyObject(trade_contract_forms)) return null;
        return trade_contract_forms;
    };

    return {
        details,
        contractForms: getContractForms,
        open         : () => open,
        close        : () => close,
        contracts    : () => contract_details,
        durations    : () => durations,
        startDates   : () => start_dates,
        barriers     : () => barriers,
        contractType : () => contract_type,
        form         : () => form,
        barrier      : () => barrier,
        setContracts : (data) => { contract_details = data; },
    };
})();

module.exports = Contract;
