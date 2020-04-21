const urlLang       = require('./language').urlLang;
const createElement = require('./utility').createElement;

const Crowdin = (() => {
    /**
     * in-context translation provided at: https://domain.tld/ach/
     * and uses 'ach' as pseudo language code
     */
    const isInContextEnvironment = () => (
        window.location.hostname !== 'smarttrader.deriv.app' &&
        /^\/ach\//.test(window.location.pathname)
    );

    /**
     * initialize Crowdin in-context environment
     */
    const init = () => {
        if (isInContextEnvironment()) {
            const el_lang = document.getElementById('language-select');
            if (el_lang) el_lang.style.display = 'none';
            /* eslint-disable no-underscore-dangle */
            window._jipt = [];
            window._jipt.push(['project', 'dsmarttrader']);
            /* eslint-enable no-underscore-dangle */
            if (document.body) {
                document.body.appendChild(createElement('script', { type: 'text/javascript', src: `${document.location.protocol}//cdn.crowdin.com/jipt/jipt.js` }));
            }
        }
    };

    return {
        init,
        isInContext: isInContextEnvironment,
    };
})();

module.exports = Crowdin;
