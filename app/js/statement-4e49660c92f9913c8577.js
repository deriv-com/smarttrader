(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statement"],{

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _statement = __webpack_require__(829);

var _statement2 = _interopRequireDefault(_statement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _statement2.default;

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dataTable = __webpack_require__(799);

var _dataTable2 = _interopRequireDefault(_dataTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _dataTable2.default;

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _mobxReact = __webpack_require__(11);

var _ttReactCustomScrollbars = __webpack_require__(95);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _tableRow = __webpack_require__(800);

var _tableRow2 = _interopRequireDefault(_tableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
      1. implement sorting by column (ASC/DESC)
      2. implement filtering per column
*/

var DataTable = function (_React$PureComponent) {
    _inherits(DataTable, _React$PureComponent);

    function DataTable() {
        _classCallCheck(this, DataTable);

        return _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).apply(this, arguments));
    }

    _createClass(DataTable, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.alignHeader();
        }
    }, {
        key: 'alignHeader',
        value: function alignHeader() {
            // scrollbar inside table-body can push content (depending on the browser and if mouse is plugged in)
            if (!this.props.data_source.length) return;
            var first_body_row = this.el_table_body.firstChild;
            var scrollbar_offset = this.el_table_head.offsetWidth - first_body_row.offsetWidth;
            this.el_table_head.style.paddingRight = scrollbar_offset + 'px';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                columns = _props.columns,
                footer = _props.footer,
                getRowLink = _props.getRowLink,
                is_empty = _props.is_empty,
                onScroll = _props.onScroll;


            var TableData = _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.data_source.map(function (row_obj, id) {
                    return _react2.default.createElement(_tableRow2.default, {
                        className: _this2.props.className,
                        row_obj: row_obj,
                        columns: columns,
                        key: id,
                        to: getRowLink && getRowLink(row_obj)
                    });
                }),
                children
            );

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('table', _defineProperty({}, this.props.className + '__table', this.props.className)) },
                _react2.default.createElement(
                    'div',
                    { className: 'table__head', ref: function ref(el) {
                            _this2.el_table_head = el;
                        } },
                    _react2.default.createElement(_tableRow2.default, { className: this.props.className, columns: columns, is_header: true })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'table__body',
                        onScroll: onScroll,
                        ref: function ref(el) {
                            _this2.el_table_body = el;
                        }
                    },
                    is_empty ? TableData : _react2.default.createElement(
                        _ttReactCustomScrollbars.Scrollbars,
                        {
                            style: { width: '100%', height: 'calc(100vh - 35px)' },
                            autoHide: true
                        },
                        TableData
                    )
                ),
                this.props.footer && _react2.default.createElement(
                    'div',
                    { className: 'table__foot' },
                    _react2.default.createElement(_tableRow2.default, {
                        className: this.props.className,
                        row_obj: footer,
                        columns: columns,
                        is_footer: true
                    })
                )
            );
        }
    }]);

    return DataTable;
}(_react2.default.PureComponent);

DataTable.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)]),
    className: _propTypes2.default.string,
    columns: _propTypes2.default.array,
    data_source: _mobxReact.PropTypes.arrayOrObservableArray,
    footer: _propTypes2.default.object,
    getRowLink: _propTypes2.default.func,
    onScroll: _propTypes2.default.func
};

exports.default = DataTable;

/***/ }),

/***/ 800:
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

var _reactRouterDom = __webpack_require__(77);

var _tableCell = __webpack_require__(801);

var _tableCell2 = _interopRequireDefault(_tableCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TableRow = function TableRow(_ref) {
    var className = _ref.className,
        columns = _ref.columns,
        is_footer = _ref.is_footer,
        is_header = _ref.is_header,
        _ref$row_obj = _ref.row_obj,
        row_obj = _ref$row_obj === undefined ? {} : _ref$row_obj,
        to = _ref.to;

    var cells = columns.map(function (_ref2) {
        var col_index = _ref2.col_index,
            renderCellContent = _ref2.renderCellContent,
            title = _ref2.title;

        var cell_content = title;
        if (!is_header) {
            var cell_value = row_obj[col_index] || '';
            cell_content = renderCellContent ? renderCellContent({ cell_value: cell_value, col_index: col_index, row_obj: row_obj, is_footer: is_footer }) : cell_value;
        }

        return _react2.default.createElement(
            _tableCell2.default,
            { col_index: col_index, key: col_index },
            cell_content
        );
    });

    var row_class_name = (0, _classnames2.default)('table__row', { 'table__row-link': to }, _defineProperty({}, className + '__row', className));

    return to ? _react2.default.createElement(
        _reactRouterDom.NavLink,
        { className: row_class_name, to: to },
        cells
    ) : _react2.default.createElement(
        'div',
        { className: row_class_name },
        cells
    );
};

TableRow.propTypes = {
    className: _propTypes2.default.string,
    columns: _propTypes2.default.array,
    is_footer: _propTypes2.default.bool,
    is_header: _propTypes2.default.bool,
    row_obj: _propTypes2.default.object,
    to: _propTypes2.default.string
};

exports.default = TableRow;

/***/ }),

