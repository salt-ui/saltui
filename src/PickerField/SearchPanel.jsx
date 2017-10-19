/**
 * PickerField Component for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Promise from 'lie';
import NattyFetch from 'natty-fetch/dist/natty-fetch';
import Context from '../Context';
import ScrollView from '../ScrollView';
import Button from '../Button';
import IconCheck from 'salt-icon/lib/Check';
import IconCheckRound from 'salt-icon/lib/CheckRound';
import Popup from '../Popup';
import SearchBar from '../SearchBar';
import SearchResult from './SearchResult';
import utils from './utils';

class SearchPanel extends React.Component {

  static renderSearchTips() {
    return <div />;
  }

  constructor(props) {
    super(props);
    const t = this;
    const value = props.value;
    t.state = {
      value: value || [],
      results: [],
      openResults: [],
      searchMode: false,
      searchEmpty: false,
      isOpenSearch: false,
      hasKeyword: false,
      popupVisible: false,
    };
    t.delaySearch = utils.debounce(t.search.bind(t), t.props.searchDelay);
    t.handleLeaveResultView = t.handleLeaveResultView.bind(t);
  }

  componentDidMount() {
    const t = this;
    if (t.props.fetchUrl && t.props.fetchDataOnOpen) {
      t.delaySearch('');
      t.setState({
        isOpenSearch: true,
      });
    }
  }

  search(term) {
    const t = this;
    if (t.fetch) {
      t.fetch.abort();
      if (t.state.isOpenSearch) {
        t.setState({
          isOpenSearch: false,
        });
      }
    }
    t.fetch = NattyFetch.create({
      url: t.props.fetchUrl,
      jsonp: t.props.dataType ? t.props.dataType === 'jsonp' : (/\.jsonp/.test(t.props.fetchUrl)),
      data: t.props.beforeFetch({ q: term }),
      fit: t.props.fitResponse,
      Promise,
    });
    t.fetch().then((data) => {
      const fetchData = t.props.afterFetch(data);
      const state = {};
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
    }).catch((e) => {
      console.error(e); // eslint-disable-line no-console
    });
  }

  handleItemClick(item) {
    const t = this;

    if (t.props.multiple) {
      const value = this.state.value;

      let found = -1;
      value.some((v, i) => {
        if (v.value === item.value) {
          found = i;
          return true;
        }
        return false;
      });

      if (found > -1) {
        value.splice(found, 1);
        t.setState({
          value,
        });
      } else {
        t.setState({
          value: [...value, item],
        });
      }
    } else {
      t.setState({
        value: [item],
      }, () => {
        t.handleConfirm();
      });
    }
  }

  handleSearchChange(term) {
    const t = this;

    if (term) {
      t.delaySearch(term);
      t.setState({
        hasKeyword: true,
        results: [],
      });
    } else {
      // abort exists fetch request
      if (t.fetch) {
        t.fetch.abort();
      }
      t.setState({
        hasKeyword: false,
        results: [],
      });
    }
  }

  handleSearchEnter() {
    const t = this;
    t.setState({
      searchMode: true,
    });
  }

  handleSearchLeave() {
    const t = this;
    t.setState({
      searchMode: false,
    });
  }

  handleConfirm() {
    this.props.onConfirm(this.state.value);
  }

  handleEnterResultView() {
    this.setState({
      popupVisible: true,
    }, () => {
      history.pushState({
        PickerField: 'SearchPanel.result',
      }, '', utils.addUrlParam('PICKER', Date.now()));

      window.addEventListener('popstate', this.handleLeaveResultView, false);
    });
  }

  handleLeaveResultView(e) {
    const { state } = e;
    if (state && state.PickerField === 'SearchPanel.index') {
      window.removeEventListener('popstate', this.handleLeaveResultView, false);
      this.setState({
        popupVisible: false,
      });
    }
  }

  isItemChecked(item) {
    const t = this;
    let found = -1;
    t.state.value.forEach((v, i) => {
      if (v.value === item.value) {
        found = i;
      }
    });
    return found > -1;
  }

  isEmpty() {
    return this.state.value.length === 0;
  }

  renderEmpty() {
    const t = this;
    return (
      <div className={Context.prefixClass('picker-field-search-empty')}>
        <div className={Context.prefixClass('picker-field-search-empty-inner')}>{t.props.searchNotFoundContent}</div>
      </div>
    );
  }

  renderResults(results) {
    const t = this;
    return (
      <div className={Context.prefixClass('picker-field-search-results')}>
        {results.map((item, index) => t.renderResultItem(item, index))}
      </div>
    );
  }

  renderResultItem(item, index) {
    const t = this;

    const checked = t.isItemChecked(item);
    let iconHTML;
    if (t.props.multiple) {
      iconHTML = (
        <IconCheckRound
          className={classnames({
            'un-checked': !checked,
          })}
          width={20}
          height={20}
        />
      );
    } else if (checked) {
      iconHTML = (
        <IconCheck
          width={14}
          height={14}
        />
      );
    }

    return (
      <div
        key={index}
        className={classnames(Context.prefixClass('picker-field-search-result-item'), Context.prefixClass('clear'))}
        onClick={() => {
          t.handleItemClick(item);
        }}
      >
        <span className={Context.prefixClass('picker-field-search-result-item-icon')}>
          {iconHTML}
        </span>
        <span className={Context.prefixClass('picker-field-search-result-item-entry')}>{t.props.formatter(item)}</span>
      </div>
    );
  }

  renderResultCondition() {
    const t = this;
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

  render() {
    const t = this;
    const {
      showSearch,
      multiple,
    } = t.props;
    const pageSize = utils.getPageSize();
    const length = this.state.value.length;
    const resultProps = {
      value: [...this.state.value],
      confirmText: this.props.confirmText,
      onConfirm: (value) => {
        this.setState({
          value,
        }, () => {
          history.go(-1);
        });
      },
      formatter: this.props.formatter,
      selectText: this.props.selectText,
    };
    return (
      <div
        className={classnames(Context.prefixClass('picker-field-searchpanel'), {
          multiple,
        })}
        style={{
          width: `${pageSize.width}px`,
          height: `${pageSize.height}px`,
        }}
      >
        <div className={Context.prefixClass('picker-field-searchpanel-inner')}>
          {showSearch ? (
            <div className={Context.prefixClass('picker-field-searchpanel-header')}>
              <SearchBar
                ref={(c) => {
                  t.searchBar = c;
                }}
                searchText={t.props.searchText}
                cancelText={t.props.cancelText}
                className={Context.prefixClass('picker-field-searchpanel-search')}
                onChange={(val) => {
                  t.handleSearchChange(val);
                }}
                onEnterSearchMode={() => {
                  t.handleSearchEnter();
                }}
                onLeaveSearchMode={() => {
                  t.handleSearchLeave();
                }}
              />
            </div>
          ) : null}
          <div className={Context.prefixClass('picker-field-searchpanel-content')}>
            <ScrollView>
              {t.renderResultCondition()}
            </ScrollView>
          </div>
          {multiple ? (
            <div className={Context.prefixClass('picker-field-searchpanel-footer')}>
              <Button
                className={Context.prefixClass('picker-field-searchpanel-btn-ok')}
                size="small"
                display="inline"
                disabled={t.isEmpty()}
                onClick={(e) => {
                  t.handleConfirm(e);
                }}
              >{t.props.confirmText}</Button>
              <div
                className={Context.prefixClass('picker-field-searchpanel-result-summary')}
                onClick={(e) => {
                  t.handleEnterResultView(e);
                }}
              >
                <a>{t.props.selectText}{length}</a>
              </div>
            </div>
          ) : null}
        </div>
        <Popup content={<SearchResult {...resultProps} />} animationType="slide-left" visible={this.state.popupVisible} />
      </div>
    );
  }
}

SearchPanel.defaultProps = {
  onConfirm() {},
  showSearch: true,
  multiple: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchPanel.propTypes = {
  value: React.PropTypes.array,
  searchText: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onConfirm: React.PropTypes.func,
  fetchUrl: React.PropTypes.string.isRequired,
  fetchDataOnOpen: React.PropTypes.bool,
  dataType: React.PropTypes.string,
  beforeFetch: React.PropTypes.func,
  fitResponse: React.PropTypes.func,
  afterFetch: React.PropTypes.func,
  showSearch: React.PropTypes.bool,
  searchTitle: React.PropTypes.string,
  searchDelay: React.PropTypes.number,
  searchPlaceholder: React.PropTypes.string,
  searchNotFoundContent: React.PropTypes.string,
  formatter: React.PropTypes.func,
  multiple: React.PropTypes.bool,
  selectText: React.PropTypes.string,
};

SearchPanel.displayName = 'SearchPanel';

export default SearchPanel;
