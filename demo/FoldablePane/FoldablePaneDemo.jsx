/**
 * FoldablePane Component Demo for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import FoldablePane from 'salt-foldable-pane';

class FoldablePaneDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fold: true,
      changeText: true,
    };
  }

  render() {
    return (
      <div>
        <FoldablePane
          className="my-test-demo-foldable"
          foldHeight={300}
          isFold={this.state.fold}
          onFold={foldStatus => (foldStatus)}
        >
          <h1>开发原则</h1>
          <div style={{ lineHeight: 1.5 }}>
            可用于开发者提交MR时自查，也可用于Reviewer对照，也方便评分

            - 开发组件前，一定要先去[react-component](https://github.com/react-component)看下是否有对应的组件，如果有，要基于rc去封装，而不要自己写。（[ant-mobile](https://mobile.ant.design/docs/react/introduce-cn) 是基于rc封装的，去查下有没有对应的组件）；
            - 组件的设计思路：组件应该是`受限`的，要尽量减少内部维护自己的状态；
            <div
              style={{
                display: this.state.changeText ? 'block' : 'none',
              }}
            >
              - eslint必须通过；
              - README要补充完整，必须包含完整、正确的组件说明、组件截图（来自Demo）、api介绍等相关信息；
              - README强烈建议包含组件设计图；
              - HISTORY必须分条、明确地列出全部改动点，且每个版本只能出现1次（示例：不允许出现2个及以上1.0.0的版本）；
                  - Demo要尽可能全地展示组件的能力；
              - css：
                - 命名规则：单词之间只能使用`-`分割，不允许使用驼峰等其它命名方式；
                - 尽量让各class扁平化，不要出现太多嵌套，名字可适当长一点；
                - 不要直接使用#ccc、#fff这样的色值，换肤不方便。参考[这里的写法](http://gitlab.alibaba-inc.com/tingle-ui/tingle-rate/blob/master/src/Rate.styl#L28)；
                - 尽量不要直接写display:flex，[tingle-style](http://gitlab.alibaba-inc.com/tingle-ui/tingle-style)中已经对这些方法做了封装，先去查找一下。只需要在dom上添加classname即可；
              - js：
                - 严禁出现`length1、length2`这样的变量，变量命名必须`可表义`；
                - 某些情况下，可考虑 动宾结构 命名，而不是两个名词累加（比如可写成canAdd不要写成normalAdd）；
              - 未依赖的包，不要出现在package.json的`dependencies`中；要依赖的包，则必须出现在其中；
              - 组件内部不允许自己引入icon，只能引用tingle-icon中的icon，如果没有，找召伯；
              - 建议加注释；
            </div>
          </div>
        </FoldablePane>
        <button
          onClick={() => { this.setState({ fold: !this.state.fold }); }}
        > change fold </button>
        <button
          onClick={() => { this.setState({ changeText: !this.state.changeText }); }}
        > change text </button>
      </div>
    );
  }
}

export default FoldablePaneDemo;
