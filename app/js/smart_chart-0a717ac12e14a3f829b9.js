(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["smart_chart"],{

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _smartChart = __webpack_require__(837);

var _smartChart2 = _interopRequireDefault(_smartChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _smartChart2.default;

/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _smartchartsBeta = __webpack_require__(787);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _url = __webpack_require__(95);

var _url2 = _interopRequireDefault(_url);

var _connect = __webpack_require__(11);

var _bottomWidgets = __webpack_require__(838);

var _bottomWidgets2 = _interopRequireDefault(_bottomWidgets);

var _controlWidgets = __webpack_require__(839);

var _controlWidgets2 = _interopRequireDefault(_controlWidgets);

var _marker = __webpack_require__(840);

var _marker2 = _interopRequireDefault(_marker);

var _topWidgets = __webpack_require__(841);

var _topWidgets2 = _interopRequireDefault(_topWidgets);

var _symbol = __webpack_require__(842);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _smartchartsBeta.setSmartChartsPublicPath)(_url2.default.urlForStatic('js/smartcharts/'));

var Chart = function (_React$Component) {
    _inherits(Chart, _React$Component);

    function Chart() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Chart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chart.__proto__ || Object.getPrototypeOf(Chart)).call.apply(_ref, [this].concat(args))), _this), _this.chartControlsWidgets = function () {
            return _react2.default.createElement(_controlWidgets2.default, {
                updateChartType: _this.props.updateChartType,
                updateGranularity: _this.props.updateGranularity
            });
        }, _this.topWidgets = function () {
            return _react2.default.createElement(_topWidgets2.default, {
                InfoBox: _this.props.InfoBox,
                is_title_enabled: _this.props.is_title_enabled,
                onSymbolChange: (0, _symbol.symbolChange)(_this.props.onSymbolChange)
            });
        }, _this.bottomWidgets = function () {
            return _react2.default.createElement(_bottomWidgets2.default, { Digits: _this.props.Digits });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Chart, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.onUnmount();
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _smartchartsBeta.SmartChart,
                {
                    barriers: this.props.barriers_array,
                    bottomWidgets: this.props.should_show_last_digit_stats ? undefined : this.bottomWidgets,
                    chartControlsWidgets: this.chartControlsWidgets,
                    chartType: this.props.chart_type,
                    endEpoch: this.props.end_epoch,
                    granularity: this.props.granularity,
                    id: this.props.chart_id,
                    isMobile: this.props.is_mobile,
                    requestAPI: this.props.wsSendRequest,
                    requestForget: this.props.wsForget,
                    requestSubscribe: this.props.wsSubscribe,
                    settings: this.props.settings,
                    showLastDigitStats: this.props.should_show_last_digit_stats,
                    startEpoch: this.props.start_epoch,
                    symbol: this.props.symbol,
                    topWidgets: this.topWidgets,
                    isConnectionOpened: this.props.is_socket_opened
                },
                this.props.markers_array.map(function (marker, idx) {
                    return _react2.default.createElement(_marker2.default, {
                        key: idx,
                        marker_config: marker.marker_config,
                        marker_content_props: marker.content_config
                    });
                })
            );
        }
    }]);

    return Chart;
}(_react2.default.Component);

Chart.propTypes = {
    barriers_array: _propTypes2.default.array,
    BottomWidgets: _propTypes2.default.node,
    chart_id: _propTypes2.default.number,
    chart_type: _propTypes2.default.string,
    end_epoch: _propTypes2.default.number,
    granularity: _propTypes2.default.number,
    InfoBox: _propTypes2.default.node,
    is_mobile: _propTypes2.default.bool,
    is_title_enabled: _propTypes2.default.bool,
    markers_array: _propTypes2.default.array,
    onSymbolChange: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func,
    settings: _propTypes2.default.object,
    should_show_last_digit_stats: _propTypes2.default.bool,
    start_epoch: _propTypes2.default.number,
    symbol: _propTypes2.default.string,
    wsForget: _propTypes2.default.func,
    wsSendRequest: _propTypes2.default.func,
    wsSubscribe: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var modules = _ref2.modules,
        ui = _ref2.ui,
        common = _ref2.common;
    return {
        is_socket_opened: common.is_socket_opened,
        barriers_array: modules.smart_chart.barriers_array,
        is_title_enabled: modules.smart_chart.is_title_enabled,
        markers_array: modules.smart_chart.markers_array,
        onUnmount: modules.smart_chart.onUnmount,
        settings: modules.smart_chart.settings,
        wsForget: modules.smart_chart.wsForget,
        wsSendRequest: modules.smart_chart.wsSendRequest,
        wsSubscribe: modules.smart_chart.wsSubscribe,
        is_mobile: ui.is_mobile
    };
})(Chart);

