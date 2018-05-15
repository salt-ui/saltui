## 标签切换控件

## 可用配置

| 配置项 | 功能/备注 | 类型 | 默认值 |
|---|----|---|----|
| active/activeKey        | 当前激活 tab 面板的 key                      | String  | 无            |
| onChange         | 切换面板的回调                        | function({activeKey, preActiveKey, data})| 无            |
| onTabClick       | tab 被点击的回调                      | (key: string): void | 无            |
| animated |  是否动画    |  boolean   |    `true`    |
| swipeable |  是否可以滑动 tab 内容进行切换    |  boolean   |    `true`    |
| hammerOptions |  开启`swipeable`的时候可以对 [hammerjs](http://hammerjs.github.io/) 的 [pan](http://hammerjs.github.io/recognizer-pan/) 和 [swipe](http://hammerjs.github.io/recognizer-swipe/) 两种手势进行参数配置    |  object   |    {}   |
| tabBarPosition |    tab 位置 top/bottom        |  string    |    `top`        |
| destroyInactiveTabPane | 是否销毁掉不活动的 tabPane (优化使用) |  boolean    |    false   |
| prefixCls |  className 前缀      |  string    |    `am-tabs`        |
| className |   额外的 className      |  string    |    无        |
| pageSize |  可视区显示的 tab 数量，可以看做一页     |  number    |    5       |
| speed |   多页模式下，TabBar 滑动的速度      |  Number: 1 ~ 10    |    8        |
| tabBarhammerOptions |   同 hammerOptions，对 TabBar 的滑动手势进行配置      |  Obejct    |    {}        |
| showExpandAll | 是否显示展开全部按钮 | boolean | true |

### 子项目item

| 配置项 | 功能/备注 | 类型 | 默认值 |
|---|----|---|----|
| key  | 对应 activeKey   | String                  | 无     |
| title  | 选项卡头显示文字 | React.Element or String | 无     |



## 事件

### onChange(obj) 

```javascript
// 新值和事件对象
handleChange(obj) {
    var t = this;
    console.log({
        activeIndex: obj.active,
        preActiveIndex: obj.preActive,
        data:obj.data
    });
}
```
