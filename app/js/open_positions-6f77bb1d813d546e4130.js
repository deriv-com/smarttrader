(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["open_positions"],{

/***/ 843:
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

var _emptyTradeHistoryMessage = __webpack_require__(857);

var _emptyTradeHistoryMessage2 = _interopRequireDefault(_emptyTradeHistoryMessage);

var _reportsMeta = __webpack_require__(858);

var _dataTableConstants = __webpack_require__(859);

var _placeholderComponent = __webpack_require__(860);

var _placeholderComponent2 = _interopRequireDefault(_placeholderComponent);

var _connect = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { getContractPath }                 from 'App/Components/Routes/helpers';


var OpenPositions = function (_React$Component) {
    _inherits(OpenPositions, _React$Component);

    function OpenPositions() {
        _classCallCheck(this, OpenPositions);

        return _possibleConstructorReturn(this, (OpenPositions.__proto__ || Object.getPrototypeOf(OpenPositions)).apply(this, arguments));
    }

    _createClass(OpenPositions, [{
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
                active_positions = _props.active_positions,
                component_icon = _props.component_icon,
                is_loading = _props.is_loading,
                error = _props.error,
                is_empty = _props.is_empty,
                currency = _props.currency,
                totals = _props.totals;


            if (error) {
                return _react2.default.createElement(
                    'p',
                    null,
                    error
                );
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_reportsMeta.ReportsMeta, {
                    i18n_heading: (0, _localize.localize)('Open positions'),
                    i18n_message: (0, _localize.localize)('View all active trades on your account that can still incur a profit or a loss.')
                }),
                is_loading && active_positions.length === 0 || is_empty ? _react2.default.createElement(_placeholderComponent2.default, {
                    is_loading: is_loading || !active_positions,
                    is_empty: is_empty,
                    empty_message_component: _emptyTradeHistoryMessage2.default,
                    component_icon: component_icon,
                    localized_message: (0, _localize.localize)('You have no open positions yet.')
                }) : currency && active_positions.length > 0 && _react2.default.createElement(
                    _DataTable2.default,
                    {
                        className: 'open-positions',
                        columns: (0, _dataTableConstants.getOpenPositionsColumnsTemplate)(currency),
                        footer: totals,
                        data_source: active_positions,
                        getRowAction: undefined
                        // getRowAction={(row_obj) => getContractPath(row_obj.id)} TODO uncomment once smart-chart component is fixed.
                    },
                    _react2.default.createElement(_placeholderComponent2.default, {
                        is_loading: is_loading
                    })
                )
            );
        }
    }]);

    return OpenPositions;
}(_react2.default.Component);

OpenPositions.propTypes = {
    active_positions: _mobxReact.PropTypes.arrayOrObservableArray,
    component_icon: _propTypes2.default.func,
    currency: _propTypes2.default.string,
    error: _propTypes2.default.string,
    history: _propTypes2.default.object,
    is_empty: _propTypes2.default.bool,
    is_loading: _propTypes2.default.bool,
    is_mobile: _propTypes2.default.bool,
    is_tablet: _propTypes2.default.bool,
    onMount: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func,
    totals: _propTypes2.default.object
};

exports.default = (0, _connect.connect)(function (_ref) {
    var modules = _ref.modules,
        client = _ref.client;
    return {
        currency: client.currency,
        active_positions: modules.portfolio.active_positions,
        error: modules.portfolio.error,
        is_empty: modules.portfolio.is_active_empty,
        is_loading: modules.portfolio.is_loading,
        onMount: modules.portfolio.onMount,
        onUnmount: modules.portfolio.onUnmount,
        totals: modules.portfolio.totals
    };
})((0, _reactRouterDom.withRouter)(OpenPositions));

/***/ })

}]);