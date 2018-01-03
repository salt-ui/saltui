'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Popup Component for tingle
                                                                                                                                                                                                                                                                   * @author guanghong.wsj
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                                                                   * fork from https://github.com/ant-design/ant-design-mobile/blob/master/components/popup
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function create(instanceId, config, content) {
  var afterClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  var props = _extends({
    prefixCls: 't-popup',
    animationType: 'slide-up'
  }, config);
  var prefixCls = props.prefixCls,
      transitionName = props.transitionName,
      maskTransitionName = props.maskTransitionName,
      _props$maskClosable = props.maskClosable,
      maskClosable = _props$maskClosable === undefined ? true : _props$maskClosable,
      animationType = props.animationType,
      className = props.className,
      _onClose = props.onClose;


  var div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    if (div) {
      _reactDom2.default.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
      div = null;
    }
    afterClose(instanceId);
  }

  var transName = prefixCls + '-' + animationType;

  function handleMaskClick() {
    if (maskClosable) {
      if (props.onMaskClose && typeof props.onMaskClose === 'function') {
        var res = props.onMaskClose();
        if (res && res.then) {
          res.then(function () {
            close();
          });
        } else {
          close();
        }
      } else {
        close();
      }
    }
  }

  var maskProps = {
    onClick: function onClick(e) {
      e.preventDefault();
      handleMaskClick();
    }
  };

  var update = function update(newContent) {
    _reactDom2.default.render(_react2.default.createElement(
      _rcDialog2.default,
      {
        prefixCls: prefixCls,
        visible: true,
        title: '',
        footer: '',
        className: (0, _classnames3.default)(prefixCls + '-' + animationType, _defineProperty({}, className, !!className)),
        onClose: function onClose() {
          if (_onClose) {
            _onClose();
          } else {
            handleMaskClick();
          }
        },
        transitionName: transitionName || transName,
        maskTransitionName: maskTransitionName || 't-fade',
        maskClosable: maskClosable,
        wrapProps: props.wrapProps || {},
        maskProps: props.maskProps || maskProps
      },
      newContent || content
    ), div);
  };

  update();

  return {
    instanceId: instanceId,
    close: close,
    update: update
  };
}

var ins = {
  defaultInstance: null,
  instances: []
};
var instanceId = 1;

var Popup = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.visible === true) {
        this.show();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.instance) {
        this.instance.update(this.props.content);
      }
      if (this.props.visible === true && prevProps.visible === false) {
        this.show();
      } else if (this.props.visible === false && prevProps.visible === true) {
        this.hide();
      }
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      var _this2 = this;

      var options = _extends({}, this.props);
      delete options.content;
      if ('visible' in this.props) {
        options.maskProps = {
          onClick: function onClick() {
            _this2.props.onMaskClick();
          }
        };
        options.onClose = function () {
          _this2.props.onMaskClick();
        };
      }
      return options;
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.instance) {
        this.instance.hide();
        this.instance = null;
      }
    }
  }, {
    key: 'show',
    value: function show() {
      if (!this.instance) {
        this.instance = Popup.newInstance();
      }
      this.instance.show(this.props.content, this.getOptions());
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.fireEvents('onClick', e);
      if (!Object.prototype.hasOwnProperty.call(this.props, 'visible')) {
        this.show();
      }
    }
  }, {
    key: 'fireEvents',
    value: function fireEvents(type, e) {
      var childCallback = this.props.children.props[type];
      if (childCallback) {
        childCallback(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;
      if (children === undefined || children === null) {
        return null;
      }
      var child = _react2.default.Children.only(children);
      var newChildProps = {
        onClick: function onClick(e) {
          _this3.handleClick(e);
        }
      };
      return _react2.default.cloneElement(child, newChildProps);
    }
  }]);

  return Popup;
}(_react2.default.Component);

Popup.newInstance = function () {
  var j = void 0;
  return {
    show: function show(content, config) {
      j = create(instanceId, config, content, function (iId) {
        for (var i = 0; i < ins.instances.length; i++) {
          if (ins.instances[i].instanceId === iId) {
            ins.instances.splice(i, 1);
            return;
          }
        }
      });
      instanceId += 1;
      ins.instances.push(j);
    },
    hide: function hide() {
      j.close();
    },
    update: function update(content) {
      j.update(content);
    }
  };
};

Popup.show = function (content, config) {
  Popup.hide();
  ins.defaultInstance = create('0', config, content, function (iId) {
    if (iId === '0') {
      ins.defaultInstance = null;
    }
  });
  return ins.defaultInstance;
};

Popup.hide = function () {
  if (ins.defaultInstance) {
    ins.defaultInstance.close();
  }
};

Popup.propTypes = {
  children: _react2.default.PropTypes.node,
  content: _react2.default.PropTypes.node,
  options: _react2.default.PropTypes.object,
  visible: _react2.default.PropTypes.bool,
  onMaskClick: _react2.default.PropTypes.func
};
Popup.defaultProps = {
  onMaskClick: function onMaskClick() {}
};
exports.default = Popup;
module.exports = exports['default'];