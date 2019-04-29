(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contract"],{

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _contract = __webpack_require__(831);

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _contract2.default;

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = __webpack_require__(24);

var _Errors = __webpack_require__(295);

var _Errors2 = _interopRequireDefault(_Errors);

var _connect = __webpack_require__(6);

var _contractDetails = __webpack_require__(832);

var _contractDetails2 = _interopRequireDefault(_contractDetails);

var _digits = __webpack_require__(305);

var _digits2 = _interopRequireDefault(_digits);

var _infoBox = __webpack_require__(306);

var _infoBox2 = _interopRequireDefault(_infoBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmartChart = _react2.default.lazy(function () {
    return Promise.all(/* import() */[__webpack_require__.e("vendors~smart_chart"), __webpack_require__.e("smart_chart")]).then(__webpack_require__.t.bind(null, 818, 7));
});

var Contract = function Contract(_ref) {
    var is_mobile = _ref.is_mobile,
        error_message = _ref.error_message,
        has_error = _ref.has_error,
        match = _ref.match,
        symbol = _ref.symbol;

    var form_wrapper_class = is_mobile ? 'mobile-wrapper' : 'sidebar__container desktop-only';
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        has_error ? _react2.default.createElement(_Errors2.default, { message: error_message }) : _react2.default.createElement(
            'div',
            { className: 'trade-container' },
            _react2.default.createElement(
                'div',
                { className: 'chart-container' },
                symbol && _react2.default.createElement(
                    _react2.default.Suspense,
                    { fallback: _react2.default.createElement(
                            'div',
                            null,
                            'Loading... '
                        ) },
                    _react2.default.createElement(SmartChart, {
                        InfoBox: _react2.default.createElement(_infoBox2.default, null),
                        Digits: _react2.default.createElement(_digits2.default, null),
                        symbol: symbol
                    })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: form_wrapper_class },
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
                    _react2.default.createElement(
                        'div',
                        { className: 'contract__wrapper' },
                        _react2.default.createElement(_contractDetails2.default, {
                            contract_id: match.params.contract_id,
                            key: match.params.contract_id
                        })
                    )
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

/***/ 832:
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

var _reactRouterDom = __webpack_require__(81);

var _localize = __webpack_require__(4);

var _uiLoader = __webpack_require__(131);

var _uiLoader2 = _interopRequireDefault(_uiLoader);

var _routes = __webpack_require__(101);

var _routes2 = _interopRequireDefault(_routes);

var _connect = __webpack_require__(6);

var _detailsContents = __webpack_require__(833);

var _detailsContents2 = _interopRequireDefault(_detailsContents);

var _detailsHeader = __webpack_require__(835);

var _detailsHeader2 = _interopRequireDefault(_detailsHeader);

var _Errors = __webpack_require__(295);

var _Errors2 = _interopRequireDefault(_Errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractDetails = function (_React$Component) {
    _inherits(ContractDetails, _React$Component);

    function ContractDetails() {
        _classCallCheck(this, ContractDetails);

        return _possibleConstructorReturn(this, (ContractDetails.__proto__ || Object.getPrototypeOf(ContractDetails)).apply(this, arguments));
    }

    _createClass(ContractDetails, [{
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
            var _props$contract_info = this.props.contract_info,
                contract_id = _props$contract_info.contract_id,
                longcode = _props$contract_info.longcode,
                transaction_ids = _props$contract_info.transaction_ids;


            if (contract_id && !this.props.has_error) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'contract-container' },
                        _react2.default.createElement(_detailsHeader2.default, { status: this.props.display_status }),
                        _react2.default.createElement(_detailsContents2.default, {
                            buy_id: transaction_ids.buy,
                            details_expiry: this.props.details_expiry,
                            details_info: this.props.details_info,
                            longcode: longcode
                        }),
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            {
                                className: 'btn btn--link btn--secondary btn--secondary--orange',
                                to: _routes2.default.trade,
                                onClick: this.props.onClickNewTrade
                            },
                            _react2.default.createElement(
                                'span',
                                { className: 'btn__text' },
                                (0, _localize.localize)('Start a new trade')
                            )
                        )
                    )
                );
            } else if (!contract_id && !this.props.has_error) {
                return _react2.default.createElement(_uiLoader2.default, null);
            }
            return _react2.default.createElement(_Errors2.default, { message: this.props.error_message });
        }
    }]);

    return ContractDetails;
}(_react2.default.Component);

