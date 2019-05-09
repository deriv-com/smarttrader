(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports"],{

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _reports = __webpack_require__(890);

var _reports2 = _interopRequireDefault(_reports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _reports2.default;

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(56);

var _verticalTab = __webpack_require__(297);

var _verticalTab2 = _interopRequireDefault(_verticalTab);

var _Settings = __webpack_require__(298);

var _routes = __webpack_require__(57);

var _routes2 = _interopRequireDefault(_routes);

var _localize = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reports = function Reports(_ref) {
    var routes = _ref.routes,
        location = _ref.location,
        history = _ref.history;

    var menu_options = function menu_options() {
        var options = [];

        routes.forEach(function (route) {
            options.push({
                default: route.default,
                icon: route.icon_component,
                label: route.title,
                value: route.component,
                path: route.path
            });
        });

        return options;
    };

    var action_bar_items = [{
        onClick: function onClick() {
            history.push(_routes2.default.trade);
        },
        icon: _Settings.IconClose,
        title: (0, _localize.localize)('Close')
    }];

    return _react2.default.createElement(
        'div',
        { className: 'reports' },
        _react2.default.createElement(_verticalTab2.default, {
            header_title: (0, _localize.localize)('Reports'),
            action_bar: action_bar_items,
            alignment: 'center',
            classNameHeader: 'reports__tab-header',
            current_path: location.pathname,
            is_routed: true,
            is_full_width: true,
            list: menu_options()
        })
    );
};

Reports.propTypes = {
    history: _propTypes2.default.object,
    location: _propTypes2.default.object,
    routes: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

exports.default = (0, _reactRouterDom.withRouter)(Reports);

/***/ })

}]);