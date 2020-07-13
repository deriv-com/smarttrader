const Header              = require('./header');
const BinarySocketGeneral = require('./socket_general');
const NetworkMonitorBase  = require('../../_common/base/network_monitor_base');
const applyToAllElements  = require('../../_common/utility').applyToAllElements;
const localize            = require('../../_common/localize').localize;

const NetworkMonitor = (() => {
    const connection_error_code = 'you_are_offline';

    const init = () => {
        NetworkMonitorBase.init(BinarySocketGeneral, updateUI);
    };

    const updateUI = (status, is_online) => {
        if (is_online) {
            Header.hideNotification(connection_error_code);
        } else {
            Header.displayNotification({ key: connection_error_code, title: localize('You are offline'), message: localize('Check your connection.'), type: 'danger' });
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
