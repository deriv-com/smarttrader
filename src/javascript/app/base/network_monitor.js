const Header              = require('./header');
const BinarySocketGeneral = require('./socket_general');
const NetworkMonitorBase  = require('../../_common/base/network_monitor_base');
const getElementById      = require('../../_common/common_functions').getElementById;
const localize            = require('../../_common/localize').localize;

const NetworkMonitor = (() => {
    const connection_error_code = 'you_are_offline';

    let el_status,
        el_tooltip;

    const init = () => {
        el_status  = getElementById('network_status');
        el_tooltip = el_status.parentNode;

        NetworkMonitorBase.init(BinarySocketGeneral, updateUI);
    };

    const updateUI = (status, is_online) => {
        if (is_online) {
            Header.hideNotification(connection_error_code);
        } else {
            Header.displayNotification({ key: connection_error_code, title: localize('You are offline'), message: localize('Check your conenction.'), type: 'danger' });
        }

        if (el_status && el_tooltip) {
            el_status.setAttribute('class', status.class);
            el_tooltip.setAttribute('data-balloon', `${localize('Network status')}: ${status.tooltip}`);
        }
    };

    return {
        init,
    };
})();

module.exports = NetworkMonitor;
