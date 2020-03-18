const Header              = require('./header');
const BinarySocketGeneral = require('./socket_general');
const NetworkMonitorBase  = require('../../_common/base/network_monitor_base');
const getElementById      = require('../../_common/common_functions').getElementById;
const applyToAllElements  = require('../../_common/utility').applyToAllElements;
const localize            = require('../../_common/localize').localize;

const NetworkMonitor = (() => {
    const connection_error_code = 'CONNECTION_ERROR';

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
            Header.displayNotification(localize('Connection error: Please check your internet connection.'), true, connection_error_code);
        }

        applyToAllElements('.network_status', (el) => {
            el.setAttribute('status', status.class);
            el.parentNode.setAttribute('data-balloon', `${localize('Network status')}: ${status.tooltip}`);
        });
    };

    return {
        init,
    };
})();

module.exports = NetworkMonitor;
