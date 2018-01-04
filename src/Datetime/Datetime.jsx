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
import Slot from '../Slot';
import locale from './locale';
import {
  makeRange,
  addZero,
  getDates,
  parseValue,
  isUndefined,
  formatFromProps,
  isArray,
  parseDate,
  filterTime,
  colFlags,
  Y,
  YM,
  YMD,
  YMDT,
  YMDHM,
  YMDWHM,
  filterMonth,
  filterDay,
  getDayByMonth,
  getDaysByYear,
  getMonthsByYear,
  parseDisabledArr,
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
    const me = this;
    this.init(props, me);
  }
  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    const { setValue } = this;
    const { value } = nextProps;
    if (value) {
      setValue(value, nextProps);
    }
  }
  setValue = (newValue, nextProps) => {
    const newProps = nextProps || this.props;
    let { data, value } = this.getOptions({ value: newValue }, newProps);
    const { columns } = newProps;
    if (newProps.disabledDate) {
      data = filterTime({ data, disabledDate: newProps.disabledDate, value, columns });
    }
    this.state = {
      data,
      value,
    };
  }

  // 获取默认最小值
  getDefaultMinDate = (value) => {
    const date = new Date(value);
    if (date.toString() === 'Invalid Date') {
      throw Error('Invalid Date');
    }
    return date;
  };
  // 获取默认最大值
  getDefaultMaxDate = (value) => {
    const date = new Date(value);
    if (date.toString() === 'Invalid Date') {
      throw Error('Invalid Date');
    }
    return date;
  };
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
  getOptions = ({ value }, props) => {
    let { minDate, maxDate, minuteStep } = props;
    minDate = this.getDefaultMinDate(minDate);
    maxDate = this.getDefaultMaxDate(maxDate);
    const currentValue = parseValue(value);
    const datYear = getDaysByYear(currentValue[0]);
    const options = [
      makeRange(minDate.getFullYear(), maxDate.getFullYear()),
      makeRange(1, 12).map(v => ({ text: `${v}`, value: v - 1 })),
      getDates(value),
      locale[props.locale].noon,
      makeRange(0, 12),
      makeRange(0, 23),
      makeRange(0, 59, minuteStep),
      makeRange(0, 59),
      datYear,
      datYear,
    ];
    const ret = Slot.formatDataValue([].concat(options), [].concat(currentValue));
    const data = formatFromProps(this.formatText(ret.data), props);
    const newValue = formatFromProps(this.formatText(ret.value), props);
    return {
      data,
      value: newValue,
    };
  }
  setOptions = (props, newValue) => {
    let { data, value } = this.getOptions({ value: newValue || props.value }, props);
    const { columns, minDate, maxDate } = props;
    const colStyle = columns[0];
    if (props.disabledDate && colStyle !== 'YMDW' && colStyle !== 'YMD') {
      data = filterTime({ data, disabledDate: props.disabledDate, value, columns, minDate, maxDate });
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
  // 添加年月日等文本
  formatText = (arr, text) => {
    const formatArray = [];
    const localeCode = this.props.locale;
    for (let i = 0; i < arr.length; i += 1) {
      const el = arr[i];
      formatArray.push(isArray(el) ?
        this.formatText(el, locale[localeCode].surfix[colFlags[i]]) :
        {
          text: addZero(el.text) +
              (isUndefined(text) ? locale[localeCode].surfix[colFlags[i]] : text),
          value: el.value,
        });
    }
    return formatArray;
  }
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
    let disabledArr = disabledDate();
    const newData = this.getOptions({ value: date }, props);
    const YEARDATE = data[0];
    const NEWDATA = newData.data;
    if (columns[0] === 'Y') {
      NEWDATA[0] = YEARDATE;
    }
    if (columnsStyle === 'D') {
      props.onChange(date, column);
      return;
    }
    const updateObj = {
      value,
      data: NEWDATA,
    };
    if (isArray(disabledArr) && disabledArr.length) {
      disabledArr = parseDisabledArr(disabledArr);
      const AllData = NEWDATA;
      if (columnsStyle === 'Y') { // 计算月份
        const year = value[column].value;
        const monthArr = getMonthsByYear({ minDate, maxDate, year });
        AllData[column + 1] = filterMonth(monthArr, year, disabledArr);
      }
      if (columnsStyle === 'M') { // 计算日
        const month = value[column].value;
        const year = value[0].value;
        const dayArr = getDayByMonth({
          minDate, maxDate, year, month,
        });
        AllData[column + 1] = filterDay(dayArr, year, month, disabledArr);
      }
      updateObj.data = AllData.length ? AllData : NEWDATA;
    }
    this.setState(updateObj);
    props.onChange(date, column);
  };
  // 初始化日历面板
  init = (props, me) => {
    this.setOptions(props, me);
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
Datetime.displayName = 'Datetime';

export default Datetime;
