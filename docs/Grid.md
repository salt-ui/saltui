

删格布局方案

<img src="https://img.alicdn.com/tps/TB1CXzlJFXXXXa5XFXXXXXXXXXX-640-1136.png" width="300"/>


## Simple Usage

九宫格菜单案例

```javascript
<Grid col={3} className="t-BCf" square={true} touchable={true}>
  <div className="demo" onClick={t.add.bind(t)}>
    <Icon name="user" fill={'#42A5F5'}/>
    <div className="menu-title">用户</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
    <Icon name="time" fill={'#FF8A65'}/>
    <div className="menu-title">时钟</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
    <Icon name="star" fill={'#EA80FC'}/>
    <div className="menu-title">星星</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
      <Icon name="map" fill={'#EF9A9A'}/>
      <div className="menu-title">地图</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
      <Icon name="pen" fill={'#9FA8DA'}/>
      <div className="menu-title">编辑</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
      <Icon name="info-circle" fill={'#80DEEA'}/>
      <div className="menu-title">信息</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
      <Icon name="plus-circle" fill={'#DCE775'}/>
      <div className="menu-title">添加</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
      <Icon name="search" fill={'#A1887F'}/>
      <div className="menu-title">搜索</div>
  </div>
  <div className="demo" onClick={t.add.bind(t)}>
    <Icon name="plus" fill={'#BDBDBD'}/>
    <div className="menu-title" style={{color: '#bbb'}}>添加</div>
  </div>
</Grid>
```

单元格为正方形

```javascript
<Grid col={5} className="background-color-white" square={true}>
    <div className="demo">1</div>
    <div className="demo">1</div>
    <div className="demo">1</div>
    <div className="demo">1</div>
    <div className="demo">1</div>
    <div className="demo">1</div>
    <div className="demo">1</div>
</Grid>
```

如果像要单元格充满整个cell，就添加`grid-cell-full`给单元格的className，如：

```javascript
<Grid col={5} className="background-color-white" square={true}>
    <div className="demo grid-cell-full">1</div>
    <div className="demo grid-cell-full">1</div>
    <div className="demo grid-cell-full">1</div>
    <div className="demo grid-cell-full">1</div>
    <div className="demo grid-cell-full">1</div>
    <div className="demo grid-cell-full">1</div>
    <div className="demo grid-cell-full">1</div>
</Grid>
```
## Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|className|string|optional|无|额外的样式class定义|
|col|Number|optional|4|单元格的列数|
|square|boolean|optional|false|单元格的高度是否始终与宽相等|
|noLine|boolean|optional|false|是否隐藏单元格的分割线|
|itemHAlign|string|optional|center|单元格中元素的水平对齐方式 (`'center'`, `'start'`, `'end'` 之一)|
|itemVAlign|string|optional|center|单元格中元素的垂直对齐方式 (`'center'`, `'start'`, `'end'` 之一)|
|touchable|boolean|optional|false|单元格是否可点击|

