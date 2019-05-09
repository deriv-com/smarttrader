(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contract"],{

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _contract = __webpack_require__(863);

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _contract2.default;

/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _underlyingIcon = __webpack_require__(296);

var _Types = __webpack_require__(128);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMarketInformation = function getMarketInformation(payload) {
    var pattern = new RegExp('^([A-Z]+)_((OTC_[A-Z0-9]+)|R_[\\d]{2,3}|[A-Z]+)_'); // Used to get market name from shortcode
    var extracted = pattern.exec(payload.shortcode);
    if (extracted !== null) {
        return {
            category: extracted[1].toLowerCase(),
            underlying: extracted[2]
        };
    }
    return null;
};

var MarketSymbolIconRow = function MarketSymbolIconRow(_ref) {
    var payload = _ref.payload,
        show_description = _ref.show_description;

    var should_show_category_icon = typeof payload.shortcode === 'string';
    var market_information = getMarketInformation(payload);

    if (should_show_category_icon && market_information) {
        return _react2.default.createElement(
            'div',
            { className: 'market-symbol-icon' },
            _react2.default.createElement(
                'div',
                { className: 'market-symbol-icon-name' },
                _react2.default.createElement(_underlyingIcon.UnderlyingIcon, { market: market_information.underlying }),
                show_description && payload.display_name
            ),
            _react2.default.createElement(
                'div',
                { className: 'market-symbol-icon-category' },
                _react2.default.createElement(_Types.IconTradeType, { type: market_information.category }),
                show_description && market_information.category
            )
        );
    }

    return _react2.default.createElement(
        'svg',
        { width: '32', height: '32', className: 'unknown-icon' },
        _react2.default.createElement('rect', { width: '32', height: '32' })
    );
};

MarketSymbolIconRow.propTypes = {
    action: _propTypes2.default.string,
    payload: _propTypes2.default.object,
    show_description: _propTypes2.default.bool
};

exports.default = MarketSymbolIconRow;

/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContractCard = function ContractCard(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'contract-card' },
        children
    );
};

ContractCard.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array])
};

exports.default = ContractCard;

/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = __webpack_require__(26);

var _Errors = __webpack_require__(303);

var _Errors2 = _interopRequireDefault(_Errors);

var _connect = __webpack_require__(7);

var _contractReplay = __webpack_require__(864);

var _contractReplay2 = _interopRequireDefault(_contractReplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contract = function Contract(_ref) {
    var error_message = _ref.error_message,
        has_error = _ref.has_error,
        match = _ref.match;
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        has_error ? _react2.default.createElement(_Errors2.default, { message: error_message }) : _react2.default.createElement(
            'div',
            { className: 'trade-container' },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactTransitionGroup.CSSTransition,
                    {
                        'in': !has_error,
                        timeout: 400,
                        classNames: {
                            enter: 'contract--enter',
                            enterDone: 'contract--enter-done',
                            exit: 'contract--exit'
                        },
                        unmountOnExit: true
                    },
                    _react2.default.createElement(_contractReplay2.default, { contract_id: match.params.contract_id, key: match.params.contract_id })
                )
            )
        )
    );
};

Contract.propTypes = {
    error_message: _propTypes2.default.string,
    has_error: _propTypes2.default.bool,
    is_mobile: _propTypes2.default.bool,
    match: _propTypes2.default.object,
    symbol: _propTypes2.default.string
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var modules = _ref2.modules,
        ui = _ref2.ui;
    return {
        error_message: modules.contract.error_message,
        has_error: modules.contract.has_error,
        is_mobile: ui.is_mobile,
        symbol: modules.contract.contract_info.underlying
    };
})(Contract);

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ContractDrawer = __webpack_require__(865);

var _ContractDrawer2 = _interopRequireDefault(_ContractDrawer);

var _uiLoader = __webpack_require__(130);

var _uiLoader2 = _interopRequireDefault(_uiLoader);

var _connect = __webpack_require__(7);

var _logic = __webpack_require__(66);

var _digits = __webpack_require__(301);

var _digits2 = _interopRequireDefault(_digits);

var _infoBox = __webpack_require__(302);