/***/ 801:
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableCell = function TableCell(_ref) {
    var col_index = _ref.col_index,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('table__cell', col_index) },
        children
    );
};

TableCell.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
    col_index: _propTypes2.default.string
};

exports.default = TableCell;

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
*   TODO: Remove the extra classes when splitting the project.
*   Binary 1.0 and Binary Nex is using different classNames
*   to accomplish the same loader effect.
*
*   Classes for Binary 1.0 :
*       <div className={barspinner dark}
*           <div className={rect${inx+1}}
*
*   Classes for Binary Nex :
*       <div className={barspinner barspinner--${ theme || 'dark'}}
*           <div className={barspinner__rect barspinner__rect--${inx + 1}}
*
*   As a temporary solution, we will add both classes for 1.0 and Nex,
*   however we should remove it in the future.
*/

var Loading = function Loading(_ref) {
    var is_invisible = _ref.is_invisible,
        theme = _ref.theme,
        id = _ref.id;
    return _react2.default.createElement(
        'div',
        { id: id, className: 'barspinner barspinner--' + (theme || 'dark') + (is_invisible ? ' invisible' : '') + ' dark' },
        Array.from(new Array(5)).map(function (x, inx) {
            return _react2.default.createElement('div', { key: inx, className: 'barspinner__rect barspinner__rect--' + (inx + 1) + ' rect' + (inx + 1) });
        })
    );
};

exports.default = Loading;

/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _mobxReact = __webpack_require__(11);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(77);

var _DataTable = __webpack_require__(798);

var _DataTable2 = _interopRequireDefault(_DataTable);

var _helpers = __webpack_require__(175);

var _connect = __webpack_require__(7);

var _statementFilter = __webpack_require__(830);

var _statementFilter2 = _interopRequireDefault(_statementFilter);

var _statementCardList = __webpack_require__(831);

var _statementCardList2 = _interopRequireDefault(_statementCardList);

var _emptyStatementMessage = __webpack_require__(840);

var _emptyStatementMessage2 = _interopRequireDefault(_emptyStatementMessage);

var _dataTableConstants = __webpack_require__(841);

var _loading = __webpack_require__(802);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Statement = function (_React$Component) {
    _inherits(Statement, _React$Component);

    function Statement() {
        _classCallCheck(this, Statement);

        return _possibleConstructorReturn(this, (Statement.__proto__ || Object.getPrototypeOf(Statement)).apply(this, arguments));
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
                has_selected_date = _props.has_selected_date,
                data = _props.data,
                is_empty = _props.is_empty,
                is_loading = _props.is_loading,
                is_mobile = _props.is_mobile,
                is_tablet = _props.is_tablet,
                error = _props.error,
                handleScroll = _props.handleScroll;


            if (error) return _react2.default.createElement(
                'p',
                null,
                error
            );

            var columns = (0, _dataTableConstants.getTableColumnsTemplate)();
            var should_show_cards = is_mobile || is_tablet;

            var renderGUI = function renderGUI() {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    is_empty && _react2.default.createElement(_emptyStatementMessage2.default, { has_selected_date: has_selected_date }),
                    is_loading && _react2.default.createElement(_loading2.default, null)
                );
            };

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('statement container', { 'statement--card-view': should_show_cards }) },
                _react2.default.createElement(_statementFilter2.default, { use_native_pickers: should_show_cards }),
                _react2.default.createElement(
                    'div',
                    { className: 'statement__content' },
                    should_show_cards ? _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            _statementCardList2.default,
                            {
                                data: data,
                                onScroll: handleScroll
                            },
                            renderGUI()
                        )
                    ) : _react2.default.createElement(
                        _DataTable2.default,
                        {
                            className: 'statement',
                            data_source: data,
                            columns: columns,
                            onScroll: handleScroll,
                            getRowLink: function getRowLink(row_obj) {
                                return row_obj.id ? (0, _helpers.getContractPath)(row_obj.id) : undefined;
                            },
                            is_empty: is_empty
                        },
                        renderGUI()
                    )
                )
            );
        }
    }]);

    return Statement;
}(_react2.default.Component);

