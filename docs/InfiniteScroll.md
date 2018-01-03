
一句话描述
一张截图


## Simple Usage

```


import React from 'react';
import InfiniteScroll from '../../src';

function Item(props) {
  return <div className="demo-item">{props.children}</div>
}

class InfiniteScrollDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
    };
  }

  onLoad() {
    this.setState({loading: true});

    setTimeout(() => {
      this.setState({loading: false, page: this.state.page + 1});
    }, 2000);
  }

  renderItems() {
    const pages = [];

    for(let p = this.state.page;p >= 0;p--) {
      pages.push(<div key={`page-${p}`}>
        <Item>{`page ${p} item 1`}</Item>
        <Item>{`page ${p} item 2`}</Item>
      </div>)
    }

    return pages;

  }

  render() {
    return (<InfiniteScroll loading={this.state.loading} onLoad={this.onLoad.bind(this)} >
      <div className="demo">
        <div className="demo-inner">
          {this.renderItems()}
        </div>
      </div>
    </InfiniteScroll>);
  }
}

```

## Notes

InfiniteScroll组件对内容的dom结构和样式有要求：

1. dom结构嵌套一层，嵌套层唯一(使用React.Children.only接口保证，多个嵌套会报错)

```

<div className="container">
  <div className="inner">
    {children}
  </div>
</div>

```

2. 外层必须可滚动，且有具体的高度，否则会导致无限循环触发onLoad事件


## Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|loading|required|bool|false| 是否显示loading效果，当显示loading效果时，不触发onLoad事件 |
|onLoad|required|func|noop|当loading为false时，用户滚动屏幕到底部，触发onLoad事件|
|threshold|optional|number|66|当屏幕滚动距离底部小于此距离时，触发onLoad事件|
|loadingText|optional|string|''|loading时的文案|
|loadingIcon|optional|ReactElement|''|loading时的icon，指定此值时, 将使用用户自定义的icon|
|showIcon|optional|bool|true|自定义选项，loading时是否显示icon|
|showText|optional|bool|true|自定义选项，loading时是否显示文案|
|getDOMNode|optional|func|noop|获取滚动的根节点|
