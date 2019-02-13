/**
 * Card Component Demo for SaltUI
 * @author shixin
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';

import { prefixClass } from 'salt-context';
import IconEye from 'salt-icon/lib/Eye';
import IconStarLine from 'salt-icon/lib/StarLine';
import Card from '../../src/Card';
import Button from '../../src/button';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Card = require('../../dist');

class Demo extends React.Component {
  clickTheButton() {
    alert('clicked')
  }
  render() {
    const headerCls = prefixClass('card-header1');
    const bodyCls = prefixClass('card-body1');
    const footerCls = prefixClass('card-footer1');

    return (
      <div>
        <div className="card-wrap-title">全部场景：</div>
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
            {/* children会替代prop.content，用来描述比较复杂的content */}
            通过完整还原规范，建立相应的前端组件库，可以更好地与设计师、产品经理进行沟通合作。通过完整还原规范，建立相应的前端组件库，可以更好地与设计师、产品经理进行沟通合作。
          </Card.Body>
          <Card.Footer
            actions={
              <div>
                <Button type="minor" size="small" display="inline" onClick={this.clickTheButton.bind(this)}>一级按钮1</Button>
                <Button type="minor" size="small" display="inline">一级按钮2</Button>
                <Button type="secondary" size="small" display="inline">一级按钮3</Button>
              </div>
            } 
            content={<span>已等待3小时</span>}>
            {/* children 会让actions和content失效 */}
          </Card.Footer>
        </Card>
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
      </div>
    );
  }
}

export default Demo;
