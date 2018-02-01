# 抽屉

## Props

| Property name | Description | Type | Default |
|---------------|-------------|------|---------|
| className | root 节点的额外类名 | String | '' |
| prefixCls | 类名前缀 | String | 't-drawer' |
| children | 主要内容 | any | n/a |
| sidebarStyle |  sideBar 容器的样式 | Object | {} |
| contentStyle |  content 容器的样式 | Object | {} |
| overlayStyle | 遮罩层的样式 | Object | {} |
| dragHandleStyle | 拖拽部分的样式 | Object | {} |
| sidebar | 侧边栏中的内容 | any | n/a |
| onOpenChange | 侧边栏想要改变他的 open 或者 dock 属性时的回调，在滑动侧边栏和侧边栏打开且点击遮罩层时触发 | Function | n/a |
| open | 侧边栏是否 open | Boolean | false |
| docked |  侧边栏是否嵌入到文档中 | Boolean | false |
| transitions | 是否启用 transitions | Boolean | true |
| touch | 是否启用手势 | Boolean | true |
| enableDragHandle | 是否启用拖拽部分 | Boolean | true |
| dragToggleDistance | 侧边栏打开和关闭必须拖拽的最小距离 | Number | 30 |


### className

描述：root 节点的额外类名  
类型：`String`  
默认：''  
必选：否

### prefixCls

描述：类名前缀，不想使用 tingle 自带的主题时可能用的到 
类型：`String`  
默认：`t-drawer` 
必选：否

### children

描述：主要内容 
类型：`Any`  
默认： 
必选：否

### sidebar

描述：侧边栏中的内容 
类型：`any`  
默认： 
必选：否

### open

描述：侧边栏是否 open 
类型：`Boolean`  
默认：false
必选：否


### docked

描述：侧边栏是否嵌入到文档中 
类型：`Boolean`  
默认：false
必选：否

### onOpenChange

描述：侧边栏想要改变他的 open 或者 dock 属性时的回调，在滑动侧边栏和侧边栏打开且点击遮罩层时触发
类型：`Function`  
默认：noop
必选：否


### transitions

描述：是否启用 transitions 
类型：`Boolean`  
默认：true
必选：否


### touch

描述：是否启用手势 
类型：`Boolean`  
默认：true
必选：否


### enableDragHandle

描述：是否启用拖拽部分
类型：`Boolean`  
默认：true
必选：否



### dragToggleDistance

描述：侧边栏打开和关闭必须拖拽的最小距离
类型：`Number`  
默认：30
必选：否

### sidebarStyle

描述：sideBar 容器的样式 
类型：`Object`  
默认：{}
必选：否

### contentStyle

描述：content 容器的样式 
类型：`Object`  
默认：{}
必选：否

### overlayStyle

描述：遮罩层的样式 
类型：`Object`  
默认：{}
必选：否

### dragHandleStyle

描述：拖拽部分的样式 
类型：`Object`  
默认：{}
必选：否