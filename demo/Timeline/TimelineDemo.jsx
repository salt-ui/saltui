/**
 * Timeline Component Demo for tingle
 * @author zhongsisi
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Timeline from 'salt-timeline';
import Icon from 'salt-icon';

class Demo extends React.Component {
  render() {
    return (
      <div className="timeline-demo">
        <h3>不带图标:</h3>
        <Timeline>
          <Timeline.Item
            description="2017/05/10"
            active
          >
            设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
          </Timeline.Item>
          <Timeline.Item
            description="2017/04/10"
          >
            <div className="txt">设计平台是信息平台UED重要的基石。</div>
          </Timeline.Item>
          <Timeline.Item
            description="2017/03/10"
          >
            设计平台是信息平台UED重要的基石。是团队进行设计活动所依赖的标准和方法。是为乐高提供设计元素和规则的基础平台。
          </Timeline.Item>
          <Timeline.Item
            description="2017/02/10"
          >
            设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
          </Timeline.Item>
        </Timeline>
        <h3>带图标:</h3>
        <Timeline>
          <Timeline.Item
            description="2017/05/10"
            icon={<Icon name="time" />}
            active
          >
            设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
          </Timeline.Item>
          <Timeline.Item
            description="2017/04/10"
          >
            <div className="txt">设计平台是信息平台UED重要的基石。</div>
          </Timeline.Item>
          <Timeline.Item
            description="2017/03/10"
          >
            设计平台是信息平台UED重要的基石。是团队进行设计活动所依赖的标准和方法。是为乐高提供设计元素和规则的基础平台。
          </Timeline.Item>
          <Timeline.Item
            description="2017/02/10"
          >
            设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}

export default Demo;