Statement.propTypes = {
    data: _mobxReact.PropTypes.arrayOrObservableArray,
    error: _propTypes2.default.string,
    handleScroll: _propTypes2.default.func,
    has_selected_date: _propTypes2.default.bool,
    history: _propTypes2.default.object,
    is_empty: _propTypes2.default.bool,
    is_loading: _propTypes2.default.bool,
    is_mobile: _propTypes2.default.bool,
    is_tablet: _propTypes2.default.bool,
    onMount: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref) {
    var modules = _ref.modules,
        ui = _ref.ui;
    return {
        is_empty: modules.statement.is_empty,
        has_selected_date: modules.statement.has_selected_date,
        data: modules.statement.data,
        is_loading: modules.statement.is_loading,
        error: modules.statement.error,
        onMount: modules.statement.onMount,
        onUnmount: modules.statement.onUnmount,
        handleScroll: modules.statement.handleScroll,
        is_mobile: ui.is_mobile,
        is_tablet: ui.is_tablet
    };
})((0, _reactRouterDom.withRouter)(Statement));

/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = __webpack_require__(26);

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(4);

var _DatePicker = __webpack_require__(262);

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _connect = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function Filter(_ref) {
    var date_from = _ref.date_from,
        date_to = _ref.date_to,
        handleDateChange = _ref.handleDateChange,
        today = _ref.today,
        use_native_pickers = _ref.use_native_pickers;
    return _react2.default.createElement(
        'div',
        { className: 'statement__filter' },
        _react2.default.createElement(
            'div',
            { className: 'statement__filter-content' },
            _react2.default.createElement(
                'span',
                { className: 'statement__filter-label' },
                (0, _localize.localize)('Filter by date:')
            ),
            _react2.default.createElement(_DatePicker2.default, {
                name: 'date_from',
                placeholder: (0, _localize.localize)('Start date'),
                start_date: date_to || today,
                max_date: date_to || today,
                onChange: handleDateChange,
                value: date_from,
                is_nativepicker: use_native_pickers
            }),
            _react2.default.createElement(
                'span',
                { className: 'statement__filter-dash' },
                '\u2014'
            ),
            _react2.default.createElement(_DatePicker2.default, {
                name: 'date_to',
                placeholder: (0, _localize.localize)('End date'),
                start_date: today,
                min_date: date_from,
                max_date: today,
                has_today_btn: true,
                onChange: handleDateChange,
                value: date_to,
                is_nativepicker: use_native_pickers
            })
        )
    );
};

Filter.propTypes = {
    date_from: _propTypes2.default.string,
    date_to: _propTypes2.default.string,
    handleDateChange: _propTypes2.default.func,
    server_time: _propTypes2.default.object,
    today: _propTypes2.default.string,
    use_native_pickers: _propTypes2.default.bool
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var common = _ref2.common,
        modules = _ref2.modules;
    return {
        today: (0, _moment2.default)(common.server_time).format('YYYY-MM-DD'),
        date_from: modules.statement.date_from,
        date_to: modules.statement.date_to,
        handleDateChange: modules.statement.handleDateChange
    };
})(Filter);

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mobxReact = __webpack_require__(11);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _statementCard = __webpack_require__(832);

var _statementCard2 = _interopRequireDefault(_statementCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatementCardList = function StatementCardList(_ref) {
    var data = _ref.data,
        onScroll = _ref.onScroll,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'card-list statement__card-list', onScroll: onScroll },
        data.map(function (transaction, id) {
            return _react2.default.createElement(_statementCard2.default, _extends({ className: 'card-list__card card-list__card-link' }, transaction, { key: id }));
        }),
        children
    );
};

StatementCardList.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)]),
    data: _mobxReact.PropTypes.arrayOrObservableArray,
    onScroll: _propTypes2.default.func
};

exports.default = StatementCardList;

/***/ }),

/***/ 832:
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

