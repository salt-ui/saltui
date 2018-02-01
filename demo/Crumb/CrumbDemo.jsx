/**
 * Crumb Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Crumb from 'salt-crumb';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Crumb = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.crumbs = [
      { text: '刘一' },
      { text: '陈二' },
      { text: '张三' },
      { text: '李四' },
      { text: '王五' },
      { text: '赵六' },
      { text: '孙七' },
      { text: '周八' },
      { text: '吴九' },
      { text: '郑十' },
    ];
  }

  onClick(idx) {
    console.log(idx);
    alert(this.crumbs[idx].text);
  }

  render() {
    const t = this;
    return (
      <div>
        <Crumb onClick={t.onClick.bind(t)} separator="/">
          {
            this.crumbs.map((crumb, key) => <Crumb.Item key={key}>{crumb.text}</Crumb.Item>)
          }
        </Crumb>
      </div>
    );
  }
}

export default Demo;
