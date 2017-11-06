/**
 * Badge Component Demo for tingle
 * @author minjie.lmj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Group from 'salt-group';
import SelectField from 'salt-select-field';
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
            <a href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge count={5}>
            <a href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge count={100}>
            <a href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge dot>
            <a href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text={'new'}>
            <a href="#1" className="demo-item" />
          </Badge>
        </div>
        <div className="demo-line">
          <Badge text={'new'} corner="lt">
            <a href="#1" className="demo-item" />
          </Badge>
        </div>
        <h1 className="extra-head">Badge作为子元素: </h1>
        <div
          className="demo-line" style={{
            position: 'relative',
            height: 100,
            border: '1px solid #aaa',
            marginTop: 20,
          }}
        >
          <Badge
            text={'促'} style={{
              left: 10,
            }}
          />
          <Badge
            text={'减'} style={{
              left: 40,
            }}
          />
          <Badge
            text={'免'} style={{
              left: 70,
              background: '#66BC5C',
            }}
          />
        </div>

        <div
          className="demo-line" style={{
            position: 'relative',
            height: 100,
            width: '100%',
            background: '#aaa',
            marginTop: 20,
          }}
        >
          <Badge text={'new'} corner="lt" />
        </div>
      </div>
    );
  }
}

export default BadgeDemo;
