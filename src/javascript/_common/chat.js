import getFeatureFlag from '../app/common/getFeatureFlag';

const Chat = {
    isFreshChat: async () => getFeatureFlag('enable_freshworks_live_chat'),
    isIntercom : async () => getFeatureFlag('enable_intercom_st'),

    getFlags: async () => {
        const [isFreshChat, isIntercom] = await Promise.all([
            Chat.isFreshChat(),
            Chat.isIntercom(),
        ]);
        return { isFreshChat, isIntercom };
    },

    open: async () => {
        const { isFreshChat, isIntercom } = await Chat.getFlags();
        if (isFreshChat) {
            window.fcWidget?.open();
        } else if (isIntercom) {
            window.Intercom('show');
        } else {
            window.LC_API.open_chat_window();
        }
    },

    openWithParam: async () => {
        const { isFreshChat, isIntercom } = await Chat.getFlags();
        const interval = setInterval(() => {
            if (isFreshChat && window.fcWidget) {
                window.fcWidget?.open();
                clearInterval(interval);
            } else if (isIntercom && window.Intercom) {
                window.Intercom('show');
                clearInterval(interval);
            } else if (window.LiveChatWidget) {
                window.LiveChatWidget?.on('ready', () => {
                    window.LC_API.open_chat_window();
                });
                clearInterval(interval);
            }
        }, 500);
    },

    clear: async () => {
        const { isFreshChat, isIntercom } = await Chat.getFlags();
        if (isFreshChat) {
            window.fcWidget?.user.clear().then(
                () => window.fcWidget.destroy()
            );
        } else if (isIntercom) {
            window.Intercom('shutdown');
        }
    },

};

export default Chat;
