

## 底部选项卡菜单

## Simple Usage

```
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.tabBarItems = [
      {
        title: '首页',
        icon: <Icon name="time"/>,
        path: '/star',
      },
      {
        title: '收藏',
        icon: <Icon name="time"/>,
        badge: 'new',
        badgeStyle: {right: -5},
        path: '/a/star',
      },
      {
        title: '隐藏',
        icon: 'plus',
        iconHeight: 40,
        items: [{
          title: '用户',
          icon: 'user',
          badge: 8,
          name: 'user',
          path: '/b/user',
        }, {
          title: '时间',
          icon: <Icon name="time"/>,
          badge: 8,
          name: 'time',
          path: '/b/time',
        }],
        path: '/center',
      },
      {title: '地图', icon: <Icon name="time"/>, badge: 8, path: '/b/star'},
      {title: '我的', icon: <Icon name="time"/>, badge: 8, path: '/c/star'},
    ];
  }

  render() {
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      console.log(activeIndex);
    };

    const tabBarStyle = {};

    return (<div>
      <TabBar
        tabBarStyle={tabBarStyle}
        activeIndex={this.state.activeIndex}
        onChange={onChange}
        iconHeight={24}
        cIconHeight={50}
        items={this.tabBarItems}
      />
    </div>);
  }
}

module.exports = Demo;
```

## Props

### TabBar props

|属性名称|必选|数据类型|默认值|备注|
|---|---|---|---|---|
|className|-|string|-|className
|activeIndex|-|Number|`0`|当前激活的选项卡序号(从0开始)
|onChange|-|Function|`function(activeIndex){ }`|tab切换事件, 参数为当前tab的index
|tabBarStyle|-|`object`|-|选项卡容器样式(version>=1.1.4)
|iconHeight|-|`int`|-|选项的icon的高度
|cIconHeight|-|`int`|-|最中间的特殊选项的icon的高度

### TabBar.Item props

注: 激活态即为选中时的状态

|属性名称|必选|数据类型|默认值|备注|
|---|---|---|---|---|
|title|*|`string`|-|选项卡标题
|titleStyle|-|`object`|-|选项卡标题样式(version>=1.1.4)
|activeTitleStyle|-|`object`|-|选项卡标题样式(激活态)(version>=1.1.4)
|icon|-|`React Element`|-|选项卡图标(Icon 名称或者图片地址)
|iconStyle|-|`object`|-|选项卡图标样式(version>=1.1.4)
|activeIcon|-|`String`|-|选项卡图标(激活态, 图标为图片地址时建议必填)
|activeIconStyle|-|`object`|-|选项卡图标样式(激活态)(version>=1.1.4)
|badge|*|`string` or `number` or `object` |-|选项卡角标,支持数字、红点、string、以及对象(version>=1.3.11)
|badgeStyle|-|`object`|-|选项卡自定义角标样式(version>=1.2.0)
|path|-|`string`|-|选项的路径
