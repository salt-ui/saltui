/**
 * TabBar Component Demo for tingle
 * @author zhouwenjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const Context = require('@ali/tingle-context');
const Icon = require('@ali/tingle-icon');
const TabBar = require('../../src');
const React = require('react');

// build之后, 测试一下下面一行, 把上面一行注释掉
// const TabBar = require('../../dist');

Context.setGlobal({ classNamePrefix: 't' });

const starUrl = 'https://gw.alicdn.com/tps/TB1Ofp3NpXXXXXDXVXXXXXXXXXX-216-200.png';
const starActiveUrl = 'https://gw.alicdn.com/tps/TB1gERVNpXXXXXXaXXXXXXXXXXX-216-200.png';

// class Icon extends React.Component {
//   render() {
//     return (<div className="dry">123</div>);
//   }
// }

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.tabBarItems = [
      { title: '首页', icon: <Icon name="time" />, name: 'star', badge: 8, badgeStyle: { right: -5 }, path: '/star' },
      { title: '收藏', icon: <Icon name="time" />, name: 'map', badge: 'new', badgeStyle: { right: -5 }, path: '/a/star' },
      { title: '隐藏',
      icon: 'plus',
      name: 'plus',
      cIconHeight: 40,
      items: [{
        title: '用户',
        icon: 'user',
        badge: 8,
        name: 'user',
        path: '/b/user',
      }, {
        title: '时间',
        icon: <Icon name="time" />,
        badge: 8,
        name: 'time',
        path: '/b/time',
      }],
      path: '/center',
    },
      { title: '地图', icon: <Icon name="time" />, name: 'setting', badge: 8, path: '/b/star' },
      { title: '我的', icon: <Icon name="time" />, name: 'user', badge: 8, path: '/c/star' },
    ];
  }

  render() {
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      console.log(activeIndex);
    };

    const tabBarStyle = {

    };

    return (<div>
      <TabBar
        tabBarStyle={tabBarStyle} activeIndex={this.state.activeIndex}
        onChange={onChange} items={this.tabBarItems}
      />
    </div>);
  }
}

module.exports = Demo;
