import { useEffect } from 'react';
import { useScript } from 'usehooks-ts';

const useFreshChat = (token, flag) => {
    const scriptStatus = useScript('https://static.deriv.com/scripts/freshchat/freshchat-1.0.1.js');
    
    useEffect(() => {
        const checkFcWidget = (intervalId) => {
            if (typeof window !== 'undefined') {
                if (window.fcWidget?.isInitialized() === true) {
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

        if (flag) initFreshChat();
    }, [flag, scriptStatus, token]);
};

export default useFreshChat;
