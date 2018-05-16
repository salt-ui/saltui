/**
 * Tab Component Demo for tingle
 * @author zhangshun@alipay.com
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Tab from 'salt-tab';
import Button from 'salt-button';
// build之后, 测试一下下面一行, 把上面一行注释掉
// const Tab = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '1',
      tabs: [],
    };
  }

  handleChange(obj) {
    console.log(obj);
  }

  render() {
    const t = this;
    return (
      <div>
        <Tab
          activeKey={this.state.active}
          onChange={(obj) => { t.handleChange(obj); }}
        >
          <Tab.Item title="全部" data={{ customKey1: '自定义值1', customKey2: '自定义值2' }}>
            <div style={{ padding: 10 }}>
              与 Angular，Ember，Backbone 等等比起来 React 的表现如何？
              要如何处理数据？要如何连接服务器？JSX 到底是什么？“组件”又是如何定义的？
              <Button onClick={() => {
                this.setState({
                  tabs: this.state.tabs.concat([1]),
                });
              }}
              >增加 tab
              </Button>
            </div>
          </Tab.Item>
          <Tab.Item title="已完成">
            <div style={{ padding: 10 }}>
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。
              4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网...
            </div>
          </Tab.Item>
          <Tab.Item title="未完成">
            <div style={{ padding: 10 }}>
              1移动互联网，就是将移动通信和互联网二者结合起来，成为一体。移动互联网，就是将移动通信和互联网二者结合起来，成为一体。移动互联网，就是将移动通信和互联网二者结合起来，成为一体。移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
            </div>
          </Tab.Item>
          <Tab.Item title="通过">
            <div style={{ padding: 10 }}>
              2移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
            </div>
          </Tab.Item>
          <Tab.Item title="通过1">
            <div style={{ padding: 10 }}>
              3移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
            </div>
          </Tab.Item>
          <Tab.Item title="通过2">
            <div style={{ padding: 10 }}>
              4移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
            </div>
          </Tab.Item>
          <Tab.Item title="通过3">
            <div style={{ padding: 10 }}>
              5移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
            </div>
          </Tab.Item>
          <Tab.Item title="通过4">
            <div style={{ padding: 10 }}>
              5移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
            </div>
          </Tab.Item>
          {this.state.tabs.map(tab => (
            <Tab.Item title="通过4">
              <div style={{ padding: 10 }}>
              5移动互联网，就是将移动通信和互联网二者结合起来，成为一体。
              是指互联网的技术、平台、商业模式和应用与移动通信技术结合并实践的活动的总称。4G时代的开启以及移动终端设备的凸显必将为移动互联网的发展注入巨大的能量，2014年移动互联网
              </div>
            </Tab.Item>
            ))}
        </Tab>
      </div>
    );
  }
}

export default Demo;
