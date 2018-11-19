/**
 * Slot Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

// 这是一个比较复杂的例子，演示了年月日选择的交互逻辑，
// 如果仅需要简单使用帮助，请参考 README.md 的 Simple Usage。

import React from 'react';
import Skeleton from 'salt-skeleton';

const {
  TitleBar,
  TextBar,
  Chunk,
  Circle,
} = Skeleton;

class Demo extends React.Component {
  constructor(props) {
    super(props);


    const t = this;
    t.state = {
      visible: false,
    };
  }

  render() {
    const t = this;
    return (
      <div>
        <Skeleton visible={true} animate={true} />
        <TitleBar />
        <TextBar />
        <Chunk />
        <Circle />
      </div>
    );
  }
}

export default Demo;

