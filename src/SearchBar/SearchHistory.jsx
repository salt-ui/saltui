/**
 * SearchHistory Component for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import locale from './locale';
import { getLocale } from '../Utils';

const Storage = {

  toJSON(data) {
    return JSON.stringify(data);
  },

  fromJSON(data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      parsedData = null;
    }
    return parsedData;
  },

  getItem(key) {
    return this.fromJSON(localStorage.getItem(key));
  },

  setItem(key, data) {
    return localStorage.setItem(key, this.toJSON(data));
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },
};

class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.HISTORY_KEY = props.name;
  }

  onSelect(keyword) {
    this.props.onSelect(keyword);
  }

  getHistory() {
    const list = Storage.getItem(this.HISTORY_KEY) || [];
    return list.slice(0, this.props.displayCount);
  }

  addItem(keyword) { // add new history item
    const t = this;
    const list = t.getHistory();
    const index = list.indexOf(keyword);
    if (index !== -1) {
      list.splice(index, 1);
    }
    list.unshift(keyword);
    Storage.setItem(t.HISTORY_KEY, list);
  }

  clearHistory() {
    const t = this;
    Storage.removeItem(t.HISTORY_KEY);
    this.setState({
      historyList: [],
    });
  }

  hide() {
    if (!this.isHidden) {
      if (this.root) {
        this.root.style.display = 'none';
      }
      this.isHidden = true;
    }
  }

  render() {
    const t = this;
    const list = t.getHistory();
    if (list.length === 0) {
      return null;
    }
    const i18n = locale[getLocale(t.props.locale)];
    /* eslint-disable react/no-array-index-key */
    return (
      <div ref={(c) => { this.root = c; }} className={classnames(`${this.props.prefixCls}-history`, t.props.className)}>
        <div className={`${this.props.prefixCls}-history-header`}>
          {i18n.history}
          <span
            className={`${this.props.prefixCls}-history-action`}
            onClick={() => { t.clearHistory(); }}
          >{i18n.clear}
          </span>
        </div>
        <ul className={`${this.props.prefixCls}-history-list`}>
          {list.map((item, idx) =>
            <li key={idx}><span onClick={() => { t.onSelect(item); }}>{item}</span></li>)
          }
        </ul>
      </div>);
    /* eslint-enable react/no-array-index-key */
  }
}

SearchHistory.defaultProps = {
  name: 'SEARCH_BAR_HISTORY',
  keyword: '',
  displayCount: 8,
  onSelect: () => {},
  prefixCls: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchHistory.propTypes = {
  prefixCls: PropTypes.string,
  name: PropTypes.string,
  keyword: PropTypes.string,
  onSelect: PropTypes.func,
  displayCount: PropTypes.number,
};

SearchHistory.displayName = 'SearchHistory';

export default SearchHistory;
