# tingle-card [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-card.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-card)

通用卡片容器，可承载文字、列表、图片、段落等内容。

组件效果截图：

![image](http://git.cn-hangzhou.oss-cdn.aliyun-inc.com/uploads/tingle-ui/tingle-style/ca2776081075e44c55073aa6fb93cd92/image.png)

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

```js
import React from 'react';
import Card from '@ali/tingle-card';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="card-wrap">
          <div className="card-wrap-title">卡片圆角：</div>
          <Card className="card-example">
            有效内容区域
          </Card>
        </div>
        <div className="card-wrap">
          <div className="card-wrap-title">卡片通栏：</div>
          <Card mode="full" className="card-example">
            有效内容区域
          </Card>
        </div>
      </div>
    );
  }
}

module.exports = Demo;
```

## Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|className|optional|string|''|className|
|mode|optional|string|'normal'|使用场景，可选 normal/full|

## APIs

no

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-card/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)
