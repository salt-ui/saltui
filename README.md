
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

引入 js
```jsx
import { Button } from 'uxcore';
// 或者
import Button from 'uxcore/lib/Button';
ReactDOM.render(<Button />, mountNode);
```

引入样式包
```css
@import '~saltui/build/salt-ui.css';
```

## 浏览器支持

* iOS
* Android 4.0+

## 许可

本项目基于 [MIT 协议](./LICENSE) 进行开发和发布。
