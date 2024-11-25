import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import useFreshChat from '../hooks/useFreshChat';
import useInterComChat from '../hooks/useInterComChat';
import useGrowthbookGetFeatureValue from '../hooks/useGrowthbookGetFeatureValue';
import { getElementById } from '../../_common/common_functions';

const LiveChat = ({ cs_live_chat }) => {

    const loginid = useMemo(() => localStorage.getItem('active_loginid'), []);
    const client_accounts = useMemo(
        () => JSON.parse(localStorage.getItem('client.accounts') || '{}'),
        []
    );
    const client_data = useMemo(
        () => (loginid ? client_accounts[loginid] : null),
        [loginid, client_accounts]
    );
    const token = client_data?.token ?? null;

    const [isFreshChatEnabled] = useGrowthbookGetFeatureValue({
        featureFlag: 'enable_freshworks_live_chat',
    });
    const [isICEnabled] = useGrowthbookGetFeatureValue({
        featureFlag: 'enable_intercom_st',
    });

    const freshChat = useFreshChat(token, isFreshChatEnabled);
    useInterComChat(token, isICEnabled);
    
    if (!isFreshChatEnabled && !isICEnabled && !cs_live_chat) return null;
    getElementById('livechat').style.display =
      isFreshChatEnabled && !freshChat?.is_ready ? 'none' : 'flex';

    return (
        <React.Fragment>
            {!isFreshChatEnabled && !isICEnabled && <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.__lc = window.__lc || {};
                        window.__lc.license = 12049137;
                        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can’t use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
                    `,
                }}
                defer
            />}
            <div id='livechat'>
                <img id='livechat__logo' />
            </div>
        </React.Fragment>
    );
};

export const init = (cs_chat_livechat) => {
    ReactDOM.render(
        <LiveChat cs_live_chat={cs_chat_livechat} />,
        document.getElementById('deriv_livechat')
    );
};

export default init;
