// ==================== app ====================
const LoggedInHandler         = require('./logged_in');
const Endpoint                = require('../pages/endpoint');
const TradePage               = require('../pages/trade/tradepage');

const pages_config = {
    endpoint   : { module: Endpoint },
    logged_inws: { module: LoggedInHandler },
    trading    : { module: TradePage,                  needs_currency: true,   no_mf: true, no_blocked_country: true },
};

module.exports = pages_config;
