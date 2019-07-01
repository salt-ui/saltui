/**
 * PickerField Component for SaltUI
 * @author longyan
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconCheck from 'salt-icon/lib/Check';
import IconCheckRound from 'salt-icon/lib/CheckRound';
import Promise from 'lie';
import NattyFetch from 'natty-fetch';
import Context from '../Context';
import ScrollView from '../ScrollView';
import Button from '../Button';
import Popup from '../Popup';
import SearchBar from '../SearchBar';
import Tab from '../Tab';
import SearchResult from './SearchResult';
import GroupingBar from './GroupingBar';
import utils from './utils';
import i18n from './i18n';

class SearchPanel extends React.Component {
  static getSearchTips() {
    return <div />;
  }

  constructor(props) {
    super(props);
    const t = this;
    const { value, categories } = props;
    t.state = {
      value: value || [],
      results: [],
      searchMode: false,
      popupVisible: false,
      selectedResult: undefined,
    };
    if (categories) {
      t.state.activeCategory = categories[0].value;
    }
    t.delaySearch = utils.debounce(t.search.bind(t), t.props.searchDelay);
    t.handleLeaveResultView = t.handleLeaveResultView.bind(t);
    t.groupEl = {};
  }

  componentDidMount() {
    const t = this;
    if (t.props.fetchDataOnOpen) {
      t.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.fetchUrl && this.props.options !== prevProps.options) {
      this.fetchData({ term: this.searchBar ? this.searchBar.getKeyword() : '' });
    }
  }


  setData(fetchData) {
    const t = this;
    const state = {};
    if (t.props.grouping) {
      const groups = {};
      fetchData.sort((a, b) => {
        const phoneticA = t.props.phonetic(a);
        const phoneticB = t.props.phonetic(b);
        let compare = 0;
        phoneticA.some((string, i) => {
          if (!phoneticB[i] || string > phoneticB[i]) {
            compare = 1;
            return true;
          } else if (string < phoneticB[i]) {
            compare = -1;
            return true;
          }
          return false;
        });
        return compare;
      });
      fetchData.forEach((item) => {
        let group = (t.props.phonetic(item)[0] || '#')[0].toUpperCase();
        if (group < 'A' || group > 'Z') {
          group = '#';
        }
        groups[group] = groups[group] || [];
        groups[group].push(item);
      });
      fetchData = Object.keys(groups)
        .sort((a, b) => utils.alphabet.indexOf(a) - utils.alphabet.indexOf(b))
        .map(key => ({
          title: key,
          items: groups[key],
        }));
    }
    state.results = fetchData;
    t.setState(state);
  }

  fetchRemoteData({ term } = {}) {
    const t = this;
    if (t.fetch) {
      t.fetch.abort();
    }
    if (t.props.fetchUrl) {
      t.fetch = NattyFetch.create({
        url: t.props.fetchUrl,
        method: t.props.fetchMethod,
        jsonp: t.props.dataType ? t.props.dataType === 'jsonp' : (/\.jsonp/.test(t.props.fetchUrl)),
        data: t.props.beforeFetch({ q: term }),
        fit: t.props.fitResponse,
        Promise,
      });
      t.fetch().then((data) => {
        const fetchData = t.props.afterFetch(data);
        t.setData(fetchData);
      }).catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
    }
  }

  fetchLocalData({ term } = {}) {
    const t = this;
    const options = t.props.options || [];
    if (t.props.filterOption) {
      if (typeof t.props.filterOption === 'function') {
        const filteredData = term
          ? options.filter(item => t.props.filterOption(term, item))
          : options;
        t.setData(filteredData);
      } else {
        if (!t.searchIndex) {
          const processFunc = (value) => {
            const phonetic = t.props.phonetic(value);
            return [
              t.props.formatter(value, utils.FORMATTER_TYPES.OPTION_FORMATTER)
                .toString().toLowerCase(),
              phonetic.join('').toLowerCase(),
              phonetic.map(str => (str[0] || '')).join('').toLowerCase(),
            ];
          };
          t.searchIndex = options.map(item => ({
            indexes: processFunc(item),
            item,
          }));
        }
        const filteredData = term ?
          t.searchIndex.filter(entity => entity.indexes.some(indexText =>
            indexText.indexOf(term.toLowerCase()) > -1)).map(entity => entity.item)
          : options;
        t.setData(filteredData);
      }
    } else {
      t.setData(options);
    }
  }

  fetchData({ term } = {}) {
    const t = this;
    if (t.props.fetchUrl) {
      t.fetchRemoteData({ term });
    } else {
      t.fetchLocalData({ term });
    }
  }

  search(term) {
    const t = this;
    // t.fetchData({ term });

    if (t.props.fetchUrl || t.props.filterOption) {
      t.fetchData({ term });
    }
    t.props.onSearch(term);
  }

  handleItemClick = (item) => {
    const t = this;

    if (t.props.multiple) {
      const { value } = this.state;

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
    t.delaySearch(term);
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
      window.history.pushState({
        PickerField: 'SearchPanel.result',
      }, '', utils.addUrlParam('PICKER', Date.now()));

      window.addEventListener('popstate', this.handleLeaveResultView, false);
    });
  }

  handleLeaveResultView(e) {
    const { state } = e;
    if (state && state.PickerField === this.props.historyStamp) {
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

  selectGrouping(key) {
    const t = this;
    const element = t.groupEl[key];
    if (element) {
      element.scrollIntoView();
    }
  }

  isEmpty() {
    return this.state.value.length === 0;
  }

  renderEmpty() {
    const t = this;
    return (
      <div className={Context.prefixClass('picker-search-empty')}>
        <div className={Context.prefixClass('picker-search-empty-inner')}>{t.props.searchNotFoundContent}</div>
      </div>
    );
  }

  renderResults(results, options = {}) {
    const t = this;
    const { shouldShowInCategory } = this.props;
    const { category } = options;
    return (
      <div className={Context.prefixClass('picker-search-results')}>
        {t.props.grouping ?
          t.renderGroups(results, { category }) :
          (category ? results.filter(item => shouldShowInCategory(category, item)) : results).map((item, index) => t.renderResultItem(item, index))
        }
      </div>
    );
  }

  renderGroups(groups, options = {}) {
    const t = this;
    const { category } = options;
    const { shouldShowInCategory } = this.props;
    let newGroups = groups;
    if (category) {
      newGroups = groups.map(group => ({
        ...group,
        items: group.items.filter(item => shouldShowInCategory(category, item)),
      })).filter(group => group.items.length > 0);
    }
    return (
      newGroups.map(group => (
        <div
          className={Context.prefixClass('picker-grouping')}
          key={group.title}
          ref={(ref) => { t.groupEl[group.title] = ref; }}
        >
          <div className={Context.prefixClass('picker-grouping-title')}>
            <p className={Context.prefixClass('picker-grouping-title-inner')}>{group.title}</p>
          </div>
          {group.items.map((item, index) => t.renderResultItem(item, index))}
        </div>
      ))
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
        className={classnames(Context.prefixClass('picker-search-result-item'), Context.prefixClass('clear'))}
        onClick={() => {
          t.handleItemClick(item);
        }}
      >
        <span className={classnames(
          Context.prefixClass('picker-search-result-item-icon'),
          t.props.grouping ? null : Context.prefixClass('picker-right-icon'),
        )}
        >{iconHTML}
        </span>
        <span className={classnames(Context.prefixClass('picker-search-result-item-entry'), t.props.grouping ? null : Context.prefixClass('picker-right-icon'))}>{t.props.formatter(item, utils.FORMATTER_TYPES.OPTION_FORMATTER)}</span>
      </div>
    );
  }

  renderResultCondition() {
    const t = this;
    if (!t.state.results.length) {
      return t.renderEmpty();
    }
    return t.renderResults(t.state.results);
  }

  renderGroupingBar() {
    const t = this;
    const { activeCategory } = this.state;
    const { shouldShowInCategory } = this.props;
    let groups = t.state.results;
    if (activeCategory) {
      groups = groups.map(group => ({
        ...group,
        items: group.items.filter(item => shouldShowInCategory(activeCategory, item)),
      })).filter(group => group.items.length > 0);
    }
    const keys = groups.map(group => group.title);
    return (
      <GroupingBar
        keys={keys}
        indicator={t.props.groupingIndicator}
        onSelect={t.selectGrouping.bind(t)}
      />
    );
  }

  renderContent() {
    const { customRender } = this.props
    return (
      <div>
        {
          customRender
            ? typeof customRender === 'function'
              ? customRender()
              : customRender
            : null
        }
        {
          this.renderTab()
        }
      </div>
    )
  }

  renderTab() {
    const { categories } = this.props;
    if (categories) {
      return (
        <Tab
          wrapClassName={Context.prefixClass('picker-searchpanel-tab-wrap')}
          activeKey={this.state.activeCategory}
          onChange={({ activeKey }) => {
            this.setState({
              activeCategory: activeKey,
            });
          }}
        >
          {categories.map(item => (
            <Tab.Item key={item.value} title={item.text}>
              <ScrollView>
                {this.renderResults(this.state.results, { category: item.value })}
              </ScrollView>

            </Tab.Item>
          ))}
        </Tab>
      );
    }
    return <ScrollView>{this.renderResultCondition()}</ScrollView>;
  }

  render() {
    const t = this;
    const {
      showSearch,
      multiple,
      locale,
    } = t.props;
    const pageSize = utils.getPageSize();
    const { length } = this.state.value;

    const resultProps = {
      value: [...this.state.value],
      confirmText: this.props.confirmText,
      onConfirm: (value) => {
        this.setState({
          value,
          popupVisible: false,
        }, () => {
          window.history.go(-1);
        });
      },
      formatter: this.props.formatter,
      locale: this.props.locale,
    };
    return (
      <div
        className={classnames(Context.prefixClass('picker-searchpanel'), {
          multiple,
        })}
        style={{
          width: `${pageSize.width}px`,
          height: `${pageSize.height}px`,
        }}
      >
        <div className={Context.prefixClass('picker-searchpanel-inner')}>
          {showSearch ? (
            <div className={Context.prefixClass('picker-searchpanel-header')}>
              <SearchBar
                ref={(c) => {
                  t.searchBar = c;
                }}
                locale={t.props.locale}
                placeholder={t.props.searchPlaceholder}
                className={Context.prefixClass('picker-searchpanel-search')}
                onChange={(val) => {
                  t.handleSearchChange(val);
                }}
                onEnter={() => {
                  t.handleSearchEnter();
                }}
                onExit={() => {
                  t.handleSearchLeave();
                }}
              />
            </div>
          ) : null}
          <div className={Context.prefixClass('picker-searchpanel-content')}>
            {
              t.state.searchMode
                ? (<ScrollView>{t.renderResultCondition()}</ScrollView>)
                : t.renderContent()
            }
            {t.props.grouping ? t.renderGroupingBar() : null}
          </div>
          {multiple ? (
            <div className={Context.prefixClass('picker-searchpanel-footer')}>
              <Button
                className={Context.prefixClass('picker-searchpanel-btn-ok')}
                size="small"
                display="inline"
                onClick={(e) => {
                  t.handleConfirm(e);
                }}
              >{t.props.confirmText}
              </Button>
              <div
                className={Context.prefixClass('picker-searchpanel-result-summary')}
                onClick={(e) => {
                  t.handleEnterResultView(e);
                }}
              >
                <a href="javascript:void(0);">{t.props.resultFormatter ? t.props.resultFormatter(this.state.value) : i18n[locale].selected(length)}</a>
              </div>
            </div>
          ) : null}
        </div>
        <Popup stopBodyScrolling={false} content={<SearchResult {...resultProps} />} animationType="slide-left" visible={this.state.popupVisible} />
      </div>
    );
  }
}

SearchPanel.defaultProps = {
  onConfirm() { },
  onSearch() { },
  showSearch: true,
  multiple: false,
  value: undefined,
  confirmText: undefined,
  fetchDataOnOpen: undefined,
  dataType: undefined,
  beforeFetch: undefined,
  fitResponse: undefined,
  afterFetch: undefined,
  searchDelay: undefined,
  searchPlaceholder: undefined,
  searchNotFoundContent: undefined,
  formatter() { },
  phonetic: undefined,
  options: undefined,
  fetchUrl: undefined,
  fetchMethod: 'GET',
  grouping: undefined,
  locale: undefined,
  resultFormatter: undefined,
  historyStamp: undefined,
  filterOption: true,
  categories: undefined,
  shouldShowInCategory: () => true,
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchPanel.propTypes = {
  value: PropTypes.array,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  onSearch: PropTypes.func,
  options: PropTypes.array,
  fetchUrl: PropTypes.string,
  fetchMethod: PropTypes.string,
  fetchDataOnOpen: PropTypes.bool,
  dataType: PropTypes.string,
  beforeFetch: PropTypes.func,
  fitResponse: PropTypes.func,
  afterFetch: PropTypes.func,
  showSearch: PropTypes.bool,
  searchDelay: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  searchNotFoundContent: PropTypes.string,
  formatter: PropTypes.func,
  phonetic: PropTypes.func,
  multiple: PropTypes.bool,
  grouping: PropTypes.bool,
  locale: PropTypes.string,
  resultFormatter: PropTypes.func,
  historyStamp: PropTypes.string,
  filterOption: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  categories: PropTypes.array,
  shouldShowInCategory: PropTypes.func,
};

SearchPanel.displayName = 'SearchPanel';

export default SearchPanel;
