const getPlatformSettings = require('../../src/templates/_common/brand.config').getPlatformSettings;

module.exports = [
    // url pathname,                           template file path,                             layout,       title,                               exclude languages, section (if differs from default)
    
    ['trading',                                 'app/trade/trading',                           'default',    getPlatformSettings('smarttrader').name],
    ['user/reality_check_frequency',            'app/user/reality_check/frequency',            'default',    'Reality Check'],
    ['user/reality_check_summary',              'app/user/reality_check/deriv_summary',              'default',    'Reality Check'],
    ['endpoint',                                'app/endpoint',                                'default',    'Endpoint'],
    ['explanation',                             'app/trade/explanation',                       null],
    ['logged_inws',                             'app/logged_in',                               null],

    // ==================== Section: "static" ====================
    ['404',                                     'static/404',                                  'full_width', '404'],
];
