'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scroller = require('../Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Pagination = require('../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Table Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author sujingjing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = {
      columns: _this.processColumns()
    };
    // columns 和 data 的类型是对象，用户在修改 props 时可能会出现 now 和 next 总是一致的问题
    // 这里对这两份数据进行一个缓存
    _this.columns = (0, _cloneDeep2.default)(props.columns);
    _this.data = (0, _cloneDeep2.default)(props.data);
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkScroll(this.getIscroll());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var newState = {};
      if (!(0, _isEqual2.default)(t.columns, nextProps.columns)) {
        // 不在这里更新 t.columns 是因为后面 didUpdate 时还用的到。
        newState.columns = t.processColumns(nextProps);
      }
      if (Object.keys(newState).length) {
        t.setState(newState);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var t = this;
      if (!(0, _isEqual2.default)(t.props.columns, t.columns) || !(0, _isEqual2.default)(t.props.data, t.data)) {
        t.data = (0, _cloneDeep2.default)(t.props.data);
        t.columns = (0, _cloneDeep2.default)(t.props.columns);
      }
      this.checkScroll(this.getIscroll());
    }
    /**
     * 为 column 添加默认值
     */

  }, {
    key: 'processColumns',
    value: function processColumns(props) {
      var t = this;
      var newProps = props || t.props;
      return (0, _cloneDeep2.default)(newProps.columns).map(function (column) {
        var columns = column;
        columns.width = _Context2.default.rem((columns.width || 0.25) * 640, 640);
        columns.align = columns.align || 'left';
        return columns;
      });
    }
  }, {
    key: 'handlePagerChange',
    value: function handlePagerChange(current) {
      this.props.onPagerChange(current);
    }
  }, {
    key: 'checkScroll',
    value: function checkScroll(iscroll) {
      var maxScrollX = iscroll.maxScrollX,
          startX = iscroll.startX;

      var scrollClassName = _Context2.default.prefixClass('table-fixed__has-scroll');

      if (this.leftFixed) {
        if (startX !== undefined) {
          if (startX === 0) {
            this.leftFixed.classList.remove(scrollClassName);
          } else {
            this.leftFixed.classList.add(scrollClassName);
          }
        }
      }

      if (this.rightFixed) {
        if (startX !== undefined) {
          if (startX === maxScrollX) {
            this.rightFixed.classList.remove(scrollClassName);
          } else {
            this.rightFixed.classList.add(scrollClassName);
          }
        } else if (maxScrollX < 0) {
          this.rightFixed.classList.add(scrollClassName);
        }
      }
    }
  }, {
    key: 'getIscroll',
    value: function getIscroll() {
      return this.scroller.scroller;
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader(columns) {
      var cl = columns.length;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('table-header'))
        },
        columns.map(function (column, index) {
          var headerItemStyle = {
            width: column.width,
            textAlign: column.align
          };
          return _react2.default.createElement(
            'div',
            {
              className: (0, _classnames3.default)(_Context2.default.prefixClass('table-header-item omit DIB PL12 PR12'), {
                firstRow: index === 0,
                lastRow: index === cl - 1
              }),
              style: headerItemStyle,
              key: index
            },
            column.title
          );
        })
      );
    }
  }, {
    key: 'renderBody',
    value: function renderBody(columns, fixed) {
      var t = this;
      var data = t.props.data;

      var content = '';
      if (data.data && data.data.length) {
        content = data.data.map(function (item, index) {
          var last = false;
          if (index === data.data.length - 1) {
            last = true;
          }
          return t.renderRow({
            item: item,
            index: index,
            last: last,
            columns: columns,
            fixed: fixed
          });
        });
      } else {
        content = t.renderEmptyContent();
      }
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('table-body FS12 FC6 BCf'))
        },
        content
      );
    }
  }, {
    key: 'renderEmptyContent',
    value: function renderEmptyContent() {
      var t = this;
      var emptyText = t.props.emptyText;

      var screenWidth = window.innerWidth || document.body.clientWidth;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('table-empty-content H40 FC9 FAC')), style: {
            width: screenWidth
          }
        },
        emptyText
      );
    }
  }, {
    key: 'renderRow',
    value: function renderRow(options) {
      var item = options.item,
          index = options.index,
          columns = options.columns;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('table-row')), key: index
        },
        columns.map(function (column, i) {
          var rowItemStyle = {
            width: column.width,
            textAlign: column.align
          };

          return _react2.default.createElement(
            'div',
            {
              className: (0, _classnames3.default)(_Context2.default.prefixClass('table-row-item PL12 PR12 DIB omit'), {
                firstRow: index === 0
              }),
              style: rowItemStyle, key: i
            },
            column.render ? column.render(item[column.dataKey], item) : item[column.dataKey]
          );
        })
      );
    }
  }, {
    key: 'renderPager',
    value: function renderPager() {
      var t = this;
      var _t$props = t.props,
          data = _t$props.data,
          pageSize = _t$props.pageSize;

      if (data.totalCount && data.currentPage) {
        return _react2.default.createElement(_Pagination2.default, {
          className: _Context2.default.prefixClass('table-pager'),
          total: data.totalCount,
          current: data.currentPage,
          onChange: function onChange(current) {
            t.handlePagerChange(current);
          }, pageSize: pageSize
        });
      }
      return null;
    }
  }, {
    key: 'renderFixed',
    value: function renderFixed(columns, direction) {
      var _this2 = this;

      var t = this;
      var columnsValue = columns;
      var _t$props2 = t.props,
          leftFixed = _t$props2.leftFixed,
          rightFixed = _t$props2.rightFixed;

      if (direction === 'left') {
        columnsValue = columnsValue.slice(0, leftFixed);
      } else {
        columnsValue = columnsValue.slice(columnsValue.length - rightFixed, columnsValue.length);
      }
      if (columnsValue.length) {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames3.default)(_Context2.default.prefixClass('table-' + direction + '-fixed PA')),
            ref: function ref(c) {
              _this2[direction + 'Fixed'] = c;
            }
          },
          t.props.showHeader ? t.renderHeader(columnsValue) : null,
          t.renderBody(columnsValue, true)
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _classnames;

      var t = this;
      var className = t.props.className;
      var columns = t.state.columns;

      var scrollerProps = {
        ref: function ref(c) {
          _this3.scroller = c;
        },
        bounce: false,
        mouseWheel: !!_Context2.default.isPC,
        scrollX: true,
        scrollY: false,
        eventPassthrough: true,
        preventDefault: false,
        onScrollStart: function onScrollStart(iscroll) {
          _this3.checkScroll(iscroll);
        },
        onScrollEnd: function onScrollEnd(iscroll) {
          _this3.checkScroll(iscroll);
        }
      };
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('table FS12 PR'), (_classnames = {}, _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'hide-cols-split-line', t.props.hideSplitLine && t.props.leftFixed === 0), _defineProperty(_classnames, 'hide-rows-split-line', t.props.hideSplitLine && t.props.leftFixed > 0), _classnames))
        },
        _react2.default.createElement(
          _Scroller2.default,
          _extends({}, scrollerProps, { className: _Context2.default.prefixClass('table-content-container') }),
          _react2.default.createElement(
            'div',
            { ref: function ref(c) {
                t.mainTable = c;
              }, className: _Context2.default.prefixClass('table-content') },
            t.props.showHeader ? t.renderHeader(columns) : null,
            t.renderBody(columns)
          )
        ),
        t.renderFixed(columns, 'left'),
        t.renderFixed(columns, 'right'),
        t.renderPager()
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

Table.defaultProps = {
  data: {},
  pageSize: 10,
  emptyText: '暂无数据',
  leftFixed: 0,
  hideSplitLine: false,
  rightFixed: 0,
  showHeader: true,
  onPagerChange: function onPagerChange() {}
};

Table.propTypes = {
  columns: _propTypes2.default.array,
  data: _propTypes2.default.object,
  pageSize: _propTypes2.default.number,
  emptyText: _propTypes2.default.string,
  className: _propTypes2.default.string,
  showHeader: _propTypes2.default.bool,
  leftFixed: _propTypes2.default.number,
  rightFixed: _propTypes2.default.number,
  hideSplitLine: _propTypes2.default.bool,
  onPagerChange: _propTypes2.default.func
};

Table.displayName = 'Table';

exports.default = Table;
module.exports = exports['default'];