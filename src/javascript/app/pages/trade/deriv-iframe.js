const getDerivAppOrigin = require('../../../_common/base/client_base').getDerivAppOrigin;

const getIFrameUrl = () => `${getDerivAppOrigin}/localstorage-sync.html`;

module.exports = {
    getIFrameUrl,
};
