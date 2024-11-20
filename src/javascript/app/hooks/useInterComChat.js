import { useEffect, useMemo } from 'react';
import { useScript } from 'usehooks-ts';

const Cookies = require('js-cookie');

const useInterComChat = (client_data, flag) => {
    const intercom_script = 'https://static.deriv.com/scripts/intercom/v1.0.0.js';
    const script_status = useScript(flag ? intercom_script : null);
    
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
        if (!flag || script_status !== 'ready' || !window.DerivInterCom) return;

        window.DerivInterCom.initialize({
            userData,
            hideLauncher: true,
        });
    }, [
        flag,
        script_status,
        userData,
    ]);
};

export default useInterComChat;
