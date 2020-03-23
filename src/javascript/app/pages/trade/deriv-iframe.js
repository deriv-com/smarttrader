const getIFrameUrl = () => {
    if (/^smarttrader-staging\.deriv\.app$/i.test(window.location.hostname)) {
        return 'https://staging.deriv.app/localstorage-sync.html';
    } else if (/^smarttrader\.deriv\.app$/i.test(window.location.hostname)) {
        return 'https://deriv.app/localstorage-sync.html';
    }
    return null;
};

module.exports = {
    getIFrameUrl,
};
