# tingle-scroller [![npm version](https://badge.fury.io/js/tingle-scroller.svg)](http://badge.fury.io/js/tingle-scroller)

The `Scroller Component` for tinglejs.

## TL;DR

Scroller 是对 [iScroll](http://iscrolljs.com/) 的 React 封装，用作滑动容器。内部 iScroll 的版本是 5.1.3。

<img src="https://img.alicdn.com/tps/TB1jnocJpXXXXcmXpXXXXXXXXXX-750-1254.png" width="375"/>

## Install

```bash
npm install tingle-scroller --save
```

## Simple Usage

```js
render() {
    return (
        <Scroller>
            <GroupList title={"列表标题1"}>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
                <div className="tLH44 tPL10">aa</div>
            </GroupList>
        </Scroller>
    );
}
```

## Options 可用配置

| 配置项 | 必填 | 默认值 | 功能/备注 |
|---|----|---|----|
|className|optional|-|自定义样式类|
|autoRefresh|optional|true|是否在内容变化时自动重新计算和渲染|
|minWidth|optional|100%|容器的最小宽度（为了避免容器宽度过小而显示不正常）|

- 不在列表中的其余参数全部传透给 iScroll，作为 iScroll 的初始化配置项。

```js
<Scroller ref="sc" click={true} mouseWheel={false}></Scroller>
```

更多配置详见[官网](http://iscrolljs.com/#configuring)。

- 以 on 开头的参数全部作为事件挂载到 iScroll 实例上。

```js
<Scroller ref="sc" onScrollEnd={t.handleScrollEnd.bind(t)}></Scroller>
```

相当于

```js
t.refs.sc.scroller.on('scrollEnd', t.handleScrollEnd.bind(t));
```

更多事件详见[官网](http://iscrolljs.com/#custom-events)。

## API 接口

可通过 ref 到的 component 实例的 `.scroller` 来获取 iScroll 实例，进而调用实例中的所有方法以及获取实例中的各种属性。

```js
t.refs.sc.scroller.scrollTo(0, 100);
```

## Links 相关链接

- [iScroll 官网](http://iscrolljs.com/)
- [Fire a bug/Issues 提Bug](https://github.com/tinglejs/tingle-scroller/issues)
- [Tingle项目](https://github.com/tinglejs/generator-tingle)