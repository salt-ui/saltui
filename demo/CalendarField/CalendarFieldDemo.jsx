/**
 * CalendarField Component Demo for SaltUI
 * @author quanyun.mqy
 *
 * Copyright 2018-2019, SaltUI Team.
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
      value: {
        value: '2016-01-02',
      },
      // value: {
      //   startDate: null,
      //   endDate: null,
      // },
      // value: {
      //   startDate: null,
      //   endDate: null,
      // },
      visible: false,
    };
  }

  onOk(value) {
    console.log(value);
    this.setState({
      visible: false,
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
      allowClear: true,
      // type: 'dayWithTime',
      singleMode: true,
      // formatter: 'yyyy-MM-dd',
      showWeek: true,
      showDateType: false,
      showHalfDay: false,
      topPanelTitle: '请选择日期',
      value: this.state.value,
      tip: '这里是提示信息',
      animationType: 'slideLeft',
      // animationType: 'slideUp',
      onOk: this.onOk.bind(this),
      visible: this.state.visible,
      onOpen: () => {
        this.setState({
          visible: true,
        });
      },
      onCancel: () => {
        this.setState({
          visible: false,
        });
      },
    };
    return (
      <div>
        <CalendarField {...props} />
        {/* <CalendarField {...props} label="查看态" readOnly />
        <CalendarField {...props} label="禁用" disabled /> */}
      </div>
    );
  }
}

export default Demo;
