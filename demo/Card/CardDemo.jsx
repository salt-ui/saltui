/**
 * Card Component Demo for tingle
 * @author caiyongmin
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Context from 'salt-context';
import IconEye from 'salt-icon/lib/Eye';
import IconStarLine from 'salt-icon/lib/StarLine';
import Card from 'salt-card';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Card = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const headerCls = Context.prefixClass('card-header');
    const bodyCls = Context.prefixClass('card-body');
    const footerCls = Context.prefixClass('card-footer');

    return (
      <div>
        <div className="card-wrap">
          <div className="card-wrap-title">场景：</div>
          <Card className="card-sence">
            <div className={headerCls}>
              <img className="card-avatar" src="https://work.alibaba-inc.com/photo/WB217531.jpg?" alt="avatar" />
              <div className="card-header-text">
                <span className="card-username">花名</span>
                <span className="card-date">2017/05/20</span>
              </div>
            </div>
            <div className={bodyCls}>
              <div className="card-title">2017财年绩效评估</div>
              <p className="card-desc">通过完整还原规范，建立相应的前端组件库，可以更好地与设计师、产品经理进行沟通合作。</p>
            </div>
            <div className={footerCls}>
              <div className="card-footer-meta">
                <span className="card-footer-meta-item">
                  <IconEye className="card-icon" />
                  <span className="card-eye-count">12</span>
                </span>
                <span className="card-footer-meta-item">
                  <IconStarLine className="card-icon" />
                  <span className="card-like-count">12</span>
                </span>
              </div>
              <div className="card-footer-extra">辅助文字</div>
            </div>
          </Card>
        </div>
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

export default Demo;