var _infoBox2 = _interopRequireDefault(_infoBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractReplay = function (_React$Component) {
    _inherits(ContractReplay, _React$Component);

    function ContractReplay() {
        _classCallCheck(this, ContractReplay);

        return _possibleConstructorReturn(this, (ContractReplay.__proto__ || Object.getPrototypeOf(ContractReplay)).apply(this, arguments));
    }

    _createClass(ContractReplay, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onMount(this.props.contract_id);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.onUnmount();
        }
    }, {
        key: 'render',
        value: function render() {
            var SmartChart = _react2.default.lazy(function () {
                return Promise.all(/* import() | smart_chart */[__webpack_require__.e("vendors~smart_chart"), __webpack_require__.e("smart_chart")]).then(__webpack_require__.t.bind(null, 838, 7));
            });
            var status = this.props.contract_info.status;


            if (status) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(_ContractDrawer2.default, { contract_info: this.props.contract_info, heading: 'Reports' }),
                    _react2.default.createElement(
                        _react2.default.Suspense,
                        { fallback: _react2.default.createElement(_uiLoader2.default, null) },
                        _react2.default.createElement(SmartChart, {
                            chart_id: this.props.chart_id,
                            is_contract_mode: true,
                            Digits: _react2.default.createElement(_digits2.default, null),
                            InfoBox: _react2.default.createElement(_infoBox2.default, null),
                            is_ended: (0, _logic.isEnded)(this.props.contract_info),
                            end_epoch: this.props.contract_info.date_start,
                            start_epoch: this.props.contract_info.date_expiry
                        })
                    )
                );
            }
            return _react2.default.createElement(_uiLoader2.default, null);
        }
    }]);

    return ContractReplay;
}(_react2.default.Component);

ContractReplay.propTypes = {
    chart_id: _propTypes2.default.number,
    contract_id: _propTypes2.default.string,
    contract_info: _propTypes2.default.object,
    onMount: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func,
    symbol: _propTypes2.default.string
};

exports.default = (0, _connect.connect)(function (_ref) {
    var modules = _ref.modules;
    return {
        contract_info: modules.contract.contract_info,
        chart_id: modules.trade.chart_id,
        onMount: modules.contract.onMount,
        onUnmount: modules.contract.onUnmount
    };
})(ContractReplay);

/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContractCard = exports.default = undefined;

var _contractDrawer = __webpack_require__(866);

var _contractDrawer2 = _interopRequireDefault(_contractDrawer);

var _contractCard = __webpack_require__(861);

var _contractCard2 = _interopRequireDefault(_contractCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _contractDrawer2.default;
exports.ContractCard = _contractCard2.default;

/***/ }),

/***/ 866:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(42);

var _localize = __webpack_require__(46);

var _localize2 = _interopRequireDefault(_localize);

var _Common = __webpack_require__(11);

var _routes = __webpack_require__(57);

var _routes2 = _interopRequireDefault(_routes);

var _profitLossCardContent = __webpack_require__(867);

var _profitLossCardContent2 = _interopRequireDefault(_profitLossCardContent);

var _marketSymbolIconRow = __webpack_require__(850);

var _marketSymbolIconRow2 = _interopRequireDefault(_marketSymbolIconRow);

var _contractCardBody = __webpack_require__(868);

var _contractCardBody2 = _interopRequireDefault(_contractCardBody);

var _contractCardFooter = __webpack_require__(869);

var _contractCardFooter2 = _interopRequireDefault(_contractCardFooter);

var _contractCardHeader = __webpack_require__(870);

var _contractCardHeader2 = _interopRequireDefault(_contractCardHeader);

var _contractCard = __webpack_require__(861);

var _contractCard2 = _interopRequireDefault(_contractCard);

var _contractAudit = __webpack_require__(871);

var _contractAudit2 = _interopRequireDefault(_contractAudit);

var _money = __webpack_require__(83);

