/**
 * Progress Component Demo for SaltUI
 * @author shallker.wxd(dongnan)
 *
 * Copyright 2018-2019, SaltUI Team.
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
          <Progress percent={t.state.percent2} status="exception" showInfo={true} color={'green'} />
      </div>
    );
  }
}

export default ProgressDemo;
