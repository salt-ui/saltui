/**
 * Badge Component Demo for SaltUI
 * @author minjie.lmj
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import Badge from 'salt-badge';


const monthArray = [
  { value: 0, text: '一月' }, { value: 1, text: '二月' },
  { value: 2, text: '三月' }, { value: 3, text: '四月' },
  { value: 4, text: '五月' }, { value: 5, text: '六月' },
  { value: 6, text: '七月' }, { value: 7, text: '八月' },
  { value: 8, text: '九月' }, { value: 9, text: '十月' },
  { value: 10, text: '十一月' }, { value: 11, text: '十二月' },
];

class BadgeDemo extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    t.state = {
      value: null,
      value1: monthArray[6],
    };
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <h1>Badge作为容器: </h1>
        <div className="demo-line">
          <Badge count={0}>
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge count={5}>
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge count={100}>
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge dot>
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text="new">
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text="new" corner="lt">
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text="new" corner="lb">
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text="new" corner="rt">
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text="new" corner="rb">
            <span href="#1" className="demo-item" />
          </Badge>
        </div>
        <h1 className="extra-head">Badge作为子元素: </h1>
        <div
          className="demo-line"
        >
          <Badge
            text="促"
            style={{
              marginRight: 10,
            }}
          />
          <Badge
            text="减"
            style={{
              marginRight: 10,
            }}
          />
          <Badge
            text="免"
            style={{
              marginRight: 10,
              background: '#66BC5C',
            }}
          />
        </div>

        <div
          className="demo-line"
          style={{
            position: 'relative',
            height: 100,
            width: '100%',
            background: '#e8e8e8',
            marginTop: 20,
          }}
        >
          <Badge text="new" corner="lt" />
          <Badge text="new" corner="rt" />
          <Badge text="new" corner="lb" />
          <Badge text="new" corner="rb" />
        </div>
        <h1 className="extra-head">Badge作为状态 </h1>
        <div
          className="demo-line"
        >
          <Badge
            dot
            dotType="status"
            status="warning"
            breath
            style={{
              marginRight: 10,
            }}
          />
          <span className="demo-status-text">待提交</span>
        </div>
        <div
          className="demo-line"
        >
          <Badge
            dot
            dotType="status"
            status="info"
            breath
            style={{
              marginRight: 10,
            }}
          />
          <span className="demo-status-text">流程中</span>
        </div>
        <div
          className="demo-line"
        >
          <Badge
            dot
            dotType="status"
            status="error"
            breath
            style={{
              marginRight: 10,
            }}
          />
          <span className="demo-status-text">已拒绝</span>
        </div>
        <div
          className="demo-line"
        >
          <Badge
            dot
            dotType="status"
            status="success"
            breath
            style={{
              marginRight: 10,
            }}
          />
          <span className="demo-status-text">已通过</span>
        </div>
      </div>
    );
  }
}

export default BadgeDemo;
