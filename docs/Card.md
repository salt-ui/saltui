

通用卡片容器，可承载文字、列表、图片、段落等内容。

## Simple Usage

```js
import React from 'react';

import { Card } from 'saltui'

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

