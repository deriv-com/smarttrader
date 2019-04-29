(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["smart_chart"],{

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _smartChart = __webpack_require__(865);

var _smartChart2 = _interopRequireDefault(_smartChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _smartChart2.default;

/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _smartchartsBeta = __webpack_require__(825);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _url = __webpack_require__(46);

var _url2 = _interopRequireDefault(_url);

var _connect = __webpack_require__(6);

var _bottomWidgets = __webpack_require__(866);

var _bottomWidgets2 = _interopRequireDefault(_bottomWidgets);

var _controlWidgets = __webpack_require__(867);

var _controlWidgets2 = _interopRequireDefault(_controlWidgets);

var _marker = __webpack_require__(868);

var _marker2 = _interopRequireDefault(_marker);

var _topWidgets = __webpack_require__(869);

var _topWidgets2 = _interopRequireDefault(_topWidgets);

var _symbol = __webpack_require__(870);

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
            return _react2.default.createElement(
                _smartchartsBeta.SmartChart,
                {
                    barriers: this.props.barriers_array,
                    bottomWidgets: !this.props.is_digit_contract || this.props.should_show_last_digit_stats ? null : this.bottomWidgets,
                    chartControlsWidgets: this.props.is_contract_mode ? null : this.chartControlsWidgets,
                    chartType: this.props.chart_type,
                    endEpoch: this.props.range.end_epoch,
                    id: this.props.chart_id,
                    isMobile: this.props.is_mobile,
                    granularity: this.props.granularity,
                    requestAPI: this.props.wsSendRequest,
                    requestForget: this.props.wsForget,
                    requestSubscribe: this.props.wsSubscribe,
                    settings: this.props.settings,
                    showLastDigitStats: this.props.should_show_last_digit_stats,
                    startEpoch: this.props.range.start_epoch,
                    scrollToEpoch: this.props.scroll_to_epoch,
                    scrollToEpochOffset: this.props.scroll_to_offset,
                    symbol: this.props.symbol,
                    topWidgets: this.topWidgets,
                    isConnectionOpened: this.props.is_socket_opened,
                    clearChart: this.props.should_clear_chart,
                    importedLayout: this.props.should_import_layout ? this.props.trade_chart_layout : null,
                    onExportLayout: this.props.should_export_layout ? this.props.exportLayout : null
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
    chart_id: _propTypes2.default.string,
    chart_type: _propTypes2.default.string,
    end_epoch: _propTypes2.default.number,
    exportLayout: _propTypes2.default.func,
    granularity: _propTypes2.default.number,
    InfoBox: _propTypes2.default.node,
    is_contract_mode: _propTypes2.default.bool,
    is_digit_contract: _propTypes2.default.bool,
    is_mobile: _propTypes2.default.bool,
    is_socket_opened: _propTypes2.default.bool,
    is_title_enabled: _propTypes2.default.bool,
    markers_array: _propTypes2.default.array,
    onMount: _propTypes2.default.func,
    onSymbolChange: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func,
    range: _propTypes2.default.object,
    scroll_to_epoch: _propTypes2.default.number,
    scroll_to_epoch_offset: _propTypes2.default.number,
    settings: _propTypes2.default.object,
    should_clear_chart: _propTypes2.default.bool,
    should_export_layout: _propTypes2.default.bool,
    should_import_layout: _propTypes2.default.bool,
    should_show_last_digit_stats: _propTypes2.default.bool,
    start_epoch: _propTypes2.default.number,
    symbol: _propTypes2.default.string,
    trade_chart_layout: _propTypes2.default.object,
    updateChartType: _propTypes2.default.func,
    updateGranularity: _propTypes2.default.func,
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
        chart_type: modules.smart_chart.chart_type,
        is_contract_mode: modules.smart_chart.is_contract_mode,
        exportLayout: modules.smart_chart.exportLayout,
        granularity: modules.smart_chart.granularity,
        is_title_enabled: modules.smart_chart.is_title_enabled,
        markers_array: modules.smart_chart.markers_array,
        onMount: modules.smart_chart.onMount,
        onUnmount: modules.smart_chart.onUnmount,
        range: modules.smart_chart.range,
        settings: modules.smart_chart.settings,
        should_clear_chart: modules.smart_chart.should_clear_chart,
        should_export_layout: modules.smart_chart.should_export_layout,
        should_import_layout: modules.smart_chart.should_import_layout,
        trade_chart_layout: modules.smart_chart.trade_chart_layout,
        updateChartType: modules.smart_chart.updateChartType,
        updateGranularity: modules.smart_chart.updateGranularity,
        wsForget: modules.smart_chart.wsForget,
        wsSendRequest: modules.smart_chart.wsSendRequest,
        wsSubscribe: modules.smart_chart.wsSubscribe,
        is_mobile: ui.is_mobile
    };
})(Chart);

/***/ }),

/***/ 866:
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

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _smartchartsBeta = __webpack_require__(825);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

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

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _smartchartsBeta = __webpack_require__(825);

var _mobx = __webpack_require__(10);

var _mobxReact = __webpack_require__(11);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

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

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _smartchartsBeta = __webpack_require__(825);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

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

/***/ 870:
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