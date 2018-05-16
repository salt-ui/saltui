
提示窗体: alert, confirm

<img src="https://img.alicdn.com/tps/TB1fFPeJFXXXXa2XVXXXXXXXXXX-640-1136.png" width="300"/>


## Simple Usage

支持 `函数调用` 和 `React show prop`

### 函数调用

```javascript
Dialog.alert({
    title: '测试',
    content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
    onConfirm() {
        console.log('multi lines confirm');
    }
});

Dialog.confirm({
    title: '测试',
    content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
    onConfirm() {
        console.log('confirm confirm');
    },
    onCancel() {
        console.log('confirm cancel');
    }
});

Dialog.hide();
```

### 直接使用

```javascript

render() {
    return (
        <div>
            <Dialog title="Absolute Alert" onConfirm={() => {this.setState({showAlert: false})}}>
                我是直接通过父 state 控制的模态窗口 alert, 我没有 onCancel 回调
            </Dialog>

            <Dialog title="Absolute Confirm"
                type="confirm"
                show={ false }
                onConfirm={() => {this.setState({showConfirm: false})}}
                onCancel={() => {this.setState({showConfirm: false})}}>
                我是直接通过父 state 控制的模态窗口 confirm, 我的 type 是 confirm
            </Dialog>
        </div>
    )
}

```

## Props

### className

- 描述：自定义样式的`class`名称(弹窗内容)。
- 类型：`String`
- 默认：`''`
- 必选：否

示例：

```javascript
<Dialog className="customClass">内容内容</Dialog>
```

> 默认 t-dialog-body 上有 `padding: 0 24px 13px;` 的边距设置，如果需要清除这个 `padding` 可通过 `className` 属性包含 `t-dialog-no-padding` 类快速实现，也可自行传递自定义 `className` 然后通过自定义 CSS 规则实现。

### wrapClassName

- 描述: 自定义样式的`class`名称(弹窗容器)。
- 类型: `String`
- 默认： `''`
- 必选: 否

示例:
```javascript
<Dialog className="customWrapClass">内容内容</Dialog>
```

### title

- 描述：提示窗显示的标题
- 类型：`String`
- 默认：`''`
- 必选：否

示例：

```javascript
<Dialog title="我是标题">内容内容</Dialog>
```

### onConfirm

- 描述：点击确认按钮回调函数
- 类型：`function`
- 默认：`null`
- 必选：否

示例：

```javascript
<Dialog title="我是标题" type="confirm" onConfirm={() => {alert('点击了confirm')}}>
    我是confirm弹出层
</Dialog>
```

### onCancel

- 描述：点击取消按钮回调函数
- 类型：`function`
- 默认：`null`
- 必选：否

示例：

```javascript
<Dialog title="我是标题" type="confirm" onConfirm={() => {alert('点击了confirm')}}>
    我是confirm弹出层
</Dialog>
```

### type

- 描述：提示窗的类型
- 类型：`'alert'`，`'confirm'`之一
- 默认：`'alert'`
- 必选：否

示例：

```javascript
<Dialog title="我是标题" type="confirm">我是confirm弹出层</Dialog>
```

### buttons

- 描述: 自定义按钮
- 类型: `array`
- 默认: `[{
    content: 'ok',
    callback() { },
    primary: true,
}]`
- 必选: 否

> 如果传递 buttons，type 将会被忽略，以实际传递的 `props.buttons` 渲染弹窗按钮

#### button 实例
```javascript
{
    content: PropTypes.string,      // 按钮展示文本
    callback: PropTypes.func,       // 点击按钮回调事件，如果返回false，不关闭当前 Dialog
    primary: PropTypes.bool,        // 是否展示为主要按钮(文本展示位品牌色)
}
```

实例:
```javascript
<Dialog
    title="多按钮title"
    buttons={[
        {
            content: '按钮1',
            callback: () => { console.log('click btn1') },
        },
        {
            content: '按钮2',
            callback: () => {
                console.log('click btn2');
                // return false 将不会关闭当前弹窗
                return false;
            },
        },
        {
            content: '按钮3',
            callback: () => {
                console.log('click btn3');
            },
            // 设置 primary 展示为主要按钮样式(文本为品牌色)
            primary: true,
        },
    ]}
>
    这是一个多按钮的弹窗
</Dialog>
```

### btnDir

- 类型: 按钮排布方式
- 类型: `String`, (可选值 vertical(垂直排列), horizontal(水平排列), ''(空字符串，默认排列(2个按钮水平排列，其他情况垂直排列)))
- 默认: `''`（控制字符串）
- 必选: 否

示例:
```javascript
<Dialog
    title="多按钮title"
    btnDir="horizontal"
    buttons={[
        {
            content: '按钮1',
            callback: () => { console.log('click btn1') },
            // 设置 primary 展示为主要按钮样式(文本为品牌色)
            primary: true,
        },
        {
            content: '按钮2',
            callback: () => {
                console.log('click btn2');
                // return false 将不会关闭当前弹窗
                return false;
            },
        },
        {
            content: '按钮3',
            callback: () => {
                console.log('click btn3');
            },
        },
    ]}
>
    这是一个水平排列的多按钮的弹窗
</Dialog>
```

### transparentMode

- 描述: 弹窗内容是否是透明背景(默认为白色背景)
- 类型: `boolean` 之一
- 默认: `false`
- 必选: 否

> 如果设置为 transparentMode， buttons 和 type 属性都会被忽略，展示如下:

![transparentMode](https://img.alicdn.com/tfs/TB1ffGGRpXXXXaoXVXXXXXXXXXX-280-499.png)

> 点击 `(x)` 触发 `props.onConfirm` 事件

示例:
```javascript
<Dialog
    show={true}
    transparentMode={true}
>
    <img style={{width: '100%'}} src="https://img.alicdn.com/tfs/TB1YhbHQpXXXXcNapXXXXXXXXXX-546-506.png" alt="透明图片" />
</Dialog>
```


### show

- 描述：是否展现
- 类型：`boolean` 之一
- 默认：`true`
- 必选：否

示例：

```javascript
<Dialog show={false} title="我是标题" type="confirm">我是confirm弹出层</Dialog>
```

### locale

- 描述：国际化(包括 zh-cn, en-us)
- 类型：`string`
- 默认：`zh-cn`
- 必选：否

## APIs

### Dialog.alert(option)

- 描述：显示 alert 类型的提示
- 参数说明
    - option.title：对应 props.title
    - option.content：对应 props.children
    - option.onConfirm：对应 props.onConfirm
    - options.className：对应 props.className
    - options.wrapClassName：对应 props.wrapClassName

```javascript
Dialog.alert({
    title: '测试',
    content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
    onConfirm() {
        console.log('multi lines confirm');
    }
});
```

### Dialog.confirm(option)

- 描述：显示 confirm 类型的提示
- 参数说明
    - option.title：对应 props.title
    - option.content：对应 props.children
    - options.className：对应 props.className
    - options.wrapClassName：对应 props.wrapClassName
    - option.onConfirm：对应 props.onConfirm
    - option.onCancel：对应 props.onCancel

```javascript
Dialog.confirm({
    title: '测试',
    content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
    onConfirm() {
        console.log('confirm confirm');
    },
    onCancel() {
        console.log('confirm cancel');
    }
});
```

### Dialog.hide()

- 描述：在使用函数式调用之后，在切换页面的场景下，往往需要手动来关闭 Dialog.

```javascript
Dialog.hide()
```
