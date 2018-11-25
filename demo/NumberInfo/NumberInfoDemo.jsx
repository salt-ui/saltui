/**
 * NumberInfo Component Demo for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';

import Context from 'salt-context';
import NumberInfo from 'salt-number-info';
import Button from 'salt-button';

const { NumberItem } = NumberInfo;

// build之后, 测试一下下面一行, 把上面一行注释掉
// const NumberInfo = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        
        <div className="number-info-wrap">
          <div className="number-info-wrap-title">基本使用</div>
          <NumberInfo label="年度申报">
            <NumberItem number={1.5} unit="天" />
            <NumberItem number={36} unit="小时" />
            <NumberItem number={18} unit="次" secondary />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">分隔符</div>
          <NumberInfo label="年度申报">
            <NumberItem groupDigits={3} spliter="," number={7834295} unit="元" />
            <NumberItem groupDigits={4} spliter=" " number={7834295} unit="元" />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">固定小数位数</div>
          <NumberInfo label="年度申报">
            <NumberItem number={100} digits={2} unit="元" />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">最大值限制</div>
          <NumberInfo label="年度申报">
            <NumberItem number={567} max={99} unit="次" />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">强制显示正负号</div>
          <NumberInfo label="涨跌幅">
            <NumberItem number={3.7} unit="%" showSign />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">颜色表示正负</div>
          <NumberInfo label="涨跌幅">
            <NumberItem number={3.7} digits={2} unit="%" showSign={false} positiveColor="red" negativeColor="green" />
            <NumberItem number={-1.4} digits={2} unit="%" showSign={false} positiveColor="red" negativeColor="green"  />
            <NumberItem number={0} digits={2} unit="%" showSign={false} positiveColor="red" negativeColor="green"  />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">水平布局</div>
          <NumberInfo label="借款金额" layout="h">
            <NumberItem number={1500} digits={2} unit="CNY" />
          </NumberInfo>
          <NumberInfo label="年度申报" layout="h">
            <NumberItem number={1.5} unit="天" />
            <NumberItem number={36} unit="小时" />
            <NumberItem number={18} unit="次" secondary />
          </NumberInfo>
        </div>

        <div className="number-info-wrap">
          <div className="number-info-wrap-title">直接使用 &lt;NumberItem&gt;</div>
          <Button className="number-info-wrap-space">
            点赞 <NumberItem number={200} max={99} unit="次" />
          </Button>
        </div>
        
      </div>
    );
  }
}

export default Demo;
