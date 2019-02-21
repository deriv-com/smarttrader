(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contract"],{

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _contract = __webpack_require__(753);

var _contract2 = _interopRequireDefault(_contract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _contract2.default;

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = __webpack_require__(46);

var _Errors = __webpack_require__(173);

var _Errors2 = _interopRequireDefault(_Errors);

var _connect = __webpack_require__(12);

var _contractDetails = __webpack_require__(266);

var _contractDetails2 = _interopRequireDefault(_contractDetails);

var _infoBox = __webpack_require__(267);

var _infoBox2 = _interopRequireDefault(_infoBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmartChart = _react2.default.lazy(function () {
    return Promise.all(/* import() */[__webpack_require__.e("vendors~smart_chart"), __webpack_require__.e("smart_chart")]).then(__webpack_require__.t.bind(null, 739, 7));
});

var Contract = function Contract(_ref) {
    var is_mobile = _ref.is_mobile,
        error_message = _ref.error_message,
        has_error = _ref.has_error,
        match = _ref.match,
        symbol = _ref.symbol,
        chart_config = _ref.chart_config,
        updateChartType = _ref.updateChartType,
        updateGranularity = _ref.updateGranularity;

    var form_wrapper_class = is_mobile ? 'mobile-wrapper' : 'sidebar-container desktop-only';
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
                    _react2.default.createElement(SmartChart, _extends({
                        InfoBox: _react2.default.createElement(_infoBox2.default, null),
                        symbol: symbol
                    }, chart_config, {
                        updateChartType: updateChartType,
                        updateGranularity: updateGranularity
                    }))
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
                        classNames: 'contract-wrapper',
                        unmountOnExit: true
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'contract-wrapper' },
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
    chart_config: _propTypes2.default.object,
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
        chart_config: modules.contract.chart_config,
        error_message: modules.contract.error_message,
        has_error: modules.contract.has_error,
        updateChartType: modules.contract.updateChartType,
        updateGranularity: modules.contract.updateGranularity,
        is_mobile: ui.is_mobile,
        symbol: modules.contract.contract_info.underlying
    };
})(Contract);

/***/ })

}]);