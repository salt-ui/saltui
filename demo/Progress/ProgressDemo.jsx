/**
 * Progress Component Demo for tingle
 * @author shallker.wxd(dongnan)
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Progress from 'salt-progress';

class ProgressDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percent1: 0,
      percent2: 30,
      percent3: 70,
    };
  }

  render() {
    const t = this;

    if (t.state.percent1 < 100) {
      setTimeout(() => {
        t.setState({
          percent1: t.state.percent1 + 20,
        });
      }, 1000);
    }

    return (
      <div>
        <div style={{ marginBottom: '30px' }}>
          <Progress percent={t.state.percent1} status="normal" showInfo />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <Progress percent={t.state.percent2} status="exception" showInfo={false} />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <Progress percent={t.state.percent3} showInfo strokeWidth={1} />
        </div>
      </div>
    );
  }
}

export default ProgressDemo;
