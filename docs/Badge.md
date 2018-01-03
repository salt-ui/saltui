## note
假设A组件需要安装Badge

- A作为Badge的子元素, 这时Badge默认在A的右上角, 而且A只能有一个Badge.
- Badge作为A的子元素, 这时可以传入多个Badge, Badge默认在垂直方向上居中了, 这种情况下如果给Badge设置了corner属性则需要A是一个定位元素.
- Badge的实现分为容器层和内容层, 传给Badge的className会安装到容器层上, 传给Badge的style则会传给内容层.

## Simple Usage

```javascript
<Badge text={'new'} corner >
	<div style={{
	  height: 100, 
	  background: '#fff'
	}}></div>
</Badge>
```

## Props


#### className

描述：额外类名

类型：String

默认：

必选：否


#### style

描述：传给Badge里的内容层

类型：Object

默认：

必选：否



#### count

描述：展示的数字，大于 overflowCount 时显示为 overflowCount+，为 0 时隐藏

类型：Number

默认：

必选：否


#### overflowCount

描述：展示封顶的数字值

类型：Number

默认：99

必选：否


#### text

描述：展示的文字

类型：String

默认：''

必选：否


#### corner

描述：角标倾斜展示在容器角落上

类型：String

可选值: 'rt'(右上角), 'rb'(右下角), 'lt'(左上角), 'lb'(左下角)

默认： 'rt'

必选：否





#### dot

描述：不展示数字，只有一个小红点

类型：Boolean

默认：false

必选：否


