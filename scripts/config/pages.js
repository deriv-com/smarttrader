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
    // ['user/reset_passwordws',                   'app/user/reset_password',                     'default',    'Password Reset'],
    // ['user/securityws',                         'app/user/security',                           'default',    'Security'],
    // ['user/security/closure',                   'app/user/security/account_closure',           'default',    'Account Closure'],
    // ['user/security/api_tokenws',               'app/user/security/api_token',                 'default',    'API Token'],
    // ['user/security/authorised_appsws',         'app/user/security/authorised_apps',           'default',    'Authorised Applications'],
    // ['user/security/change_passwordws',         'app/user/security/change_password',           'default',    'Change Password'],
    // ['user/security/iphistoryws',               'app/user/security/iphistory',                 'default',    'Login History'],
    // ['user/security/limitsws',                  'app/user/security/limits',                    'default',    'Account Limits'],
    // ['user/security/self_exclusionws',          'app/user/security/self_exclusion',            'default',    'Self Exclusion'],
    // ['user/security/two_factor_authentication', 'app/user/security/two_factor_authentication', 'default',    'Two-Factor Authentication'],
    // ['user/security/cloudflare_dns',            'app/user/security/cloudflare_dns',            'default',    'Binary.com recommends 1.1.1.1'],
    // ['user/set-currency',                       'app/user/set_currency',                       'default',    'Set Currency'],
    // ['user/settingsws',                         'app/user/settings',                           'default',    'Settings'],
    // ['user/settings/assessmentws',              'app/user/settings/financial_assessment',      'default',    'Financial Assessment'],
    // ['user/settings/detailsws',                 'app/user/settings/personal_details',          'default',    'Personal Details'],
    // ['user/settings/professional',              'app/user/settings/professional',              'default',    'Professional Client'],
    // ['user/statementws',                        'app/user/statement',                          'default',    'Statement'],
    // ['user/telegram-bot',                       'app/user/telegram_bot',                       'default',    'Telegram Bot'],
    // ['user/top_up_virtual_pop_up',              'app/user/top_up_virtual/pop_up',              'default',    'Top Up Virtual Account'],
    // ['user/tnc_approvalws',                     'app/user/tnc_approval',                       'default',    'Terms and Conditions Approval'],

    ['endpoint',                                'app/endpoint',                                'default',    'Endpoint'],
    // ['new-account',                             'app/new_account',                             'default',    'Signup'],

    // ['dialog',                                  'app/dialog',                                  null],
    ['explanation',                             'app/trade/explanation',                       null],
    ['logged_inws',                             'app/logged_in',                               null],
    // ['redirect',                                'app/logged_in',                               null,         'Redirecting...'],

    // ==================== Section: "static" ====================
    ['404',                                     'static/404',                                  'full_width', '404'],
    // ['home',                                    'static/home',                                 'full_width', 'Online trading platform for binary options on forex, stock indices, commodities and Synthetic indices'],
    // ['tour',                                    'static/tour',                                 'full_width', 'Tour'],
    // ['platforms',                               'static/platforms',                            'full_width', 'Trading Platforms'],

    // ['liquidity-solutions',                     'static/partners/liquidity_solutions',         'full_width', 'Multi-asset Liquidity Solutions'],
    // ['open-source-projects',                    'static/partners/open_source_projects',        'full_width', 'Open-Source Projects'],
    // ['partners',                                'static/partners/partners',                    'full_width', 'Partners'],
    // ['payment-agent',                           'static/partners/payment_agent',               'full_width', 'Payment Agents'],
    // ['security-testing',                        'static/partners/security_testing',            'full_width', 'Security Testing'],

    // ['get-started',                             'static/get_started/index',                    'default',     'Get Started'],
    // ['get-started/binary-options',              'static/get_started/binary_options',           'default',     'Binary Options'],
    // ['get-started/cfds',                        'static/get_started/cfds',                     'default',     'CFDs'],
    // ['get-started/cryptocurrencies',            'static/get_started/cryptocurrencies',         'default',     'Cryptocurrencies'],
    // ['get-started/forex',                       'static/get_started/forex',                    'default',     'Forex'],
    // ['get-started/metals',                      'static/get_started/metals',                   'default',     'Metals'],

    // ['metatrader/download',                     'static/metatrader/download',                  'default',     'Start Trading with MetaTrader 5'],
    // ['metatrader/how-to-trade-mt5',             'static/metatrader/how_to_trade_mt5',          'default',     'How to Trade in MetaTrader 5'],
    // ['metatrader/types-of-accounts',            'static/metatrader/types_of_accounts',         'default',     'Types of MetaTrader 5 accounts'],
];
