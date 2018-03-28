/**
 * CalendarField Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Group from 'salt-group';
import CalendarField from 'salt-calendar-field';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const CalendarField = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: {
      //   startDate: '2016-01-02',
      //   startDateType: 'AM',
      //   endDate: '2016-01-03',
      //   endDateType: 'PM',
      // },
      // value: {
      //   startDate: 1491111113332,
      //   endDate: 1481111113332, // 错误的情况：endDate < 1491111113332
      // },
      // value: '2016-01-02',
      // value: {
      //   value: '2016-01-02',
      // },
      value: {
        startDate: null,
        endDate: null,
      },
      // value: {
      //   startDate: null,
      //   endDate: null,
      // },
    };
  }

  onOk(value) {
    console.log(value);
    this.setState({
      value,
    });
  }

  render() {
    const props = {
      className: 'calendar-field-demo',
      label: '日期',
      placeholder: ['请选择开始日期', '请选择结束日期'],
      required: false,
      // multiLine: true,
      // readOnly: true,
      layout: 'h',
      type: 'day',
      singleMode: false,
      // formatter: 'yyyy-MM-dd',
      showWeek: false,
      showDateType: false,
      showHalfDay: false,
      topPanelTitle: '请选择日期',
      value: this.state.value,
      tip: '这里是提示信息',
      animationType: 'slideLeft',
      // animationType: 'slideUp',
      onOk: this.onOk.bind(this),
    };
    return (
      <Group>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">基本演示</Group.Head>
        <Group.List>
          <CalendarField {...props} />
        </Group.List>
      </Group>
    );
  }
}

export default Demo;
