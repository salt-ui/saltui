'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lie = require('lie');

var _lie2 = _interopRequireDefault(_lie);

var _nattyFetch = require('natty-fetch/dist/natty-fetch');

var _nattyFetch2 = _interopRequireDefault(_nattyFetch);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Check = require('salt-icon/lib/Check');

var _Check2 = _interopRequireDefault(_Check);

var _CheckRound = require('salt-icon/lib/CheckRound');

var _CheckRound2 = _interopRequireDefault(_CheckRound);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _SearchBar = require('../SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _SearchResult = require('./SearchResult');

var _SearchResult2 = _interopRequireDefault(_SearchResult);

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


var SearchPanel = function (_React$Component) {
  _inherits(SearchPanel, _React$Component);

  _createClass(SearchPanel, null, [{
    key: 'renderSearchTips',
    value: function renderSearchTips() {
      return _react2.default.createElement('div', null);
    }
  }]);

  function SearchPanel(props) {
    _classCallCheck(this, SearchPanel);

    var _this = _possibleConstructorReturn(this, (SearchPanel.__proto__ || Object.getPrototypeOf(SearchPanel)).call(this, props));

    var t = _this;
    var value = props.value;
    t.state = {
      value: value || [],
      results: [],
      openResults: [],
      searchMode: false,
      searchEmpty: false,
      isOpenSearch: false,
      hasKeyword: false,
      popupVisible: false
    };
    t.delaySearch = _utils2.default.debounce(t.search.bind(t), t.props.searchDelay);
    t.handleLeaveResultView = t.handleLeaveResultView.bind(t);
    return _this;
  }

  _createClass(SearchPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var t = this;
      if (t.props.fetchUrl && t.props.fetchDataOnOpen) {
        t.delaySearch('');
        t.setState({
          isOpenSearch: true
        });
      }
    }
  }, {
    key: 'search',
    value: function search(term) {
      var t = this;
      if (t.fetch) {
        t.fetch.abort();
        if (t.state.isOpenSearch) {
          t.setState({
            isOpenSearch: false
          });
        }
      }
      t.fetch = _nattyFetch2.default.create({
        url: t.props.fetchUrl,
        jsonp: t.props.dataType ? t.props.dataType === 'jsonp' : /\.jsonp/.test(t.props.fetchUrl),
        data: t.props.beforeFetch({ q: term }),
        fit: t.props.fitResponse,
        Promise: _lie2.default
      });
      t.fetch().then(function (data) {
        var fetchData = t.props.afterFetch(data);
        var state = {};
        if (fetchData && fetchData.length) {
          state.searchEmpty = false;
        } else {
          state.searchEmpty = true;
        }
        if (t.state.isOpenSearch) {
          state.openResults = fetchData;
          state.isOpenSearch = false;
        } else {
          state.results = state.searchEmpty ? [] : fetchData;
        }
        t.setState(state);
      }).catch(function (e) {
        console.error(e); // eslint-disable-line no-console
      });
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(item) {
      var t = this;

      if (t.props.multiple) {
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
      } else {
        t.setState({
          value: [item]
        }, function () {
          t.handleConfirm();
        });
      }
    }
  }, {
    key: 'handleSearchChange',
    value: function handleSearchChange(term) {
      var t = this;

      if (term) {
        t.delaySearch(term);
        t.setState({
          hasKeyword: true,
          results: []
        });
      } else {
        // abort exists fetch request
        if (t.fetch) {
          t.fetch.abort();
        }
        t.setState({
          hasKeyword: false,
          results: []
        });
      }
    }
  }, {
    key: 'handleSearchEnter',
    value: function handleSearchEnter() {
      var t = this;
      t.setState({
        searchMode: true
      });
    }
  }, {
    key: 'handleSearchLeave',
    value: function handleSearchLeave() {
      var t = this;
      t.setState({
        searchMode: false
      });
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      this.props.onConfirm(this.state.value);
    }
  }, {
    key: 'handleEnterResultView',
    value: function handleEnterResultView() {
      var _this2 = this;

      this.setState({
        popupVisible: true
      }, function () {
        history.pushState({
          PickerField: 'SearchPanel.result'
        }, '', _utils2.default.addUrlParam('PICKER', Date.now()));

        window.addEventListener('popstate', _this2.handleLeaveResultView, false);
      });
    }
  }, {
    key: 'handleLeaveResultView',
    value: function handleLeaveResultView(e) {
      var state = e.state;

      if (state && state.PickerField === 'SearchPanel.index') {
        window.removeEventListener('popstate', this.handleLeaveResultView, false);
        this.setState({
          popupVisible: false
        });
      }
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
    key: 'isEmpty',
    value: function isEmpty() {
      return this.state.value.length === 0;
    }
  }, {
    key: 'renderEmpty',
    value: function renderEmpty() {
      var t = this;
      return _react2.default.createElement(
        'div',
        { className: _Context2.default.prefixClass('picker-field-search-empty') },
        _react2.default.createElement(
          'div',
          { className: _Context2.default.prefixClass('picker-field-search-empty-inner') },
          t.props.searchNotFoundContent
        )
      );
    }
  }, {
    key: 'renderResults',
    value: function renderResults(results) {
      var t = this;
      return _react2.default.createElement(
        'div',
        { className: _Context2.default.prefixClass('picker-field-search-results') },
        results.map(function (item, index) {
          return t.renderResultItem(item, index);
        })
      );
    }
  }, {
    key: 'renderResultItem',
    value: function renderResultItem(item, index) {
      var t = this;

      var checked = t.isItemChecked(item);
      var iconHTML = void 0;
      if (t.props.multiple) {
        iconHTML = _react2.default.createElement(_CheckRound2.default, {
          className: (0, _classnames2.default)({
            'un-checked': !checked
          }),
          width: 20,
          height: 20
        });
      } else if (checked) {
        iconHTML = _react2.default.createElement(_Check2.default, {
          width: 14,
          height: 14
        });
      }

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
    key: 'renderResultCondition',
    value: function renderResultCondition() {
      var t = this;
      if (t.state.hasKeyword) {
        if (t.state.searchEmpty) {
          return t.renderEmpty();
        }
        return t.renderResults(t.state.results);
      } else if (t.props.fetchDataOnOpen && t.state.openResults.length) {
        return t.renderResults(t.state.openResults);
      }
      return SearchPanel.renderSearchTips();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var t = this;
      var _t$props = t.props,
          showSearch = _t$props.showSearch,
          multiple = _t$props.multiple;

      var pageSize = _utils2.default.getPageSize();
      var length = this.state.value.length;
      var resultProps = {
        value: [].concat(_toConsumableArray(this.state.value)),
        confirmText: this.props.confirmText,
        onConfirm: function onConfirm(value) {
          _this3.setState({
            value: value
          }, function () {
            history.go(-1);
          });
        },
        formatter: this.props.formatter,
        selectText: this.props.selectText
      };
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_Context2.default.prefixClass('picker-field-searchpanel'), {
            multiple: multiple
          }),
          style: {
            width: pageSize.width + 'px',
            height: pageSize.height + 'px'
          }
        },
        _react2.default.createElement(
          'div',
          { className: _Context2.default.prefixClass('picker-field-searchpanel-inner') },
          showSearch ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-header') },
            _react2.default.createElement(_SearchBar2.default, {
              ref: function ref(c) {
                t.searchBar = c;
              },
              searchText: t.props.searchText,
              cancelText: t.props.cancelText,
              className: _Context2.default.prefixClass('picker-field-searchpanel-search'),
              onChange: function onChange(val) {
                t.handleSearchChange(val);
              },
              onEnterSearchMode: function onEnterSearchMode() {
                t.handleSearchEnter();
              },
              onLeaveSearchMode: function onLeaveSearchMode() {
                t.handleSearchLeave();
              }
            })
          ) : null,
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-content') },
            _react2.default.createElement(
              _ScrollView2.default,
              null,
              t.renderResultCondition()
            )
          ),
          multiple ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-searchpanel-footer') },
            _react2.default.createElement(
              _Button2.default,
              {
                className: _Context2.default.prefixClass('picker-field-searchpanel-btn-ok'),
                size: 'small',
                display: 'inline',
                disabled: t.isEmpty(),
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
                'a',
                null,
                t.props.selectText,
                length
              )
            )
          ) : null
        ),
        _react2.default.createElement(_Popup2.default, { content: _react2.default.createElement(_SearchResult2.default, resultProps), animationType: 'slide-left', visible: this.state.popupVisible })
      );
    }
  }]);

  return SearchPanel;
}(_react2.default.Component);

