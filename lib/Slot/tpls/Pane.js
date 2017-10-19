'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Slot Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

var React = require('react');
var classnames = require('classnames');
var Context = require('../../Context');
var Scroller = require('../../Scroller');

// 滑动效果的动画函数
var LINEAR_EASE = {
  style: 'linear',
  fn: function fn(k) {
    return k;
  }
};

var equals = function equals(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

var SlotPane = function (_React$Component) {
  _inherits(SlotPane, _React$Component);

  function SlotPane(props) {
    _classCallCheck(this, SlotPane);

    var _this = _possibleConstructorReturn(this, (SlotPane.__proto__ || Object.getPrototypeOf(SlotPane)).call(this, props));

    var t = _this;
    // 初始状态
    t.state = {
      scrolling: false,
      data: _this.props.data || [],
      selectedIndex: t.findSelectedIndex(_this.props)
    };
    return _this;
  }

  _createClass(SlotPane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var t = this;

      // 获取所有 scroller 的容器
      var slotBody = t.pane.querySelector('.' + Context.prefixClass('slot-body'));

      // 获取选项高度
      t.findItemHeight(slotBody);

      // tap 事件触发选中状态变更
      slotBody.addEventListener('iscroll:tap', function (e) {
        var className = e.target.className;
        var reg = new RegExp(Context.prefixClass('slot-item(\\d+)_(\\d+)'));
        var match = reg.exec(className);
        if (match && className.indexOf(Context.prefixClass('slot-item-active')) === -1) {
          var column = parseInt(match[1], 10);
          var index = parseInt(match[2], 10);
          t.props.onChange(t.getData(column, index), column, index);
        }
      }, false);

      // 初始化滚动的标记
      t.willRefresh = true;
      this.scrollAll(0);
    }

    // 减少渲染次数

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;

      var data = nextProps.data;
      var selectedIndex = t.findSelectedIndex(nextProps);

      // 数据变化需要重新初始化 scroller
      var state = {};
      var willRefresh = false;
      if (!equals(t.state.data, data)) {
        state.data = data;
        if (t.props.scrollMod === 'keep') {
          // 替换列后仍保留指定值的位置
          // 记录旧值在新数据中的索引
          t.selectedIndex = t.findSelectedIndex({
            data: data,
            value: t.state.selectedIndex.map(function (n, i) {
              return t.state.data[i][n];
            })
          });
          // 标记变更的列
          t.columnChanged = t.state.data.map(function (n, i) {
            return !equals(data[i], n);
          });
        }
        willRefresh = true;
      }
      if (!equals(t.state.selectedIndex, selectedIndex)) {
        state.selectedIndex = selectedIndex;
        willRefresh = true;
      }
      if (willRefresh) {
        t.willRefresh = true;
        t.setState(state);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var t = this;

      // 获取选项高度
      t.findItemHeight();

      // 可见的时候滚动到选中的选项
      if (t.willRefresh) {
        t.willRefresh = false;
        t.scrollAll(200);
      }
    }

    // 获取值的时候指定变更的列，为什么要这么做，是因为有变更后我不直接改 state！

  }, {
    key: 'getData',
    value: function getData(sColumn, sIndex) {
      var t = this;
      var ret = [];
      var _t$state = t.state,
          data = _t$state.data,
          selectedIndex = _t$state.selectedIndex;


      selectedIndex.forEach(function (index, column) {
        ret[column] = data[column][column === sColumn ? sIndex : index];
      });

      return ret;
    }
  }, {
    key: 'setDefaultLastChoose',
    value: function setDefaultLastChoose(value) {
      if (value && value.length > 0) {
        return value;
      }

      var ret = [];
      this.props.data.forEach(function (item) {
        ret.push(item[0]);
      });

      return ret;
    }
  }, {
    key: 'handleScrollEnd',
    value: function handleScrollEnd(column) {
      var t = this;
      t.setState({
        scrolling: false
      }, function () {
        t.props.onScrolling(t.state.scrolling);
      });
      var scroller = t.refs['scroller' + column].scroller;
      var height = t.itemHeight;
      var remainder = Math.abs(scroller.y % height);
      var index = scroller.y / height;

      // 没有滚动到选项，需要继续滚动一段距离
      if (remainder) {
        var func = void 0;
        if (scroller.distY > 0) {
          // 向下滚动
          if (remainder < height * 0.7) {
            func = 'ceil';
          } else {
            func = 'floor';
          }
        } else if (remainder > height * 0.3) {
          // 向上滚动
          func = 'floor';
        } else {
          func = 'ceil';
        }

        index = Math[func](scroller.y / height);
      }

      // 在 onChange 中设置状态
      index = Math.abs(index);
      t.props.onChange(t.getData(column, index), column, index);
    }
  }, {
    key: 'handleScrollStart',
    value: function handleScrollStart() {
      var t = this;
      t.setState({
        scrolling: true
      }, function () {
        t.props.onScrolling(t.state.scrolling);
      });
    }
  }, {
    key: 'findSelectedIndex',
    value: function findSelectedIndex(props) {
      var data = props.data || [];
      var value = props.value || this.setDefaultLastChoose();
      var selectedIndex = [];

      // 遍历数据模型
      data.forEach(function (columnData, column) {
        selectedIndex[column] = 0;

        // 遍历每一列
        for (var i = 0; i < columnData.length; i++) {
          // 定位选中值
          if (value[column] && columnData[i].value === value[column].value) {
            selectedIndex[column] = i;
            break;
          }
        }
      });

      return selectedIndex;
    }
  }, {
    key: 'scrollAll',
    value: function scrollAll(time) {
      var t = this;
      if (t.props.scrollMod === 'keep' && t.selectedIndex) {
        t.selectedIndex.forEach(function (index, column) {
          var scroller = t.refs['scroller' + column].scroller;
          if (t.columnChanged[column]) {
            scroller.scrollTo(0, -index * t.itemHeight, 0, LINEAR_EASE);
          }
        });
        delete t.selectedIndex;
        setTimeout(function () {
          t.state.selectedIndex.forEach(function (index, column) {
            var scroller = t.refs['scroller' + column].scroller;
            scroller.scrollTo(0, -index * t.itemHeight, time, LINEAR_EASE);
          });
        }, 5);
      } else {
        t.state.selectedIndex.forEach(function (index, column) {
          var scroller = t.refs['scroller' + column].scroller;
          scroller.scrollTo(0, -index * t.itemHeight, time, LINEAR_EASE);
        });
      }
    }
  }, {
    key: 'findItemHeight',
    value: function findItemHeight(slotBody) {
      var t = this;
      if (!t.itemHeight) {
        var newSlotBody = slotBody || t.pane.querySelector('.' + Context.prefixClass('slot-body'));
        var li = newSlotBody.querySelector('li');
        t.itemHeight = li ? parseFloat(getComputedStyle(li, null).height) : 0;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var _t$props = t.props,
          visible = _t$props.visible,
          columnsFlex = _t$props.columnsFlex;

      return React.createElement(
        'div',
        { ref: function ref(c) {
            _this2.pane = c;
          }, className: Context.prefixClass('slot-pane') },
        t.props.columns && t.props.columns.length ? React.createElement(
          'ul',
          { className: Context.prefixClass('slot-columns FBH') },
          t.props.columns.map(function (c, i) {
            var style = {};
            if (columnsFlex instanceof Array && typeof columnsFlex[i] === 'number') {
              style.flex = columnsFlex[i];
            }
            return React.createElement(
              'li',
              { key: 'column' + i, style: style, className: Context.prefixClass('FB1 FAC') },
              c
            );
          })
        ) : null,
        React.createElement(
          'div',
          { className: Context.prefixClass('slot-body FBH FC9 PR') },
          t.state.data.map(function (m, i) {
            var style = {};
            if (columnsFlex instanceof Array && typeof columnsFlex[i] === 'number') {
              style.flex = columnsFlex[i];
            }
            return React.createElement(
              Scroller,
              {
                ref: 'scroller' + i,
                key: 'scroller' + i,
                className: Context.prefixClass('FB1'),
                style: style,
                tap: 'iscroll:tap',
                autoRefresh: !!visible,
                onScrollStart: function onScrollStart() {
                  t.handleScrollStart();
                },
                onScrollEnd: function onScrollEnd() {
                  t.handleScrollEnd(i);
                }
              },
              React.createElement(
                'ul',
                null,
                React.createElement('li', null),
                React.createElement('li', null),
                m.map(function (n, j) {
                  return React.createElement(
                    'li',
                    {
                      key: 'item' + i + '_' + j, className: classnames(Context.prefixClass('slot-item' + i + '_' + j), _defineProperty({}, Context.prefixClass('slot-item-active'), j === t.state.selectedIndex[i]))
                    },
                    n.text
                  );
                }),
                React.createElement('li', null),
                React.createElement('li', null)
              )
            );
          })
        )
      );
    }
  }]);

  return SlotPane;
}(React.Component);

SlotPane.displayName = 'SlotPane';
SlotPane.propTypes = {
  visible: React.PropTypes.bool,
  // className: React.PropTypes.string,
  data: React.PropTypes.array.isRequired,
  value: React.PropTypes.array,
  onChange: React.PropTypes.func,
  onScrolling: React.PropTypes.func,
  scrollMod: React.PropTypes.string,
  columns: React.PropTypes.array,
  columnsFlex: React.PropTypes.array
};
SlotPane.defaultProps = {
  visible: true,
  // className:'',
  data: [],
  value: [],
  onChange: function onChange() {},
  onScrolling: function onScrolling() {},

  scrollMod: 'reset',
  columns: []
};


module.exports = SlotPane;