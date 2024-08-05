import { triggerBarrierChange, triggerTimeChange, triggerTradeChange } from '../hooks/events';

class DataManager {
    constructor() {
        this.data = {
            trade: {},
        };
        // this.trade = {};
    }

    set(data, data_type, optional) {
        if (typeof data === 'object') {
            const oldValues = {};
            const newValues = {};
            Object.entries(data).forEach(([key, value]) => {
                if (this.data[data_type][key] !== value) {
                    oldValues[key] = this.data[data_type][key];
                    newValues[key] = value;
                }
                this.data[data_type][key] = value;
            });
            if (Object.keys(newValues).length > 0) {
                // Trigger a custom event with old and new values
                window.dispatchEvent(new CustomEvent('tradeChange', {
                    detail: { oldValues, newValues },
                }));
                if (optional === 'barrier') {
                    triggerBarrierChange();
                } else if (optional === 'time') {
                    triggerTimeChange();
                } else {
                    triggerTradeChange();
                }
            }
        }
    }

    get(key, data_type) {
        return this.data[data_type][key];
    }

    getAll(data_type) {
        return { ...this.data[data_type] };
    }

    clear() {
        const oldValues = { ...this.data };
        this.data = {};
        window.dispatchEvent(new CustomEvent('tradeChange', {
            detail: { oldValues, newValues: {} },
        }));
        triggerTradeChange();
    }

    has(key, data_type) {
        return Object.prototype.hasOwnProperty.call(this.data[data_type], key);
    }
}

const dataManager = new DataManager();

export default dataManager;
