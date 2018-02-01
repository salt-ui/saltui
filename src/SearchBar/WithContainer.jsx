import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';

const addUrlParam = (name, value) => {
  let currentUrl = window.location.href;
  let reg;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(`${name}=[-\\w]{4,25}`, 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, `${name}=${value}`);
    } else {
      currentUrl += `&${name}=${value}`;
    }
  } else {
    currentUrl += `?${name}=${value}`;
  }
  return currentUrl;
};

/* eslint-disable react/prefer-stateless-function */

class WithContainer extends React.Component {
  static defaultProps = {
    prefixCls: 't-search-bar',
    onEnter: () => {},
    onExit: () => {},
    onSearch: () => {},
    hasHistory: true,
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    onSearch: PropTypes.func,
    hasHistory: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.listener = this.exitStatusSearch.bind(this);
    this.state = {};
  }


  componentWillUnmount() {
    this.exitStatusSearch();
  }


  onHistorySelect(value) {
    const t = this;
    t.searchBar.doSearch('history', value);
    t.history.hide();
  }

  handleSearchEnter = () => {
    window.history.pushState(null, '', addUrlParam('SEARCH_BAR', Date.now()));
    window.addEventListener('popstate', this.listener, false);
    // document.body.style.overflow = 'hidden';
    this.setState({
      isActive: true,
    }, () => {
      this.props.onEnter();
    });
  }

  handleSearchExit = () => {
    window.history.go(-1);
  }

  handleSearch = (key, from) => {
    this.props.onSearch(key, from);
    this.history.hide();
    if (from !== 'input' && this.props.hasHistory) {
      this.history.addItem(key);
    }
    if (key === this.lastSearch) {
      return;
    }
    this.lastSearch = key;
  }

  exitStatusSearch() {
    window.removeEventListener('popstate', this.listener, false);
    document.body.style.overflow = '';
    this.setState({
      isActive: false,
    }, () => {
      this.props.onExit();
    });
  }

  renderHistory() {
    const t = this;
    if (!t.props.hasHistory) {
      return null;
    }
    return (
      <SearchHistory
        ref={(c) => { this.history = c; }}
        locale={t.props.locale}
        name={t.props.historyName}
        prefixCls={t.props.prefixCls}
        className={classnames({ active: !t.state.keyword })}
        onSelect={(value) => { t.onHistorySelect(value); }}
      />
    );
  }

  renderResult() {
    const t = this;
    return (
      <div
        className={classnames(`${t.props.prefixCls}-result`, {
          active: t.state.keyword,
        })}
      >{t.props.children}
      </div>
    );
  }

  render() {
    const t = this;
    return (
      <div>
        <div
          className={classnames(`${this.props.prefixCls}-container-mask`, {
            [`${this.props.prefixCls}-container-mask__active`]: this.state.isActive,
          })}
        />
        <div
          className={classnames(`${this.props.prefixCls}-container`, {
            [`${this.props.prefixCls}-container__active`]: this.state.isActive,
          })}
        >
          <SearchBar
            {...this.props}
            ref={(c) => { this.searchBar = c; }}
            onEnter={this.handleSearchEnter}
            onExit={this.handleSearchExit}
            onSearch={this.handleSearch}
            isActive={this.state.isActive}
          />
          {this.state.isActive ?
            <div className={`${this.props.prefixCls}-list`}>
              {t.renderHistory()}
              {t.renderResult()}
            </div> : null}
        </div>
      </div>
    );
  }
}

export default WithContainer;
