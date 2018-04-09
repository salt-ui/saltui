

## 图文列表 

- 组件支持
  - 两种布局方式：左图右文、左文右图
  - 右侧 icon 显示、类型、大小 可配置
  - 滑动删除 可配置


## Props

### className

描述：自定义样式的`class`名称

类型：`String`

默认：`''`

必选：否

示例：

```
<List className="customClass"/>
```

### layout

描述：自定义列表布局方式

类型：`String`

默认：`left`

可选值：`left`、`right`

必选：否

示例：

```
<List layout="right"/>
```

### hasRightIcon

描述：控制列表右侧 icon 的显示

类型：`Boolen`

默认：`true`

必选：否

示例：

```
<List hasArrow={true}/>
```

### icon

描述：控制列表右侧 icon

类型：`React Element`

默认：`<AngleRight />`

必选：否

示例：

```js
import AngleRight from 'salt-icon/lib/AngleRight';
<List icon={<AngleRight />} />
```
### iconWidth

描述：控制列表右侧 icon 的宽度

类型：`Number`

默认：`20`

必选：否

示例：

```
<List iconWidth={24}/>
```

### isDelete

描述：控制列表是否支持滑动删除

类型：`Boolen`

默认：`false`

必选：否

示例：

```
<List isDelete={true}/>
```
### data

描述：列表数据，data中某一项不传即为空

类型：`Array`

默认：`[{imgUrl:'',title:'',text:'',date:''}]`

必选：是

示例：

```
<List data={[
    {
        imgUrl : "https://img.alicdn.com/tps/TB1P1vaLpXXXXXxaXXXXXXXXXXX-50-50.jpg",
        title : "列表标题",
        text : "列表内容测试测试测试测试测试测试测试测试测试测试测试测试",
        date : "2016-7-18"
    }]}/>
```

## APIs

### onClick

描述：列表的 onClick 回调，参数 dataItem 为当前点击的这一 list 的 data 对象

类型：`Function`

默认：``

必选：否

示例：

```
handleClick(e,dataItem){
  do something...
}

<List
  onClick={this.handleClick.bind(this)}
/>
```

### clickPhoto

描述：列表头像的 onClick 回调,参数 imgUrl 为当前点击的这一头像的 url

类型：`Function`

默认：``

必选：否

示例：

```
handleClickImg(e,imgUrl){
  do something...
}

<List
  clickPhoto={this.handleClickImg.bind(this)}
/>
```

### onDelete

描述：列表滑动删除的回调函数，参数 dataItem 为当前删除的这一 list 的 data 对象

类型：`Function`

默认：``

必选：否

示例：

```
handleDelete(e,dataItem){
  do something...
}

<List
  onDelete={this.handleDelete.bind(this)}
/>
```

