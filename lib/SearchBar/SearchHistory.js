'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SearchHistory Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zhouquan.yezq
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Storage = {
  toJSON: function toJSON(data) {
    return JSON.stringify(data);
  },
  fromJSON: function fromJSON(data) {
    var parsedData = void 0;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      parsedData = null;
    }
    return parsedData;
  },
  getItem: function getItem(key) {
    return this.fromJSON(localStorage.getItem(key));
  },
  setItem: function setItem(key, data) {
    return localStorage.setItem(key, this.toJSON(data));
  },
  removeItem: function removeItem(key) {
    localStorage.removeItem(key);
  }
};

var SearchHistory = function (_React$Component) {
  _inherits(SearchHistory, _React$Component);

  function SearchHistory(props) {
    _classCallCheck(this, SearchHistory);

    var _this = _possibleConstructorReturn(this, (SearchHistory.__proto__ || Object.getPrototypeOf(SearchHistory)).call(this, props));

    _this.state = {};
    _this.HISTORY_KEY = props.name;
    return _this;
  }

  _createClass(SearchHistory, [{
    key: 'onSelect',
    value: function onSelect(keyword) {
      this.props.onSelect(keyword);
    }
  }, {
    key: 'getHistory',
    value: function getHistory() {
      var list = Storage.getItem(this.HISTORY_KEY) || [];
      return list.slice(0, this.props.displayCount);
    }
  }, {
    key: 'addItem',
    value: function addItem(keyword) {
      // add new history item
      var t = this;
      var list = t.getHistory();
      var index = list.indexOf(keyword);
      if (index !== -1) {
        list.splice(index, 1);
      }
      list.unshift(keyword);
      Storage.setItem(t.HISTORY_KEY, list);
    }
  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      var t = this;
      Storage.removeItem(t.HISTORY_KEY);
      this.setState({
        historyList: []
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (!this.isHidden) {
        if (this.root) {
          this.root.style.display = 'none';
        }
        this.isHidden = true;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var list = t.getHistory();
      if (list.length === 0) {
        return null;
      }
      var i18n = _locale2.default[t.props.locale];
      return _react2.default.createElement(
        'div',
        { ref: function ref(c) {
            _this2.root = c;
          }, className: (0, _classnames2.default)(this.props.prefixCls + '-history', t.props.className) },
        _react2.default.createElement(
          'div',
          { className: this.props.prefixCls + '-history-header' },
          i18n.history,
          _react2.default.createElement(
            'span',
            {
              className: this.props.prefixCls + '-history-action',
              onClick: function onClick() {
                t.clearHistory();
              }
            },
            i18n.clear
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: this.props.prefixCls + '-history-list' },
          list.map(function (item, idx) {
            return _react2.default.createElement(
              'li',
              { key: idx },
              _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    t.onSelect(item);
                  } },
                item
              )
            );
          })
        )
      );
    }
  }]);

  return SearchHistory;
}(_react2.default.Component);

SearchHistory.defaultProps = {
  name: 'SEARCH_BAR_HISTORY',
  keyword: '',
  displayCount: 8,
  onSelect: function onSelect() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchHistory.propTypes = {
  prefixCls: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  keyword: _react2.default.PropTypes.string,
  onSelect: _react2.default.PropTypes.func,
  displayCount: _react2.default.PropTypes.number
};

SearchHistory.displayName = 'SearchHistory';

module.exports = SearchHistory;