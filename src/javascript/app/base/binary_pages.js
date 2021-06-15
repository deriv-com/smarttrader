// ==================== _common ====================
const TabSelector = require('../../_common/tab_selector'); // eslint-disable-line import/order

// ==================== app ====================
const LoggedInHandler         = require('./logged_in');
const Redirect                = require('./redirect');
const AccountTransfer         = require('../pages/cashier/account_transfer');
const Cashier                 = require('../pages/cashier/cashier');
const Dashboard               = require('../pages/dashboard/dashboard');
const DepositWithdraw         = require('../pages/cashier/deposit_withdraw');
const DP2P                    = require('../pages/cashier/dp2p');
const PaymentAgentList        = require('../pages/cashier/payment_agent_list');
const PaymentAgentWithdraw    = require('../pages/cashier/payment_agent_withdraw');
const Endpoint                = require('../pages/endpoint');
const EconomicCalendar        = require('../pages/resources/economic_calendar/economic_calendar');
const AssetIndexUI            = require('../pages/resources/asset_index/asset_index.ui');
const MetatraderDownloadUI    = require('../pages/resources/metatrader/download.ui');
const TradingTimesUI          = require('../pages/resources/trading_times/trading_times.ui');
const NewAccount              = require('../pages/new_account');
const TradePage               = require('../pages/trade/tradepage');
const Authenticate            = require('../pages/user/account/authenticate');
const ChangePassword          = require('../pages/user/account/change_password');
const PaymentAgentTransfer    = require('../pages/user/account/payment_agent_transfer/payment_agent_transfer');
const Portfolio               = require('../pages/user/account/portfolio/portfolio.init');
const ProfitTable             = require('../pages/user/account/profit_table/profit_table.init');
const Settings                = require('../pages/user/account/settings');
const AccountClosure          = require('../pages/user/account/settings/account_closure');
const APIToken                = require('../pages/user/account/settings/api_token');
const AuthorisedApps          = require('../pages/user/account/settings/authorised_apps');
const FinancialAssessment     = require('../pages/user/account/settings/financial_assessment');
const IPHistory               = require('../pages/user/account/settings/iphistory/iphistory');
const Limits                  = require('../pages/user/account/settings/limits/limits');
const SelfExclusion           = require('../pages/user/account/settings/self_exclusion');
const TwoFactorAuthentication = require('../pages/user/account/settings/two_factor_authentication');
const PersonalDetails         = require('../pages/user/account/settings/personal_details');
const professionalClient      = require('../pages/user/account/settings/professional_client');
const Statement               = require('../pages/user/account/statement/statement.init');
const TopUpVirtual            = require('../pages/user/account/top_up_virtual/top_up_virtual');
const Accounts                = require('../pages/user/accounts');
const LostPassword            = require('../pages/user/lost_password');
const MetaTrader              = require('../pages/user/metatrader/metatrader');
const TypesOfAccounts         = require('../pages/user/metatrader/types_of_accounts');
const FinancialAccOpening     = require('../pages/user/new_account/financial_acc_opening');
const RealAccOpening          = require('../pages/user/new_account/real_acc_opening');
const VirtualAccOpening       = require('../pages/user/new_account/virtual_acc_opening');
const WelcomePage             = require('../pages/user/new_account/welcome_page');
const WelcomePageOnboarding   = require('../pages/user/new_account/welcome_onboarding');
const ResetPassword           = require('../pages/user/reset_password');
const TradingResetPassword    = require('../pages/user/trading_reset_password');
const SetCurrency             = require('../pages/user/set_currency');
const TelegramBot             = require('../pages/user/telegram_bot');
const TNCApproval             = require('../pages/user/tnc_approval');
const VideoFacility           = require('../pages/user/video_facility');

// ==================== static ====================
// const Charity            = require('../../static/pages/charity');
const Contact             = require('../../static/pages/contact');
// const Contact2            = require('../../static/pages/contact_2');
const DeactivatedAccount  = require('../../static/pages/deactivated_account');
const GetStarted          = require('../../static/pages/get_started');
const Home                = require('../../static/pages/home');
const KeepSafe            = require('../../static/pages/keep_safe');
const JobDetails          = require('../../static/pages/job_details');
const Platforms           = require('../../static/pages/platforms');
const Mt5Signals          = require('../../static/pages/mt5_signals');
const Regulation          = require('../../static/pages/regulation');
const StaticPages         = require('../../static/pages/static_pages');
const TermsAndConditions  = require('../../static/pages/tnc');
const WhyUs               = require('../../static/pages/why_us');
const AffiliatesIBLanding = require('../../static/pages/affiliate_ib_landing');
const ResponsibleTrading  = require('../../static/pages/responsible_trading');

