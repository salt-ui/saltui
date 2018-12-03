通用卡片容器，可承载文字、列表、图片、段落等内容。

## Simple Usage

```js
import React from 'react';

import { Card } from 'saltui'

class Demo extends React.Component {
  render() {
    return (
      <Card locale="zh-cn">
          <Card.Header>
            <img src="//img.alicdn.com/tps/TB1i6mhPFXXXXcQXXXXXXXXXXXX-640-340.jpg" style={{width: '100%'}} />
          </Card.Header>
          <Card.Body
            image={<img src="//img.alicdn.com/tps/TB1i6mhPFXXXXcQXXXXXXXXXXXX-640-340.jpg" style={{width: '100px'}}/>}
            title="2017财年绩效评估"
            subTitle="2017"
            content="很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文"
            reverse={true}
          >
            {/* children会替代prop.content，用来描述比较复杂的content场景 */}
            通过完整还原规范，建立相应的前端组件库，可以更好地与设计师、产品经理进行沟通合作。通过完整还原规范，建立相应的前端组件库，可以更好地与设计师、产品经理进行沟通合作。
          </Card.Body>
          <Card.Footer
            actions={[
              <Button type="minor" size="small" display="inline" onClick={this.clickTheButton.bind(this)}>一级按钮1</Button>,
              <Button type="minor" size="small" display="inline">一级按钮2</Button>,
              <Button type="secondary" size="small" display="inline">一级按钮3</Button>,
              <Button type="secondary" size="small" display="inline" onClick={this.clickTheButton.bind(this)}>一级按钮4</Button>
            ]} 
            content={<span>已等待3小时</span>}>
            {/* children 会让actions和content失效 */}
          </Card.Footer>
        </Card>
    );
  }
}

module.exports = Demo;
```

## Card Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|className|optional|string|''|className|
|mode|optional|string|'normal'|使用场景，可选 normal/full|
|locale|optional|string|'zh-cn'|国际化选项|

## Card.Body Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|image|optional|node|null|内容小图|
|title|optional|node|null|内容标题|
|subTitle|optional|node|null|内容副标题|
|content|optional|node|null|内容区域|
|reverse|optional|bool|false|图片和内容方向反转|

## Card.Footer Props
|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|actions|optional|node[]|null|按钮列表，如果有children，此参数失效|
|content|optional|node|null|操作区副内容，如果有children，此参数失效|
