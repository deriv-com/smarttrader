/**
 * TMB (Token Management Backend) Authentication Module
 *
 * This module provides TMB authentication functionality as an alternative to OIDC
 * when the 'is_tmb_enabled' feature flag is set to true in localStorage.
 *
 * Based on the useTMB hook pattern but adapted for vanilla JavaScript.
 */

const { requestSessionActive } = require('@deriv-com/auth-client');
const Cookies = require('js-cookie');
const Client = require('./base/client_base');
const localize = require('./localize').localize;
const LocalStore = require('./storage').LocalStore;
const SessionStore = require('./storage').SessionStore;
const ErrorModal = require('../../templates/_common/components/error-modal.jsx').default;

const TMB = (() => {
    /**
     * Check if TMB is enabled via feature flag
     * @returns {Promise<boolean>} True if TMB is enabled, false otherwise
     */
    const isTMBEnabled = async () => {
        try {
            // Determine environment based on hostname
            const hostname = window.location.hostname;
            const isProduction = /^(smarttrader\.deriv\.com|smarttrader\.deriv\.be)$/i.test(hostname);
            
            // Select appropriate Firebase URL
            const firebaseHost = isProduction
                ? 'https://app-config-prod.firebaseio.com'
                : 'https://app-config-staging.firebaseio.com';
            
            const url = `${firebaseHost}/remote_config/oauth/is_tmb_enabled.json`;
            
            const response = await fetch(url);
            const result = await response.json();
            
            // Check localStorage first, then fall back to remote config value
            return localStorage.getItem('is_tmb_enabled') ?? result.app;
        } catch (e) {
            return false;
        }
    };

    /**
     * Get current domain for cookie management
     * @returns {string} Current domain
     */
    const getCurrentDomain = () => {
        if (typeof window === 'undefined') return '';
        return window.location.hostname.split('.').slice(-2).join('.');
    };

    /**
     * List of domains that support cross-app authentication
     */
    const supportedDomains = [
        'deriv.com',
        'deriv.me',
        'deriv.be',
        'binary.com',
    ];

    /**
     * Transform TMB account response to SmartTrader format
     * @param {Object} tmbResponse - Response from requestSessionActive
     * @returns {Object} Transformed account data
     */
    const transformTMBAccounts = (tmbResponse) => {
        if (!tmbResponse?.tokens || !Array.isArray(tmbResponse.tokens)) {
            return {};
        }

        // Convert to ClientBase format
        const accounts = {};
        tmbResponse.tokens.forEach((tokenData) => {
            const { loginid, token, cur: currency } = tokenData;
            accounts[loginid] = {
                token,
                currency,
                email                    : tmbResponse.email || '',
                is_virtual               : /^VR/.test(loginid) ? 1 : 0,
                landing_company_shortcode: getShortcodeFromLoginId(loginid),
                account_category         : tokenData.account_category || 'trading',
                is_disabled              : 0,
            };
        });

        return accounts;
    };

    /**
     * Get landing company shortcode from login ID
     * @param {string} loginid - Account login ID
     * @returns {string} Landing company shortcode
     */
    const getShortcodeFromLoginId = (loginid) => {
        if (/^VR/.test(loginid)) return 'virtual';
        if (/^CR/.test(loginid)) return 'svg';
        if (/^MF/.test(loginid)) return 'maltainvest';
        if (/^MLT/.test(loginid)) return 'malta';
        if (/^MX/.test(loginid)) return 'mx';
        return 'svg'; // default
    };

    /**
     * Get active sessions from TMB
     * @returns {Promise<Object|null>} Active session data or null if failed
     */
    const getActiveSessions = async () => {
        try {
            const data = await requestSessionActive();
            return data;
        } catch (error) {
            return null;
        }
    };

    /**
     * Process and store TMB account data
     * @param {Object} activeSessions - Active session data from TMB
     */
    const processActiveSessions = async (activeSessions) => {
        // Transform account data to SmartTrader format
        const accounts = transformTMBAccounts(activeSessions);
        
        // Store accounts in localStorage using ClientBase format
        LocalStore.setObject('client.accounts', accounts);

        // Set the first account as active if no active account is set
        const accountIds = Object.keys(accounts);
        if (accountIds.length > 0) {
            const currentActiveId = LocalStore.get('active_loginid');
            if (!currentActiveId || !accounts[currentActiveId]) {
                const firstAccountId = accountIds[0];
                LocalStore.set('active_loginid', firstAccountId);
                SessionStore.set('active_loginid', firstAccountId);
            }
        }

        // Set logged_state cookie for cross-app compatibility
        const currentDomain = getCurrentDomain();
        if (supportedDomains.includes(currentDomain)) {
            Cookies.set('logged_state', 'true', {
                domain : currentDomain,
                expires: 30,
                path   : '/',
                secure : true,
            });
        }

        // Initialize Client with the new account data
        Client.init();
    };

    /**
     * Handle TMB login flow
     * @returns {Promise<boolean>} True if login was successful, false otherwise
     */
    const handleTMBLogin = async () => {
        try {
            const activeSessions = await getActiveSessions();
            
            if (activeSessions?.active) {
                await processActiveSessions(activeSessions);
                
                // Handle URL redirection if needed
                if (typeof window !== 'undefined' &&
                    window.location.pathname === '/' &&
                    window.location.search) {
                    // Clear search params after successful login
                    const url = new URL(window.location.href);
                    url.search = '';
                    window.history.replaceState({}, '', url.toString());
                }
                
                return true;
            } else {
                await TMB.handleTMBLogout();
            }
            
            return false;
        } catch (error) {
            // Show error modal
            ErrorModal.init({
                message      : localize('Authentication service temporarily unavailable. Please refresh and try again.'),
                buttonText   : localize('Refresh'),
                onButtonClick: () => {
                    ErrorModal.remove();
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                },
            });
            
            return false;
        }
    };

    /**
     * Handle TMB logout flow
     * @returns {Promise<void>}
     */
    const handleTMBLogout = async () => {
        try {
            // Clear local storage
            LocalStore.remove('client.accounts');
            LocalStore.remove('active_loginid');
            
            // Clear session storage
            SessionStore.remove('active_loginid');
            SessionStore.remove('account');
            
            // Set logged_state cookie to false for cross-app compatibility
            const currentDomain = getCurrentDomain();
            if (supportedDomains.includes(currentDomain)) {
                Cookies.set('logged_state', 'false', {
                    domain : currentDomain,
                    expires: 30,
                    path   : '/',
                    secure : true,
                });
            }
        } catch (error) {
            // Force reload even if logout failed
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
        }
    };

    // Public API
    return {
        isTMBEnabled,
        getActiveSessions,
        handleTMBLogin,
        handleTMBLogout,
        FeatureFlags,
        // Expose internal functions for testing
        _internal: {
            transformTMBAccounts,
            processActiveSessions,
            getCurrentDomain,
            getShortcodeFromLoginId,
        },
    };
})();

module.exports = TMB;
