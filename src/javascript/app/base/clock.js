const moment             = require('moment');
const ServerTime         = require('../../_common/base/server_time');
const elementInnerHtml   = require('../../_common/common_functions').elementInnerHtml;
const applyToAllElements = require('../../_common/utility').applyToAllElements;

const Clock = (() => {
    let fncExternalTimer;

    const startClock = () => {

        ServerTime.init(onTimeUpdated);
    };

    const onTimeUpdated = () => {
        const server_time = ServerTime.get();
        window.time = server_time;

        const time_str = `${server_time.format('YYYY-MM-DD HH:mm:ss')} GMT`;
        applyToAllElements('.gmt-clock', (el) => {
            elementInnerHtml(el, time_str);
        });

        if (typeof fncExternalTimer === 'function') {
            fncExternalTimer();
        }
    };

    const showLocalTimeOnHover = (selector) => {
        document.querySelectorAll(selector || '.date').forEach((el) => {
            const gmt_time_str = el.textContent.replace('\n', ' ');
            const local_time   = moment.utc(gmt_time_str, 'YYYY-MM-DD HH:mm:ss').local();
            if (local_time.isValid()) {
                el.setAttribute('data-balloon', local_time.format('YYYY-MM-DD HH:mm:ss Z'));
            }
        });
    };

    return {
        startClock,
        showLocalTimeOnHover,

        setExternalTimer: (func) => { fncExternalTimer = func; },
    };
})();

module.exports = Clock;
