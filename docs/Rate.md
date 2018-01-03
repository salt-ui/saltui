

评分组件.

![rate](https://img.alicdn.com/tfs/TB1YrN7QXXXXXagXXXXXXXXXXXX-350-227.png)


## Simple Usage

```js
<Rate total={5} size="normal" value={t.state.score} showTip scoreTips={['不合格','合格','良好','优秀','卓越']} onChange={t.handleChange.bind(t)} />
```

## Props

#### className

描述：自定义样式的class名称。

类型：String

默认：''

必选：否

#### total

描述：icon的个数，即总分。

类型：Number

默认：5

必选：否


#### value

描述：已得到的分数。

类型：Number

默认：0

必选：是

#### size

描述：star 尺寸

类型：String ('normal'|'large')

默认：normal

必选：否

#### showTip

描述：评分后是否显示结果提示。

类型：Boolean

默认：true

必选：否


#### scoreTips

描述：评分后提示内容。

类型：Array

默认：["不满意", "一般", "基本满意","满意", "非常满意"]

必选：否

#### readOnly

描述：是否只读。

类型：Boolean

默认：false

必选：否


#### onChange

描述：回调函数，会返回选中的分数onChange(currentScore)。

类型：Function

默认：noop

必选：是

