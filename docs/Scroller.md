


Scroller 是对 [iScroll](http://iscrolljs.com/) 的 React 封装，用作滑动容器。内部 iScroll 的版本是 5.1.3。

<img src="https://img.alicdn.com/tps/TB1jnocJpXXXXcmXpXXXXXXXXXX-750-1254.png" width="375"/>

## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### autoRefresh

描述：是否在内容变化时自动重新计算和渲染

类型：Boolean

默认：true

必填：否

#### minWidth

描述：容器的最小宽度（为了避免容器宽度过小而显示不正常）

类型：String

默认：'100%'

必填：否

更多配置详见[官网](http://iscrolljs.com/#configuring)。

## API 接口

可通过 ref 到的 component 实例的 `.scroller` 来获取 iScroll 实例，进而调用实例中的所有方法以及获取实例中的各种属性。

```js
t.refs.sc.scroller.scrollTo(0, 100);
```

## Demos

```
render() {
    return (
        <Scroller>
            <Group.Head>{"列表标题1"}</Group.Head>
            <Group.List>
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
```
- 不在列表中的其余参数全部传透给 iScroll，作为 iScroll 的初始化配置项。

```
<Scroller ref="sc" click={true} mouseWheel={false}></Scroller>
```

- 以 on 开头的参数全部作为事件挂载到 iScroll 实例上。

```
<Scroller ref="sc" onScrollEnd={t.handleScrollEnd.bind(t)}></Scroller>
```

相当于

```
t.refs.sc.scroller.on('scrollEnd', t.handleScrollEnd.bind(t));
```

- 开启横向滚动时，可增加 `eventPassthrough={true}` 属性解决页面无法滚动的问题

