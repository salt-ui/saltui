/**
 * SearchBar Component for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import IconSearch from 'salt-icon/lib/Search';
import IconCrossRound from 'salt-icon/lib/CrossRound';
import debounce from 'lodash/debounce';
import React from 'react';
import Context from '../Context';
import locale from './locale';
import { getLocale } from '../Utils';

const formatPlaceholder = (placeholder = {}) => {
  const newPlaceholder = {};
  Object.keys(placeholder).forEach((key) => {
    newPlaceholder[getLocale(key)] = placeholder[key];
  });
  return newPlaceholder;
};


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
      });
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
    const { value } = e.target;
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
    const { value } = e.target;
    if (e.keyCode === 13) {
      this.doDebouceSearch.cancel();
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
    const i18n = locale[getLocale(t.props.locale)];
    let { placeholder } = t.props;
    if (typeof placeholder === 'object' && placeholder !== null) {
      placeholder = formatPlaceholder(placeholder)[getLocale(t.props.locale)];
    }
    const { keyword } = t.state;
    return (
      <div
        className={classnames(Context.prefixClass('search-bar'), {
          [t.props.className]: !!t.props.className,
          [getLocale(t.props.locale)]: !!getLocale(t.props.locale),
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
                  width={this.props.iconWidth}
                  height={this.props.iconHeight}
                  fill={this.props.iconColor}
                />
                <span
                  className={classnames(Context.prefixClass('omit search-bar-placeholder'), {
                    hidden: keyword,
                  })}
                >
                  {placeholder}
                </span>
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
              height={this.props.iconHeight}
              fill={this.props.iconColor}
            />
          </div>
          <span
            className={Context.prefixClass('search-bar-btn')}
            onClick={(e) => { t.exitSearch(e); }}
          >{i18n.cancel}
          </span>
        </div>
      </div>);
  }
}

const noop = () => { };

SearchBar.defaultProps = {
  iconWidth: 20,
  iconHeight: 20,
  iconColor: '#bcbcbc',
  locale: 'zh-cn',
  value: '',
  placeholder: {
    'zh-cn': '搜索',
    'en-us': 'Search',
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
  historyName: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchBar.propTypes = {
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  iconColor: PropTypes.string,
  locale: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  hasHistory: PropTypes.bool,
  historyName: PropTypes.string,
  instantSearch: PropTypes.bool,
  searchDelay: PropTypes.number,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
  exitAfterEnter: PropTypes.bool,
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
