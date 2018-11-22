/**
 * DataView Component Demo for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';

import Context from 'salt-context';
import IconEye from 'salt-icon/lib/Eye';
import IconStarLine from 'salt-icon/lib/StarLine';
import DataView from 'salt-data-view';
import Button from 'salt-button';

const { Data } = DataView;

// build之后, 测试一下下面一行, 把上面一行注释掉
// const DataView = require('../../dist');

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
        
        <div className="data-view-wrap">
          <div className="data-view-wrap-title">基本使用</div>
          <DataView label="年度申报">
            <Data number={1.5} unit="天" />
            <Data number={36} unit="小时" />
            <Data number={18} unit="次" secondary />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">分隔符</div>
          <DataView label="年度申报">
            <Data groupDigits={3} spliter="," number={7834295} unit="元" />
            <Data groupDigits={4} spliter=" " number={7834295} unit="元" />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">固定小数位数</div>
          <DataView label="年度申报">
            <Data number={100} digits={2} unit="元" />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">最大值限制</div>
          <DataView label="年度申报">
            <Data number={567} max={99} unit="次" />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">强制显示正负号</div>
          <DataView label="涨跌幅">
            <Data number={3.7} unit="%" showSign />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">颜色表示正负</div>
          <DataView label="涨跌幅">
            <Data number={3.7} digits={2} unit="%" showSign={false} positiveColor="red" negativeColor="green" />
            <Data number={-1.4} digits={2} unit="%" showSign={false} positiveColor="red" negativeColor="green"  />
            <Data number={0} digits={2} unit="%" showSign={false} positiveColor="red" negativeColor="green"  />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">水平布局</div>
          <DataView label="借款金额" layout="h">
            <Data number={1500} digits={2} unit="CNY" />
          </DataView>
          <DataView label="年度申报" layout="h">
            <Data number={1.5} unit="天" />
            <Data number={36} unit="小时" />
            <Data number={18} unit="次" secondary />
          </DataView>
        </div>

        <div className="data-view-wrap">
          <div className="data-view-wrap-title">直接使用 &lt;Data&gt;</div>
          <Button className="data-view-wrap-space">
            点赞 <Data number={200} max={99} unit="次" />
          </Button>
        </div>
        
      </div>
    );
  }
}

export default Demo;
