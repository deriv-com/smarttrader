const SocketCache = require('../../_common/base/socket_cache');
const CallbackElement = require('../pages/callback/callback.jsx');

const CallbackHandler = (() => {
    const onLoad = () => {
        SocketCache.clear();
        CallbackElement.init();
        parent.window.is_logging_in = 1; // this flag is used in base.js to prevent auto-reloading this pag
    };

    return {
        onLoad,
    };
})();

module.exports = CallbackHandler;
