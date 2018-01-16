
中文 | [English](./README_EN.md)

# [SaltUI](https://salt-ui.github.io/)

[![npm version](https://img.shields.io/npm/v/saltui.svg?style=flat-square)](https://www.npmjs.com/package/saltui) [![Dependency Status](https://img.shields.io/david/salt-ui/saltui.svg?label=deps&style=flat-square)](https://david-dm.org/salt-ui/saltui) [![devDependency Status](https://img.shields.io/david/dev/salt-ui/saltui.svg?label=devDeps&style=flat-square)](https://david-dm.org/salt-ui/saltui#info=devDependencies)

开源版本，目前 beta 中。

SaltUI 是与钉钉官方合作的 React UI 组件库，致力于为钉钉微应用开发者以及其他 React 开发者提供高效、简洁、实用的组件化解决方案。

## 特性

* 与钉钉原生风格相匹配的视觉风格。
* 提供针对钉钉 Native API 进行定制的组件
* 60+ 的各种类型组件，满足常见开发需求。
* 从设计到开发的全专业团队维护，着重于企业办公场景。

## 演示 & 组件文档

https://salt-ui.github.io/

## 安装

```bash
$ npm install saltui --save
```

## 使用

### 引入 js
```jsx
import { Button } from 'saltui';
ReactDOM.render(<Button />, mountNode);
```

### 按需引入 js

* 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

	```js
	// .babelrc or babel-loader option
	{
	  "plugins": [
	    ["import", { libraryName: "saltui", camel2DashComponentName: false }]
	  ]
	}
	```

	配置好后，引用方式不需要改变，即可实现按需加载。

* 或者，手动引入

	```js
	import Button from 'saltui/lib/Button';
	```


### 引入样式包
```css
@import '~saltui/build/salt-ui.css';
```

## 浏览器支持

* iOS
* Android 4.0+

## 集成开发工具

1. 推荐使用 [Nowa](https://nowa-webpack.github.io/) 作为项目的开发工具
	* [Windows 版下载地址](https://alixux.org/downloads/nowa-gui.exe)
	* [Mac 版下载地址](https://alixux.org/downloads/nowa-gui.dmg)
2. 选择 nowa-template-salt 项目模板 Create
3. 点击 Start 启动项目，在浏览器中打开

## 许可

本项目基于 [MIT 协议](./LICENSE) 进行开发和发布。

## 遇到问题

* 可以通过 [FAQ](https://github.com/salt-ui/saltui/issues/10) 进行自查。
* 关于使用上的疑问和合作相关事宜，可以通过钉钉反馈群与开发者直接取得联系。

<img src="https://img.alicdn.com/tfs/TB17wNbesrI8KJjy0FhXXbfnpXa-877-1078.jpg" width="300">