var _money2 = _interopRequireDefault(_money);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractDrawer = function (_Component) {
    _inherits(ContractDrawer, _Component);

    function ContractDrawer() {
        _classCallCheck(this, ContractDrawer);

        return _possibleConstructorReturn(this, (ContractDrawer.__proto__ || Object.getPrototypeOf(ContractDrawer)).apply(this, arguments));
    }

    _createClass(ContractDrawer, [{
        key: 'getBodyContent',
        value: function getBodyContent() {
            var _props$contract_info = this.props.contract_info,
                buy_price = _props$contract_info.buy_price,
                currency = _props$contract_info.currency,
                payout = _props$contract_info.payout,
                profit = _props$contract_info.profit;


            return _react2.default.createElement(
                _contractCard2.default,
                { contract_info: this.props.contract_info },
                _react2.default.createElement(
                    _contractCardHeader2.default,
                    null,
                    _react2.default.createElement(_marketSymbolIconRow2.default, {
                        show_description: true,
                        payload: this.props.contract_info
                    })
                ),
                _react2.default.createElement(
                    _contractCardBody2.default,
                    null,
                    _react2.default.createElement(_profitLossCardContent2.default, {
                        pl_value: +profit,
                        payout: +payout,
                        currency: currency
                    })
                ),
                _react2.default.createElement(
                    _contractCardFooter2.default,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'purchase-price-container' },
                        _react2.default.createElement(_localize2.default, { str: 'Purchase Price:' }),
                        '\xA0',
                        _react2.default.createElement(
                            'span',
                            { className: 'purchase-price' },
                            _react2.default.createElement(_money2.default, {
                                currency: currency,
                                amount: buy_price
                            })
                        )
                    ),
                    _react2.default.createElement(_contractAudit2.default, { contract: this.props.contract_info })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var body_content = this.getBodyContent();
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('contract-drawer', {}) },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'contract-drawer__heading',
                        onClick: function onClick() {
                            return _this2.props.history.push(_routes2.default.reports);
                        }
                    },
                    _react2.default.createElement(_Common.Icon, { icon: _Common.IconBack }),
                    _react2.default.createElement(
                        'h2',
                        null,
                        _react2.default.createElement(_localize2.default, { str: this.props.heading || 'Contract' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'contract-drawer__body' },
                    body_content
                )
            );
        }
    }]);

    return ContractDrawer;
}(_react.Component);

ContractDrawer.propTypes = {
    contract_info: _propTypes2.default.object,
    heading: _propTypes2.default.string
};

exports.default = (0, _reactRouter.withRouter)(ContractDrawer);

/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(46);

var _localize2 = _interopRequireDefault(_localize);

var _money = __webpack_require__(83);

var _money2 = _interopRequireDefault(_money);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfitLossCardContent = function ProfitLossCardContent(_ref) {
    var currency = _ref.currency,
        pl_value = _ref.pl_value,
        payout = _ref.payout;
    return _react2.default.createElement(
        'div',
        { className: 'pl-card' },
        _react2.default.createElement(
            'div',
            { className: 'pl-card__item' },
            _react2.default.createElement(
                'div',
                { className: 'pl-card__item__header' },
                _react2.default.createElement(_localize2.default, { str: 'P/L:' })
            ),
            _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('pl-card__item__body', {
                        'pl-card__item__body--loss': +pl_value < 0,
                        'pl-card__item__body--profit': +pl_value > 0
                    })
                },
                _react2.default.createElement(_money2.default, { currency: currency, amount: pl_value })
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'pl-card__item' },
            _react2.default.createElement(
                'div',
                { className: 'pl-card__item__header' },
                _react2.default.createElement(_localize2.default, { str: 'Payout:' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'pl-card__item__body' },
                _react2.default.createElement(_money2.default, { currency: currency, amount: payout })
            )
        )
    );
};

ProfitLossCardContent.propTypes = {
    currency: _propTypes2.default.string,
    payout: _propTypes2.default.number,
    pl_value: _propTypes2.default.number
};
exports.default = ProfitLossCardContent;

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContractCardBody = function ContractCardBody(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'contract-card__body' },
        children
    );
};

ContractCardBody.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

exports.default = ContractCardBody;

/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContractCardFooter = function ContractCardFooter(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'contract-card__footer' },
        children
    );
};

ContractCardFooter.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array])
};

exports.default = ContractCardFooter;

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContractCardHeader = function ContractCardHeader(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'contract-card__header' },
        children
    );
};

ContractCardHeader.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

