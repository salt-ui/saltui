
English | [中文](./README.md)

# [SaltUI](https://salt-ui.github.io/)

[![npm version](https://img.shields.io/npm/v/saltui.svg?style=flat-square)](https://www.npmjs.com/package/saltui) [![Dependency Status](https://img.shields.io/david/salt-ui/saltui.svg?label=deps&style=flat-square)](https://david-dm.org/salt-ui/saltui) [![devDependency Status](https://img.shields.io/david/dev/salt-ui/saltui.svg?label=devDeps&style=flat-square)](https://david-dm.org/salt-ui/saltui#info=devDependencies)

open resource version, now beta.

SaltUI is a set of React UI components cooperated with DingTalk, and developed for the purpose of providing a high-efficiency, simple but useful componentized solution fot the DingTalk ISV & other React developers.

## FEATURE

* A DingTalk native UI-like style.
* Specialized components for DingTalk Native APIs.
* 60+ components to suit most development cases.
* maintained by Alibaba's professional design & development team, focus on the enterprise-class office scene.

## Demo & Document

https://salt-ui.github.io/

## Installation

```bash
$ npm install saltui --save
```

## Usage

### import js
```jsx
import { Button } from 'saltui';
ReactDOM.render(<Button />, mountNode);
```

### import js as required

* use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) (recommanded)

  ```js
  // .babelrc or babel-loader option
  {
    "plugins": [
      ["import", { libraryName: "saltui", camel2DashComponentName: false }]
    ]
  }
  ```


* or, import manually

  ```js
  import Button from 'saltui/lib/Button';
  ```

### import style package
```css
@import '~saltui/build/salt-ui.css';
```

## Browser Support

* iOS
* Android 4.0+

## Project Developing Tools

1. We recommend [Nowa](https://nowa-webpack.github.io/) as the project developing tools
  * [Windows Version Download](https://alixux.org/downloads/nowa-gui.exe)
  * [Mac version Download](https://alixux.org/downloads/nowa-gui.dmg)
2. choose `nowa-template-salt` project template, and then Create
3. click Start to start the project，and then open it in the browser.

## License

This project is licensed under the terms of the [MIT license](./LICENSE)
