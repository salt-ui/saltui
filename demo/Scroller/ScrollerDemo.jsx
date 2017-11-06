/**
 * Scroller Component Demo for tingle
 * @author gbk
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Scroller from 'salt-scroller';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Scroller = require('../../dist');

import Group from 'salt-group';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleScrollEnd(scroller) {
    const { x, y } = scroller;
    console.log({ x, y });
  }

  render() {
    return (
      <Scroller className="page" mouseWheel onScrollEnd={this.handleScrollEnd.bind(this)}>
        <Group.Head className="t-FS12 t-LH2 t-PT16">列表标题1</Group.Head>
        <Group.List >
          <div className="t-FBH">
            {/* 横向滚动 DEMO */}
            <Scroller className="t-FB1" scrollX scrollY={false}>
              <div className="t-LH44 nowrap">
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
                我可以横向滚动
              </div>
            </Scroller>
          </div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
        </Group.List>
        <Group.Head className="tFS12 t-LH2 tPT16">列表标题2</Group.Head>
        <Group.List>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
          <div className="t-LH44 t-PL10">aa</div>
        </Group.List>
      </Scroller>
    );
  }
}
export default Demo;
