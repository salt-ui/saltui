

列表过滤器

## Simple Usage

```js
import { Filter } from 'saltui';

<Filter
  size={4}
  activeIndex={-1}
  options={[
    {
      key: 'sort',     // 必选，过滤器唯一标志
      title: '默认排序', // 可选，过滤器名称
      type: 'order',  // 可选，过滤器类型，select | action
      items: [        // 可选，过滤器选项
        {
          text: '距离',
          value: 'distance'
        },
        {
          text: '评分',
          value: 'grade'
        }
      ]
    },
  ]}
  onChange={(data) => {
    console.log(data)
  }}
  onConfirm={(data) => {
    console.log(data)
  }}
  onReset={(data) => {
    console.log(data)
  }}
>
```

## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否


#### size

描述：显示过滤器个数

类型：Number

默认：4

必填：否

#### options

描述：过滤器设置参数，数组中每个对象表示一个过滤器，顶部显示过滤器个数由size参数决定。

当过滤器个数超出size时，将会被自动归入到"高级筛选"过滤器。

类型：Array

默认：[]

必填：是


#### activeIndex

描述：默认激活的过滤器索引，-1 ~ (size - 1)

类型：number

默认：-1

必填：否


#### onChange

描述：当过滤项改变状态时触发

类型：Function

默认：() => {}

必填：否

#### onConfirm

描述：当通过点击确认按钮来处理批量选择时触发

类型：Function

默认: () => {}

必填：否

#### onReset

描述：当点击重置按钮时触发

类型：Function

默认：() => {}

必填：否


