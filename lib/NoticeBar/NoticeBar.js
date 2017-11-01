'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _InfoRound = require('salt-icon/lib/InfoRound');

var _InfoRound2 = _interopRequireDefault(_InfoRound);

var _NoteRound = require('salt-icon/lib/NoteRound');

var _NoteRound2 = _interopRequireDefault(_NoteRound);

var _CheckRound = require('salt-icon/lib/CheckRound');

var _CheckRound2 = _interopRequireDefault(_CheckRound);

var _CrossRound = require('salt-icon/lib/CrossRound');

var _CrossRound2 = _interopRequireDefault(_CrossRound);

var _DirectionRight = require('salt-icon/lib/DirectionRight');

var _DirectionRight2 = _interopRequireDefault(_DirectionRight);

var _Cross = require('salt-icon/lib/Cross');

var _Cross2 = _interopRequireDefault(_Cross);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NoticeBar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author ruiyang.dry
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NoticeBar = function (_React$Component) {
  _inherits(NoticeBar, _React$Component);

  function NoticeBar() {
    _classCallCheck(this, NoticeBar);

    return _possibleConstructorReturn(this, (NoticeBar.__proto__ || Object.getPrototypeOf(NoticeBar)).apply(this, arguments));
  }

  _createClass(NoticeBar, [{
    key: 'handleClose',
    value: function handleClose(e) {
      this.props.onClose(this, e);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.onClick) {
        this.props.onClick(this, e);
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var t = this;
      var iconMap = {
        info: 'notice-info',
        success: 'notice-success',
        error: 'notice-error',
        warning: 'notice-warning'
      };
      var _t$props = t.props,
          type = _t$props.type,
          message = _t$props.message,
          optionsType = _t$props.optionsType;

      var iconClassName = iconMap[type];
      var iconProps = {
        width: 18,
        height: 18,
        fill: '#fff',
        className: 'icon-custom-class'
      };
      var iconCompMap = {
        info: _InfoRound2.default,
        warning: _NoteRound2.default,
        success: _CheckRound2.default,
        error: _CrossRound2.default
      };
      var Icon = iconCompMap[type];
      var iconName = _react2.default.createElement(Icon, iconProps);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(_Context2.default.prefixClass('FBH notice-bar-content'), _defineProperty({}, iconClassName, !!iconClassName))
        },
        _react2.default.createElement(
          'div',
          { className: 'notice-icon' },
          iconName
        ),
        _react2.default.createElement(
          'span',
          { className: 'notice-content-message' },
          message
        ),
        optionsType ? t.renderOptions() : null
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var t = this;
      var optionsType = t.props.optionsType;
      // 目前type 分为jumpto、close 等;

      if (optionsType === 'jumpto') {
        return _react2.default.createElement(
          'div',
          { className: 'notice-options notice-direction' },
          _react2.default.createElement(_DirectionRight2.default, { width: 18, height: 18, fill: '#fff', className: 'icon-custom-class' })
        );
      } else if (optionsType === 'close') {
        return _react2.default.createElement(
          'div',
          { className: 'notice-options notice-cross' },
          _react2.default.createElement(_Cross2.default, { width: 18, height: 18, fill: '#fff', className: 'icon-custom-class', onClick: function onClick(e) {
              t.handleClose(e);
            } })
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var _props = this.props,
          className = _props.className,
          visible = _props.visible;

      var content = t.renderContent();
      var dom = _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(_Context2.default.prefixClass('notice-bar'), _defineProperty({}, className, !!className)), onClick: function onClick(e) {
            t.handleClick(e);
          }
        },
        content
      );
      return _react2.default.createElement(
        _rcAnimate2.default,
        {
          transitionName: _Context2.default.prefixClass('notice-bar-fade'),
          transitionAppear: true
        },
        visible ? dom : null
      );
    }
  }]);

  return NoticeBar;
}(_react2.default.Component);

NoticeBar.propTypes = {
  className: _react2.default.PropTypes.string,
  visible: _react2.default.PropTypes.bool,
  optionsType: _react2.default.PropTypes.string,
  onClose: _react2.default.PropTypes.func,
  onClick: _react2.default.PropTypes.func
};
NoticeBar.defaultProps = {
  type: 'info',
  className: '',
  message: '',
  optionsType: '',
  visible: true,
  onClose: function onClose() {}
};
NoticeBar.displayName = 'NoticeBar';
exports.default = NoticeBar;
module.exports = exports['default'];