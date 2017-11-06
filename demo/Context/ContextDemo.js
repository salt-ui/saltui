/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

import classnames from 'classnames';

const Context = window.Tingle = require('salt-context/Context');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacityArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  render() {
    const t = this;
    return (<div>
      <div className="t-P10">rem demo</div>
      <div className="t-CL">
        {t.state.opacityArr.map(opacity => <div key={Context.getTID()} style={{
          float: 'left',
          width: '1rem',
          height: '1rem',
          backgroundColor: `rgba(0, 0, 0, ${opacity / 10})`,
        }}
        />)}
      </div>
      <div className="t-P10 t-LH2 t-FAC">
        <div className="t-MB10 lineByPx">1px的线，当设备支持0.5px时，使用0.5px</div>
        <div className="t-MB10 lineByPx2">没有处理过的1px的线</div>
        <div className="t-MB10 lineByRem">rem(1)的线</div>
        <div className="t-MB10 lineByRem2">rem(2)的线</div>
        <div className="lineByRem3">rem(3)的线</div>
      </div>
      <div className="t-P10 t-LH2 t-FAC">
        <div className="touchDemo t-TE">点击效果实现演示</div>
      </div>
    </div>);
  }
}

export default Demo;
