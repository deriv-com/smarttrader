/* eslint-disable class-methods-use-this */
import { triggerContractChange } from '../hooks/events';

class ContractManager {
    constructor() {
        if (!window.contract) {
            window.contract = {};
        }
    }

    set(data) {
        if (typeof data === 'object') {
            const oldValues = {};
            const newValues = {};
            Object.entries(data).forEach(([key, value]) => {
                if (window.contract[key] !== value) {
                    oldValues[key] = window.contract[key];
                    newValues[key] = value;
                }
                window.contract[key] = value;
            });
            if (Object.keys(newValues).length > 0) {
                // Trigger a custom event with old and new values
                window.dispatchEvent(new CustomEvent('contractChange', {
                    detail: { oldValues, newValues },
                }));

                triggerContractChange();
            }
        } else {
            console.error('Data must be an object.');
        }
    }

    get(key) {
        return window.contract[key];
    }

    getAll() {
        return { ...window.contract };
    }

    // Method to clear all data from window.contract
    clear() {
        const oldValues = { ...window.contract };
        window.contract = {};
        window.dispatchEvent(new CustomEvent('contractChange', {
            detail: { oldValues, newValues: {} },
        }));
        triggerContractChange();
    }

    // Method to check if a key exists in window.contract
    has(key) {
        return Object.prototype.hasOwnProperty.call(window.contract, key);
    }
}

const contractManager = new ContractManager();

export default contractManager;
