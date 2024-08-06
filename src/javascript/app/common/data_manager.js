import {
    triggerBarrierChange,
    triggerPurchaseChange,
    triggerTimeChange,
    triggerTradeChange,
} from '../hooks/events';

class DataManager {
    constructor() {
        this.data = {
            trade   : {},
            purchase: {},
        };
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
                    switch (data_type) {
                        case 'trade':
                            triggerTradeChange();
                            break;

                        case 'purchase':
                            triggerPurchaseChange();
                            break;
                    
                        default:
                            break;
                    }
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

    clear(data_type) {
        const oldValues = { ...this.data[data_type] };
        this.data[data_type] = {};
        if (data_type === 'trade') {
            window.dispatchEvent(new CustomEvent('tradeChange', {
                detail: { oldValues, newValues: {} },
            }));
            triggerTradeChange();
        }
        if (data_type === 'purchase') {
            window.dispatchEvent(new CustomEvent('purchaseChange', {
                detail: { oldValues, newValues: {} },
            }));
            triggerPurchaseChange();
        }
    }

    has(key, data_type) {
        return Object.prototype.hasOwnProperty.call(this.data[data_type], key);
    }
}

const dataManager = new DataManager();

export default dataManager;
