## Props

## APIs

#### .show(options: Object, callback: Function) - 打开一个默认的动作面板

`options`对象必须包含以下的一个或者多个：

- options (array of strings) - 按钮标题列表 (required)
- cancelButton (string/React.element) - 按钮列表中取消按钮的索引位置
- destructiveButtonIndex (int) - 按钮列表中破坏性按钮（一般为删除）的索引位置
- title (string) - 顶部标题
- message (string/React.element) `不推荐` - 顶部标题下的简要消息。该配置项已弃用。
- maskClosable (bool) - 点击蒙层是否允许关闭，默认允许 

`callback`: function(buttonIndex)   

点击动作后的回调函数，支持返回 Promise，buttonIndex 为传入 options 数组的 index  
取消时也会触发该动作，buttonIndex 为 -1  

#### .showShare(options: Object, callback: Function) - 打开一个共享型的动作面板

`options`对象必须包含以下的一个或者多个：

- options (array of `{icon:React.node, iconName:string, title:string}`) - 分享按钮列表 (required)
    - 注意：`iconName`为 icon 组件里的某一个 icon 的名字，优先级高于`icon`属性设置（`icon`属性用于设置自定义内容）
    - options 可以是二维数组，能显示多行按钮，例如`[[{icon,title},{icon,title}], [{icon,title},{icon,title}]]`表示两行两列
    - 当为二维数组时 callback 有两个参数，第一个为`列`序列、第二个为`行`序列
- cancelButton (string/React.element) - 默认为`取消`
- title (string) - 顶部标题
- message (string/React.element) `不推荐` - 顶部标题下的简要消息。该配置项已弃用。
- maskClosable (bool) - 点击蒙层是否允许关闭，默认允许

`callback`: function(buttonIndex, rowIndex)   

点击动作后的回调函数，支持返回 Promise，buttonIndex 为传入 options 数组的 index  
取消时也会触发该动作，buttonIndex 为 -1  


#### 返回值

```jsx
const instance = ActionSheet.show(options); 
instance.close(); // 手动关闭当前面板
```
