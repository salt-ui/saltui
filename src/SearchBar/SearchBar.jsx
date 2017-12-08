/**
 * SearchBar Component for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const classnames = require('classnames');
const debounce = require('lodash/debounce');
const React = require('react');
const Context = require('../Context');
const IconSearch = require('salt-icon/lib/Search');
const IconCrossRound = require('salt-icon/lib/CrossRound');

const locale = require('./locale');


class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: props.isActive, // whether in search mode
      keyword: props.value,
    };
    // this.lastSearch = '';
    this.doDebouceSearch = debounce(this.doSearch, props.searchDelay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isActive: nextProps.isActive,
      });
    }
    if (nextProps.value !== this.props.value) {
      this.setState({
        keyword: nextProps.value,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isActive && this.state.isActive) {
      this.input.focus();
    } else if (prevState.isActive && !this.state.isActive) {
      this.input.blur();
    }
  }

  onChange(e) {
    const value = e.target.value;
    const t = this;
    this.setState({
      keyword: value,
    }, () => {
      if (t.props.instantSearch) {
        t.doDebouceSearch('input');
      }
    });
    t.props.onChange(value, 'input', e);
  }

  onKeyUp(e) {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      this.doSearch('click', value);
      if (this.props.exitAfterEnter) {
        this.exitSearch();
      }
      this.input.blur();
    }
  }

  doSearch(from, keyword) {
    const t = this;
    const key = keyword || t.state.keyword;
    t.setState({
      keyword: key,
    }, () => {
      t.props.onSearch(key, from);
    });
  }

  clearKeyword() {
    const t = this;
    t.setState({
      keyword: '',
    }, () => {
      t.props.onChange('', 'clear', null);
      t.input.focus();
    });
    
  }

  enterSearch() {
    const t = this;
    if (t.props.disabled) {
      return;
    }
    t.setState({
      isActive: true,
    });
    t.input.focus();
    t.props.onEnter();
  }

  exitSearch() {
    const t = this;
    this.input.blur();
    t.setState({
      isActive: false,
      keyword: '',
    }, () => {
      t.props.onExit();
    });
  }

  render() {
    const t = this;
    const i18n = locale[t.props.locale];
    let placeholder = t.props.placeholder;
    if (typeof placeholder === 'object' && placeholder !== null) {
      placeholder = placeholder[t.props.locale];
    }
    const keyword = t.state.keyword;
    return (
      <div
        className={classnames(Context.prefixClass('search-bar'), {
          [t.props.className]: !!t.props.className,
          [t.props.locale]: !!t.props.locale,
          active: t.state.isActive,
        })}
      >
        <div
          className={classnames(Context.prefixClass('search-bar-wrapper'), {
            [t.props.className]: !!t.props.className,
          })}
        >
          <div className={Context.prefixClass('search-bar-box')}>
            <div
              className={Context.prefixClass('search-bar-holder-wrapper')}
              onClick={() => { t.enterSearch(); }}
            >
              <div className={Context.prefixClass('search-bar-holder')}>
                <IconSearch
                  className={Context.prefixClass('search-bar-icon-search')}
                  width={this.props.iconWidth} height={this.props.iconHeight}
                  fill={this.props.iconColor}
                />
                <span
                  className={classnames(Context.prefixClass('omit search-bar-placeholder'), {
                    hidden: keyword,
                  })}
                >
                  {placeholder}</span>
              </div>
            </div>
            <form action="javascript:;">
              <input
                ref={(c) => { t.input = c; }}
                type="search"
                className={Context.prefixClass('search-bar-input')}
                value={keyword}
                onChange={(e) => { t.onChange(e); }}
                onKeyUp={(e) => { t.onKeyUp(e); }}
              />
            </form>
            <IconCrossRound
              onClick={(e) => { t.clearKeyword(e); }}
              className={classnames(Context.prefixClass('search-bar-icon-cross'), {
                active: keyword,
              })}
              width={this.props.iconWidth}
              height={this.props.iconHeight} fill={this.props.iconColor}
            />
          </div>
          <span
            className={Context.prefixClass('search-bar-btn')}
            onClick={(e) => { t.exitSearch(e); }}
          >{i18n.cancel}</span>
        </div>
      </div>);
  }
}

const noop = () => { };

SearchBar.defaultProps = {
  iconWidth: 20,
  iconHeight: 20,
  iconColor: '#bcbcbc',
  locale: 'zh_CN',
  value: '',
  placeholder: {
    zh_CN: '搜索',
    en_US: 'Search',
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
  exitAfterEnter: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchBar.propTypes = {
  iconWidth: React.PropTypes.number,
  iconHeight: React.PropTypes.number,
  iconColor: React.PropTypes.string,
  locale: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  hasHistory: React.PropTypes.bool,
  historyName: React.PropTypes.string,
  instantSearch: React.PropTypes.bool,
  searchDelay: React.PropTypes.number,
  onChange: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onEnter: React.PropTypes.func,
  onExit: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  exitAfterEnter: React.PropTypes.bool,
};

SearchBar.displayName = 'SearchBar';

module.exports = SearchBar;
