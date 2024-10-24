const ObjectUtils = require('@deriv-com/utils').ObjectUtils;
const initData = require('../../_common/remote_config.json');

const RemoteConfig = (() => {
    let data = initData;
    let isEnabled = false;

    const remoteConfigQuery = async function () {
        const isProductionOrStaging = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
        const REMOTE_CONFIG_URL = process.env.REMOTE_CONFIG_URL || '';
        if (isProductionOrStaging && REMOTE_CONFIG_URL === '') {
            throw new Error('Remote Config URL is not set!');
        }
        const response = await fetch(REMOTE_CONFIG_URL);
        if (!response.ok) {
            throw new Error('Remote Config Server is out of reach!');
        }
        return response.json();
    };

    const fetchAndUpdateData = async () => {
        if (!isEnabled) return data;

        try {
            const res = await remoteConfigQuery();
            const resHash = await ObjectUtils.hashObject(res);
            const dataHash = await ObjectUtils.hashObject(data);
            if (resHash !== dataHash) {
                data = res;
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Remote Config error: ', error);
        }
        return data;
    };

    const getRemoteConfig = async (enabled = false) => {
        isEnabled = enabled;
        if (isEnabled) {
            await fetchAndUpdateData();
        }
        return { data };
    };

    return {
        getRemoteConfig,
    };
})();

module.exports = RemoteConfig;
