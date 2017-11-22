# tingle-nav-bar [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-nav-bar.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-nav-bar)

tingle-nav-bar 一个native导航的H5版本

![](http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/tingle-ui/tingle-checkbox-field/f08a5ab5b894c2f02450be1e2d6b38f6/image.png)

## Install

```
tnpm install @ali/tingle-nav-bar --save
```

## Simple Usage

```html
<div id="TingleDemo"></div>

```

```js
class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            className: '',
            title: '我是标题我是标题',
            rightText: '更多',
            isShow: true
        }
    }
    handleOnLeftClick(){
        alert('返回事件')
    }
    handleOnRightClick(){
        alert('更多事件')
    }
    handleCloseViewClick(){
        alert('关闭webView事件')
    }
    render() {
        return <div>
            <NavBar title={this.state.title} isShow={this.state.isShow} onLeftClick={this.handleOnLeftClick.bind(this)}
             onRightClick={this.handleOnRightClick.bind(this)} closeViewClick={this.handleCloseViewClick.bind(this)} />
        </div>
    }
};


```

## Props

### className

描述：自定义样式`class`名称。

类型：`String`

默认：`''`

必选：否



### title

描述：nav-bar 标题名称，超过六个字会显示...

类型：`String`

默认：`''`

必选：是

### rightText

描述：nav-bar 右侧按钮的文本

类型：`String`

默认：`更多`

必选：否

### isShow

描述：nav-bar 当前页面左侧是否显示关闭

类型：`Boolean`

默认：`true`

必选：否

### onLeftClick

描述：nav-bar 左侧返回按钮事件

类型：`Function`

必选：是


### onRightClick

描述：nav-bar 右侧按钮事件

类型：`Function`

必选：是

### closeViewClick

描述：nav-bar 左侧关闭按钮事件

类型：`Function`

必选：是

备注：当前页面isShow 是true 的情况下有效

