

下拉刷新功能组件


![](https://img.alicdn.com/tfs/TB10yZ9PVXXXXXCaXXXXXXXXXXX-412-696.gif)

## Simple Usage

```

import React from 'react';
import Refreshcontrol from '../../src';

function Item(props) {
  return <div className="item">{`this is item ${props.index}`}</div>
}

class RefreshcontrolDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      repeat: 1
    };
  }

  onRefresh() {
    this.setState({refreshing: true});

    setTimeout(() => {
      this.setState({
        refreshing: false,
        repeat: this.state.repeat + 2
      });
    }, 2000)
  }

  renderItems() {
    const items = [];
    for(let i = this.state.repeat; i >=0; i--) {
      items.push(<Item key={i} index={i} />)
    }

    return items;
  }

  render() {
    return (<Refreshcontrol refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}>
      <div className="demo">
        {this.renderItems()}
      </div>
    </Refreshcontrol>);
  }
}

```


## Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|refreshing|required|bool|false| 是否显示refreshing动画 |
|onRefresh|required|func|noop|refreshing回调|
|threshold|optional|number|74|触发下拉刷新的阈值，默认为refreshing组件的高度，当自定义样式时，可能需要更新这个值来保证良好的交互效果|
|max|optional|number|110|可以下拉的最大下拉高度，值必须比threshold大，推荐高度是(1.2~1.5) * threshold|
|beforePullLoadText|optional|string|''|面板下拉到触发下拉刷新的阈值之前的文案|
|afterPullLoadText|optional|string|''|面板下拉达到触发下拉刷新的阈值之后的文案|
|refreshingText|optional|string|''|refreshing时的文案|
|refreshIcon|optional|react element|null|自定义icon，RefreshControl的组件顶部会添加refreshing class来区分refreshing状态和非refreshing装，自定义icon通过此class可以展现不同效果|
|showIcon|optional|bool|true|自定义选项，loading时是否显示icon|
|showText|optional|bool|true|自定义选项，loading时是否显示文案|
|showRefreshing|optional|bool|true|手动刷新列表时是否要下拉的过程|


## APIs

|方法名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|onRefresh|required|func|noop|refreshing回调|
