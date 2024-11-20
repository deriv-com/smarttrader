import { useEffect } from 'react';
import { useScript } from 'usehooks-ts';

const useFreshChat = (token, flag) => {
    const freshchat_script = 'https://static.deriv.com/scripts/freshchat/freshchat-1.0.1.js';
    const script_status = useScript(flag ? freshchat_script : null);

    useEffect(() => {
        const checkFcWidget = (intervalId) => {
            if (typeof window !== 'undefined') {
                if (window.fcWidget?.isInitialized() === true) {
                    clearInterval(intervalId);
                }
            }
        };

        const initFreshChat = () => {
            if (script_status === 'ready' && window.FreshChat && window.fcSettings) {
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
    }, [flag, script_status, token]);
};

export default useFreshChat;
