/**
 * Rate Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Rate from 'salt-rate';

// build之后, 测试一下下面一行, 把上面一行注释掉
// import Rate from '../../dist';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score1: 2,
    };
  }

  handleChange(label, score) {
    this.setState({
      [label]: score,
    });
  }

  render() {
    const t = this;
    const totalScore = 6;
    return (
      <div className="t-M10">
        <div className="t-FBH t-FBAC t-H44">
          <div className="tFB1">服务态度：</div>
          <div>
            <Rate
              total={totalScore}
              scoreTips={['不合格', '合格', '良好', '优秀', '卓越']}
              size="normal"
              score={t.state.score1}
              onChange={(value) => { t.handleChange('score1', value); }}
            />
          </div>
        </div>
        <div className="t-FBH t-FBAC t-H44">
          <div className="tFB1">认路能力：</div>
          <div>
            <Rate
              showTip={false}
              size="normal"
              value={t.state.score2}
              onChange={(value) => { t.handleChange('score2', value); }}
            />
          </div>
        </div>
        <div className="t-FBH t-FBAC t-H44">
          <div className="tFB1">开车水平：</div>
          <div>
            <Rate
              value={t.state.score3}
              onChange={(value) => { t.handleChange('score3', value); }}
            />
          </div>
        </div>
        <div className="tFB1">最终结果：</div>
        <div className="rate-wrapper">
          <Rate
            size="large"
            scoreTips={['表现太差', '表现一般', '表现良好', '表现优秀', '表现卓越']}
            value={t.state.score4}
            onChange={(value) => { t.handleChange('score4', value); }}
          />
        </div>
      </div>
    );
  }
}

export default Demo;
