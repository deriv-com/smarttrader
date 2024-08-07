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
                
                switch (data_type) {
                    case 'trade':
                        if (optional_trigger === 'barrier') {
                            triggerBarrierChange();
                        } else if (optional_trigger === 'time') {
                            triggerTimeChange();
                        } else {
                            triggerTradeChange();
                        }
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

    // methods for trade
    setTrade(data, optional_trigger) {
        this.set(data, 'trade', optional_trigger);
    }

    getTrade(key) {
        return this.get(key, 'trade');
    }

    getAllTrades() {
        return this.getAll('trade');
    }

    clearTrades() {
        this.clear('trade');
    }

    hasTrade(key) {
        return this.has(key, 'trade');
    }

    // methods for purchase
    setPurchase(data) {
        this.set(data, 'purchase');
    }

    getPurchase(key) {
        return this.get(key, 'purchase');
    }

    getAllPurchases() {
        return this.getAll('purchase');
    }

    clearPurchases() {
        this.clear('purchase');
    }

    hasPurchase(key) {
        return this.has(key, 'purchase');
    }

    // methods for contract
    setContract(data) {
        this.set(data, 'contract');
    }

    getContract(key) {
        return this.get(key, 'contract');
    }

    getAllContracts() {
        return this.getAll('contract');
    }

    clearContracts() {
        this.clear('contract');
    }

    hasContract(key) {
        return this.has(key, 'contract');
    }

}

const dataManager = new DataManager();

export default dataManager;
