'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Search = require('salt-icon/lib/Search');

var _Search2 = _interopRequireDefault(_Search);

var _CrossRound = require('salt-icon/lib/CrossRound');

var _CrossRound2 = _interopRequireDefault(_CrossRound);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SearchBar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zhouquan.yezq
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this.state = {
      isActive: props.isActive, // whether in search mode
      keyword: props.value
    };
    // this.lastSearch = '';
    _this.doDebouceSearch = (0, _debounce2.default)(_this.doSearch, props.searchDelay);
    return _this;
  }

  _createClass(SearchBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isActive !== this.props.isActive) {
        this.setState({
          isActive: nextProps.isActive
        });
      }
      if (nextProps.value !== this.props.value) {
        this.setState({
          keyword: nextProps.value
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (!prevState.isActive && this.state.isActive) {
        this.input.focus();
      } else if (prevState.isActive && !this.state.isActive) {
        this.input.blur();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var value = e.target.value;

      var t = this;
      this.setState({
        keyword: value
      }, function () {
        if (t.props.instantSearch) {
          t.doDebouceSearch('input');
        }
      });
      t.props.onChange(value, 'input', e);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      var value = e.target.value;

      if (e.keyCode === 13) {
        this.doSearch('click', value);
        if (this.props.exitAfterEnter) {
          this.exitSearch();
        }
        this.input.blur();
      }
    }
  }, {
    key: 'doSearch',
    value: function doSearch(from, keyword) {
      var t = this;
      var key = keyword || t.state.keyword;
      t.setState({
        keyword: key
      }, function () {
        t.props.onSearch(key, from);
      });
    }
  }, {
    key: 'clearKeyword',
    value: function clearKeyword() {
      var t = this;
      t.setState({
        keyword: ''
      }, function () {
        t.props.onChange('', 'clear', null);
        t.input.focus();
      });
    }
  }, {
    key: 'enterSearch',
    value: function enterSearch() {
      var t = this;
      if (t.props.disabled) {
        return;
      }
      t.setState({
        isActive: true
      });
      t.input.focus();
      t.props.onEnter();
    }
  }, {
    key: 'exitSearch',
    value: function exitSearch() {
      var t = this;
      this.input.blur();
      t.setState({
        isActive: false,
        keyword: ''
      }, function () {
        t.props.onExit();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      var i18n = _locale2.default[t.props.locale];
      var placeholder = t.props.placeholder;

      if ((typeof placeholder === 'undefined' ? 'undefined' : _typeof(placeholder)) === 'object' && placeholder !== null) {
        placeholder = placeholder[t.props.locale];
      }
      var keyword = t.state.keyword;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(_Context2.default.prefixClass('search-bar'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, t.props.locale, !!t.props.locale), _defineProperty(_classnames, 'active', t.state.isActive), _classnames))
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames4.default)(_Context2.default.prefixClass('search-bar-wrapper'), _defineProperty({}, t.props.className, !!t.props.className))
          },
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('search-bar-box') },
            _react2.default.createElement(
              'div',
              {
                className: _Context2.default.prefixClass('search-bar-holder-wrapper'),
                onClick: function onClick() {
                  t.enterSearch();
                }
              },
              _react2.default.createElement(
                'div',
                { className: _Context2.default.prefixClass('search-bar-holder') },
                _react2.default.createElement(_Search2.default, {
                  className: _Context2.default.prefixClass('search-bar-icon-search'),
                  width: this.props.iconWidth,
                  height: this.props.iconHeight,
                  fill: this.props.iconColor
                }),
                _react2.default.createElement(
                  'span',
                  {
                    className: (0, _classnames4.default)(_Context2.default.prefixClass('omit search-bar-placeholder'), {
                      hidden: keyword
                    })
                  },
                  placeholder
                )
              )
            ),
            _react2.default.createElement(
              'form',
              { action: 'javascript:;' },
              _react2.default.createElement('input', {
                ref: function ref(c) {
                  t.input = c;
                },
                type: 'search',
                className: _Context2.default.prefixClass('search-bar-input'),
                value: keyword,
                onChange: function onChange(e) {
                  t.onChange(e);
                },
                onKeyUp: function onKeyUp(e) {
                  t.onKeyUp(e);
                }
              })
            ),
            _react2.default.createElement(_CrossRound2.default, {
              onClick: function onClick(e) {
                t.clearKeyword(e);
              },
              className: (0, _classnames4.default)(_Context2.default.prefixClass('search-bar-icon-cross'), {
                active: keyword
              }),
              width: this.props.iconWidth,
              height: this.props.iconHeight,
              fill: this.props.iconColor
            })
          ),
          _react2.default.createElement(
            'span',
            {
              className: _Context2.default.prefixClass('search-bar-btn'),
              onClick: function onClick(e) {
                t.exitSearch(e);
              }
            },
            i18n.cancel
          )
        )
      );
    }
  }]);

  return SearchBar;
}(_react2.default.Component);

var noop = function noop() {};

SearchBar.defaultProps = {
  iconWidth: 20,
  iconHeight: 20,
  iconColor: '#bcbcbc',
  locale: 'zh_CN',
  value: '',
  placeholder: {
    zh_CN: '搜索',
    en_US: 'Search'
  },
  hasHistory: true,
  instantSearch: true, // whether trigger search when  input change
  searchDelay: 350, // debounce time for search action
  disabled: false,
  onChange: noop,
  onSearch: noop,
  onEnter: noop,
  onExit: noop,
  isActive: false,
  exitAfterEnter: false
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchBar.propTypes = {
  iconWidth: _propTypes2.default.number,
  iconHeight: _propTypes2.default.number,
  iconColor: _propTypes2.default.string,
  locale: _propTypes2.default.string,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  hasHistory: _propTypes2.default.bool,
  historyName: _propTypes2.default.string,
  instantSearch: _propTypes2.default.bool,
  searchDelay: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  onSearch: _propTypes2.default.func,
  onEnter: _propTypes2.default.func,
  onExit: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  isActive: _propTypes2.default.bool,
  exitAfterEnter: _propTypes2.default.bool
};

SearchBar.displayName = 'SearchBar';

exports.default = SearchBar;
module.exports = exports['default'];