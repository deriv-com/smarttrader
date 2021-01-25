const { init }     = require('@livechat/customer-sdk');
const BinarySocket = require('./socket_base');
const ClientBase = require('./client_base');

const LiveChat = (() => {

    const licenseID = 12049137;
    const clientID = '66aa088aad5a414484c1fd1fa8a5ace7';
    let session_variables = { loginid: '', landing_company_shortcode: '', currency: '', residence: '', email: '' };
    let client_email, first_name, last_name;
    
    const setSessionVariables = () => {
        const loginid = ClientBase.get('loginid');
        const landing_company_shortcode = ClientBase.get('landing_company_shortcode');
        const currency = ClientBase.get('currency');
        const residence = ClientBase.get('residence');
        const email = ClientBase.get('email');

        session_variables = {
            ...loginid && { loginid },
            ...landing_company_shortcode && { landing_company_shortcode },
            ...currency && { currency },
            ...residence && { residence },
            ...email && { email },
        };

        window.LiveChatWidget.call('set_session_variables', session_variables);
    };

    const setNameEmail = () => {
        if (client_email) window.LiveChatWidget.call('set_customer_email', client_email);
        if (first_name && last_name) window.LiveChatWidget.call('set_customer_name', `${first_name} ${last_name}`);
    };

    BinarySocket.wait('get_settings').then((response) => {
        const get_settings = response.get_settings || {};
        first_name = get_settings.first_name;
        last_name = get_settings.last_name;
        client_email = ClientBase.get('email');

        setSessionVariables();
        setNameEmail();

        window.LC_API.on_chat_ended = () => {
            setNameEmail();
        };
    });

    const initialize = () => {
        if (window.LiveChatWidget) {
            window.LiveChatWidget.on('ready', () => {
                window.LiveChatWidget.call('set_session_variables', session_variables);
                if (!ClientBase.isLoggedIn()){
                    window.LC_API.on_chat_ended = () => {
                        window.LiveChatWidget.call('set_customer_email', ' ');
                        window.LiveChatWidget.call('set_customer_name', ' ');
                    };
                } else {
                    window.LC_API.on_chat_ended = () => {
                        setNameEmail();
                    };
                }
            });
        }
    };

    // Fallback LiveChat icon
    const livechatFallback = () => {
        let livechat_shell;
        const livechat_id = 'gtm-deriv-livechat';
    
        if (window.LiveChatWidget){
            window.LiveChatWidget.on('ready', () => {
                livechat_shell = document.getElementById(livechat_id);
                livechat_shell.style.display = 'flex';
                livechat_shell.addEventListener('click', () => window.LC_API.open_chat_window());
            });
        }
        
    };

    // Called when logging out to end ongoing chats if there is any
    const endLiveChat = () => new Promise ((resolve) => {
        session_variables = { loginid: '', landing_company_shortcode: '', currency: '', residence: '', email: '' };
        window.LiveChatWidget.call('set_session_variables', session_variables);
        window.LiveChatWidget.call('set_customer_email', ' ');
        window.LiveChatWidget.call('set_customer_name', ' ');
        
        try {
            const customerSDK = init({
                licenseId: licenseID,
                clientId : clientID,
            });
            customerSDK.on('connected', () => {
                if (window.LiveChatWidget.get('chat_data')) {
                    const { chatId, threadId } = window.LiveChatWidget.get('chat_data');
                    if (threadId) {
                        customerSDK.deactivateChat({ chatId });
                    }
                }
                resolve();
            });
        } catch (e){
            resolve();
        }

    });

    // Delete existing LiveChat instance when there is no chat running
    const livechatDeletion = () => new Promise ((resolve) => {
        if (window.LiveChatWidget){
            window.LiveChatWidget.on('ready', () => {
                try {
                    if (window.LiveChatWidget.get('customer_data').status !== 'chatting') {
                        window.LiveChatWidget.call('destroy');
                        resolve();
                    }
                } catch (e) {
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });

    // LiveChat initialisation code (provided by LiveChat)
    const liveChatInitialization = () => new Promise ((resolve) => {
        window.__lc = window.__lc || {}; // eslint-disable-line
        window.__lc.license = licenseID; // eslint-disable-line
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice)) //eslint-disable-line
        resolve();
    });

    // Reroute group
    const rerouteGroup = () => {
        LiveChat.livechatDeletion().then(() => {
            LiveChat.liveChatInitialization().then(() => {
                LiveChat.initialize();
            });
        });
    };

    return {
        endLiveChat,
        initialize,
        livechatDeletion,
        livechatFallback,
        liveChatInitialization,
        rerouteGroup,
    };
})();

module.exports = LiveChat;
