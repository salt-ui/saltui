/**
 * Style Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import { markdown } from 'markdown';

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const source = `## what's in it
      \`reset.css\` 文件重置了浏览的默认样式，使用时只需将该文件引入页面即可生效，与具体的\`class\`值无关。
      ### border box：

      * 默认所有元素的盒模型类型为 \`border-box\`

      ### list style：

      * 列表元素 \`ul\` 和 \`ol\` 的样式默认为 \`none\` 值。

      ### input, textarea

      * 消除输入框和按钮的原生外观
      * 去掉点击链接和文本框对象时默认的灰色半透明覆盖层(iOS)或者虚框(Android)    

      > 更多内容可以直接查看 \`reset.css\` 源码。
    `;
    const formatedSource = source.replace(/\n\s+/g, '\n');
    console.log(JSON.stringify(formatedSource));
    return (
      <div>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdown.toHTML(formatedSource) }} />
      </div>
    );
  }
}

export default Reset;
