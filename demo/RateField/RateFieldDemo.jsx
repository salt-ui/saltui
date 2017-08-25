/**
 * RateField Component Demo for tingle
 * @author yuguo.qyg
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import RateField from '../../src';

class RateFieldDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
      {
        value: 1,
        total: 5,
        showTip: false,
        size: "normal",
        scoreTips: ['表现太差','表现一般','表现良好','表现优秀','表现卓越'],
        location: "down",
        label: "标题",
        layout: "h",
        showLabel: false,
      },
      {
        value: 1,
        total: 5,
        showTip: true,
        size: "normal",
        scoreTips: ['表现太差','表现一般','表现良好','表现优秀','表现卓越'],
        location: "down",
        label: "标题",
        layout: "h",
        showLabel: true,
      },
      {
        value: 1,
        total: 5,
        showTip: true,
        size: "large",
        scoreTips: ['表现太差','表现一般','表现良好','表现优秀','表现卓越'],
        location: "down",
        label: "标题",
        layout: "h",
        showLabel: true,
      }
    ]
    }
  }
  

  render() {
    var t = this;
    return (
      <div>
        <RateField  label={t.state.data[0].label} showLabel={t.state.data[0].showLabel} value={t.state.data[0].value} total={t.state.data[0].total} showTip={t.state.data[0].showTip} size={t.state.data[0].size} scoreTips={t.state.data[0].scoreTips}/>
        <RateField  label={t.state.data[1].label} showLabel={t.state.data[1].showLabel} value={t.state.data[1].value} total={t.state.data[1].total} showTip={t.state.data[1].showTip} size={t.state.data[1].size} scoreTips={t.state.data[1].scoreTips}/>
        <RateField  label={t.state.data[2].label} showLabel={t.state.data[2].showLabel} value={t.state.data[2].value} total={t.state.data[2].total} showTip={t.state.data[2].showTip} size={t.state.data[2].size} scoreTips={t.state.data[2].scoreTips}/>
        
      </div>
    );
  }
}

export default RateFieldDemo;