ContractDetails.propTypes = {
    contract_id: _propTypes2.default.string,
    contract_info: _propTypes2.default.object,
    details_expiry: _propTypes2.default.object,
    details_info: _propTypes2.default.object,
    display_status: _propTypes2.default.string,
    error_message: _propTypes2.default.string,
    has_error: _propTypes2.default.bool,
    onClickNewTrade: _propTypes2.default.func,
    onMount: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref) {
    var modules = _ref.modules;
    return {
        contract_info: modules.contract.contract_info,
        details_info: modules.contract.details_info,
        details_expiry: modules.contract.details_expiry,
        display_status: modules.contract.display_status,
        error_message: modules.contract.error_message,
        has_error: modules.contract.has_error,
        onMount: modules.contract.onMount,
        onUnmount: modules.contract.onUnmount
    };
})(ContractDetails);

/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mobxReact = __webpack_require__(11);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(4);

var _detailsGroup = __webpack_require__(834);

var _detailsGroup2 = _interopRequireDefault(_detailsGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailsContents = function DetailsContents(_ref) {
    var buy_id = _ref.buy_id,
        details_expiry = _ref.details_expiry,
        details_info = _ref.details_info,
        longcode = _ref.longcode;
    return _react2.default.createElement(
        'div',
        { className: 'contract-contents' },
        _react2.default.createElement(
            'div',
            { className: 'longcode' },
            longcode
        ),
        _react2.default.createElement(
            'div',
            { className: 'ref-number' },
            (0, _localize.localize)('Reference No:'),
            ' ',
            buy_id
        ),
        _react2.default.createElement(_detailsGroup2.default, {
            title: (0, _localize.localize)('Contract Information'),
            items: details_info
        }),
        _react2.default.createElement(_detailsGroup2.default, {
            title: (0, _localize.localize)('Contract Expiry'),
            items: details_expiry
        })
    );
};

DetailsContents.propTypes = {
    buy_id: _propTypes2.default.string,
    details_expiry: _propTypes2.default.object,
    details_info: _propTypes2.default.object,
    longcode: _propTypes2.default.string
};

exports.default = (0, _mobxReact.observer)(DetailsContents);

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mobxReact = __webpack_require__(11);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utility = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailsGroup = function DetailsGroup(_ref) {
    var items = _ref.items,
        title = _ref.title;
    return !title || (0, _utility.isEmptyObject)(items) ? '' : _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            'div',
            { className: 'info-header' },
            title
        ),
        Object.keys(items).map(function (key) {
            return _react2.default.createElement(
                'div',
                { className: 'info-item', key: key },
                _react2.default.createElement(
                    'div',
                    null,
                    key
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    items[key]
                )
            );
        })
    );
};

DetailsGroup.propTypes = {
    items: _propTypes2.default.object,
    title: _propTypes2.default.string
};

exports.default = (0, _mobxReact.observer)(DetailsGroup);

/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _mobxReact = __webpack_require__(11);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ui = __webpack_require__(836);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailsHeader = function DetailsHeader(_ref) {
    var status = _ref.status;

    var header_config = (0, _ui.getHeaderConfig)();
    var title_purchased = header_config.purchased.title;
    var title_result = header_config[status].title;
    var icon_purchased = header_config.purchased.icon;
    var icon_result = header_config[status].icon;

    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('contract-header', status) },
        _react2.default.createElement(
            'div',
            { className: 'header-wrapper' },
            _react2.default.createElement(
                'div',
                { className: 'header-result' },
                icon_result,
                title_result
            ),
            _react2.default.createElement(
                'div',
                { className: 'header-purchased' },
                icon_purchased,
                title_purchased
            )
        )
    );
};

DetailsHeader.propTypes = {
    status: _propTypes2.default.oneOf(['purchased', 'won', 'lost'])
};

exports.default = (0, _mobxReact.observer)(DetailsHeader);

/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeaderConfig = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(4);

var _iconFlag = __webpack_require__(178);

var _iconFlag2 = _interopRequireDefault(_iconFlag);

var _iconTick = __webpack_require__(296);

var _iconTick2 = _interopRequireDefault(_iconTick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeaderConfig = exports.getHeaderConfig = function getHeaderConfig() {
    return {
        purchased: { title: (0, _localize.localize)('Contract Purchased'), icon: _react2.default.createElement(_iconTick2.default, null) },
        won: { title: (0, _localize.localize)('Contract Won'), icon: _react2.default.createElement(_iconFlag2.default, null) },
        lost: { title: (0, _localize.localize)('Contract Lost'), icon: _react2.default.createElement(_iconFlag2.default, null) }
    };
};

/***/ })

}]);