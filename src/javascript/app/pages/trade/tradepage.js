const Dropdown          = require('@binary-com/binary-style').selectDropdown;
const TradingAnalysis   = require('./analysis');
const commonTrading     = require('./common');
const cleanupChart      = require('./charts/webtrader_chart').cleanupChart;
const displayCurrencies = require('./currency');
const Defaults          = require('./defaults');
const TradingEvents     = require('./event');
const Price             = require('./price');
const Process           = require('./process');
const InitializationManager = require('./initialization-manager');
const ViewPopup         = require('../user/view_popup/view_popup');
const Client            = require('../../base/client');
const Header            = require('../../base/header');
const BinarySocket      = require('../../base/socket');
const DerivBanner       = require('../../common/deriv_banner');
const TopUpVirtualPopup = require('../user/account/top_up_virtual/pop_up');
const State             = require('../../../_common/storage').State;
const LoaderElement     = require('../loader.jsx');

const TradePage = (() => {
    let events_initialized = 0;
    State.remove('is_trading');
    LoaderElement.init();

    const onLoad = () => {
        BinarySocket.wait('authorize').then(() => {
            init();
        });
    };

    const init = () => {
        if (Client.isAccountOfType('financial') || Client.isOptionsBlocked() ||  Client.isOfferingBlocked()) {
            return;
        }

        State.set('is_trading', true);
        Price.clearFormId();
        if (events_initialized === 0) {
            events_initialized = 1;
            TradingEvents.init();
        }

        // Initialize UI components that don't depend on API calls
        if (document.getElementById('websocket_form')) {
            commonTrading.addEventListenerForm();
        }
        TradingAnalysis.bindAnalysisTabEvent();
        ViewPopup.viewButtonOnClick('#contract_confirmation_container');

        // Use robust initialization manager for API-dependent initialization
        BinarySocket.wait('authorize').then(() => {
            const country = State.getResponse('authorize.country') || State.getResponse('website_status.clients_country');

            // Handle virtual account setup
            if (Client.get('is_virtual')) {
                Header.upgradeMessageVisibility(); // To handle the upgrade buttons visibility
                // if not loaded by pjax, balance update function calls TopUpVirtualPopup
                if (State.get('is_loaded_by_pjax')) {
                    BinarySocket.wait('balance').then(() => {
                        TopUpVirtualPopup.init(State.getResponse('balance.balance'));
                    });
                }
            }
            Header.displayAccountStatus();
            Client.activateByClientType('trading_socket_container');

            // Start robust initialization process
            InitializationManager.initialize({
                onPayoutCurrenciesLoaded: () => {
                    displayCurrencies();
                    Dropdown('#currency', true);
                    if (document.getElementById('multiplier_currency')?.tagName === 'SELECT') {
                        Dropdown('#multiplier_currency', true);
                    }

                    const $currency = $('.currency');
                    // if currency symbol is span, restore back from custom dropdown
                    if ($currency.is('span') && $currency.parent('div.select').length) {
                        $currency.parent().replaceWith(() => {
                            const curr_element = $currency;
                            return curr_element;
                        });
                        if ($currency.next().attr('id') === $currency.attr('id')) $currency.next().eq(0).remove();
                    }
                },
                onActiveSymbolsLoaded: (response) => {
                    Process.processActiveSymbols(country, response);
                },
            });
        });
    };

    const reload = () => {
        sessionStorage.removeItem('underlying');
        window.location.reload();
    };

    const onUnload = () => {
        State.remove('is_trading');
        events_initialized = 0;
        Process.forgetTradingStreams();
        BinarySocket.clear();
        Defaults.clear();
        cleanupChart();
        commonTrading.clean();
        BinarySocket.clear('active_symbols');
        TradingAnalysis.onUnload();
        DerivBanner.onUnload();
        
        // Reset initialization manager
        InitializationManager?.reset();
    };

    const onDisconnect = () => {
        commonTrading.showPriceOverlay();
        commonTrading.showFormOverlay();
        cleanupChart();
        onLoad();
    };

    return {
        onLoad,
        reload,
        onUnload,
        onDisconnect,
    };
})();

module.exports = TradePage;
