// events.js
import { useEffect, useState } from 'react';

class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return () => {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        };
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => callback(data));
        }
    }
}

const eventEmitter = new EventEmitter();

// Custom hooks
const useCustomEvent = (eventName) => {
    const [hasNewChanges, setHasNewChanges] = useState(false);

    useEffect(() => {
        const handleEvent = () => {
            setHasNewChanges(true);
            setTimeout(() => setHasNewChanges(false), 0);
        };

        const unsubscribe = eventEmitter.subscribe(eventName, handleEvent);

        return () => {
            unsubscribe();
        };
    }, [eventName]);

    return hasNewChanges;
};

export const eventDispatcher = (element, eventName) => {
    const event = new Event(eventName, { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
};

// Trigger functions
const triggerCustomEvent = (eventName) => {
    eventEmitter.emit(eventName);
};

// Market Change
export const useMarketChange = () => useCustomEvent('marketChange');
export const triggerMarketChange = () => triggerCustomEvent('marketChange');

// Contract Change
export const useContractChange = () => useCustomEvent('contractChange');
export const triggerContractChange = () => triggerCustomEvent('contractChange');

// SesstionStorage Change
export const useSessionChange = () => useCustomEvent('sessionChange');
export const triggerSessionChange = () => triggerCustomEvent('sessionChange');

// Purchase Change
export const usePurchaseChange = () => useCustomEvent('purchaseChange');
export const triggerPurchaseChange = () => triggerCustomEvent('purchaseChange');

// Trade Change
export const useTradeChange = () => useCustomEvent('tradeChange');
export const triggerTradeChange = () => triggerCustomEvent('tradeChange');