/* eslint-disable max-len */
const pages_config = {
    'about-us'               : { module: Dashboard },
    account_transfer         : { module: AccountTransfer,            is_authenticated: true, only_real: true, needs_currency: true },
    accounts                 : { module: Accounts,                   is_authenticated: true, needs_currency: true },
    api_tokenws              : { module: APIToken,                   is_authenticated: true },
    assessmentws             : { module: FinancialAssessment,        is_authenticated: true, only_real: true },
    asset_indexws            : { module: AssetIndexUI,               no_mf: true , no_blocked_country: true },
    asuncion                 : { module: StaticPages.Locations },
    authenticate             : { module: Authenticate,               is_authenticated: true, only_real: true },
    authorised_appsws        : { module: AuthorisedApps,             is_authenticated: true },
    careers                  : { module: StaticPages.Careers },
    cashier                  : { module: Cashier },
    cfds                     : { module: GetStarted.CFDs },
    // charity                  : { module: Charity },
    change_passwordws        : { module: ChangePassword,             is_authenticated: true },
    closure                  : { module: AccountClosure,             is_authenticated: true },
    contact                  : { module: Contact },
    cryptocurrencies         : { module: GetStarted.Cryptocurrencies },
    cyberjaya                : { module: StaticPages.Locations },
    detailsws                : { module: PersonalDetails,            is_authenticated: true, needs_currency: true },
    download                 : { module: MetatraderDownloadUI },
    dp2p                     : { module: DP2P,                       is_authenticated: true },
    dubai                    : { module: StaticPages.Locations },
    economic_calendar        : { module: EconomicCalendar },
    endpoint                 : { module: Endpoint },
    epg_forwardws            : { module: DepositWithdraw,            is_authenticated: true, only_real: true },
    explore                  : { module: Dashboard },
    faq                      : { module: StaticPages.AffiliatesFAQ },
    forex                    : { module: GetStarted.Forex },
    forwardws                : { module: DepositWithdraw,            is_authenticated: true, only_real: true },
    home                     : { module: Home,                       not_authenticated: true },
    iphistoryws              : { module: IPHistory,                  is_authenticated: true },
    labuan                   : { module: StaticPages.Locations },
    landing_page             : { module: StaticPages.LandingPage,    is_authenticated: true, only_virtual: true },
    limitsws                 : { module: Limits,                     is_authenticated: true, no_mf: true, only_real: true, needs_currency: true, no_blocked_country: true },
    logged_inws              : { module: LoggedInHandler },
    lost_passwordws          : { module: LostPassword,               not_authenticated: true },
    malta                    : { module: StaticPages.Locations },
    maltainvestws            : { module: FinancialAccOpening,        is_authenticated: true },
    market_timesws           : { module: TradingTimesUI,             no_mf: true, no_blocked_country: true },
    metals                   : { module: GetStarted.Metals },
    metatrader               : { module: MetaTrader,                 is_authenticated: true, needs_currency: true },
    overview                 : { module: Dashboard },
    payment_agent_listws     : { module: PaymentAgentList,           is_authenticated: true },
    payment_methods          : { module: Cashier.PaymentMethods },
    platforms                : { module: Platforms,                  no_mf: true, no_blocked_country: true, msg_residence_blocked: true },
    portfoliows              : { module: Portfolio,                  is_authenticated: true, needs_currency: true },
    professional             : { module: professionalClient,         is_authenticated: true, only_real: true },
    profit_tablews           : { module: ProfitTable,                is_authenticated: true, needs_currency: true },
    realws                   : { module: RealAccOpening,             is_authenticated: true },
    redirect                 : { module: Redirect },
    regulation               : { module: Regulation },
    reset_passwordws         : { module: ResetPassword },
    resources                : { module: Dashboard },
    securityws               : { module: Settings,                   is_authenticated: true },
    self_exclusionws         : { module: SelfExclusion,              is_authenticated: true, only_real: true },
    settingsws               : { module: Settings,                   is_authenticated: true },
    statementws              : { module: Statement,                  is_authenticated: true, needs_currency: true },
    tnc_approvalws           : { module: TNCApproval,                is_authenticated: true, only_real: true },
    top_up_virtualws         : { module: TopUpVirtual,               is_authenticated: true, only_virtual: true },
    trading                  : { module: TradePage,                  needs_currency: true,   no_mf: true, no_blocked_country: true },
    trading_reset_passwordws : { module: TradingResetPassword },
    transferws               : { module: PaymentAgentTransfer,       is_authenticated: true, only_real: true },
    two_factor_authentication: { module: TwoFactorAuthentication,    is_authenticated: true },
    virtualws                : { module: VirtualAccOpening,          not_authenticated: true },
    welcome                  : { module: WelcomePage,                is_authenticated: true, only_virtual: true },
    welcome_onboarding       : { module: WelcomePageOnboarding,      is_authenticated: true, only_virtual: true },
    withdrawws               : { module: PaymentAgentWithdraw,       is_authenticated: true, only_real: true },

    'affiliate-ib'           : { module: AffiliatesIBLanding },
    'binary-in-numbers'      : { module: StaticPages.BinaryInNumbers },
    'binary-options'         : { module: GetStarted.BinaryOptions },
    // 'contact-2'              : { module: Contact2 },
    'contract-specifications': { module: TabSelector },
    'deactivated-account'    : { module: DeactivatedAccount },
    'get-started'            : { module: TabSelector },
    'how-to-trade-mt5'       : { module: TabSelector },
    'ib-faq'                 : { module: StaticPages.IBProgrammeFAQ },
    'job-details'            : { module: JobDetails },
    'keep-safe'              : { module: KeepSafe },
    'mt5-signals'            : { module: Mt5Signals },
    'new-account'            : { module: NewAccount,                     not_authenticated: true },
    'open-positions'         : { module: StaticPages.OpenPositions },
    'open-source-projects'   : { module: StaticPages.OpenSourceProjects },
    'payment-agent'          : { module: StaticPages.PaymentAgent },
    'responsible-trading'    : { module: ResponsibleTrading },
    'set-currency'           : { module: SetCurrency,                is_authenticated: true, only_real: true, needs_currency: true },
    'telegram-bot'           : { module: TelegramBot,                is_authenticated: true },
    'terms-and-conditions'   : { module: TermsAndConditions },
    'types-of-accounts'      : { module: TypesOfAccounts },
    'video-facility'         : { module: VideoFacility,              is_authenticated: true, only_real: true },
    'why-us'                 : { module: WhyUs },
};
/* eslint-enable max-len */

module.exports = pages_config;
