import { useEffect, useMemo } from 'react';
import { useScript } from 'usehooks-ts';

const Cookies = require('js-cookie');

const useInterComChat = (client_data, flag) => {
    const scriptStatus = useScript('https://static.deriv.com/scripts/intercom/v1.0.0.js');
    
    const { email, user_id, created_at } = client_data || {};
    const client_info = useMemo(() => {
        const data = Cookies.getJSON('client_information');
        return data || null;
    }, []);
    const name = useMemo(
        () =>
            `${client_info?.first_name || ''} ${
                client_info?.last_name || ''
            }`.trim(),
        [client_info]
    );
    const userData = client_data ? { name, email, user_id, created_at } : null;

    useEffect(() => {
        if (!flag || scriptStatus !== 'ready' || !window.DerivInterCom) return;

        window.DerivInterCom.initialize({
            userData,
            hideLauncher: true,
        });
    }, [
        flag,
        scriptStatus,
        userData,
    ]);
};

export default useInterComChat;
