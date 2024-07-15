/* eslint-disable class-methods-use-this */
import { triggerPurchaseChange } from '../hooks/events';

class PurchaseManager {
    constructor() {
        if (!window.purchase) {
            window.purchase = {};
        }
    }

    set(data) {
        if (typeof data === 'object') {
            const oldValues = {};
            const newValues = {};
            Object.entries(data).forEach(([key, value]) => {
                if (window.purchase[key] !== value) {
                    oldValues[key] = window.purchase[key];
                    newValues[key] = value;
                }
                window.purchase[key] = value;
            });
            if (Object.keys(newValues).length > 0) {
                // Trigger a custom event with old and new values
                window.dispatchEvent(new CustomEvent('purchaseChange', {
                    detail: { oldValues, newValues },
                }));

                triggerPurchaseChange();
            }
        }
    }
   
    get(key) {
        return window.purchase[key];
    }

    getAll() {
        return { ...window.purchase };
    }

    // Method to clear all data from window.purchase
    clear() {
        const oldValues = { ...window.purchase };
        window.purchase = {};
        window.dispatchEvent(new CustomEvent('purchaseChange', {
            detail: { oldValues, newValues: {} },
        }));
        triggerPurchaseChange();
    }

    // Method to check if a key exists in window.purchase
    has(key) {
        return Object.prototype.hasOwnProperty.call(window.purchase, key);
    }
}

const purchaseManager = new PurchaseManager();

export default purchaseManager;
