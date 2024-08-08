const moment             = require('moment');
const Contract           = require('./contract');
const Defaults           = require('./defaults');
const Tick               = require('./tick');
const dataManager        = require('../../common/data_manager').default;
const addComma           = require('../../../_common/base/currency_base').addComma;
const elementTextContent = require('../../../_common/common_functions').elementTextContent;
const getElementById     = require('../../../_common/common_functions').getElementById;
const isVisible          = require('../../../_common/common_functions').isVisible;
const localize           = require('../../../_common/localize').localize;

/*
 * Handles barrier processing and display
 *
 * It process `Contract.barriers` and display them if its applicable
 * for current `Contract.form()
 */

const Barriers = (() => {
    let is_barrier_updated = false;
    const { BARRIER, BARRIER_HIGH, BARRIER_LOW, FORM_NAME, UNDERLYING } = Defaults.PARAM_NAMES;

    const display = () => {
        const barriers  = Contract.barriers()[Defaults.get(UNDERLYING)];
        const form_name = Contract.form();

        // TODO: remove `reset` when API stops sending barrier for Resets in contracts_for response
        if (barriers && form_name && barriers[form_name] && !/risefall|reset/i.test(Defaults.get(FORM_NAME))) {
            const unit     = getElementById('duration_units');
            const end_time = getElementById('expiry_date');
            const is_daily = (unit && isVisible(unit) && unit.value === 'd') ||
                (end_time && isVisible(end_time) && moment(end_time.getAttribute('data-value')).isAfter(moment(), 'day'));

            const barrier = barriers[form_name][is_daily ? 'daily' : 'intraday'];
            if (barrier) {
                const barrier_data = {};
                const current_tick   = Tick.quote();
                const decimal_places = Tick.pipSize();

                const indicative_barrier_tooltip      = getElementById('indicative_barrier_tooltip');
                const indicative_high_barrier_tooltip = getElementById('indicative_high_barrier_tooltip');
                const indicative_low_barrier_tooltip  = getElementById('indicative_low_barrier_tooltip');

                if (barrier.count === 1) {
                    
                    getElementById('high_barrier_row').style.display = 'none';
                    getElementById('low_barrier_row').style.display  = 'none';
                    getElementById('barrier_row').setAttribute('style', '');

                    const defaults_barrier = Defaults.get(BARRIER);
                    const elm              = getElementById('barrier');
                    const tooltip          = getElementById('barrier_tooltip');
                    const span             = getElementById('barrier_span');
                    let barrier_def        = defaults_barrier && !isNaN(defaults_barrier) ?
                        defaults_barrier : (barrier.barrier || 0);
                    let value;
                    if (is_daily || !String(barrier.barrier).match(/^[+-]/)) {
                        if (current_tick && !isNaN(current_tick) && String(barrier_def).match(/^[+-]/)) {
                            value = (parseFloat(current_tick) + parseFloat(barrier_def)).toFixed(decimal_places);
                        } else {
                            value = parseFloat(barrier_def);
                        }
                        tooltip.style.display = 'none';
                        span.style.display    = 'inherit';
                        barrier_data.isOffset = false;
                        barrier_data.label = localize('Barrier');
                        // no need to display indicative barrier in case of absolute barrier
                        elementTextContent(indicative_barrier_tooltip, '');
                    } else {
                        if (!String(barrier_def).match(/^[+-]/)) barrier_def = barrier.barrier; // override Defaults value, because it's changing from absolute to relative barrier
                        value                 = barrier_def;
                        span.style.display    = 'none';
                        tooltip.style.display = 'inherit';
                        barrier_data.isOffset = true;
                        barrier_data.label = localize('Barrier offset');
                        if (current_tick && !isNaN(current_tick)) {
                            elementTextContent(indicative_barrier_tooltip, addComma((parseFloat(current_tick) +
                                parseFloat(barrier_def)), decimal_places));
                        } else {
                            elementTextContent(indicative_barrier_tooltip, '');
                        }
                    }
                    elm.value = elm.textContent = value;
                    Barriers.validateBarrier();
                    Defaults.set(BARRIER, elm.value);
                    Defaults.remove(BARRIER_HIGH, BARRIER_LOW);
                    showHideRelativeTip(barrier.barrier, [tooltip, span]);
                    barrier_data.show_barrier = true;
                    barrier_data.show_barrier_highlow = false;
                    dataManager.setTrade({
                        barrier_data,
                    }, 'barrier');
                    return;
                } else if (barrier.count === 2) {
                    getElementById('barrier_row').style.display = 'none';
                    getElementById('high_barrier_row').setAttribute('style', '');
                    getElementById('low_barrier_row').setAttribute('style', '');

                    const high_elm     = getElementById('barrier_high');
                    const low_elm      = getElementById('barrier_low');
                    const high_tooltip = getElementById('barrier_high_tooltip');
                    const high_span    = getElementById('barrier_high_span');
                    const low_tooltip  = getElementById('barrier_low_tooltip');
                    const low_span     = getElementById('barrier_low_span');

                    const defaults_high = Defaults.get(BARRIER_HIGH);
                    const defaults_low  = Defaults.get(BARRIER_LOW);

                    let barrier_high = defaults_high && !isNaN(defaults_high) ? defaults_high : (barrier.barrier || 0);
                    let barrier_low  = defaults_low && !isNaN(defaults_low) ?
                        defaults_low : (barrier.barrier1 || 0);
                    let value_high,
                        value_low;
                    if (is_daily || !String(barrier.barrier).match(/^[+-]/)) {
                        if (current_tick && !isNaN(current_tick) && String(barrier_high).match(/^[+-]/)) {
                            value_high = (parseFloat(current_tick) + parseFloat(barrier_high)).toFixed(decimal_places);
                            value_low  = (parseFloat(current_tick) + parseFloat(barrier_low)).toFixed(decimal_places);
                        } else {
                            value_high = parseFloat(barrier_high);
                            value_low  = parseFloat(barrier_low);
                        }

                        high_span.style.display    = 'inherit';
                        high_tooltip.style.display = 'none';
                        low_span.style.display     = 'inherit';
                        low_tooltip.style.display  = 'none';
                        barrier_data.label_high = localize('High barrier');
                        barrier_data.label_low = localize('Low barrier');
                        barrier_data.isOffsetHightLow = false;

                        elementTextContent(indicative_high_barrier_tooltip, '');
                        elementTextContent(indicative_low_barrier_tooltip, '');
                    } else {
                        // override Defaults value, if it's changing from absolute to relative barrier
                        if (!String(barrier_high).match(/^[+-]/) || !String(barrier_low).match(/^[+-]/)) {
                            barrier_high = barrier.barrier;
                            barrier_low  = barrier.barrier1;
                        }
                        value_high = barrier_high;
                        value_low  = barrier_low;

                        high_span.style.display    = 'none';
                        high_tooltip.style.display = 'inherit';
                        low_span.style.display     = 'none';
                        low_tooltip.style.display  = 'inherit';
                        barrier_data.label_high = localize('High barrier offset');
                        barrier_data.label_low = localize('Low barrier offset');
                        barrier_data.isOffsetHightLow = true;

                        const barrierVal = (tick, barrier_value) => (
                            (tick + parseFloat(barrier_value)).toFixed(decimal_places)
                        );

                        if (current_tick && !isNaN(current_tick)) {
                            const tick = parseFloat(current_tick);
                            elementTextContent(indicative_high_barrier_tooltip, barrierVal(tick, barrier_high));
                            elementTextContent(indicative_low_barrier_tooltip, barrierVal(tick, barrier_low));
                        } else {
                            elementTextContent(indicative_high_barrier_tooltip, '');
                            elementTextContent(indicative_low_barrier_tooltip, '');
                        }
                    }
                    high_elm.value = high_elm.textContent = value_high;
                    low_elm.value  = low_elm.textContent  = value_low;

                    Defaults.remove(BARRIER);
                    showHideRelativeTip(barrier.barrier, [high_tooltip, high_span, low_tooltip, low_span]);
                    Barriers.validateBarrier();
                    Defaults.set(BARRIER_HIGH, high_elm.value);
                    Defaults.set(BARRIER_LOW, low_elm.value);
                    barrier_data.show_barrier = false;
                    barrier_data.show_barrier_highlow = true;
                    dataManager.setTrade({
                        barrier_data,
                    }, 'barrier');
                    return;
                }
            }
        }

        const elements = document.getElementsByClassName('barrier_class');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        Defaults.remove(BARRIER, BARRIER_HIGH, BARRIER_LOW);
    };

    /**
    * Validate Barriers
    */
    const validateBarrier = () => {
        const barrier_element      = getElementById('barrier');
        const barrier_high_element = getElementById('barrier_high');
        const empty = isNaN(parseFloat(barrier_element.value)) || isAbsoluteZero(barrier_element.value);
        let barrier_error;
        if (isVisible(barrier_element) && empty) {
            barrier_element.classList.add('error-field');
            barrier_error = true;
        } else {
            barrier_element.classList.remove('error-field');
            barrier_error = false;
        }

        if (isVisible(barrier_high_element)) {
            const barrier_low_element     = getElementById('barrier_low');
            const error_node              = getElementById('barrier_high_error');
            const is_high_barrier_greater = +barrier_high_element.value > +barrier_low_element.value;
            barrier_high_element.classList[is_high_barrier_greater ? 'remove' : 'add']('error-field');
            error_node.classList[is_high_barrier_greater ? 'add' : 'remove']('invisible');
         
            barrier_error = !is_high_barrier_greater;

        }

        dataManager.setTrade({
            barrier_error,
        }, 'barrier');
    };

    const showHideRelativeTip = (barrier, arr_el) => {
        const has_relative_barrier = String(barrier).match(/^[+-]/);
        const barrier_text         = localize('Add +/– to define a barrier offset. For example, +0.005 means a barrier that\'s 0.005 higher than the entry spot.');
        arr_el.forEach((el) => {
            if (has_relative_barrier) {
                el.setAttribute('data-balloon', barrier_text);
                el.setAttribute('data-balloon-length', 'xlarge');
            } else {
                el.removeAttribute('data-balloon');
                el.removeAttribute('data-balloon-length');
            }
        });
    };

    const isAbsoluteZero = num => !(parseFloat(num) !== 0 || /\+|-/.test(num.toString().charAt(0)));

    return {
        display,
        validateBarrier,
        isBarrierUpdated: () => is_barrier_updated,
        setBarrierUpdate: (flag) => { is_barrier_updated = flag; },
    };
})();

module.exports = Barriers;
