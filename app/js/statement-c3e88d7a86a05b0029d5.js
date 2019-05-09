(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statement"],{

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobxReact = __webpack_require__(12);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(56);

var _localize = __webpack_require__(5);

var _DataTable = __webpack_require__(848);

var _DataTable2 = _interopRequireDefault(_DataTable);

var _helpers = __webpack_require__(177);

var _connect = __webpack_require__(7);

var _dataTableConstants = __webpack_require__(859);

var _placeholderComponent = __webpack_require__(860);

var _placeholderComponent2 = _interopRequireDefault(_placeholderComponent);

var _reportsMeta = __webpack_require__(858);

var _emptyTradeHistoryMessage = __webpack_require__(857);

var _emptyTradeHistoryMessage2 = _interopRequireDefault(_emptyTradeHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Statement = function (_React$Component) {
    _inherits(Statement, _React$Component);

    function Statement() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Statement);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Statement.__proto__ || Object.getPrototypeOf(Statement)).call.apply(_ref, [this].concat(args))), _this), _this.getRowAction = function (row_obj) {
            var action = void 0;

            if (row_obj.id && ['buy', 'sell'].includes(row_obj.action_type)) {
                action = (0, _helpers.getContractPath)(row_obj.id);
            } else if (['deposit', 'withdrawal'].includes(row_obj.action_type)) {
                action = {
                    message: row_obj.desc
                };
            }

            return action;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Statement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onMount();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.onUnmount();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                component_icon = _props.component_icon,
                currency = _props.currency,
                data = _props.data,
                is_empty = _props.is_empty,
                is_loading = _props.is_loading,
                error = _props.error,
                handleScroll = _props.handleScroll,
                has_selected_date = _props.has_selected_date;


            if (error) return _react2.default.createElement(
                'p',
                null,
                error
            );

            var columns = (0, _dataTableConstants.getStatementTableColumnsTemplate)(currency);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_reportsMeta.ReportsMeta, {
                    i18n_heading: (0, _localize.localize)('Statement'),
                    i18n_message: (0, _localize.localize)('View all transactions on your account, including trades, deposits, and withdrawals.')
                }),
                is_loading && data.length === 0 || is_empty ? _react2.default.createElement(_placeholderComponent2.default, {
                    is_loading: is_loading,
                    has_selected_date: has_selected_date,
                    is_empty: is_empty,
                    empty_message_component: _emptyTradeHistoryMessage2.default,
                    component_icon: component_icon,
                    localized_message: (0, _localize.localize)('You have no transactions yet.'),
                    localized_period_message: (0, _localize.localize)('You have no transactions for this period.')
                }) : _react2.default.createElement(
                    _DataTable2.default,
                    {
                        className: 'statement',
                        data_source: data,
                        columns: columns,
                        onScroll: handleScroll
                        // getRowAction={this.getRowAction} // TODO uncomment when chart layout is ready for statements
                        , getRowAction: undefined,
                        is_empty: is_empty
                    },
                    _react2.default.createElement(_placeholderComponent2.default, {
                        is_loading: is_loading
                    })
                )
            );
        }
    }]);

    return Statement;
}(_react2.default.Component);

Statement.propTypes = {
    component_icon: _propTypes2.default.func,
    data: _mobxReact.PropTypes.arrayOrObservableArray,
    error: _propTypes2.default.string,
    handleScroll: _propTypes2.default.func,
    has_selected_date: _propTypes2.default.bool,
    history: _propTypes2.default.object,
    is_empty: _propTypes2.default.bool,
    is_loading: _propTypes2.default.bool,
    onMount: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var modules = _ref2.modules,
        client = _ref2.client;
    return {
        currency: client.currency,
        data: modules.statement.data,
        error: modules.statement.error,
        handleScroll: modules.statement.handleScroll,
        has_selected_date: modules.statement.has_selected_date,
        is_empty: modules.statement.is_empty,
        is_loading: modules.statement.is_loading,
        onMount: modules.statement.onMount,
        onUnmount: modules.statement.onUnmount
    };
})((0, _reactRouterDom.withRouter)(Statement));

/***/ })

}]);