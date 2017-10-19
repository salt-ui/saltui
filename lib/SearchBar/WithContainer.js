'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _SearchBar = require('./SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _SearchHistory = require('./SearchHistory');

var _SearchHistory2 = _interopRequireDefault(_SearchHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addUrlParam = function addUrlParam(name, value) {
  var currentUrl = location.href;
  var reg = void 0;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(name + '=[-\\w]{4,25}', 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, name + '=' + value);
    } else {
      currentUrl += '&' + name + '=' + value;
    }
  } else {
    currentUrl += '?' + name + '=' + value;
  }
  return currentUrl;
};

/* eslint-disable react/prefer-stateless-function */

var WithContainer = function (_React$Component) {
  _inherits(WithContainer, _React$Component);

  function WithContainer(props) {
    _classCallCheck(this, WithContainer);

    var _this = _possibleConstructorReturn(this, (WithContainer.__proto__ || Object.getPrototypeOf(WithContainer)).call(this, props));

    _this.handleSearchEnter = function () {
      history.pushState(null, '', addUrlParam('SEARCH_BAR', Date.now()));
      window.addEventListener('popstate', _this.listener, false);
      // document.body.style.overflow = 'hidden';
      _this.setState({
        isActive: true
      }, function () {
        _this.props.onEnter();
      });
    };

    _this.handleSearchExit = function () {
      history.go(-1);
    };

    _this.handleSearch = function (key, from) {
      _this.props.onSearch(key, from);
      _this.history.hide();
      if (from !== 'input' && _this.props.hasHistory) {
        _this.history.addItem(key);
      }
      if (key === _this.lastSearch) {
        return;
      }
      _this.lastSearch = key;
    };

    _this.state = {
      isActive: false
    };
    _this.listener = _this.exitStatusSearch.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(WithContainer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.exitStatusSearch();
    }
  }, {
    key: 'onHistorySelect',
    value: function onHistorySelect(value) {
      var t = this;
      t.searchBar.doSearch('history', value);
      t.history.hide();
    }
  }, {
    key: 'exitStatusSearch',
    value: function exitStatusSearch() {
      var _this2 = this;

      window.removeEventListener('popstate', this.listener, false);
      document.body.style.overflow = '';
      this.setState({
        isActive: false
      }, function () {
        _this2.props.onExit();
      });
    }
  }, {
    key: 'renderHistory',
    value: function renderHistory() {
      var _this3 = this;

      var t = this;
      if (!t.props.hasHistory) {
        return null;
      }
      return _react2.default.createElement(_SearchHistory2.default, {
        ref: function ref(c) {
          _this3.history = c;
        },
        locale: t.props.locale,
        name: t.props.historyName,
        prefixCls: t.props.prefixCls,
        className: (0, _classnames4.default)({ active: !t.state.keyword }),
        onSelect: function onSelect(value) {
          t.onHistorySelect(value);
        }
      });
    }
  }, {
    key: 'renderResult',
    value: function renderResult() {
      var t = this;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(t.props.prefixCls + '-result', {
            active: t.state.keyword
          })
        },
        t.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var t = this;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', {
          className: (0, _classnames4.default)(this.props.prefixCls + '-container-mask', _defineProperty({}, this.props.prefixCls + '-container-mask__active', this.state.isActive))
        }),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames4.default)(this.props.prefixCls + '-container', _defineProperty({}, this.props.prefixCls + '-container__active', this.state.isActive))
          },
          _react2.default.createElement(_SearchBar2.default, _extends({}, this.props, {
            ref: function ref(c) {
              _this4.searchBar = c;
            },
            onEnter: this.handleSearchEnter,
            onExit: this.handleSearchExit,
            onSearch: this.handleSearch,
            isActive: this.state.isActive
          })),
          this.state.isActive ? _react2.default.createElement(
            'div',
            { className: this.props.prefixCls + '-list' },
            t.renderHistory(),
            t.renderResult()
          ) : null
        )
      );
    }
  }]);

  return WithContainer;
}(_react2.default.Component);

WithContainer.defaultProps = {
  prefixCls: 't-search-bar',
  onEnter: function onEnter() {},
  onExit: function onExit() {},
  onSearch: function onSearch() {},
  hasHistory: true
};
WithContainer.propTypes = {
  prefixCls: _react2.default.PropTypes.string,
  onEnter: _react2.default.PropTypes.func,
  onExit: _react2.default.PropTypes.func,
  onSearch: _react2.default.PropTypes.func,
  hasHistory: _react2.default.PropTypes.bool
};
exports.default = WithContainer;
module.exports = exports['default'];