var _reactRouterDom = __webpack_require__(77);

var _Statement = __webpack_require__(833);

var _helpers = __webpack_require__(175);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatementCard = function StatementCard(_ref) {
    var action = _ref.action,
        amount = _ref.amount,
        balance = _ref.balance,
        className = _ref.className,
        date = _ref.date,
        desc = _ref.desc,
        id = _ref.id,
        payout = _ref.payout,
        refid = _ref.refid;

    var icon = action.toLowerCase();

    var content = _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            'div',
            { className: 'statement-card__header' },
            _react2.default.createElement(
                'span',
                { className: 'statement-card__date' },
                date
            ),
            _react2.default.createElement(
                'span',
                { className: 'statement-card__refid' },
                refid
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'statement-card__body' },
            _react2.default.createElement(
                'div',
                { className: 'statement-card__desc' },
                desc
            ),
            _react2.default.createElement(
                'div',
                { className: 'statement-card__row' },
                _react2.default.createElement(
                    'div',
                    { className: 'statement-card__cell statement-card__amount statement-card__amount--' + action.toLowerCase() },
                    icon === 'sell' && _react2.default.createElement(_Statement.IconSell, { className: 'statement-card__icon' }),
                    icon === 'buy' && _react2.default.createElement(_Statement.IconBuy, { className: 'statement-card__icon' }),
                    icon === 'deposit' && _react2.default.createElement(_Statement.IconDeposit, { className: 'statement-card__icon' }),
                    icon === 'withdrawal' && _react2.default.createElement(_Statement.IconWithdrawal, { className: 'statement-card__icon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-card__cell-text' },
                        amount
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'statement-card__cell statement-card__payout' },
                    _react2.default.createElement(_Statement.IconPayout, { className: 'statement-card__icon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-card__cell-text' },
                        payout
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'statement-card__cell statement-card__balance' },
                    _react2.default.createElement(_Statement.IconWallet, { className: 'statement-card__icon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-card__cell-text' },
                        balance
                    )
                )
            )
        )
    );

    var class_name = (0, _classnames2.default)('statement-card', className);

    return id ? _react2.default.createElement(
        _reactRouterDom.NavLink,
        { className: class_name, activeClassName: 'active', to: (0, _helpers.getContractPath)(id) },
        content
    ) : _react2.default.createElement(
        'div',
        { className: class_name },
        content
    );
};

StatementCard.propTypes = {
    action: _propTypes2.default.string,
    amount: _propTypes2.default.string,
    balance: _propTypes2.default.string,
    className: _propTypes2.default.string,
    date: _propTypes2.default.string,
    desc: _propTypes2.default.string,
    id: _propTypes2.default.string,
    payout: _propTypes2.default.string,
    refid: _propTypes2.default.string
};

exports.default = StatementCard;

/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iconBuy = __webpack_require__(834);

Object.keys(_iconBuy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconBuy[key];
    }
  });
});

var _iconDeposit = __webpack_require__(835);

Object.keys(_iconDeposit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconDeposit[key];
    }
  });
});

var _iconPayout = __webpack_require__(836);

Object.keys(_iconPayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconPayout[key];
    }
  });
});

var _iconSell = __webpack_require__(837);

Object.keys(_iconSell).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconSell[key];
    }
  });
});

var _iconWallet = __webpack_require__(838);

Object.keys(_iconWallet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconWallet[key];
    }
  });
});

var _iconWithdrawal = __webpack_require__(839);

Object.keys(_iconWithdrawal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconWithdrawal[key];
    }
  });
});

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconBuy = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconBuy = function IconBuy(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), width: '16', height: '16', viewBox: '0 0 16 16' },
        _react2.default.createElement('path', { d: 'M1.707 6.5H15.5a.5.5 0 1 1 0 1H.5a.5.5 0 0 1-.354-.854l3-3a.5.5 0 1 1 .708.708L1.707 6.5zm0 3l2.147 2.146a.5.5 0 1 1-.708.708l-3-3A.5.5 0 0 1 .5 8.5h15a.5.5 0 1 1 0 1H1.707z', fill: '#F44336' })
    );
};

