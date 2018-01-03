'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Style = require('../Style');

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Avatar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var avatarColors = ['#78C06E', '#3BC2B5', '#78919D', '#5EC9F6', '#F6BF26'];
var defaultSrc = 'https://img.alicdn.com/tps/TB1.IgIKpXXXXbgXpXXXXXXXXXX-116-116.png';
var global = _Context2.default.getGlobal('avatar') || {};
var iconWrapperStyle = {
  position: 'absolute',
  lineHeight: 1,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

var Avatar = function (_Component) {
  _inherits(Avatar, _Component);

  function Avatar(props) {
    _classCallCheck(this, Avatar);

    var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

    var size = void 0;
    switch (props.size) {
      case 'normal':
        size = '40px';
        break;
      case 'large':
        size = '48px';
        break;
      default:
        size = (0, _Style.unitize)(props.size);
    }

    _this.style = _extends({
      width: size,
      height: size,
      lineHeight: size,
      fontSize: '14px',
      position: 'relative'
    }, props.style);
    return _this;
  }

  _createClass(Avatar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props,
          style = this.style;

      if (!props.name && !props.icon || props.src) {
        return _react2.default.createElement('img', {
          ref: function ref(r) {
            _this2.root = r;
          },
          className: (0, _classnames4.default)(_Context2.default.prefixClass('avatar'), _defineProperty({}, props.className, !!props.className)),
          src: props.src || props.defaultSrc,
          style: style,
          alt: ''
        });
      }
      if (props.defaultColor) {
        style.backgroundColor = props.defaultColor;
        if (console && console.warn) {
          console.warn('Avatar: defaultColor is deprecated, use colors instead.');
        }
      } else if (props.colors.length === 1) {
        var _props$colors = _slicedToArray(props.colors, 1);

        style.backgroundColor = _props$colors[0];
      } else {
        var hashCode = props.hashCode(props.name, props.isLong);
        style.backgroundColor = props.colors[Math.abs(hashCode) % props.colors.length];
      }
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(r) {
            _this2.root = r;
          },
          className: (0, _classnames4.default)(_Context2.default.prefixClass('avatar'), _defineProperty({}, props.className, !!props.className)),
          style: style
        },
        props.icon ? _react2.default.createElement(
          'span',
          { style: iconWrapperStyle },
          props.icon
        ) : Avatar.formatName(props.name)
      );
    }
  }]);

  return Avatar;
}(_react.Component);

Avatar.displayName = 'Avatar';

Avatar.hashCode = function (strKey, isLong) {
  var MAX_VALUE = 0x7fffffff;
  var MIN_VALUE = -0x80000000;
  var intValue = function intValue(num) {
    if (num > MAX_VALUE || num < MIN_VALUE) {
      return num & 0xFFFFFFFF; // eslint-disable-line no-bitwise
    }
    return num;
  };

  var hash = 0;
  if (typeof strKey === 'string') {
    for (var i = 0, l = strKey.length; i < l; i += 1) {
      hash = hash * 31 + strKey.charCodeAt(i);
      if (!isLong) {
        hash = intValue(hash);
      }
    }
  }
  return hash;
};

Avatar.formatName = function (name) {
  var formattedName = name;
  var isEnglishName = /^[A-Za-z,. ]+$/.test(formattedName);
  formattedName = formattedName.replace(/[,. ]+/g, isEnglishName ? ' ' : '');
  if (formattedName.indexOf(' ') !== -1) {
    formattedName = formattedName.split(' ').map(function (p) {
      return p.slice(0, 1);
    }).join('');
  }
  return isEnglishName ? formattedName.slice(0, 2) : formattedName.slice(formattedName.length - 2, formattedName.length);
};

Avatar.propTypes = {
  className: _react2.default.PropTypes.string,
  colors: _react2.default.PropTypes.array,
  defaultColor: _react2.default.PropTypes.string,
  defaultSrc: _react2.default.PropTypes.string,
  hashCode: _react2.default.PropTypes.func,
  icon: _react2.default.PropTypes.element,
  isLong: _react2.default.PropTypes.bool,
  name: _react2.default.PropTypes.string,
  size: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  src: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object
};
Avatar.defaultProps = {
  className: '',
  colors: global.colors || avatarColors,
  defaultColor: '',
  defaultSrc: global.defaultSrc || defaultSrc,
  hashCode: global.hashCode || Avatar.hashCode,
  icon: null,
  isLong: false,
  name: '',
  size: 'normal',
  src: '',
  style: {}
};
exports.default = Avatar;
module.exports = exports['default'];