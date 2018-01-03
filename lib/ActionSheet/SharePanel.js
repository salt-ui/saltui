'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isTwoDimArray = function isTwoDimArray(arr) {
  return arr.length && Array.isArray(arr[0]);
};

var Panel = function Panel(props) {
  var prefixCls = props.prefixCls,
      options = props.options,
      locale = props.locale,
      cancelButton = props.cancelButton,
      onItemClick = props.onItemClick,
      title = props.title,
      message = props.message;

  var lang = _i18n2.default[locale];
  var multiLine = isTwoDimArray(options);
  var twoDimOptions = multiLine ? options : [options];
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
    twoDimOptions.map(function (item, rowIndex) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { className: prefixCls + '-item-list-split-line' }),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-item-list-wrapper', key: rowIndex },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-item-list' },
            item.map(function (option, index) {
              return _react2.default.createElement(
                'div',
                {
                  className: (0, _classnames2.default)(prefixCls + '-item', 'tTE', {}),
                  onClick: function onClick() {
                    onItemClick(index, rowIndex);
                  },
                  key: index
                },
                _react2.default.createElement(
                  'div',
                  { className: prefixCls + '-item-icon' },
                  option.icon
                ),
                _react2.default.createElement(
                  'div',
                  { className: prefixCls + '-item-title' },
                  option.title
                )
              );
            })
          )
        )
      );
    }),
    _react2.default.createElement(
      'div',
      {
        className: prefixCls + '-item-cancel tTE',
        onClick: function onClick() {
          onItemClick(-1, -1);
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
  prefixCls: 't-action-sheet-share-panel',
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
  prefixCls: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.array,
  locale: _react2.default.PropTypes.string
};
exports.default = Panel;
module.exports = exports['default'];