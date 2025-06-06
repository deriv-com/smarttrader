const Cookies                = require('js-cookie');
const getPropertyValue       = require('./utility').getPropertyValue;
const isEmptyObject          = require('./utility').isEmptyObject;
const getCurrentBinaryDomain = require('../config').getCurrentBinaryDomain;

const getObject = function(key) {
    return JSON.parse(this.getItem(key) || '{}');
};

/**
 * Removing all but user details
 */
const keepUserAndClean = () => {
    const client_accounts = localStorage.getItem('client.accounts');
    const active_loginid  = sessionStorage.getItem('active_loginid') || localStorage.getItem('active_loginid');
    localStorage.clear();
    localStorage.setItem('client.accounts', client_accounts);
    sessionStorage.setItem('active_loginid', active_loginid);
    localStorage.setItem('active_loginid', active_loginid);
};

const getTotalStorageUsage = (storage) => Object.keys(storage).reduce((acc, cur) => acc + localStorage[cur].length, 0);

const handlesQuotaExceededErrorException = () => {
    if (!window.trackJs) return;
    // Check if the browser supports Storage Quota API
    if (navigator.storage && typeof navigator.storage.estimate === 'function') {
        navigator.storage.estimate().then(estimate => {
            window.trackJs.addMetadata('storage_usage', estimate.usage);
            window.trackJs.addMetadata('storage_quota', estimate.quota);
            window.trackJs.addMetadata('has_localstorage', isStorageSupported(window.localStorage));
            window.trackJs.addMetadata('has_sessionstorage', isStorageSupported(window.sessionStorage));

            keepUserAndClean();
        });
    } else {
        // IE & Safari
        window.trackJs.addMetadata('has_localstorage', isStorageSupported(window.localStorage));
        window.trackJs.addMetadata('has_sessionstorage', isStorageSupported(window.sessionStorage));
        window.trackJs.addMetadata(
            'storage_usage',
            (isStorageSupported(window.localStorage) ? getTotalStorageUsage(window.localStorage) : 0) * 2,
        );
        window.trackJs.addMetadata('storage_quota', 'unknown');
        keepUserAndClean();
    }
};

const setObject = function(key, value) {
    try {
        if (value && value instanceof Object) {
            this.setItem(key, JSON.stringify(value));
        }
    } catch (e) {
        const quota_exceeded_error = e.name === (
            'QuotaExceededError' ||
            'QUOTA_EXCEEDED_ERR' ||
            'NS_ERROR_DOM_QUOTA_REACHED' ||
            'W3CException_DOM_QUOTA_EXCEEDED_ERR'
        );

        if (quota_exceeded_error) {
            handlesQuotaExceededErrorException();
        }

        throw e; // re-throw the error unchanged
    }
};

if (typeof Storage !== 'undefined') {
    Storage.prototype.getObject = getObject;
    Storage.prototype.setObject = setObject;
}

const isStorageSupported = (storage) => {
    if (typeof storage === 'undefined') {
        return false;
    }

    const test_key = 'test';
    try {
        storage.setItem(test_key, '1');
        storage.removeItem(test_key);
        return true;
    } catch (e) {
        return false;
    }
};

const Store = function(storage) {
    this.storage           = storage;
    this.storage.getObject = getObject;
    this.storage.setObject = setObject;
};

