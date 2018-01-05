'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  cancelButton: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  onItemClick: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  destructiveButtonIndex: _propTypes2.default.number,
  prefixCls: _propTypes2.default.string,
  options: _propTypes2.default.array,
  locale: _propTypes2.default.string
};
exports.default = Panel;
module.exports = exports['default'];