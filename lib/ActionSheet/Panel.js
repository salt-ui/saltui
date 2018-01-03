'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Panel = function Panel(props) {
  var prefixCls = props.prefixCls,
      options = props.options,
      locale = props.locale,
      cancelButton = props.cancelButton,
      destructiveButtonIndex = props.destructiveButtonIndex,
      onItemClick = props.onItemClick,
      title = props.title,
      message = props.message;

  var lang = _i18n2.default[locale];
  return _react2.default.createElement(
    'div',
    { className: '' + prefixCls },
    title ? _react2.default.createElement(
      'h3',
      { className: prefixCls + '-title' },
      title
    ) : null,
    message ? _react2.default.createElement(
      'div',
      { className: prefixCls + '-message' },
      message
    ) : null,
    options.map(function (option, index) {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(prefixCls + '-item', 'tTE', _defineProperty({}, prefixCls + '-item-destructive', destructiveButtonIndex === index)),
          onClick: function onClick() {
            onItemClick(index);
          }
          // eslint-disable-next-line
          , key: index
        },
        option
      );
    }),
    _react2.default.createElement(
      'div',
      {
        className: prefixCls + '-item ' + prefixCls + '-item-cancel tTE',
        onClick: function onClick() {
          onItemClick(-1);
        }
      },
      cancelButton || lang.cancel
    )
  );
};

Panel.defaultProps = {
  title: '',
  message: '',
  cancelButton: '',
  prefixCls: 't-action-sheet-panel',
  locale: 'zh-cn',
  options: [],
  onItemClick: function onItemClick() {},
  onCancel: function onCancel() {}
};
Panel.propTypes = {
  title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  cancelButton: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  onItemClick: _react2.default.PropTypes.func,
  onCancel: _react2.default.PropTypes.func,
  destructiveButtonIndex: _react2.default.PropTypes.number,
  prefixCls: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.array,
  locale: _react2.default.PropTypes.string
};
exports.default = Panel;
module.exports = exports['default'];