const ClientBase       = require('./client_base');
const SocketCache      = require('./socket_cache');
const getLanguage      = require('../language').get;
const State            = require('../storage').State;
const cloneObject      = require('../utility').cloneObject;
const getPropertyValue = require('../utility').getPropertyValue;
const isEmptyObject    = require('../utility').isEmptyObject;
const PromiseClass     = require('../utility').PromiseClass;
const getAppId         = require('../../config').getAppId;
const getSocketURL     = require('../../config').getSocketURL;
const isLoginPages     = require('../../_common/utility').isLoginPages;

/*
 * An abstraction layer over native javascript WebSocket,
 * which provides additional functionality like
 * reopen the closed connection and process the buffered requests
 */
const BinarySocketBase = (() => {
    let binary_socket;

    let config               = {};
    let buffered_sends       = [];
    let req_id               = 0;
    let wrong_app_id         = 0;
    let is_disconnect_called = false;
    let is_connected_before  = false;

    const socket_url = `${getSocketURL()}?app_id=${getAppId()}&l=${getLanguage()}&brand=binary`;
    const timeouts   = {};
    const promises   = {};

    const availability = {
        is_up      : true,
        is_updating: false,
        is_down    : false,
    };

    const no_duplicate_requests = [
        'authorize',
        'get_settings',
        'residence_list',
        'landing_company',
        'payout_currencies',
        'asset_index',
    ];

    const sent_requests = {
        items : [],
        clear : () => { sent_requests.items = []; },
        has   : msg_type => sent_requests.items.indexOf(msg_type) >= 0,
        add   : (msg_type) => { if (!sent_requests.has(msg_type)) sent_requests.items.push(msg_type); },
        remove: (msg_type) => {
            if (sent_requests.has(msg_type)) sent_requests.items.splice(sent_requests.items.indexOf(msg_type, 1));
        },
    };

    const waiting_list = {
        items: {},
        add  : (msg_type, promise_obj) => {
            if (!waiting_list.items[msg_type]) {
                waiting_list.items[msg_type] = [];
            }
            waiting_list.items[msg_type].push(promise_obj);
        },
        resolve: (response) => {
            const msg_type      = response.msg_type;
            const this_promises = waiting_list.items[msg_type];
            if (this_promises && this_promises.length) {
                this_promises.forEach((pr) => {
                    if (!waiting_list.another_exists(pr, msg_type)) {
                        pr.resolve(response);
                    }
                });
                waiting_list.items[msg_type] = [];
            }
        },
        another_exists: (pr, msg_type) => (
            Object.keys(waiting_list.items)
                .some(type => (
                    type !== msg_type &&
                    waiting_list.items[type].indexOf(pr) !== -1
                ))
        ),
    };

    const clearTimeouts = () => {
        Object.keys(timeouts).forEach((key) => {
            clearTimeout(timeouts[key]);
            delete timeouts[key];
        });
    };

    const isReady = () => hasReadyState(1);

    const isClose = () => !binary_socket || hasReadyState(2, 3);

    const hasReadyState = (...states) => binary_socket && states.some(s => binary_socket.readyState === s);

    const sendBufferedRequests = () => {
        while (buffered_sends.length > 0 && !availability.is_down) {
            const req_obj = buffered_sends.shift();
            send(req_obj.request, req_obj.options);
        }
    };

    const wait = (...msg_types) => {
        const promise_obj = new PromiseClass();
        let is_resolved   = true;
        msg_types.forEach((msg_type) => {
            const last_response = State.get(['response', msg_type]);
            if (!last_response) {
                if (msg_type !== 'authorize' || ClientBase.isLoggedIn()) {
                    waiting_list.add(msg_type, promise_obj);
                    is_resolved = false;
                }
            } else if (msg_types.length === 1) {
                promise_obj.resolve(last_response);
            }
        });
        if (is_resolved) {
            promise_obj.resolve();
        }
        return promise_obj.promise;
    };

    /**
     * @param {Object} data: request object
     * @param {Object} options:
     *      forced  : {boolean}  sends the request regardless the same msg_type has been sent before
     *      msg_type: {string}   specify the type of request call
     *      callback: {function} to call on response of streaming requests
     */
    const send = function (data, options = {}) {
        const promise_obj = options.promise || new PromiseClass();

        if (!data || isEmptyObject(data)) return promise_obj.promise;

        const msg_type = options.msg_type || no_duplicate_requests.find(c => c in data);

        // Fetch from cache
        if (!options.forced) {
            const response = SocketCache.get(data, msg_type);
            if (response) {
                State.set(['response', msg_type], cloneObject(response));
                if (isReady() && !availability.is_down && !options.skip_cache_update) { // make the request to keep the cache updated
                    binary_socket.send(JSON.stringify(data));
                }
                promise_obj.resolve(response);
                return promise_obj.promise;
            }
        }

        // Fetch from state
        if (!options.forced && msg_type && no_duplicate_requests.indexOf(msg_type) !== -1) {
            const last_response = State.get(['response', msg_type]);
            if (last_response) {
                promise_obj.resolve(last_response);
                return promise_obj.promise;
            } else if (sent_requests.has(msg_type)) {
                return wait(msg_type).then((response) => {
                    promise_obj.resolve(response);
                    return promise_obj.promise;
                });
            }
        }

        if (!data.req_id) {
            data.req_id = ++req_id;
        }
        promises[data.req_id] = {
            callback: (response) => {
                if (typeof options.callback === 'function') {
                    options.callback(response);
                } else {
                    promise_obj.resolve(response);
                }
            },
            subscribe: !!data.subscribe,
        };

        if (isReady() && !availability.is_down && config.isOnline()) {
            is_disconnect_called = false;
            if (!getPropertyValue(data, 'passthrough') && !getPropertyValue(data, 'verify_email')) {
                data.passthrough = {};
            }

            binary_socket.send(JSON.stringify(data));
            config.wsEvent('send');
            if (msg_type && !sent_requests.has(msg_type)) {
                sent_requests.add(msg_type);
            }
        } else if (+data.time !== 1) { // Do not buffer all time requests
            buffered_sends.push({ request: data, options: Object.assign(options, { promise: promise_obj }) });
        }

        return promise_obj.promise;
    };

    const init = (options) => {
        if (wrong_app_id === getAppId()) {
            return;
        }
        if (typeof options === 'object' && config !== options) {
            config         = options;
            buffered_sends = [];
        }
        clearTimeouts();
        config.wsEvent('init');

        if (isClose() || availability.is_updating) {
            binary_socket = new WebSocket(socket_url);
            State.set('response', {});
        }

        binary_socket.onopen = () => {
            config.wsEvent('open');
            // check is not on login page in case client is logged in and now logging in with another account
            // without logging out first by going to the oauth login page directly
            if (ClientBase.isLoggedIn() && !isLoginPages()) {
                send({ authorize: ClientBase.get('token') }, { forced: true });
            } else {
                sendBufferedRequests();
            }

            if (typeof config.onOpen === 'function') {
                config.onOpen(isReady());
            }

            if (typeof config.onReconnect === 'function' && is_connected_before) {
                config.onReconnect();
            }

            if (!is_connected_before) {
                is_connected_before = true;
            }
        };

        binary_socket.onmessage = (msg) => {
            config.wsEvent('message');
            const response = msg.data ? JSON.parse(msg.data) : undefined;
            if (response) {
                SocketCache.set(response);
                const msg_type = response.msg_type;

                // store in State
                if (!getPropertyValue(response, ['echo_req', 'subscribe']) || /balance|website_status/.test(msg_type)) {
                    State.set(['response', msg_type], cloneObject(response));
                }
                // resolve the send promise
                const this_req_id = response.req_id;
                const pr          = this_req_id ? promises[this_req_id] : null;
                if (pr && typeof pr.callback === 'function') {
                    pr.callback(response);
                    if (!pr.subscribe) {
                        delete promises[this_req_id];
                    }
                }
                // resolve the wait promise
                waiting_list.resolve(response);

                if (getPropertyValue(response, ['error', 'code']) === 'InvalidAppID') {
                    wrong_app_id = getAppId();
                }

                if (typeof config.onMessage === 'function') {
                    config.onMessage(response);
                }
            }
        };

        binary_socket.onclose = () => {
            sent_requests.clear();
            clearTimeouts();
            config.wsEvent('close');

            if (wrong_app_id !== getAppId() && typeof config.onDisconnect === 'function' && !is_disconnect_called) {
                config.onDisconnect();
                is_disconnect_called = true;
            }
        };
    };

    const clear = (msg_type) => {
        buffered_sends = [];
        if (msg_type) {
            State.set(['response', msg_type], undefined);
            sent_requests.remove(msg_type);
        }
    };

    const isSiteUp = (status) => /^up$/i.test(status);

    const isSiteUpdating = (status) => /^updating$/i.test(status);

    const isSiteDown = (status) => /^down$/i.test(status);

    // if status is up or updating, consider site available
    // if status is down, consider site unavailable
    const setAvailability = (status) => {
        availability.is_up       = isSiteUp(status);
        availability.is_updating = isSiteUpdating(status);
        availability.is_down     = isSiteDown(status);
    };

    return {
        init,
        wait,
        send,
        clear,
        clearTimeouts,
        hasReadyState,
        isSiteUpdating,
        isSiteDown,
        setAvailability,
        sendBuffered      : sendBufferedRequests,
        get               : () => binary_socket,
        getAvailability   : () => availability,
        setOnDisconnect   : (onDisconnect) => { config.onDisconnect = onDisconnect; },
        setOnReconnect    : (onReconnect) => { config.onReconnect = onReconnect; },
        removeOnReconnect : () => { delete config.onReconnect; },
        removeOnDisconnect: () => { delete config.onDisconnect; },
    };
})();

module.exports = BinarySocketBase;
