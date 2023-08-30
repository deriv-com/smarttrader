const getPlatformSettings = require('../../src/templates/_common/brand.config').getPlatformSettings;

module.exports = [
    // url pathname,                           template file path,                             layout,       title,                               exclude languages, section (if differs from default)
    ['trading',                                 'app/trade/trading',                           'default',    getPlatformSettings('smarttrader').name],

    // ['resources',                               'app/resources/index',                         'default',    'Resources'],
    // ['resources/asset_indexws',                 'app/resources/asset_index',                   'full_width', 'Asset Index'],
    // ['resources/market_timesws',                'app/resources/trading_times',                 'default',    'Trading Times'],
    // ['resources/economic_calendar',             'app/resources/economic_calendar',             'default',    'Economic Calendar'],

    // ['user/accounts',                           'app/user/accounts',                           'default',    'Accounts'],
    // ['user/authenticate',                       'app/user/authenticate',                       'default',    'Authenticate'],
    // ['user/lost_passwordws',                    'app/user/lost_password',                      'default',    'Password Reset'],
    // ['user/metatrader',                         'app/user/metatrader',                         'default',    'MetaTrader account management'],
    // ['user/portfoliows',                        'app/user/portfolio',                          'default',    'Portfolio'],
    // ['user/profit_tablews',                     'app/user/profit_table',                       'default',    'Profit Table'],
    ['user/reality_check_frequency',            'app/user/reality_check/frequency',            'default',    'Reality Check'],
    ['user/reality_check_summary',              'app/user/reality_check/deriv_summary',              'default',    'Reality Check'],

    ['endpoint',                                'app/endpoint',                                'default',    'Endpoint'],
    ['explanation',                             'app/trade/explanation',                       null],
    ['logged_inws',                             'app/logged_in',                               null],

    // ==================== Section: "static" ====================
    ['404',                                     'static/404',                                  'full_width', '404'],
];
