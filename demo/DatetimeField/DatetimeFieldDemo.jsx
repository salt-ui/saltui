/**
 * DatetimeField Component Demo for SaltUI
 * @author caoke.ck
 *
 * Copyright 2014-2017, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';

import Group from 'salt-group';
import DatetimeField from 'salt-datetime-field';

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledTime() {
  return {
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledHours: () => [1, 2, 3, 6, 8, 9],
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

// build之后, 测试一下下面一行, 把上面一行注释掉
// const DatetimeField = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    const now = new Date().getTime();// 1500353913176

    t.state = {
      value1: new Date(2018, 8, 29).getTime(),
      value2: {
        value: '',
        timeType: 'PM',
      },
      value3: {
        value: '***',
        timeType: 'PM',
      },
      value4: '2017-7-20 12:42:44', // '2017-7-20 12:42:44',
      value5: '**ji',
    };
  }

  handleChange(field, value) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <Group>
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">时间选择器演示</Group.Head>
          <Group.List>
            {/* <DatetimeField
              label="日期选择"
              layout="v"
              locale="en-us"
              placeholder="请选择日期"
              disabledDate={() => [
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
              // minDate={new Date()}
              minDate={new Date(2018, 8, 28).getTime()}
              maxDate={new Date(2018, 9, 28).getTime()}
              onSelect={t.handleChange.bind(t, 'value1')}
              value={t.state.value1}
              columns={DatetimeField.YMD}
              tip="这里是提示信息"
            />
            <DatetimeField
              label="日期/上下午选择"
              onSelect={t.handleChange.bind(t, 'value2')}
              value={t.state.value2}
              columns={DatetimeField.YMDT}
              placeholder="请选择日期"
              defaultOpenValue={new Date(2018, 9, 1).getTime()}
            />
            <DatetimeField
              label="时间选择"
              onSelect={t.handleChange.bind(t, 'value3')}
              value={t.state.value3}
              columns={DatetimeField.YMDWHM}
            /> */}
            <DatetimeField
              label="很长很长的时间选择，真的很长，我都不知道说啥，特别长"
              onSelect={t.handleChange.bind(t, 'value4')}
              value={t.state.value4}
              columns={DatetimeField.YMDWHM}
              disabledTime={disabledTime}
              // minDate={new Date(2019, 8, 10).getTime()}
              layout="v"
              // disabledDate={() => [
              //     {
              //       start: new Date(2017, 5, 1),
              //       end: new Date(2017, 5, 30),
              //     },
              //   ]
              // }
            />
            {/* <DatetimeField
              label="日期/上下午选择"
              onSelect={t.handleChange.bind(t, 'value5')}
              value={t.state.value5}
              columns={DatetimeField.YMDT}
            /> */}
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
