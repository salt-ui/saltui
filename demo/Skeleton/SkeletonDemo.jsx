/**
 * Slot Component Demo for tingle
 * @author lj124435
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Skeleton from 'salt-skeleton';

const { Element } = Skeleton;

class Demo extends React.Component {
  render() {
    return (
      <div className="demo">
        <h2>以下自定义元件，可自定义布局</h2>
        {/* 以下最小粒度元件，可自行布局 */}
        <Element animate style={{ width: 100, height: 100 }} />
        <h2>内置</h2>
        <Element className="skeleton-circle" animate style={{ width: 100, height: 100 }} />
        <Element className="skeleton-text-bar" animate />
        <Element className="skeleton-text-bar" animate style={{ width: '80%' }} />
        <Element className="skeleton-image-small" animate />
        <Element className="skeleton-image-big" animate />
        <Element className="skeleton-operation-left" animate />
        <Element className="skeleton-operation-mid" animate />
        <Element className="skeleton-operation-right" animate />
        {/* 以下固定模版 */}
        <h2>固定模板</h2>
        <Skeleton animate rows={2} type={1} />
        <Skeleton animate rows={2} type={2} />
        <Skeleton animate rows={2} type={3} />
        {/* 以下测试自动生成skeleton */}
        <div className="testNode" style={{ borderRadius: '50%', width: 50, height: 50 }}>
          <p style={{ marginBottom: 10 }}>xxxxxxx</p>
          <p>yyyyyyy</p>
        </div>
        {/* 执行node2skeleton(document.querySelector('.testNode')),生成一下skeleton代码 */}
        <div style={{ "width": "50px", "height": "50px", "borderRadius": "50%", "position": "static", "top": "auto", "bottom": "auto", "left": "auto", "right": "auto", "marginTop": "0px", "marginBottom": "0px", "marginLeft": "0px", "marginRight": "0px", "paddingTop": "0px", "paddingBottom": "0px", "paddingLeft": "0px", "paddingRight": "0px", "display": "block", "flex": "0 1 auto", "flexDirection": "row" }}>
          <Element animate style={{ "width": "50px", "height": "14px", "borderRadius": "0px", "position": "static", "top": "auto", "bottom": "auto", "left": "auto", "right": "auto", "marginTop": "0px", "marginBottom": "10px", "marginLeft": "0px", "marginRight": "0px", "paddingTop": "0px", "paddingBottom": "0px", "paddingLeft": "0px", "paddingRight": "0px", "display": "block", "flex": "0 1 auto", "flexDirection": "row" }} />
          <Element animate style={{ "width": "50px", "height": "14px", "borderRadius": "0px", "position": "static", "top": "auto", "bottom": "auto", "left": "auto", "right": "auto", "marginTop": "0px", "marginBottom": "0px", "marginLeft": "0px", "marginRight": "0px", "paddingTop": "0px", "paddingBottom": "0px", "paddingLeft": "0px", "paddingRight": "0px", "display": "block", "flex": "0 1 auto", "flexDirection": "row" }} />
        </div>
      </div>
    );
  }
}

export default Demo;

