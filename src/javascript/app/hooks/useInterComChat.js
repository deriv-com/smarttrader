import { useEffect } from 'react';
import { useScript } from 'usehooks-ts';

const useInterComChat = (token, flag, userData) => {
    const intercom_script = 'https://static.deriv.com/scripts/intercom/v1.0.1.js';
    const script_status = useScript(flag ? intercom_script : null);
    
    useEffect(() => {
        if (!flag || script_status !== 'ready' || !window.DerivInterCom) return;

        window.DerivInterCom.initialize({
            token,
            hideLauncher: true,
            userData,
        });
    }, [
        flag,
        script_status,
        token,
    ]);
};

export default useInterComChat;