exports.default = ContractCardHeader;

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = __webpack_require__(23);

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(46);

var _localize2 = _interopRequireDefault(_localize);

var _Common = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pair = function Pair(_ref) {
    var value = _ref.value,
        label = _ref.label;
    return _react2.default.createElement(
        'div',
        { className: 'pair' },
        _react2.default.createElement(
            'div',
            { className: 'pair__label' },
            _react2.default.createElement(_localize2.default, { str: label })
        ),
        _react2.default.createElement(
            'div',
            { className: 'pair__value' },
            value
        )
    );
};

var ContractAudit = function (_Component) {
    _inherits(ContractAudit, _Component);

    function ContractAudit(props) {
        _classCallCheck(this, ContractAudit);

        var _this = _possibleConstructorReturn(this, (ContractAudit.__proto__ || Object.getPrototypeOf(ContractAudit)).call(this, props));

        _this.state = {
            is_visible: false
        };
        return _this;
    }

    _createClass(ContractAudit, [{
        key: 'toggleVisibility',
        value: function toggleVisibility() {
            this.setState({
                is_visible: !this.state.is_visible
            });
        }
    }, {
        key: 'getDuration',
        value: function getDuration() {
            var _props$contract = this.props.contract,
                tick_count = _props$contract.tick_count,
                date_start = _props$contract.date_start,
                date_expiry = _props$contract.date_expiry;


            var is_tick_contract = !!tick_count;
            if (is_tick_contract) {
                return tick_count + ' tick' + (tick_count > 1 ? 's' : '');
            }

            var start_time = (0, _moment2.default)(date_start * 1000);
            var end_time = (0, _moment2.default)(date_expiry * 1000);
            var duration = _moment2.default.duration(end_time.diff(start_time));

            return _moment2.default.utc(duration.as('milliseconds')).format('HH:mm:ss');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$contract2 = this.props.contract,
                barrier = _props$contract2.barrier,
                transaction_ids = _props$contract2.transaction_ids,
                entry_tick = _props$contract2.entry_tick,
                exit_tick = _props$contract2.exit_tick,
                entry_tick_time = _props$contract2.entry_tick_time,
                exit_tick_time = _props$contract2.exit_tick_time;


            return _react2.default.createElement(
                'div',
                { className: 'contract-audit' },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'contract-audit__toggle',
                        onClick: this.toggleVisibility.bind(this)
                    },
                    _react2.default.createElement(_Common.Icon, {
                        icon: _Common.IconArrowBold,
                        className: (0, _classnames2.default)('contract-audit__arrow', {
                            'contract-audit__arrow--is-open': this.state.is_visible
                        })
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('contract-audit__details', {
                            'contract-audit__details--is-expanded': this.state.is_visible,
                            'contract-audit__details--is-hidden': !this.state.is_visible
                        })
                    },
                    _react2.default.createElement('div', { className: 'border' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'pairs' },
                        _react2.default.createElement(Pair, { label: 'Ref. ID (Buy)', value: transaction_ids.buy }),
                        _react2.default.createElement(Pair, { label: 'Ref. ID (Sell)', value: transaction_ids.sell })
                    ),
                    _react2.default.createElement('div', { className: 'border' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'pairs' },
                        _react2.default.createElement(Pair, { label: 'Duration', value: this.getDuration() }),
                        _react2.default.createElement(Pair, { label: 'Barrier', value: barrier })
                    ),
                    _react2.default.createElement('div', { className: 'border' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'pairs' },
                        _react2.default.createElement(Pair, { label: 'Entry Spot', value: entry_tick }),
                        _react2.default.createElement(Pair, { label: 'Exit Spot', value: exit_tick })
                    ),
                    _react2.default.createElement('div', { className: 'border' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'pairs' },
                        _react2.default.createElement(Pair, { label: 'Start Time', value: entry_tick_time }),
                        _react2.default.createElement(Pair, { label: 'End Time', value: exit_tick_time })
                    )
                )
            );
        }
    }]);

    return ContractAudit;
}(_react.Component);

ContractAudit.propTypes = {
    contract: _propTypes2.default.object
};

exports.default = ContractAudit;

/***/ })

}]);