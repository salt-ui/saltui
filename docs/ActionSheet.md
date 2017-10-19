# tingle-action-sheet [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-action-sheet.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-action-sheet)
一句话描述
一张截图

## How to develop

### install

```bash
tnpm i salt-tools -g
npm run tnpm-dep 
npm start
```

### update

```bash
npm run tnpm-update
```

## Simple Usage

## Props

## APIs

#### .show(options: Object, callback: Function) - 打开一个默认的动作面板

`options`对象必须包含以下的一个或者多个：

- options (array of strings) - 按钮标题列表 (required)
- cancelButton (string/React.element) - 按钮列表中取消按钮的索引位置
- destructiveButtonIndex (int) - 按钮列表中破坏性按钮（一般为删除）的索引位置
- title (string) - 顶部标题
- message (string/React.element) - 顶部标题下的简要消息
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
- message (string/React.element) - 顶部标题下的简要消息
- maskClosable (bool) - 点击蒙层是否允许关闭，默认允许

`callback`: function(buttonIndex, rowIndex)   

点击动作后的回调函数，支持返回 Promise，buttonIndex 为传入 options 数组的 index  
取消时也会触发该动作，buttonIndex 为 -1  

#### .close() -  关闭动作面板那

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-action-sheet/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)