IconBuy.propTypes = {
    className: _propTypes2.default.string,
    classNamePath: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

exports.IconBuy = IconBuy;

/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconDeposit = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconDeposit = function IconDeposit(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), width: '16', height: '16', viewBox: '0 0 16 16' },
        _react2.default.createElement('path', { className: 'color1-fill', d: 'M8.5 11.413l2.675-2.293a.5.5 0 0 1 .65.76l-3.497 2.998a.498.498 0 0 1-.656 0L4.175 9.88a.5.5 0 1 1 .65-.76L7.5 11.413V1.5a.5.5 0 0 1 1 0v9.913zM14 14v-2.5a.5.5 0 1 1 1 0v3a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-3a.5.5 0 1 1 1 0V14h12z', fill: '#4CAF50' })
    );
};

IconDeposit.propTypes = {
    className: _propTypes2.default.string,
    classNamePath: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

exports.IconDeposit = IconDeposit;

/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconPayout = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconPayout = function IconPayout(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), width: '16', height: '16', viewBox: '0 0 16 16' },
        _react2.default.createElement('path', { className: 'color1-fill', d: 'M5.867 4.522L4.11 2.34a.5.5 0 0 1 .082-.707c.46-.36 1.06-.557 1.679-.557.554 0 1.137.124 2.102.418.123.036.254.055.388.054.302 0 .581-.07 1.114-.254.533-.185.75-.248 1.055-.28.08-.009.157-.013.236-.013.36 0 .71.1 1.002.285a.5.5 0 0 1 .15.696l-1.71 2.611c.585.554 1.12 1.173 1.599 1.85C13.532 8.864 14 9.942 14 12.066c.002.76-.257 1.493-.726 2.04-.482.564-1.149.887-1.85.887L4.584 15c-.704-.001-1.372-.324-1.855-.888-.47-.549-.73-1.283-.729-2.044 0-2.12.468-3.199 2.193-5.626.5-.705 1.061-1.348 1.674-1.92zm3.533-.52l1.31-2a1.294 1.294 0 0 0-.075.005c-.201.021-.374.072-.832.23-.634.22-.995.31-1.44.31a2.35 2.35 0 0 1-.677-.096c-.88-.268-1.387-.376-1.815-.376-.212 0-.42.035-.609.1L6.731 4h2.622a.5.5 0 0 1 .047.002zm2.024 9.992c.402 0 .794-.19 1.09-.536.31-.363.487-.863.486-1.39 0-1.873-.392-2.777-2.009-5.048A11.297 11.297 0 0 0 9.17 5H6.831a11.505 11.505 0 0 0-1.823 2.02C3.392 9.296 3 10.2 3 12.07c0 .526.177 1.029.489 1.392.297.348.69.538 1.094.539l6.841-.006zM8.799 10.7a.66.66 0 0 0-.184-.48c-.123-.127-.328-.24-.615-.342a4.84 4.84 0 0 1-.67-.282c-.531-.285-.797-.706-.797-1.264 0-.379.115-.69.345-.934.23-.243.543-.388.937-.434V6.22h.547v.752c.396.057.703.225.92.504.216.28.324.642.324 1.089h-.827c0-.287-.065-.513-.193-.679a.63.63 0 0 0-.525-.247c-.219 0-.39.059-.513.177-.123.119-.184.289-.184.51 0 .198.06.357.183.476.122.12.328.233.62.34a5.4 5.4 0 0 1 .687.298c.166.091.306.195.42.313.114.117.202.252.264.405.061.152.092.331.092.536 0 .385-.118.698-.354.937-.236.24-.564.38-.986.424v.666h-.543v-.663c-.452-.05-.799-.212-1.041-.485-.243-.274-.364-.636-.364-1.087h.83c0 .287.073.51.217.666.145.158.35.236.614.236.26 0 .457-.062.593-.188a.647.647 0 0 0 .203-.499z', fill: '#FFF' })
    );
};

IconPayout.propTypes = {
    className: _propTypes2.default.string,
    classNamePath: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

exports.IconPayout = IconPayout;

/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconSell = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconSell = function IconSell(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), width: '16', height: '16', viewBox: '0 0 16 16' },
        _react2.default.createElement('path', { d: 'M14.293 6.5l-2.147-2.146a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1-.354.854H.5a.5.5 0 0 1 0-1h13.793zM.5 9.5a.5.5 0 0 1 0-1h15a.5.5 0 0 1 .354.854l-3 3a.5.5 0 0 1-.708-.708L14.293 9.5H.5z', fill: '#4CAF50' })
    );
};