Store.prototype = {
    get(key) {
        return this.storage.getItem(key) || undefined;
    },
    set(key, value) {
        if (typeof value !== 'undefined') {
            this.storage.setItem(key, value);
        }
    },
    getObject(key) {
        return typeof this.storage.getObject === 'function' // Prevent runtime error in IE
            ? this.storage.getObject(key)
            : JSON.parse(this.storage.getItem(key) || '{}');
    },
    setObject(key, value) {
        if (typeof this.storage.setObject === 'function') { // Prevent runtime error in IE
            this.storage.setObject(key, value);
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
    },
    remove(key) { this.storage.removeItem(key); },
    clear() { this.storage.clear(); },
};

const InScriptStore = function (object) {
    this.store = typeof object !== 'undefined' ? object : {};
};

InScriptStore.prototype = {
    get(key) {
        return getPropertyValue(this.store, key);
    },
    set(k, value, obj = this.store) {
        let key = k;
        if (!Array.isArray(key)) key = [key];
        if (key.length > 1) {
            if (!(key[0] in obj) || isEmptyObject(obj[key[0]])) obj[key[0]] = {};
            this.set(key.slice(1), value, obj[key[0]]);
        } else {
            obj[key[0]] = value;
        }
    },
    getObject(key) {
        return JSON.parse(this.get(key) || '{}');
    },
    setObject(key, value) {
        this.set(key, JSON.stringify(value));
    },
    remove(...keys) {
        keys.forEach((key) => { delete this.store[key]; });
    },
    clear()   { this.store = {}; },
    has(key)  { return this.get(key) !== undefined; },
    keys()    { return Object.keys(this.store); },
    call(key) { if (typeof this.get(key) === 'function') this.get(key)(); },
};

const State     = new InScriptStore();
State.prototype = InScriptStore.prototype;
/**
 * Shorthand function to get values from response object of State
 *
 * @param {String} pathname
 *     e.g. getResponse('authorize.currency') == get(['response', 'authorize', 'authorize', 'currency'])
 */
State.prototype.getResponse = function(pathname) {
    let path = pathname;
    if (typeof path === 'string') {
        const keys = path.split('.');
        path       = ['response', keys[0]].concat(keys);
    }
    return this.get(path);
};
State.set('response', {});

const CookieStorage = function(cookie_name, cookie_domain) {
    const hostname = window.location.hostname;

    this.initialized = false;
    this.cookie_name = cookie_name;
    this.domain      =
        cookie_domain || (getCurrentBinaryDomain() ? `.${hostname.split('.').slice(-2).join('.')}` : hostname);
    this.path        = '/';
    this.expires     = new Date('Thu, 1 Jan 2037 12:00:00 GMT');
    this.value       = {};
};

CookieStorage.prototype = {
    read() {
        const cookie_value = Cookies.get(this.cookie_name);
        try {
            this.value = cookie_value ? JSON.parse(cookie_value) : {};
        } catch (e) {
            this.value = {};
        }
        this.initialized = true;
    },
    write(val, expireDate, isSecure, sameSite) {
        if (!this.initialized) this.read();
        this.value = val;
        if (expireDate) this.expires = expireDate;
        Cookies.set(this.cookie_name, this.value, {
            expires : this.expires,
            path    : this.path,
            domain  : this.domain,
            secure  : !!isSecure,
            sameSite: sameSite || 'strict',
        });
    },
    get(key) {
        if (!this.initialized) this.read();
        return this.value[key];
    },
    set(key, val, options) {
        if (!this.initialized) this.read();
        this.value[key] = val;
        Cookies.set(this.cookie_name, this.value, {
            expires: new Date(this.expires),
            path   : this.path,
            domain : this.domain,
            ...options,
        });
    },
    remove() {
        Cookies.remove(this.cookie_name, {
            path  : this.path,
            domain: this.domain,
        });
    },
};

const removeCookies = (...cookie_names) => {
    const domains = [
        `.${document.domain.split('.').slice(-2).join('.')}`,
        `.${document.domain}`,
    ];

    let parent_path = window.location.pathname.split('/', 2)[1];
    if (parent_path !== '') {
        parent_path = `/${parent_path}`;
    }

    cookie_names.forEach((c) => {
        Cookies.remove(c, { path: '/', domain: domains[0] });
        Cookies.remove(c, { path: '/', domain: domains[1] });
        Cookies.remove(c);
        if (new RegExp(c).test(document.cookie) && parent_path) {
            Cookies.remove(c, { path: parent_path, domain: domains[0] });
            Cookies.remove(c, { path: parent_path, domain: domains[1] });
            Cookies.remove(c, { path: parent_path });
        }
    });
};

let SessionStore,
    LocalStore;

if (isStorageSupported(window.localStorage)) {
    LocalStore = new Store(window.localStorage);
}
if (isStorageSupported(window.sessionStorage)) {
    SessionStore = new Store(window.sessionStorage);
}

if (!LocalStore) {
    LocalStore = new InScriptStore();
}
if (!SessionStore) {
    SessionStore = new InScriptStore();
}

module.exports = {
    isStorageSupported,
    CookieStorage,
    removeCookies,
    State,
    SessionStore,
    LocalStore,
};
