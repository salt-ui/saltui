/**
 * SearchBar Component Demo for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

/* eslint-disable react/no-multi-comp */
import React from 'react';
import SearchBar from 'salt-search-bar';

const { WithContainer } = SearchBar;

// build之后, 测试一下下面一行, 把上面一行注释掉
// const SearchBar = require('../../dist');

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  fetchData(params = {}) {
    const { keyword } = params;
    if (!keyword) {
      return;
    }
    this.setState({
      keyword,
    });
  }

  render() {
    if (this.state.keyword) {
      return <div className="list">{`这里是 ${this.state.keyword} 的搜索结果`}</div>;
    }
    return null;
  }
}

class Demo extends React.Component {
  render() {
    const t = this;
    const props = {
      locale: 'zh_CN',
      instantSearch: true,
      hasHistory: true,
      searchDelay: 450,
      // placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
      onEnter: () => { console.log('enter'); },
      onExit: () => { console.log('exit'); },
      onChange: (value) => {
        console.log(`Typing>>${value}`);
      },
      onSearch: (value) => {
        console.info(`Do search>>${value}`);
        if (t.list) {
          t.list.fetchData({
            keyword: value,
          });
        }
      },
    };
    return (
      <div>
        <div className="head">搜索栏</div>
        <SearchBar {...props} />
        <div className="head">带容器的搜索栏</div>
        <WithContainer {...props}>
          <List ref={(c) => { this.list = c; }} />
        </WithContainer>
      </div>
    );
  }
}

export default Demo;
