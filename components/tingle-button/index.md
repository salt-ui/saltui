# Button 按钮 [![npm version](https://badge.fury.io/js/tingle-button.svg)](http://badge.fury.io/js/tingle-button)

<img src="http://ww1.sinaimg.cn/large/8df27f17gw1f2fxc4ai3bj20az0hpwfg.jpg" width="300"/>

## Simple Usage

```html
<Button>默认按钮</Button>

<Button type="primary" onClick={this.handleClick}>主 按 钮</Button>
<Button type="secondary" onClick={this.handleClick}>次 按 钮</Button>
<Button type="danger" onClick={this.handleClick}>警告按钮</Button>
<Button type="text" onClick={this.handleClick}>纯文本</Button>

<Button type="primary" size="medium" onClick={this.handleClick}>中按钮</Button>
<Button type="primary" size="large" onClick={this.handleClick}>大按钮</Button>
<Button type="primary" size="small" onClick={this.handleClick}>小按钮</Button>

<Button disabled={true}>不可点击</Button>
<Button disabled={true} type="text">纯文本不可点击</Button>
<Button disabled={true} size="small">不可点击</Button>
```

## Props

| 配置项 | 必填 | 默认值 | 功能/备注 |
|---|----|---|----|
|className|optional| |给组件添加额外的class｜
|disabled| optional |false|按钮失效|
|type| optional |primary|按钮的类型, 可选的参数primary、secondary、danger、text|
|size| optional |large|按钮的大小, 可选的参数 small 、medium 、large|
|onClick|optional| |按钮点击时的回调|

## Links 相关链接

- [Fire a bug/Issues 提Bug](https://github.com/tinglejs/tingle-button/issues)
