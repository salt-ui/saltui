/**
 * Card Component Demo for SaltUI
 * @author caiyongmin
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';

import { prefixClass } from 'salt-context';
import IconEye from 'salt-icon/lib/Eye';
import IconStarLine from 'salt-icon/lib/StarLine';
import Carder from '../../src/Carder';
import Button from '../../src/button';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Card = require('../../dist');

class Demo extends React.Component {
  clickTheButton() {
    alert('clicked')
  }
  render() {
    return (
      <Carder locale="zh-cn">
        <Carder.Header>
          <img src="//img.alicdn.com/tps/TB1i6mhPFXXXXcQXXXXXXXXXXXX-640-340.jpg" style={{width: '100%'}} />
        </Carder.Header>
        <Carder.Body
          image={<img src="//img.alicdn.com/tps/TB1i6mhPFXXXXcQXXXXXXXXXXXX-640-340.jpg" style={{width: '100px'}}/>}
          title="这是一段主标题文字"
          subTitle="¥900"
          content="很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文"
          reverse={true}
        >
          {/* children会替代prop.content，用来描述比较复杂的content */}
          content很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文很长的一段正文
        </Carder.Body>
        <Carder.Footer
          actions={[
            <Button type="minor" size="small" display="inline" onClick={this.clickTheButton.bind(this)}>一级按钮1</Button>,
            <Button type="minor" size="small" display="inline">一级按钮2</Button>,
            <Button type="secondary" size="small" display="inline">一级按钮3</Button>,
            <Button type="secondary" size="small" display="inline" onClick={this.clickTheButton.bind(this)}>一级按钮4</Button>
          ]} 
          content={<span>已等待3小时</span>}>
          {/* children 会让actions和content失效 */}
        </Carder.Footer>
      </Carder>
    );
  }
}

export default Demo;
