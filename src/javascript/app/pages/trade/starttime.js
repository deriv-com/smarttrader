const Dropdown          = require('@binary-com/binary-style').selectDropdown;
const moment            = require('moment');
const CommonIndependent = require('./common_independent');
const Contract          = require('./contract');
const Defaults          = require('./defaults');
const Durations         = require('./duration');
const getElementById    = require('../../../_common/common_functions').getElementById;
const localize          = require('../../../_common/localize').localize;
const localizeForLang   = require('../../../_common/localize').forLang;
const urlLang           = require('../../../_common/language').urlLang;
const State             = require('../../../_common/storage').State;
const createElement     = require('../../../_common/utility').createElement;
const { triggerSessionChange } = require('../../hooks/events');
const tradeManager = require('../../common/trade_manager').default;

/*
 * Handles start time display
 *
 * It process `Contract.startDates` in case of forward
 * starting contracts and populate the start time select
 * box
 */

const StartDates = (() => {
    let has_now = 0;
    const { DATE_START } = Defaults.PARAM_NAMES;

    State.remove('is_start_dates_displayed');

    const compareStartDate = (a, b) => {
        let sort = 0;
        if (a.date !== b.date) {
            sort = a.date > b.date ? 1 : -1;
        }
        return sort;
    };

    const displayStartDates = () => {
        const start_dates_data = {
            has_now: 0,
            options: [],
        };
        const start_dates = Contract.startDates();
        if (start_dates && start_dates.list && start_dates.list.length) {
            const target   = CommonIndependent.getStartDateNode();
            const fragment = document.createDocumentFragment();
            let option,
                first,
                selected,
                day,
                $duplicated_option;

            getElementById('date_start_row').style.display = 'flex';

            while (target && target.firstChild) {
                target.removeChild(target.firstChild);
            }

            if (start_dates.has_spot) {
                option = createElement('option', { value: 'now', text: localize('Now') });
                start_dates_data.has_now = 1;
                start_dates_data.options.push({ text: 'Now', value: 'now' });
                fragment.appendChild(option);
                has_now = 1;
            } else {
                start_dates_data.has_now = 0;
                has_now = 0;
            }

            start_dates.list.sort(compareStartDate);
            const default_start = Defaults.get(DATE_START) || 'now';

            const rounding = 5 * 60 * 1000;
            localizeForLang(urlLang());
            const now      = moment.utc();
            start_dates.list.forEach((start_date) => {
                let date_open    = moment.unix(start_date.open).utc();
                const date_close = moment.unix(start_date.close).utc();

                if (date_close.isAfter(now)) {
                    if (now.isAfter(date_open)) {
                        date_open = now;
                    }

                    date_open          = moment.utc(Math.ceil((+date_open) / rounding) * rounding);
                    day                = date_open.format('ddd - DD MMM, YYYY');
                    $duplicated_option = $(fragment).find(`option:contains(${day})`);
                    if ($duplicated_option.length) {
                        if (+date_close.unix() > +$duplicated_option.attr('data-end')) {
                            $duplicated_option.attr('data-end', date_close.unix());
                        }
                    } else {
                        option = createElement('option', { value: date_open.unix(), 'data-end': date_close.unix(), text: day });
                        start_dates_data.options.push({
                            text : day,
                            value: date_open.unix().toString(),
                        });
                        if (option.value >= default_start && !selected) {
                            selected = true;
                            option.setAttribute('selected', 'selected');
                        }
                        if (typeof first === 'undefined' && !has_now) {
                            first = date_open.unix();
                        }
                        fragment.appendChild(option);
                    }
                }
            });
            if (target) {
                target.appendChild(fragment);
                Dropdown('#date_start');
                Defaults.set(DATE_START, target.value);
                $('#time_start_row').setVisibility(target.value !== 'now');
                // sessionStorage.setItem(
                //     'start_dates',
                //     JSON.stringify(start_dates_data)
                // );
                // triggerSessionChange();
                tradeManager.set({
                    start_dates: start_dates_data,
                });
            }
            State.set('is_start_dates_displayed', true);
            if (first) {
                Durations.onStartDateChange(first);
                triggerSessionChange();
            }
        } else {
            if (start_dates && start_dates.has_spot) {
                const now_option = createElement('option', { value: 'now', text: localize('Now') });
                CommonIndependent.getStartDateNode().appendChild(now_option);
                has_now = 1;
            }
            State.remove('is_start_dates_displayed');
            getElementById('date_start_row').style.display = 'none';
            getElementById('date_start').value = 'now';
            Defaults.remove(DATE_START);
        }
    };

    return {
        display: displayStartDates,
        disable: () => { CommonIndependent.getStartDateNode().setAttribute('disabled', 'disabled'); },
        enable : () => { CommonIndependent.getStartDateNode().removeAttribute('disabled'); },
    };
})();

module.exports = {
    StartDates,
};
