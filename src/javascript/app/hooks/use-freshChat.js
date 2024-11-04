import { useEffect, useState } from 'react';
import { useScript } from 'usehooks-ts';
import useGrowthbookGetFeatureValue from './useGrowthbookGetFeatureValue';

const useFreshChat = (token) => {
    const scriptStatus = useScript('https://static.deriv.com/scripts/freshchat.js');
    const [isReady, setIsReady] = useState(false);
    const [isFreshChatEnabled] = useGrowthbookGetFeatureValue({
        featureFlag: 'enable_freshworks_live_chat',
    });

    useEffect(() => {
        const checkFcWidget = (intervalId) => {
            if (typeof window !== 'undefined') {
                if (window.fcWidget?.isInitialized() === true && !isReady) {
                    setIsReady(true);
                    clearInterval(intervalId);
                }
            }
        };

        const initFreshChat = () => {
            if (scriptStatus === 'ready' && window.FreshChat && window.fcSettings) {
                window.FreshChat.initialize({
                    token,
                    hideButton: true,
                });

                const intervalId = setInterval(() => checkFcWidget(intervalId), 500);

                return () => clearInterval(intervalId);
            }
            return null;
        };

        if (isFreshChatEnabled) initFreshChat();
    }, [isFreshChatEnabled, isReady, scriptStatus, token]);

    return {
        isReady,
        widget: window.fcWidget,
    };
};

export default useFreshChat;
