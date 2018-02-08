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
      value0: '***',
      value1: '***',
      value2: {
        value: '2017-7-20 12:42:44',
        timeType: 'PM',
      },
      value3: null,
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
          t.showSlot('slot0');
        }}
        >
        无 disabledDate 日期选择
        </Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={(s) => { t.slot0 = s; window.slot = s; }}
          title="日期选择"
          value={this.state.value1}
          columns={Datetime.YMD}
          onConfirm={(value) => { this.onConfirm(value, 'value1'); }}
          onChange={(value, column) => { console.log(value, column);}}
          onCancel={() => { this.onCancel('value1'); }}
        />
        <Button onClick={() => {
          t.showSlot('slot1');
        }}
        >
        日期选择
        </Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={(s) => { t.slot1 = s; }}
          title="日期选择"
          value={this.state.value1}
          columns={Datetime.YMD}
          disabledDate={() => [
              {
                start: new Date(2018, 5, 1),
                end: new Date(2019, 11, 31),
              },
              // {
              //   start: new Date(2021, 5, 1),
              //   end: new Date(2019, 11, 31),
              // },
              {
                end: new Date(2016, 1, 21),
              },
              new Date(2016, 10, 1),
              {
                start: new Date(2023, 1, 21),
              },
            ]}
          onConfirm={(value) => { this.onConfirm(value, 'value1'); }}
          onChange={(value, column) => { /* console.log(value, column); */ }}
          onCancel={() => { this.onCancel('value1'); }}
        />
        <Button onClick={() => {
          t.showSlot('slot2');
        }}
        >日期/上下午选择
        </Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={s => t.slot2 = s}
          title="日期/上下午选择"
          value={t.state.value2}
          columns={Datetime.YMDT}
          disabledDate={() => [
              {
                start: new Date(2023, 10, 1), //  2023- 11 - 1
              },
              {
                start: new Date(2017, 0, 1),
                end: new Date(2017, 4, 31),
              },
              {
                start: new Date(2017, 5, 1),
                end: new Date(2017, 6, 31),
              },
              {
                start: new Date(2017, 7, 2),
                end: new Date(2017, 7, 30),
              },
              {
                start: new Date(2018, 7, 3),
                end: new Date(2018, 7, 20),
              },
              new Date(2013, 11, 1),
            ]}
          onConfirm={(value) => { this.onConfirm(value, 'value2'); }}
          onCancel={() => { this.onCancel('value2'); }}
        />
        <Button onClick={() => {
          t.showSlot('slot3');
        }}
        >时间选择
        </Button>
        <Datetime
          {...this.datetimeProps}
          slotRef={(s) => { t.slot3 = s; }}
          title="时间选择"
          value={t.state.value3}
          minuteStep={5}
          columns={Datetime.YMDWHM}
          disabledDate={() => [
              {
                start: new Date(2017, 10, 1), // 2023- 11 - 1
                end: new Date(2017, 10, 1),
              },
            ]}
          onConfirm={(value) => { this.onConfirm(value, 'value3'); }}
          onCancel={() => { this.onCancel('value3'); }}
        />
        <Button onClick={() => {
          t.setState({
            value1: '***',
          });
        }}
        >设置第一个value为***
        </Button>
      </div>
    );
  }
}

export default DatetimeDemo;
