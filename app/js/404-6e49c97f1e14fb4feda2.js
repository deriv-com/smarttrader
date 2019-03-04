(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["404"],{

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Page = __webpack_require__(798);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Page2.default;

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Constants = __webpack_require__(173);

var _localize = __webpack_require__(4);

var _Routes = __webpack_require__(126);

var _ErrorBox = __webpack_require__(799);

var _ErrorBox2 = _interopRequireDefault(_ErrorBox);

var _Icon = __webpack_require__(801);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page404 = function Page404() {
    return _react2.default.createElement(
        'div',
        { className: 'page-error__container' },
        _react2.default.createElement(
            _ErrorBox2.default,
            {
                header: (0, _localize.localize)('Page not found'),
                icon: _react2.default.createElement(_Icon.Icon404, null),
                message: (0, _localize.localize)('Sorry, we couldn\'t find the page you are looking for.')
            },
            _react2.default.createElement(
                _Routes.ButtonLink,
                {
                    className: 'btn--secondary btn--secondary--orange',
                    to: _Constants.routes.trade
                },
                _react2.default.createElement(
                    'span',
                    null,
                    (0, _localize.localize)('Go to trade page')
                )
            )
        )
    );
};

exports.default = Page404;

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _errorBox = __webpack_require__(800);

var _errorBox2 = _interopRequireDefault(_errorBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _errorBox2.default;

/***/ }),

/***/ 800:
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

var ErrorBox = function ErrorBox(_ref) {
    var header = _ref.header,
        icon = _ref.icon,
        message = _ref.message,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'page-error__box' },
        icon,
        _react2.default.createElement(
            'h3',
            { className: 'page-error__header' },
            header
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'p',
                { className: 'page-error__message' },
                message
            )
        ),
        children
    );
};

ErrorBox.propTypes = {
    children: _propTypes2.default.node,
    header: _propTypes2.default.string,
    icon: _propTypes2.default.node,
    message: _propTypes2.default.string
};

exports.default = ErrorBox;

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Icon404 = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon404 = function Icon404(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 163.61 82.15', height: '64' },
        _react2.default.createElement('defs', null),
        _react2.default.createElement(
            'g',
            { id: 'Layer_2', 'data-name': 'Layer 2' },
            _react2.default.createElement(
                'g',
                { id: 'Layer_1-2', 'data-name': 'Layer 1' },
                _react2.default.createElement(
                    'g',
                    { id: 'Layer_1-2-2', 'data-name': 'Layer 1-2' },
                    _react2.default.createElement('path', { className: 'color1-stroke', fill: 'none', stroke: '#2a3051', strokeMiterlimit: '10', d: 'M116.85 4.22L51.71 81.04' }),
                    _react2.default.createElement('path', { className: 'color1-fill', d: 'M74.05 51.64a56 56 0 0 1-.58-8.48V28.71q.11-10.84 3.27-16.06t10.11-5.23q7 0 10.21 5.25a22.91 22.91 0 0 1 2.71 8.64l7-8.23a22.71 22.71 0 0 0-3-5.73Q98.33 0 86.85 0t-17 7.62q-5.43 7.62-5.42 23.29V43q.13 10.13 2.67 16.85zM97.19 30.52a59.46 59.46 0 0 1 .49 8V53.3q-.15 11.13-3.39 16.31t-9.94 5.17a11.07 11.07 0 0 1-10.13-5.49 23.35 23.35 0 0 1-2.75-8.44l-6.85 8.08-.15-.13a24.07 24.07 0 0 0 3 5.81q5.53 7.55 16.88 7.54t16.94-7.71q5.43-7.71 5.42-23.58V39.14q-.09-10.2-2.53-16.86zM41.46 53.28h9.86v7.37h-9.86v16.5h-9.09v-16.5H0v-5.32L31.84 6.06h9.62zm-31.21 0h22.12V18.41l-1.07 2zM153.75 54h9.86v7.37h-9.86v16.5h-9.08V61.38h-32.38v-5.32l31.84-49.27h9.62zm-31.2 0h22.12V19.14l-1.08 2z' })
                )
            )
        )
    );
};

Icon404.propTypes = {
    className: _propTypes2.default.string
};

exports.Icon404 = Icon404;

/***/ })

}]);