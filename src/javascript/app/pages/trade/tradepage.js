const Dropdown          = require('@binary-com/binary-style').selectDropdown;
const TradingAnalysis   = require('./analysis');
const commonTrading     = require('./common');
const cleanupChart      = require('./charts/webtrader_chart').cleanupChart;
const displayCurrencies = require('./currency');
const Defaults          = require('./defaults');
const TradingEvents     = require('./event');
const Price             = require('./price');
const Process           = require('./process');
const ViewPopup         = require('../user/view_popup/view_popup');
const Client            = require('../../base/client');
const Header            = require('../../base/header');
const BinarySocket      = require('../../base/socket');
const DerivBanner       = require('../../common/deriv_banner');
const Guide             = require('../../common/guide');
const TopUpVirtualPopup = require('../../pages/user/account/top_up_virtual/pop_up');
const State             = require('../../../_common/storage').State;
const getAllowedLocalStorageOrigin = require('../../../_common/url').getAllowedLocalStorageOrigin;

const TradePage = (() => {
    let events_initialized = 0;
    State.remove('is_trading');

    const onLoad = () => {
        const iframe_target_origin = getAllowedLocalStorageOrigin();
        BinarySocket.wait('authorize').then(() => {
            if (iframe_target_origin) {
                const el_iframe  = document.getElementById('localstorage-sync');
                el_iframe.src = `${iframe_target_origin}/localstorage-sync.html`;
            }
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
        BinarySocket.wait('authorize').then(() => {
            const country = State.getResponse('authorize.country') || State.getResponse('website_status.clients_country');

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
            BinarySocket.send({ payout_currencies: 1 }, { forced: true }).then(() => {
                displayCurrencies();
                Dropdown('#currency', true);
                if (document.getElementById('multiplier_currency').tagName === 'SELECT') {
                    Dropdown('#multiplier_currency', true);
                }
                Process.processActiveSymbols(country);

                const $currency = $('.currency');

                // if currency symbol is span, restore back from custom dropdown
                if ($currency.is('span') && $currency.parent('div.select').length) {
                    $currency.parent().replaceWith(() => {
                        const curr_element = $currency;
                        return curr_element;
                    });
                    if ($currency.next().attr('id') === $currency.attr('id')) $currency.next().eq(0).remove();
                }
            });
        });
        if (document.getElementById('websocket_form')) {
            commonTrading.addEventListenerForm();
        }

        // Walk-through Guide
        Guide.init({
            script: 'trading',
        });
        TradingAnalysis.bindAnalysisTabEvent();

        ViewPopup.viewButtonOnClick('#contract_confirmation_container');
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