IconSell.propTypes = {
    className: _propTypes2.default.string,
    classNamePath: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

exports.IconSell = IconSell;

/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconWallet = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconWallet = function IconWallet(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), width: '16', height: '16', viewBox: '0 0 16 16' },
        _react2.default.createElement('path', { className: 'color1-fill', d: 'M15 11V8h-3.5a1.5 1.5 0 0 0 0 3H15zm0-4V5H2a1.99 1.99 0 0 1-1-.268V13.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V12h-3.5a2.5 2.5 0 1 1 0-5H15zm0-3h1v9.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5V3a2 2 0 0 1 2-2h13v3zm-1 0V2H2a1 1 0 1 0 0 2h12zm-2.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z', fill: '#2A3052' })
    );
};

IconWallet.propTypes = {
    className: _propTypes2.default.string,
    classNamePath: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

exports.IconWallet = IconWallet;

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconWithdrawal = undefined;

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconWithdrawal = function IconWithdrawal(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: (0, _classnames2.default)('inline-icon', className), width: '16', height: '16', viewBox: '0 0 16 16' },
        _react2.default.createElement('path', { className: 'color1-fill', d: 'M7.672 1.122a.498.498 0 0 1 .656 0l3.497 2.998a.5.5 0 1 1-.65.76L8.5 2.587V12.5a.5.5 0 1 1-1 0V2.587L4.825 4.88a.5.5 0 1 1-.65-.76l3.497-2.998zM14 14v-2.5a.5.5 0 1 1 1 0v3a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-3a.5.5 0 1 1 1 0V14h12z', fill: '#F44336' })
    );
};

IconWithdrawal.propTypes = {
    className: _propTypes2.default.string,
    classNamePath: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

exports.IconWithdrawal = IconWithdrawal;

/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(4);

var _NavBar = __webpack_require__(79);

var _Constants = __webpack_require__(130);

var _Routes = __webpack_require__(96);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyStatementMessage = function EmptyStatementMessage(_ref) {
    var has_selected_date = _ref.has_selected_date;
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            'div',
            { className: 'statement-empty' },
            _react2.default.createElement(_NavBar.IconStatement, { className: 'statement-empty__icon' }),
            _react2.default.createElement(
                'span',
                { className: 'statement-empty__text' },
                !has_selected_date ? (0, _localize.localize)('Your account has no trading activity.') : (0, _localize.localize)('Your account has no trading activity for the selected period.')
            ),
            !has_selected_date && _react2.default.createElement(
                _Routes.ButtonLink,
                {
                    className: 'btn--secondary btn--secondary--orange',
                    to: _Constants.routes.trade
                },
                _react2.default.createElement(
                    'span',
                    null,
                    (0, _localize.localize)('Trade now')
                )
            )
        )
    );
};

EmptyStatementMessage.propTypes = {
    has_selected_date: _propTypes2.default.bool
};

exports.default = EmptyStatementMessage;

/***/ }),

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTableColumnsTemplate = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(4);

var _amountCell = __webpack_require__(842);

var _amountCell2 = _interopRequireDefault(_amountCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name, react/prop-types */
var getTableColumnsTemplate = exports.getTableColumnsTemplate = function getTableColumnsTemplate() {
    return [{ title: (0, _localize.localize)('Date'), col_index: 'date' }, { title: (0, _localize.localize)('Ref.'), col_index: 'refid' }, { title: (0, _localize.localize)('Description'), col_index: 'desc' }, { title: (0, _localize.localize)('Action'), col_index: 'action' }, { title: (0, _localize.localize)('Potential Payout'), col_index: 'payout' }, { title: (0, _localize.localize)('Credit/Debit'), col_index: 'amount', renderCellContent: function renderCellContent(_ref) {
            var cell_value = _ref.cell_value;
            return _react2.default.createElement(_amountCell2.default, { value: cell_value });
        } }, { title: (0, _localize.localize)('Balance'), col_index: 'balance' }];
};
/* eslint-enable react/display-name, react/prop-types */

/***/ }),

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmountCell = function AmountCell(_ref) {
    var value = _ref.value;

    var status = +value.replace(/,/g, '') >= 0 ? 'profit' : 'loss';

    return _react2.default.createElement(
        'span',
        { className: 'amount--' + status },
        value
    );
};

AmountCell.propTypes = {
    value: _propTypes2.default.string
};

exports.default = AmountCell;

/***/ })

}]);