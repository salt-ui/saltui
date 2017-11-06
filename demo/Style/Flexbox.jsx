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
    const source1 = `
      ## flexbox axis

      flexbox系统的两个轴：**main axis / cross axis**  
      ![](/demo/src/img/flex-direction-terms.svg)  
      **重点！对齐规则：main轴上的对齐使用justify关键字，cross轴上的对齐使用align关键字。**  
      所以，justify和align**都**可以实现视觉上的水平对齐，具体使用哪一个，**取决于**父容器的伸缩方向。详见下面的demo说明。

      ## doc

      > tingle 中，所有 flexbox 相关的 class 值，都以 t-FB 为前缀。

      ### 定义伸缩容器：

      * t-FBH: 即 \`flexbox horizontal\` ，指定目标元素成为伸缩容器，且内部子元素水平排列。
      * t-FBV: 即 \`flexbox vertical\` ，指定目标元素成为伸缩容器，且内部子元素垂直排列。
      对齐子元素(包括伸缩元素)：

      * t-FBAS: 即 \`cross axis's align start\` ，将子元素对齐到 \`cross\` 轴的起点上。
      * t-FBAC: 即 \`cross axis's align center\` ，将子元素对齐到 \`cross\` 轴的中点上。
      * t-FBAE: 即 \`cross axis's align end\` ，将子元素对齐到 \`cross\` 轴的终点上。
      * t-FBJS: 即 \`main axis's justify start\` ，将子元素对齐到 \`main\` 轴的起点上。
      * t-FBJC: 即 \`main axis's justify center\` ，将子元素对齐到 \`main\` 轴的起点上。
      * t-FBJE: 即 \`main axis's justify end\` ，将子元素对齐到 \`main\` 轴的起点上。

      ## Demo

    `;
    const formatedSource1 = source1.replace(/\n\s+/g, '\n');
    return (
      <div className="markdown-body">
        <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(formatedSource1) }} />
        <h3>Demo1</h3>
        <p>父容器为水平方向伸缩容器，且没有设置任何轴上的对齐方式。则内部的伸缩元素，如果没有设置高度，其高度与父容器高度相等。</p>
        <div className="container t-FBH">
          <div className="red w30 h30" />
          <div className="pink w50 h100" />
          <div className="t-FB1 orange">伸缩元素没有设置高度，则其高度等于容器高度</div>
          <div className="t-FB1 yellowgreen h70">伸缩元素设置了固定高度</div>
        </div>
        <h3>Demo2</h3>
        <p>父容器为水平方向伸缩容器，且设置了cross轴上的对齐。则内部的伸缩元素的高度是auto的。下面的demo设置了cross轴上的对齐为start。</p>
        <div className="container t-FBH t-FBAS">
          <div className="red w30 h30" />
          <div className="pink w50 h100">w:50 h:100</div>
          <div className="t-FB1 orange">伸缩元素没有设置高度</div>
          <div className="t-FB1 yellowgreen h70">伸缩元素设置了固定高度</div>
        </div>
        <h3>Demo3</h3>
        <p>父容器为水平方向伸缩容器，且设置了cross轴上的对齐为center。</p>
        <div className="container t-FBH t-FBAC">
          <div className="red w30 h30" />
          <div className="pink w50 h100">w:50 h:100</div>
          <div className="t-FB1 orange">伸缩元素没有设置高度</div>
          <div className="t-FB1 yellowgreen h70">伸缩元素设置了固定高度</div>
        </div>
        <h3>Demo4</h3>
        <p>父容器为水平方向伸缩容器，且设置了cross轴上的对齐为end。</p>
        <div className="container t-FBH t-FBAE">
          <div className="red w30 h30" />
          <div className="pink w50 h100">w:50 h:100</div>
          <div className="t-FB1 orange">伸缩元素没有设置高度</div>
          <div className="t-FB1 yellowgreen h70">伸缩元素设置了固定高度</div>
        </div>
        <h3>Demo5</h3>
        <p>父容器为垂直方向伸缩容器，且没有设置任何轴上的对齐方式。则内部的伸缩元素，如果没有设置宽度，其宽度与父容器宽度相等。</p>
        <div className="container t-FBV h200">
          <div className="red w30 h30" />
          <div className="green w100 h30" />
          <div className="t-FB1 orange">t-FB1</div>
          <div className="t-FB1 yellowgreen w70">t-FB1 w:70</div>
        </div>
        <h3>Demo6</h3>
        <p>父容器为垂直方向伸缩容器，且设置了cross轴上的对齐。则内部的伸缩元素的宽度是auto的。下面的demo设置了cross轴上的对齐为start。</p>
        <div className="container t-FBV t-FBAS h200">
          <div className="red w30 h30" />
          <div className="green w100 h30" />
          <div className="t-FB1 orange">t-FB1</div>
          <div className="t-FB1 yellowgreen w70">t-FB1 w:70</div>
        </div>
        <h3>Demo7</h3>
        <p>父容器为垂直方向伸缩容器，且设置了cross轴上的对齐为center。</p>
        <div className="container t-FBV t-FBAC h200">
          <div className="red w30 h30" />
          <div className="green w100 h30" />
          <div className="t-FB1 orange">t-FB1</div>
          <div className="t-FB1 yellowgreen w70">t-FB1 w:70</div>
        </div>
        <h3>Demo8</h3>
        <p>父容器为垂直方向伸缩容器，且设置了cross轴上的对齐为end。</p>
        <div className="container t-FBV t-FBAE h200">
          <div className="red w30 h30" />
          <div className="green w100 h30" />
          <div className="t-FB1 orange">t-FB1</div>
          <div className="t-FB1 yellowgreen w70">t-FB1 w:70</div>
        </div>
        <h3>Demo9</h3>
        <p>父容器为水平方向伸缩容器，同时设置两个轴上的对齐为center。</p>
        <div className="container t-FBH t-FBAC t-FBJC h200">
          <div className="red w30 h30" />
          <div className="pink w100 h50" />
          <div className="green w100 h30" />
        </div>
        <h3>Demo10</h3>
        <p>父容器为垂直方向伸缩容器，同时设置两个轴上的对齐为center。</p>
        <div className="container t-FBV t-FBAC t-FBJC h200">
          <div className="red w30 h30" />
          <div className="pink w100 h50" />
          <div className="green w100 h30" />
        </div>
      </div>
    );
  }
}

export default Reset;
