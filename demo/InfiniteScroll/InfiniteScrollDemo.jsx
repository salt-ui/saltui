/**
 * InfiniteScroll Component Demo for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import InfiniteScroll from 'salt-infinite-scroll';

function Item(props) {
  return <div className="demo-item">{props.children}</div>;
}

class InfiniteScrollDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
    };
  }

  onLoad() {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false, page: this.state.page + 1 });
    }, 2000);
  }

  renderItems() {
    const pages = [];

    for (let p = this.state.page; p >= 0; p--) {
      pages.push(<div key={`page-${p}`}>
        <Item>{`page ${p} item 1`}</Item>
        <Item>{`page ${p} item 2`}</Item>
      </div>);
    }

    return pages;
  }

  render() {
    return (<InfiniteScroll loading={this.state.loading} onLoad={this.onLoad.bind(this)} >
      <div className="demo">
        <div className="demo-inner">
          {this.renderItems()}
        </div>
      </div>
    </InfiniteScroll>);
  }
}

export default InfiniteScrollDemo;
