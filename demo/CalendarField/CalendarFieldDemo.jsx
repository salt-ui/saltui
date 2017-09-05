/**
 * CalendarField Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const Group = require('@ali/tingle-group');

const CalendarField = require('../../src');

// build之后, 测试一下下面一行, 把上面一行注释掉
// const CalendarField = require('../../dist');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /* value: {
        startDate: '2016-01-02',
        startDateType: 'AM',
        endDate: '2016-01-03',
        endDateType: 'PM',
      },*/
      // value: {
      //   startDate: 1491111113332,
      //   endDate: 1501111113332, // 错误的情况：endDate < 1491111113332
      // },
      // value: '2016-01-02', //
      value: {
        startDate: '',
        endDate: '2016-01-02',
      },
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
      label: '日期区间',
      placeholder: '请选择日期',
      required: false,
      // multiLine: true,
      layout: 'h',
      type: 'day',
      singleMode: false,
      showHalfDay: true,
      topPanelTitle: 'title',
      value: this.state.value,
      tip: '这里是提示信息',
      readOnly: false,
      showWeek: true,
      animationType: 'slideUp',
      showDateType: true,
      formatter: 'yyyy.MM.dd',
      onOk: this.onOk.bind(this),
    };
    return (
      <Group>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">日期区间演示</Group.Head>
        <Group.List>
          <CalendarField {...props} />
        </Group.List>
      </Group>
    );
  }
}

module.exports = Demo;
