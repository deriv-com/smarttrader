/* eslint-disable class-methods-use-this */
import { triggerBarrierChange, triggerTimeChange, triggerTradeChange } from '../hooks/events';

class TradeManager {
    constructor() {
        if (!window.trade) {
            window.trade = {};
        }
    }

    set(data, optional) {
        if (typeof data === 'object') {
            const oldValues = {};
            const newValues = {};
            Object.entries(data).forEach(([key, value]) => {
                if (window.trade[key] !== value) {
                    oldValues[key] = window.trade[key];
                    newValues[key] = value;
                }
                window.trade[key] = value;
            });
            if (Object.keys(newValues).length > 0) {
                // Trigger a custom event with old and new values
                window.dispatchEvent(new CustomEvent('tradeChange', {
                    detail: { oldValues, newValues },
                }));
                if (optional === 'barrier') {
                    triggerBarrierChange();
                } else if (optional === "time") {
                  triggerTimeChange();
                } else {
                  triggerTradeChange();
                }
            }
        }
    }
   
    get(key) {
        return window.trade[key];
    }

    getAll() {
        return { ...window.trade };
    }

    // Method to clear all data from window.trade
    clear() {
        const oldValues = { ...window.trade };
        window.trade = {};
        window.dispatchEvent(new CustomEvent('tradeChange', {
            detail: { oldValues, newValues: {} },
        }));
        triggerTradeChange();
    }

    // Method to check if a key exists in window.trade
    has(key) {
        return Object.prototype.hasOwnProperty.call(window.trade, key);
    }
}

const tradeManager = new TradeManager();

export default tradeManager;
