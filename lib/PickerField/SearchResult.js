'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _CheckRound = require('salt-icon/lib/CheckRound');

var _CheckRound2 = _interopRequireDefault(_CheckRound);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PickerField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author longyan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SearchResult = function (_React$Component) {
  _inherits(SearchResult, _React$Component);

  function SearchResult(props) {
    _classCallCheck(this, SearchResult);

    var _this = _possibleConstructorReturn(this, (SearchResult.__proto__ || Object.getPrototypeOf(SearchResult)).call(this, props));

    var t = _this;
    var value = props.value;
    t.state = {
      value: [].concat(_toConsumableArray(value))
    };
    return _this;
  }

  _createClass(SearchResult, [{
    key: 'handleItemClick',
    value: function handleItemClick(item) {
      var t = this;
      var value = this.state.value;

      var found = -1;
      value.some(function (v, i) {
        if (v.value === item.value) {
          found = i;
          return true;
        }
        return false;
      });

      if (found > -1) {
        value.splice(found, 1);
        t.setState({
          value: value
        });
      } else {
        t.setState({
          value: [].concat(_toConsumableArray(value), [item])
        });
      }
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      this.props.onConfirm(this.state.value);
    }
  }, {
    key: 'isItemChecked',
    value: function isItemChecked(item) {
      var t = this;
      var found = -1;
      t.state.value.forEach(function (v, i) {
        if (v.value === item.value) {
          found = i;
        }
      });
      return found > -1;
    }
  }, {
    key: 'renderResults',
    value: function renderResults() {
      var t = this;
      return _react2.default.createElement(
        'div',
        { className: _Context2.default.prefixClass('picker-field-search-results') },
        t.props.value.map(function (item, index) {
          return t.renderResultItem(item, index);
        })
      );
    }
  }, {
    key: 'renderResultItem',
    value: function renderResultItem(item, index) {
      var t = this;

      var checked = t.isItemChecked(item);
      var iconHTML = _react2.default.createElement(_CheckRound2.default, {
        className: (0, _classnames2.default)({
          'un-checked': !checked
        }),
        width: 20,
        height: 20
      });

      return _react2.default.createElement(
        'div',
        {
          key: index,
          className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-search-result-item'), _Context2.default.prefixClass('clear')),
          onClick: function onClick() {
            t.handleItemClick(item);
          }
        },
        _react2.default.createElement(
          'span',
          { className: _Context2.default.prefixClass('picker-field-search-result-item-icon') },
          iconHTML
        ),
        _react2.default.createElement(
          'span',
          { className: _Context2.default.prefixClass('picker-field-search-result-item-entry') },
          t.props.formatter(item)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var pageSize = _utils2.default.getPageSize();
      var length = this.state.value.length;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-searchpanel'), 'multiple'),
          style: {
            width: pageSize.width + 'px',
            height: pageSize.height + 'px'
          }
        },
        _react2.default.createElement(
          'div',
          { className: _Context2.default.prefixClass('picker-field-searchpanel-inner') },
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-content') },
            _react2.default.createElement(
              _ScrollView2.default,
              null,
              t.renderResults()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-footer') },
            _react2.default.createElement(
              _Button2.default,
              {
                className: _Context2.default.prefixClass('picker-field-searchpanel-btn-ok'),
                display: 'inline',
                size: 'small',
                onClick: function onClick(e) {
                  t.handleConfirm(e);
                }
              },
              t.props.confirmText
            ),
            _react2.default.createElement(
              'div',
              {
                className: _Context2.default.prefixClass('picker-field-searchpanel-result-summary'),
                onClick: function onClick(e) {
                  t.handleEnterResultView(e);
                }
              },
              _react2.default.createElement(
                'span',
                null,
                t.props.selectText,
                length
              )
            )
          )
        )
      );
    }
  }]);

  return SearchResult;
}(_react2.default.Component);

SearchResult.defaultProps = {
  onConfirm: function onConfirm() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchResult.propTypes = {
  value: _react2.default.PropTypes.array,
  confirmText: _react2.default.PropTypes.string,
  onConfirm: _react2.default.PropTypes.func,
  formatter: _react2.default.PropTypes.func,
  selectText: _react2.default.PropTypes.string
};

SearchResult.displayName = 'SearchResult';

exports.default = SearchResult;
module.exports = exports['default'];