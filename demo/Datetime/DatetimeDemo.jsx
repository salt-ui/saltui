/**
 * Datetime Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Button from 'salt-button';
import Datetime from 'salt-datetime';

class DatetimeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: 1499702400000,
      value2: {
        value: '2017-7-20 12:42:44',
        timeType: 'PM',
      },
    };
    this.datetimeProps = {
      locale: 'zh-cn',
    };
  }

  onConfirm(value, id) {
    console.log('onConfirm', value);
    this.setState({
      [id]: value,
    });
  }

  onCancel(id) {
    console.log('cancel', this.state[id]);
  }

  showSlot(id) {
    this[id].show();
  }

  render() {
    const t = this;
    return (
      <div className="t-datetime-demo">
        <Button onClick={() => {
          t.showSlot('slot1');
        }}
        >日期选择</Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={s => t.slot1 = s}
          title="日期选择"
          value={t.state.value1}
          columns={Datetime.YMD}
          onConfirm={(value) => { this.onConfirm(value, 'value1'); }}
          onCancel={() => { this.onCancel('value1'); }}
        />
        <Button onClick={() => {
          t.showSlot('slot2');
        }}
        >日期/上下午选择</Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={s => t.slot2 = s}
          title="日期/上下午选择"
          value={t.state.value2}
          columns={Datetime.YMDT}
          onConfirm={(value) => { this.onConfirm(value, 'value2'); }}
          onCancel={() => { this.onCancel('value2'); }}
        />
        <Button onClick={() => {
          t.showSlot('slot3');
        }}
        >时间选择</Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={s => t.slot3 = s}
          title="时间选择"
          value={t.state.value3}
          columns={Datetime.YMDWHM}
          onConfirm={(value) => { this.onConfirm(value, 'value3'); }}
          onCancel={() => { this.onCancel('value3'); }}
        />
        <Button onClick={() => {
          t.setState({
            value1: '***',
          });
        }}
        >设置第一个value为***</Button>
      </div>
    );
  }
}

export default DatetimeDemo;
