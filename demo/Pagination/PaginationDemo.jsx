/**
 * Pagination Component Demo for tingle
 * @author wb-dbl257323
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Pagination from 'salt-pagination';

class PaginationDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  render() {
    return (
      <div>
        <h1>tingle-pagination</h1>
        <h5>默认</h5>
        <Pagination current={55} total={1000} pageSize={10} />
        <br />
        <h5>外部控制页码</h5>
        <Pagination
          current={this.state.current} total={101} pageSize={10}
          onChange={(current) => {
            console.log(current);
            this.setState({ current });
          }}
        />
        <br />
        <h5>Simple</h5>
        <Pagination
          simple
          current={this.state.current} total={101} pageSize={10}
          onChange={(current) => {
            this.setState({ current });
          }}
        />
        <br />
        <h5>自定义样式</h5>
        <Pagination
          className={'custom-class'}
          current={this.state.current} total={101} pageSize={10}
          onChange={(current) => {
            this.setState({ current });
          }}
        />
      </div>
    );
  }
}

export default PaginationDemo;
