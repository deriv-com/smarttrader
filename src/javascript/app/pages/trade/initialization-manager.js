/**
 * Trading Page Initialization Manager
 *
 * Handles robust initialization of the trading page with:
 * - Timeout and retry mechanisms
 * - Comprehensive error handling
 * - Fallback loading timeout
 * - Guaranteed page visibility
 *
 * No UI elements - silent background operation
 */

const BinarySocket = require('../../base/socket');
const getElementById = require('../../../_common/common_functions').getElementById;

const InitializationManager = (() => {
    // Configuration
    const CONFIG = {
        API_TIMEOUT     : 15000,        // 15 seconds per API call
        MAX_RETRIES     : 3,            // Maximum retry attempts
        RETRY_DELAY     : 2000,         // 2 seconds between retries
        FALLBACK_TIMEOUT: 30000,   // 30 seconds maximum before showing page
    };

    // State tracking
    let initializationState = {
        isInitializing : false,
        startTime      : null,
        completedSteps : new Set(),
        failedSteps    : new Set(),
        retryAttempts  : new Map(),
        fallbackTimer  : null,
        forceShowCalled: false,
    };

    // Initialization steps with dependencies
    const INIT_STEPS = {
        AUTHORIZE        : { id: 'authorize', name: 'Authorization', dependencies: [] },
        PAYOUT_CURRENCIES: { id: 'payout_currencies', name: 'Currency Setup', dependencies: ['authorize'] },
        ACTIVE_SYMBOLS   : { id: 'active_symbols', name: 'Market Data', dependencies: ['authorize'] },
        CONTRACTS        : { id: 'contracts', name: 'Contract Loading', dependencies: ['active_symbols'] },
    };

    /**
     * Create a promise with timeout and retry capability
     */
    const createRobustPromise = (promiseFactory, stepId, timeout = CONFIG.API_TIMEOUT) =>
        new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = CONFIG.MAX_RETRIES + 1;

            const attemptCall = async () => {
                attempts++;
                initializationState.retryAttempts.set(stepId, attempts - 1);

                try {
                // Create timeout promise
                    const timeoutPromise = new Promise((_, timeoutReject) => {
                        setTimeout(() => {
                            timeoutReject(new Error(`Timeout after ${timeout}ms for step: ${stepId}`));
                        }, timeout);
                    });

                    // Race between the actual promise and timeout
                    const result = await Promise.race([
                        promiseFactory(),
                        timeoutPromise,
                    ]);

                    resolve(result);
                } catch (error) {

                    // Only log error if WebSocket is connected
                    const socket = BinarySocket.get();
                    const is_connected = socket && socket.readyState === 1;

                    if (is_connected) {
                        // eslint-disable-next-line no-console
                        console.error(`Attempt ${attempts}/${maxAttempts} failed for ${stepId}:`, error);
                    }

                    if (attempts < maxAttempts) {
                    // Retry after delay
                        setTimeout(attemptCall, CONFIG.RETRY_DELAY);
                    } else {
                        reject(new Error(`All ${maxAttempts} attempts failed for ${stepId}: ${error.message}`));
                    }
                }
            };

            attemptCall();
        });

    /**
     * Force show the trading page (fallback mechanism)
     */
    const forceShowPage = (reason = 'Fallback timeout') => {
        if (initializationState.forceShowCalled) return;

        initializationState.forceShowCalled = true;
        // eslint-disable-next-line no-console
        console.warn(`Force showing trading page: ${reason}`);

        // Clear fallback timer
        if (initializationState.fallbackTimer) {
            clearTimeout(initializationState.fallbackTimer);
            initializationState.fallbackTimer = null;
        }

        // Show the trading interface
        const container = getElementById('trading_socket_container');
        if (container) {
            container.classList.add('show');
        }

        // Hide loading indicator
        const initLogo = getElementById('trading_init_progress');
        if (initLogo) {
            initLogo.style.display = 'none';
        }
    };

    /**
     * Mark step as completed
     */
    const markStepCompleted = (stepId) => {
        initializationState.completedSteps.add(stepId);
        initializationState.failedSteps.delete(stepId); // Remove from failed if it was there
        // eslint-disable-next-line no-console
        console.log(`✅ Initialization step completed: ${stepId}`);
    };

    /**
     * Mark step as failed
     */
    const markStepFailed = (stepId, error) => {
        initializationState.failedSteps.add(stepId);
        // eslint-disable-next-line no-console
        console.error(`❌ Initialization step failed: ${stepId}`, error);
    };

    /**
     * Check if step dependencies are met
     */
    const areDependenciesMet = (step) => (
        step.dependencies.every(dep => initializationState.completedSteps.has(dep))
    );

    /**
     * Execute initialization step with robust error handling
     */
    const executeStep = async (stepId, promiseFactory) => {
        const step = Object.values(INIT_STEPS).find(s => s.id === stepId);
        if (!step) {
            throw new Error(`Unknown initialization step: ${stepId}`);
        }

        // Check dependencies
        if (!areDependenciesMet(step)) {
            throw new Error(`Dependencies not met for step: ${stepId}`);
        }

        try {
            const result = await createRobustPromise(promiseFactory, stepId);
            markStepCompleted(stepId);
            return result;
        } catch (error) {
            markStepFailed(stepId, error);
            throw error;
        }
    };

    /**
     * Initialize trading page with robust error handling
     */
    const initialize = async (callbacks = {}) => {
        if (initializationState.isInitializing) {
            // eslint-disable-next-line no-console
            console.warn('Initialization already in progress');
            return;
        }

        // Reset state
        initializationState = {
            isInitializing : true,
            startTime      : Date.now(),
            completedSteps : new Set(),
            failedSteps    : new Set(),
            retryAttempts  : new Map(),
            fallbackTimer  : null,
            forceShowCalled: false,
        };

        // eslint-disable-next-line no-console
        console.log('🚀 Starting robust trading page initialization');

        // Set fallback timer to ensure page always shows
        initializationState.fallbackTimer = setTimeout(() => {
            forceShowPage('Maximum initialization time exceeded');
        }, CONFIG.FALLBACK_TIMEOUT);

        try {
            // Step 1: Wait for authorization (already handled by TradePage)
            markStepCompleted('authorize');

            // Step 2: Load payout currencies
            try {
                await executeStep('payout_currencies', () =>
                    BinarySocket.send({ payout_currencies: 1 }, { forced: true }));
                if (callbacks.onPayoutCurrenciesLoaded) {
                    callbacks.onPayoutCurrenciesLoaded();
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn('Payout currencies failed, continuing with defaults');
            }

            // Step 3: Load active symbols
            let activeSymbolsResult = null;
            try {
                activeSymbolsResult = await executeStep('active_symbols', () =>
                    BinarySocket.send({ active_symbols: 'brief' }));
                if (callbacks.onActiveSymbolsLoaded) {
                    callbacks.onActiveSymbolsLoaded(activeSymbolsResult);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Active symbols failed - this is critical');
                throw error; // This is critical, don't continue
            }

            // Step 4: Contracts will be loaded when user selects an underlying symbol
            // This is handled by processMarketUnderlying in the Process module
            // eslint-disable-next-line no-console
            console.log('Contracts will be loaded when user selects an underlying symbol');

            // Initialization completed successfully
            // eslint-disable-next-line no-console
            console.log('✅ Trading page initialization completed successfully');
            forceShowPage('Initialization completed');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('❌ Trading page initialization failed:', error);
            // Still show the page even if initialization failed
            forceShowPage('Initialization failed but showing page anyway');
        } finally {
            initializationState.isInitializing = false;
        }
    };

    /**
     * Cleanup function
     */
    const cleanup = () => {
        if (initializationState.fallbackTimer) {
            clearTimeout(initializationState.fallbackTimer);
            initializationState.fallbackTimer = null;
        }

        initializationState.isInitializing = false;
        // eslint-disable-next-line no-console
        console.log('🧹 Initialization manager cleaned up');
    };

    /**
     * Get current initialization state (for debugging)
     */
    const getState = () => ({
        isInitializing: initializationState.isInitializing,
        completedSteps: Array.from(initializationState.completedSteps),
        failedSteps   : Array.from(initializationState.failedSteps),
        retryAttempts : Object.fromEntries(initializationState.retryAttempts),
        elapsedTime   : initializationState.startTime ? Date.now() - initializationState.startTime : 0,
    });

    // Public API
    return {
        initialize,
        cleanup,
        getState,
        CONFIG,
    };
})();

module.exports = InitializationManager;
