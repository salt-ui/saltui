'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Switch Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author ruiyang.dry
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
  }

  _createClass(Switch, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var t = this;
      if (t.props.readOnly) {
        return;
      }
      t.props.onChange(!t.props.on, event);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var classSet = _defineProperty({
        active: t.props.on,
        readOnly: t.props.readOnly
      }, t.props.className, !!t.props.className);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_Context2.default.prefixClass('switch'), classSet),
          readOnly: t.props.readOnly,
          onClick: t.handleChange.bind(this)
        },
        _react2.default.createElement(
          'div',
          { className: _Context2.default.prefixClass('switch-back') },
          _react2.default.createElement('div', { className: _Context2.default.prefixClass('switch-radius') })
        )
      );
    }
  }]);

  return Switch;
}(_react2.default.Component);

Switch.defaultProps = {
  on: true,
  onChange: function onChange() {},

  readOnly: false
};

// http://facebook.github.io/react/docs/reusable-components.html
Switch.propTypes = {
  on: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  readOnly: _react2.default.PropTypes.bool
};

Switch.displayName = 'Switch';

module.exports = Switch;