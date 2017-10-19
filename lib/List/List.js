'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _AngleRight = require('salt-icon/lib/AngleRight');

var _AngleRight2 = _interopRequireDefault(_AngleRight);

var _Group = require('../Group');

var _Group2 = _interopRequireDefault(_Group);

var _Boxs = require('../Boxs');

var _Boxs2 = _interopRequireDefault(_Boxs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * List Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author muxin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var HBox = _Boxs2.default.HBox;
var VBox = _Boxs2.default.VBox;
var Box = _Boxs2.default.Box;

var supportTouch = _Context2.default.supportTouch;

// 获取兼容PC和Device的event对象的page属性

var getCursorPage = supportTouch ? function (event, page) {
  return event.targetTouches[0][page] || event.changedTouches[0][page];
} : function (event, page) {
  return event[page];
};

var List = function (_React$Component) {
  _inherits(List, _React$Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

    var t = _this;
    var datas = t.props.data || [];

    if (datas.length) {
      datas.map(function (d, i) {
        d.keyIndex = 'index' + i;
        d.listLeft = 0;
        return false;
      });
    }

    _this.state = {
      data: datas,
      isCanMove: true, // 当前能不能进行滑动
      startX: 0, // 鼠标开始的X轴位置
      startY: 0, // 鼠标开始的Y轴位置
      endX: 0, // 鼠标释放的位置
      delateX: 0, // 鼠标滑动的水平距离
      listLeft: 0,
      isMove: false
    };
    return _this;
  }

  _createClass(List, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProp) {
      if (nextProp.data && nextProp.data.length) {
        nextProp.data.map(function (d, i) {
          d.keyIndex = 'index' + i;
          d.listLeft = 0;
          return false;
        });

        this.setState({
          data: nextProp.data
        });
      }
    }
  }, {
    key: 'touchstartHandle',
    value: function touchstartHandle(e) {
      var t = this;
      var data = t.state.data;
      var id = e.currentTarget.id;
      var isCanMove = t.state.isCanMove;

      data.map(function (d) {
        if (d.keyIndex !== id && Math.abs(d.listLeft) > 0) {
          isCanMove = false;
        }
        d.listLeft = 0;
        return false;
      });

      // 只响应单指操作
      if (supportTouch && e.touches.length > 1) {
        return;
      }

      e.currentTarget.style.transitionDuration = '.05s';

      // 获取当前触点的X轴的偏移量
      var touchPageX = getCursorPage(e, 'pageX');
      var touchPageY = getCursorPage(e, 'pageY');

      t.setState({
        data: data,
        startX: touchPageX,
        startY: touchPageY,
        isCanMove: isCanMove
      });
    }
  }, {
    key: 'touchmoveHandle',
    value: function touchmoveHandle(e) {
      var t = this;
      var data = t.state.data;
      var id = e.currentTarget.id;
      var isCanMove = t.state.isCanMove;

      // 只响应单指操作
      if (supportTouch && e.touches.length > 1) {
        return;
      }

      e.currentTarget.style.transitionDuration = '.1s';

      var touchPageX = getCursorPage(e, 'pageX');
      var touchPageY = getCursorPage(e, 'pageY');

      var deltaX = touchPageX - t.state.startX;
      var deltaY = touchPageY - t.state.startY;

      var change = Math.min(Math.max(-82, deltaX), 0);

      // 如果X轴的移动距离先达到5px并且Y轴的移动距离小于5px，则执行list的滑动
      // 如果Y轴的移动距离先达到5px，则执行浏览器默认的页面滚动
      if (Math.abs(deltaX) > 5 && Math.abs(deltaY) < 5) {
        data.map(function (d) {
          if (d.keyIndex === id) {
            if (isCanMove) {
              d.listLeft = change;
            } else {
              d.listLeft = 0;
              e.currentTarget.addEventListener('touchmove', function (event) {
                event.preventDefault();
              }, false);
            }
          }
          return false;
        });

        e.preventDefault();
        e.stopPropagation();

        t.setState({
          endX: touchPageX,
          delateX: change,
          listLeft: change,
          data: data,
          isCanMove: isCanMove
        });
      }
    }
  }, {
    key: 'touchendHandle',
    value: function touchendHandle(e) {
      var t = this;
      var left = void 0;
      var data = t.state.data;
      var isCanMove = t.state.isCanMove;
      var id = e.currentTarget.id;
      var newLeft = 0;

      // 只响应单指操作
      if (supportTouch && e.touches.length > 1) {
        return;
      }

      e.currentTarget.style.transitionDuration = '.2s';

      data.map(function (d) {
        if (d.keyIndex === id) {
          left = parseInt(d.listLeft, 10);
        }
        return false;
      });

      if (left < -5) {
        newLeft = -82;
      } else if (left === 0) {
        newLeft = 0;
      } else if (left > 5) {
        newLeft = 82;
      }

      data.map(function (d) {
        if (d.keyIndex !== id) {
          d.listLeft = 0;
          isCanMove = true;
        } else {
          d.listLeft = newLeft;
        }
        return false;
      });

      t.setState({
        listLeft: newLeft,
        data: data,
        isCanMove: isCanMove
      });

      if (newLeft < 0) {
        t.setState({
          isMove: true
        });
      }
    }
  }, {
    key: 'delete',
    value: function _delete(dataItem, e) {
      var t = this;

      e.preventDefault();
      t.props.onDelete(e, dataItem);

      // let data = t.state.data;
      // let id = event.currentTarget.id;

      // data.map((d,i) => {

      //     if(d.keyIndex === id) {

      //         data.splice(i,1);
      //     }
      // })

      // t.setState({
      //     data : data
      // })
    }
  }, {
    key: 'preventDefault',
    value: function preventDefault(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickHandle',
    value: function clickHandle(dataItem, e) {
      var t = this;

      if (t.state.isMove) {
        t.setState({
          isMove: false
        });
      } else {
        t.props.onClick(e, dataItem);
      }
    }
  }, {
    key: 'clickPhotoHandle',
    value: function clickPhotoHandle(imgUrl, e) {
      var t = this;

      e.stopPropagation();
      t.props.clickPhoto(e, imgUrl);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var _t$props = t.props,
          className = _t$props.className,
          layout = _t$props.layout,
          isDelete = _t$props.isDelete,
          hasRightIcon = _t$props.hasRightIcon,
          iconWidth = _t$props.iconWidth,
          demoTitle = _t$props.demoTitle;

      var data = t.state.data;
      var list = null;
      var Events = {};

      if (isDelete) {
        Events = {
          onTouchStart: t.touchstartHandle.bind(t),
          onTouchMove: t.touchmoveHandle.bind(t),
          onTouchEnd: t.touchendHandle.bind(t)
        };
      }
      if (data.length) {
        list = data.map(function (dataItem, index) {
          var icon = null;
          if (_react2.default.isValidElement(t.props.icon)) {
            icon = _react2.default.cloneElement(t.props.icon, { width: iconWidth, fill: '#ccc', className: _Context2.default.prefixClass('list-arrow') });
          }
          return (
            /* eslint-disable react/no-array-index-key */
            _react2.default.createElement(
              'div',
              { key: index },
              _react2.default.createElement(
                'div',
                _extends({ className: _Context2.default.prefixClass('list-wrap')
                }, Events, {
                  style: { left: dataItem.listLeft + 'px' },
                  id: dataItem.keyIndex,
                  onClick: t.clickHandle.bind(t, dataItem),
                  ref: function ref(c) {
                    _this2.listItemBox = c;
                  }
                }),
                _react2.default.createElement(
                  HBox,
                  { vAlign: 'center' },
                  _react2.default.createElement(
                    HBox,
                    {
                      flex: 1,
                      className: (0, _classnames4.default)(_defineProperty({}, _Context2.default.prefixClass('list-img-right'), layout === 'right'))
                    },
                    ' ',
                    dataItem.imgUrl && _react2.default.createElement(
                      VBox,
                      { vAlign: 'center',
                        onClick: t.clickPhotoHandle.bind(t, dataItem.imgUrl)
                      },
                      _react2.default.createElement('img', {
                        src: dataItem.imgUrl,
                        alt: '',
                        className: _Context2.default.prefixClass('list-img')
                      })
                    ),
                    _react2.default.createElement(
                      Box,
                      { className: _Context2.default.prefixClass('list-text-content'),
                        flex: 1
                      },
                      _react2.default.createElement(
                        'p',
                        { className: _Context2.default.prefixClass('list-title omit') },
                        ' ',
                        dataItem.title,
                        ' ',
                        dataItem.date && _react2.default.createElement(
                          'span',
                          { className: _Context2.default.prefixClass('list-title-date') },
                          ' ',
                          dataItem.date,
                          ' '
                        ),
                        ' '
                      ),
                      ' ',
                      dataItem.text && _react2.default.createElement(
                        'p',
                        { className: _Context2.default.prefixClass('list-text omit') },
                        ' ',
                        dataItem.text,
                        ' '
                      )
                    )
                  ),
                  hasRightIcon && _react2.default.createElement(
                    Box,
                    null,
                    icon
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _Context2.default.prefixClass('list-behind') },
                _react2.default.createElement(
                  'a',
                  {
                    href: '#',
                    className: _Context2.default.prefixClass('list-delete-btn'),
                    id: dataItem.keyIndex,
                    onClick: t.delete.bind(t, dataItem)
                  },
                  _react2.default.createElement(
                    'span',
                    { className: _Context2.default.prefixClass('list-delete-btn-text') },
                    ' \u5220\u9664 '
                  )
                )
              )
            )
          );
        });

        return _react2.default.createElement(
          _Group2.default,
          { className: (0, _classnames4.default)(_Context2.default.prefixClass('list'), _defineProperty({}, className, !!className))
          },
          _react2.default.createElement(
            _Group2.default.Head,
            { className: 't-demo-title' },
            demoTitle
          ),
          _react2.default.createElement(
            _Group2.default.List,
            { lineIndent: 10 },
            list
          )
        );
      }
      return null;
    }
  }]);

  return List;
}(_react2.default.Component);

List.defaultProps = {
  className: '',
  layout: 'left',
  hasRightIcon: true,
  icon: _react2.default.createElement(_AngleRight2.default, null),
  iconWidth: 20,
  data: [],
  isDelete: false,
  demoTitle: '',
  onClick: function onClick() {},
  clickPhoto: function clickPhoto() {},
  onDelete: function onDelete() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
List.propTypes = {
  className: _react2.default.PropTypes.string,
  layout: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.element,
  iconWidth: _react2.default.PropTypes.number,
  data: _react2.default.PropTypes.array,
  hasRightIcon: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  clickPhoto: _react2.default.PropTypes.func,
  onDelete: _react2.default.PropTypes.func
};

List.displayName = 'List';

exports.default = List;
module.exports = exports['default'];