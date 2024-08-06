import {
    triggerBarrierChange,
    triggerContractChange,
    triggerPurchaseChange,
    triggerTimeChange,
    triggerTradeChange,
} from '../hooks/events';

const changeTypeMap = {
    trade   : 'tradeChange',
    purchase: 'purchaseChange',
    contract: 'contractChange',
};

class DataManager {
    constructor() {
        this.data = {
            trade   : {},
            purchase: {},
            contract: {},
        };
    }

    set(data, data_type, optional_trigger) {
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
                window.dispatchEvent(new CustomEvent(changeTypeMap[data_type], {
                    detail: { oldValues, newValues },
                }));
                if (optional_trigger === 'barrier') {
                    triggerBarrierChange();
                } else if (optional_trigger === 'time') {
                    triggerTimeChange();
                } else {
                    switch (data_type) {
                        case 'trade':
                            triggerTradeChange();
                            break;

                        case 'purchase':
                            triggerPurchaseChange();
                            break;

                        case 'contract':
                            triggerContractChange();
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

        window.dispatchEvent(new CustomEvent(changeTypeMap[data_type], {
            detail: { oldValues, newValues: {} },
        }));
        if (data_type === 'trade') {
            triggerTradeChange();
        }
        if (data_type === 'purchase') {
            triggerPurchaseChange();
        }
        if (data_type === 'contract') {
            triggerContractChange();
        }
    }

    has(key, data_type) {
        return Object.prototype.hasOwnProperty.call(this.data[data_type], key);
    }
}

const dataManager = new DataManager();

export default dataManager;
