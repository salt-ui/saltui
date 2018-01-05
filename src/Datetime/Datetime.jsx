/**
 * Datetime Component for tingle
 * @author caoke.ck & shumi.lg
 * @modify quanyun.mqy 于 2017.9.8 从tingle-datetime-field中分拆出来
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Context from '../Context';


import {
  isArray,
  parseDate,
  Slot,
  Y,
  YM,
  YMD,
  YMDT,
  YMDHM,
  YMDWHM,
  filterDate,
  getSlotFormattedValue,
  getOptions,
  locale,
} from './utils';

const columnsFlexMap = {
  YMD: [1.24, 1.1, 1.1],
  YMDT: [0.98, 0.83, 0.83, 0.79],
  YMDHm: [1.64, 0.89, 0.89],
  YMDWHm: [1.64, 0.89, 0.89],
};


class Datetime extends React.Component {
  constructor(props) {
    super(props);
    // 如果二者同时存在，是提示出错
    if (props.columns.indexOf('T') !== -1 && props.columns.indexOf('H') !== -1) {
      throw new Error('Please refer to tingle-document.');
    }
    this.init(props);
  }
  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    this.setOptions(nextProps);
  }
  getPlainDate = (value) => {
    const date = new Date();
    const { columns } = this.props;
    let timeType = 0;

    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i] === 'Y') {
        date.setFullYear(value[i].value);
      } else if (columns[i] === 'M') {
        date.setMonth(value[i].value);
      } else if (columns[i] === 'D') {
        date.setDate(value[i].value);
      } else if (columns[i] === 'H') {
        date.setHours(value[i].value);
      } else if (columns[i] === 'm') {
        date.setMinutes(value[i].value);
      } else if (columns[i] === 's') {
        date.setSeconds(value[i].value);
      } else if (columns[i] === 'T') {
        timeType = value[i].value;
      } else if (columns[i] === 'YMD' || columns[i] === 'YMDW') {
        date.setFullYear((`${value[i].value}`).substring(0, 4));
        date.setMonth((`${value[i].value}`).substring(4, 6) - 1);
        date.setDate((`${value[i].value}`).substring(6, 8));
      }
    }

    // 如果需要显示上下午
    if (columns.indexOf('T') !== -1) {
      date.setHours(timeType ? 18 : 9);
      date.setMinutes(0);
    }

    return {
      value: date.getTime(),
      timeType: timeType ? 'PM' : 'AM',
    };
  };
  setOptions = (props) => {
    let { data, value } = getOptions({ value: props.value }, props);
    const { columns, minDate, maxDate } = props;
    const columnsStyle = columns[0];
    if (props.disabledDate && columnsStyle === 'Y') {
      const disabledArr = props.disabledDate();
      if (isArray(disabledArr) && disabledArr.length) {
        data = filterDate({
          data,
          disabledArr,
          value,
          columns,
          minDate,
          maxDate,
        });
      }
    }
    this.state = {
      data,
      value,
    };
  };
  handleConfirm = (value) => {
    const output = this.getPlainDate(value);
    this.props.onConfirm(output);
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  handleChange = (value, column) => {
    const { props } = this;
    const {
      columns,
      minDate,
      maxDate,
      disabledDate,
    } = props;
    const { data } = this.state;
    const date = parseDate({ columns, value });
    const columnsStyle = columns[column];
    if (columnsStyle === 'D') {
      props.onChange(date, column);
      return;
    }
    const newData = getOptions({ value: date }, props);
    const updateObj = {
      data: newData.data,
      value: newData.value,
    };
    if (value.every(item => !!item)) {
      updateObj.value = value;
    }
    if (disabledDate) {
      const disabledArr = disabledDate();
      if (isArray(disabledArr) && disabledArr.length && columns[0] === 'Y') {
        const YEARDATE = data[0];
        const MONTHDATE = data[1];
        const oldData = {};
        if (columnsStyle === 'Y') {
          oldData.yearData = YEARDATE;
        }
        if (columnsStyle === 'M') {
          oldData.yearData = YEARDATE;
          oldData.monthData = MONTHDATE;
        }
        const AllData = filterDate({
          data: newData.data,
          disabledArr,
          value,
          columns,
          minDate,
          maxDate,
          oldData,
        });
        updateObj.data = AllData.length >= 3 ? AllData : newData.data;
      }
    }
    this.setState(updateObj);
    props.onChange(date, column);
  };
  // 初始化日历面板
  init = (props) => {
    this.setOptions(props);
  };
  render() {
    const { props, state } = this;
    const { data, value } = state;
    return (
      <Slot
        className={Context.prefixClass('datetime-field-border-none')}
        ref={props.slotRef}
        columnsFlex={columnsFlexMap[props.columns.join('')]}
        title={props.title}
        confirmText={props.confirmText || locale[props.locale].confirmText}
        data={data}
        value={value}
        onChange={this.handleChange}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
      />
    );
  }
}
Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: YMD,
  onConfirm: _ => _,
  onCancel: _ => _,
  onChange: _ => _,
  slotRef: _ => _,
  minuteStep: 1,
  minDate: 946656000000,
  maxDate: 1924876800000,
  disabledDate: () => [],
};

Datetime.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  locale: React.PropTypes.string,
  columns: React.PropTypes.array,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  onChange: React.PropTypes.func,
  slotRef: React.PropTypes.func,
  minuteStep: React.PropTypes.number,
  maxDate: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  minDate: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  disabledDate: React.PropTypes.func,
};
Datetime.Y = Y;
Datetime.YM = YM;
Datetime.YMD = YMD;
Datetime.YMDT = YMDT;
Datetime.YMDHM = YMDHM;
Datetime.YMDWHM = YMDWHM;
Datetime.getSlotFormattedValue = getSlotFormattedValue;
Datetime.displayName = 'Datetime';

export default Datetime;
