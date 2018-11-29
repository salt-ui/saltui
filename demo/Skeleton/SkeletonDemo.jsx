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
        <Skeleton animate rows={2} type={1} />
        <Skeleton animate rows={2} type={2} />
        <Skeleton animate rows={2} type={3} />
        {/* 以上固定模版 */}
        <div>以下自定义元件，可自定义布局</div>
        {/* 以下最小粒度元件，可自行布局 */}
        <Element className="skeleton-circle" animate style={{ width: 100, height: 100 }} />
        <Element className="skeleton-text-bar" animate />
        <Element className="skeleton-text-bar" animate style={{ width: '80%' }} />
        <Element className="skeleton-image-small" animate />
        <Element className="skeleton-image-big" animate />
        <Element className="skeleton-operation-left" animate />
        <Element className="skeleton-operation-mid" animate />
        <Element className="skeleton-operation-right" animate />
      </div>
    );
  }
}

export default Demo;