/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BottomWidgets = function BottomWidgets(_ref) {
    var Digits = _ref.Digits;
    return _react2.default.createElement(
        'div',
        { className: 'bottom-widgets' },
        Digits
    );
};

BottomWidgets.propTypes = {
    Digits: _propTypes2.default.node
};

exports.default = BottomWidgets;

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _smartchartsBeta = __webpack_require__(787);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControlWidgets = function ControlWidgets(_ref) {
    var updateChartType = _ref.updateChartType,
        updateGranularity = _ref.updateGranularity;
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_smartchartsBeta.CrosshairToggle, null),
        _react2.default.createElement(_smartchartsBeta.ChartTypes, { onChange: updateChartType }),
        _react2.default.createElement(_smartchartsBeta.StudyLegend, null),
        _react2.default.createElement(_smartchartsBeta.Comparison, null),
        _react2.default.createElement(_smartchartsBeta.DrawTools, null),
        _react2.default.createElement(_smartchartsBeta.Views, null),
        _react2.default.createElement(_smartchartsBeta.Share, null),
        _react2.default.createElement(_smartchartsBeta.Timeperiod, { onChange: updateGranularity }),
        _react2.default.createElement(_smartchartsBeta.ChartSize, null)
    );
};

ControlWidgets.propTypes = {
    updateChartType: _propTypes2.default.func,
    updateGranularity: _propTypes2.default.func
};

exports.default = ControlWidgets;

/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _smartchartsBeta = __webpack_require__(787);

var _mobx = __webpack_require__(8);

var _mobxReact = __webpack_require__(10);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChartMarker = function ChartMarker(_ref) {
    var marker_config = _ref.marker_config,
        marker_content_props = _ref.marker_content_props;

    var ContentComponent = marker_config.ContentComponent,
        marker_props = _objectWithoutProperties(marker_config, ['ContentComponent']);

    return _react2.default.createElement(
        _smartchartsBeta.Marker,
        (0, _mobx.toJS)(marker_props),
        _react2.default.createElement(ContentComponent, (0, _mobx.toJS)(marker_content_props))
    );
};

ChartMarker.propTypes = {
    marker_config: _propTypes2.default.object,
    marker_content_props: _propTypes2.default.object
};

exports.default = (0, _mobxReact.observer)(ChartMarker);

/***/ }),

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _smartchartsBeta = __webpack_require__(787);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopWidgets = function TopWidgets(_ref) {
    var InfoBox = _ref.InfoBox,
        _ref$is_title_enabled = _ref.is_title_enabled,
        is_title_enabled = _ref$is_title_enabled === undefined ? true : _ref$is_title_enabled,
        onSymbolChange = _ref.onSymbolChange;
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        InfoBox,
        _react2.default.createElement(_smartchartsBeta.ChartTitle, { enabled: is_title_enabled, onChange: onSymbolChange }),
        _react2.default.createElement(_smartchartsBeta.AssetInformation, null)
    );
};

TopWidgets.propTypes = {
    InfoBox: _propTypes2.default.node,
    is_title_enabled: _propTypes2.default.bool,
    onSymbolChange: _propTypes2.default.func
};

exports.default = TopWidgets;

/***/ }),

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var symbolChange = exports.symbolChange = function symbolChange(onSymbolChange) {
    return onSymbolChange && function (symbol) {
        onSymbolChange({
            target: {
                name: 'symbol',
                value: symbol
            }
        });
    };
};

/***/ })

}]);