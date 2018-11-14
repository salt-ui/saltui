## 滑动条

左边为最小值，右边为最大值。

## Props 定义
所有 Props 都是可选的

配置项 | 类型 | 默认值 | 说明
----|-----|------|------
| min    |  number     | 0     | 最小值 |
| max    |  number     | 100    | 最大值 |
| step    |  number or null     | 1    | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 SliderField 的可选值仅有 marks 标出来的部分。 |
| value    |  number  |     | 设置当前取值。 |
| defaultValue    |  number   | 0     | 设置初始取值。|
| disabled    |  boolean     | false    | 值为 `true` 时，滑块为禁用状态 |
| onChange    |  function     | noop    | 当 SliderField 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。 |
| onAfterChange    |  function     | noop    | 与 `ontouchend` 触发时机一致，把当前值作为参数传入。 |
| marks   |  object{number: string}     | { }    | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 [min, max] 内 |
| dots   |  boolean     | false    | 是否只能拖拽到刻度上 |
| included  |  boolean     | true    | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 |
| handleStyle  |  object    |    | 滑块的样式  |
| trackStyle  | object     |    | 选中部分滑动条的样式 |
| railStyle  |  object     |   | 未选中部分 |
| className  |  string     | salt-ui-slider  | 自定义的 class 名称|
