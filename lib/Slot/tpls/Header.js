'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var classnames = require('classnames');
var Context = require('../../Context');

var SlotHeader = function (_React$Component) {
  _inherits(SlotHeader, _React$Component);

  function SlotHeader() {
    _classCallCheck(this, SlotHeader);

    return _possibleConstructorReturn(this, (SlotHeader.__proto__ || Object.getPrototypeOf(SlotHeader)).apply(this, arguments));
  }

  _createClass(SlotHeader, [{
    key: 'render',


    // http://facebook.github.io/react/docs/reusable-components.html
    value: function render() {
      var _props = this.props,
          className = _props.className,
          title = _props.title,
          confirmText = _props.confirmText,
          cancelText = _props.cancelText,
          isScrolling = _props.isScrolling,
          onConfirm = _props.onConfirm,
          onCancel = _props.onCancel,
          others = _objectWithoutProperties(_props, ['className', 'title', 'confirmText', 'cancelText', 'isScrolling', 'onConfirm', 'onCancel']);

      return React.createElement(
        'div',
        _extends({ className: Context.prefixClass('slot-header FBH FBAC') }, others),
        React.createElement(
          'div',
          { className: Context.prefixClass('slot-cancel'), onClick: onCancel },
          cancelText
        ),
        React.createElement(
          'div',
          { className: Context.prefixClass('FB1 FAC slot-title') },
          title
        ),
        React.createElement(
          'div',
          { className: classnames(Context.prefixClass('slot-confirm'), {
              enable: !isScrolling
            }), onClick: onConfirm
          },
          confirmText
        )
      );
    }
  }]);

  return SlotHeader;
}(React.Component);

SlotHeader.displayName = 'SlotHeader';
SlotHeader.propTypes = {
  title: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  isScrolling: React.PropTypes.bool,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func
};
SlotHeader.defaultProps = {
  title: '',
  cancelText: '取消',
  confirmText: '完成',
  isScrolling: false,
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {}
};


module.exports = SlotHeader;