SearchPanel.defaultProps = {
  onConfirm: function onConfirm() {},

  showSearch: true,
  multiple: false
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchPanel.propTypes = {
  value: _react2.default.PropTypes.array,
  searchText: _react2.default.PropTypes.string,
  confirmText: _react2.default.PropTypes.string,
  cancelText: _react2.default.PropTypes.string,
  onConfirm: _react2.default.PropTypes.func,
  fetchUrl: _react2.default.PropTypes.string.isRequired,
  fetchDataOnOpen: _react2.default.PropTypes.bool,
  dataType: _react2.default.PropTypes.string,
  beforeFetch: _react2.default.PropTypes.func,
  fitResponse: _react2.default.PropTypes.func,
  afterFetch: _react2.default.PropTypes.func,
  showSearch: _react2.default.PropTypes.bool,
  searchTitle: _react2.default.PropTypes.string,
  searchDelay: _react2.default.PropTypes.number,
  searchPlaceholder: _react2.default.PropTypes.string,
  searchNotFoundContent: _react2.default.PropTypes.string,
  formatter: _react2.default.PropTypes.func,
  multiple: _react2.default.PropTypes.bool,
  selectText: _react2.default.PropTypes.string
};

SearchPanel.displayName = 'SearchPanel';

exports.default = SearchPanel;
module.exports = exports['default'];