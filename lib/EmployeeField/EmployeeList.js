'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Avatar = require('../Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _MinusRound = require('salt-icon/lib/MinusRound');

var _MinusRound2 = _interopRequireDefault(_MinusRound);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _FoldablePane = require('../FoldablePane');

var _FoldablePane2 = _interopRequireDefault(_FoldablePane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmployeeList = function (_React$Component) {
  _inherits(EmployeeList, _React$Component);

  function EmployeeList(props) {
    _classCallCheck(this, EmployeeList);

    var _this = _possibleConstructorReturn(this, (EmployeeList.__proto__ || Object.getPrototypeOf(EmployeeList)).call(this, props));

    _this.state = {
      foldablePaneHeight: 164,
      isFold: true
    };
    return _this;
  }

  _createClass(EmployeeList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resetFoldablePane();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _isEqual2.default)(nextProps, this.props) || !(0, _isEqual2.default)(nextState, this.state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.resetFoldablePane();
    }
  }, {
    key: 'onFold',
    value: function onFold(isFold) {
      this.setState({
        isFold: isFold
      });
    }
  }, {
    key: 'resetFoldablePane',
    value: function resetFoldablePane() {
      // 计算第一行和第二行的高度，赋值给FoldablePane
      var row0H = this.row0 ? this.row0.offsetHeight : 0;
      var row1H = this.row1 ? this.row1.offsetHeight : 0;
      this.setState({
        foldablePaneHeight: row0H + row1H,
        isFold: this.state.isFold
      });
    }

    /**
     * 重造数组。
     * 首先对col求余，把原数组补全成能够被col整除的数组
     * （由于使用了flex justify-content: space-between 布局，为避免一行元素不够时空间被平分导致元素不对齐，所以补齐数组）
     * 然后再对原数组按照col进行分组
     * */

  }, {
    key: 'makeUpList',
    value: function makeUpList(list) {
      var col = parseInt(this.props.col, 10);
      var lists = [];
      var copyList = (0, _cloneDeep2.default)(list);
      var extraLen = copyList.length % col;
      var lostLen = extraLen ? col - extraLen : extraLen;
      for (var i = 0; i < lostLen; i++) {
        copyList.push('PLACEHOLDER');
      }
      var len = copyList.length / col;
      for (var _i = 0; _i < len; _i++) {
        lists.push(copyList.splice(0, col));
      }
      return lists;
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, idx) {
      var _this2 = this;

      if (item === 'PLACEHOLDER') {
        return _react2.default.createElement('div', { className: _Context2.default.prefixClass('employee-field-list-item-placeholder'), key: idx });
      }
      return _react2.default.createElement(
        'div',
        { className: _Context2.default.prefixClass('PR employee-field-list-item'), key: idx },
        _react2.default.createElement(_Avatar2.default, {
          className: _Context2.default.prefixClass('employee-field-list-item-avatar'),
          name: item.label,
          src: item.avatar,
          size: 48
        }),
        _react2.default.createElement(
          'p',
          { className: _Context2.default.prefixClass('omit2 employee-field-list-item-name') },
          item.label
        ),
        this.props.readOnly ? '' : _react2.default.createElement(
          'div',
          {
            className: _Context2.default.prefixClass('PA employee-field-list-item-del'),
            onClick: function onClick(e) {
              _this2.props.onDel(item.key, e);
            }
          },
          _react2.default.createElement(_MinusRound2.default, {
            width: 18,
            height: 18
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var lists = this.makeUpList(this.props.list);
      if (!lists.length) {
        return null;
      }
      return _react2.default.createElement(
        _FoldablePane2.default,
        {
          className: _Context2.default.prefixClass('employee-field-foldable-pane'),
          foldHeight: this.state.foldablePaneHeight,
          isFold: this.state.isFold,
          onFold: function onFold(isFold) {
            _this3.onFold(isFold);
          }
        },
        _react2.default.createElement(
          'div',
          {
            className: _Context2.default.prefixClass('employee-field-list')
          },
          lists.map(function (list, index) {
            return _react2.default.createElement(
              'div',
              {
                ref: function ref(c) {
                  _this3['row' + index] = c;
                },
                key: index,
                className: _Context2.default.prefixClass('FBH FBJ employee-field-list-row')
              },
              list.map(function (item, idx) {
                return _this3.renderItem(item, idx);
              })
            );
          })
        )
      );
    }
  }]);

  return EmployeeList;
}(_react2.default.Component);

EmployeeList.propTypes = {
  readOnly: _react2.default.PropTypes.bool,
  col: _react2.default.PropTypes.number,
  list: _react2.default.PropTypes.array,
  onDel: _react2.default.PropTypes.func
};
EmployeeList.defaultProps = {
  readOnly: false,
  col: 5,
  list: [],
  onDel: function onDel() {}
};
EmployeeList.displayName = 'EmployeeField';
exports.default = EmployeeList;
module.exports = exports['default'];