/**
 * Slot Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

// 这是一个比较复杂的例子，演示了年月日选择的交互逻辑，
// 如果仅需要简单使用帮助，请参考 README.md 的 Simple Usage。
import Button from 'salt-button';

import React from 'react';
import Slot from 'salt-slot';

// 是否是闰年的判断
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function makeArray(max) {
  const arr = [];
  for (let i = 1; i <= max; i += 1) {
    arr.push(i);
  }
  return arr;
}

// 获取某个月份的日期选项
function getDates(year, month) {
  switch ('1 1010110101'.split('')[month]) {
    case '1': // 大月
      return makeArray(31);
    case '0': // 小月
      return makeArray(30);
    case ' ': // 闰年 2 月 和 平年 2 月
      return isLeapYear(year) ? makeArray(29) : makeArray(28);
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    // 数据格式化
    const { data, value } = Slot.formatDataValue(
      [
        [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        [{ text: 'Jan', value: 0 }, { text: 'Feb', value: 1 },
          { text: 'Mar', value: 2 }, { text: 'Apr', value: 3 },
          { text: 'May', value: 4 }, { text: 'Jun', value: 5 },
          { text: 'Jul', value: 6 }, { text: 'Aug', value: 7 },
          { text: 'Sep', value: 8 }, { text: 'Oct', value: 9 },
          { text: 'Nov', value: 10 }, { text: 'Dec', value: 11 }],
        getDates(now.getFullYear(), now.getMonth()), // [ 1, 2, 3, ..., 31 ]
      ],
      [now.getFullYear(), now.getMonth(), now.getDate()] // [ 2015, 8, 7 ]
    );

    const t = this;
    t.state = {
      paneData: data,
      paneValue: value,
      data, // 数据模型
      value: null, // 选中的值
      confirmedValue: null, // 上次选中的值（取消选择时恢复用）
    };
  }

  showSlot() {
    this.slot.show();
  }

  handleConfirm(value) {
    console.log('handleConfirm', value);
    const t = this;
    // 确认选中项目
    t.setState({
      confirmedValue: value,
      value,
    });
  }

  handleChange(value, column, index) {
    console.log('change', value, column, index);
    const t = this;
    let dates;
    if (column === 1) {
      // 改变了月份，会导致月内天数的改变
      dates = getDates(value[0].value, value[1].value);
    } else if (column === 0 && value[1].value === 1) {
      // 改变了年份，会导致 2 月天数的改变
      dates = getDates(value[0].value, 1);
    }
    if (dates) {
      // 同时变更日期和选中项
      const ret = Slot.formatColumnValue(dates, value[2]);
      value[2] = ret.columnValue;
      t.setState(React.addons.update(t.state, {
        data: {
          2: {
            $set: ret.columnData,
          },
        },
        value: {
          $set: value,
        },
      }));
    } else {
      // 仅改变了选中项
      t.setState({
        value,
      });
    }
  }

  paneHandleChange(value, column) {
    console.log(value, column);
    const t = this;
    let dates;
    if (column === 1) {
      // 改变了月份，会导致月内天数的改变
      dates = getDates(value[0].value, value[1].value);
    } else if (column === 0 && value[1].value === 1) {
      // 改变了年份，会导致 2 月天数的改变
      dates = getDates(value[0].value, 1);
    }
    if (dates) {
      // 同时变更日期和选中项
      const ret = Slot.formatColumnValue(dates, value[2]);
      value[2] = ret.columnValue;
      const paneData = [...this.state.paneData];
      paneData[2] = ret.columnData;
      this.setState({
        paneData,
        paneValue: value,
      });
    } else {
      // 仅改变了选中项
      t.setState({
        paneValue: value,
      });
    }
  }

  handleCancel() {
    const t = this;

    // 取消操作时要恢复上次选中的项，恢复后为确保有对应的日期，需要重新设置日期
    const value = t.state.confirmedValue;

    if (!value) {
      return;
    }


    const dates = getDates(value[0].value, value[1].value);
    const ret = Slot.formatColumnValue(dates);


    t.setState(React.addons.update(t.state, {
      data: {
        2: {
          $set: ret.columnData,
        },
      },
      value: {
        $set: value,
      },
    }));
  }

  render() {
    const t = this;
    return (
      <div>
        <div className="demo">
          <div>
            <Button size="large" onClick={() => { t.showSlot(); }}>show slot</Button>
          </div>
          <div>确认值：{t.state.confirmedValue && t.state.confirmedValue.length > 0 ? (`${t.state.confirmedValue[2].text} ${t.state.confirmedValue[1].text} ${t.state.confirmedValue[0].text}`) : null}</div>
          <div>临时值：{t.state.value && t.state.value.length > 0 ? (`${t.state.value[2].text} ${t.state.value[1].text} ${t.state.value[0].text}`) : null}</div>
          <div>常驻Pane选择值：{t.state.paneValue && t.state.paneValue.length > 0 ? (`${t.state.paneValue[2].text} ${t.state.paneValue[1].text} ${t.state.paneValue[0].text}`) : null}</div>
        </div>
        <Slot
          maskCloseable
          ref={(c) => { this.slot = c; }}
          data={t.state.data}
          value={t.state.value}
          columns={['年', '月', '日']}
          title="选择日期"
          onConfirm={(value) => { t.handleConfirm(value); }}
          onChange={(value, column, index) => { t.handleChange(value, column, index); }}
          onCancel={() => { t.handleCancel(); }}
        />
        <Slot.Pane
          ref={(c) => { this.slotpane = c; }}
          data={t.state.paneData}
          columnsFlex={[1.24, 1.1, 1.1]}
          value={t.state.paneValue}
          columns={['年', '月', '日']}
          onChange={(value, column, index) => { t.paneHandleChange(value, column, index); }}
        />
      </div>
    );
  }
}

export default Demo;

