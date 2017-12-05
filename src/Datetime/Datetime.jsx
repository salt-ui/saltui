/**
 * Datetime Component for tingle
 * @author caoke.ck & shumi.lg
 * @modify quanyun.mqy 于 2017.9.8 从tingle-datetime-field中分拆出来
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import Context from '../Context';
import Slot from '../Slot';
import dateFormat from './dateFormat';
import locale from './locale';

const colFlags = ['Y', 'M', 'D', 'T', 'h', 'H', 'm', 's', 'YMD', 'YMDW'];

const Y = ['Y'];
const YM = ['Y', 'M'];
const YMD = ['Y', 'M', 'D'];
const YMDT = ['Y', 'M', 'D', 'T'];
const YMDHM = ['YMD', 'H', 'm'];
const YMDWHM = ['YMDW', 'H', 'm'];

const columnsFlexMap = {
  YMD: [1.24, 1.1, 1.1],
  YMDT: [0.98, 0.83, 0.83, 0.79],
  YMDHm: [1.64, 0.89, 0.89],
  YMDWHm: [1.64, 0.89, 0.89],
};

// 是否是闰年
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 左边补零
function addZero(num) {
  return `${num < 10 ? '0' : ''}${num}`;
}

// 如果非正确的日期，则返回当前时间对象
function getNowIfDateInvalid(dataObj) {
  let date = dataObj;
  if (isNaN(date.getTime())) {
    // invalid
    console.warn('invalid date');
    date = new Date();
  }
  return date;
}

function makeRange(start, end) {
  const arr = [];

  for (let i = start; i <= end; i += 1) {
    arr.push(i);
  }

  return arr;
}

// 获取某个月份的日期选项
function getDates(year, month) {
  let dates = [];

  switch ('1 1010110101'.split('')[month]) {
    case '1': // 大月
      dates = makeRange(1, 31);
      break;
    case '0': // 小月
      dates = makeRange(1, 30);
      break;
    case ' ': // 闰年 2 月 和 平年 2 月
      dates = isLeapYear(year) ? makeRange(1, 29) : makeRange(1, 28);
      break;
    default:
      break;
  }

  return dates;
}

// 解析格式化value
function parseValue(value) {
  let date;
  let timeType;

  if (isObject(value)) {
    date = value.value ? new Date(value.value) : new Date();
    timeType = ({ AM: 0, PM: 1 })[value.timeType || 'AM'];
  } else {
    date = value ? new Date(parseInt(value, 10)) : new Date();
    timeType = date.getHours() >= 12 ? 1 : 0;
  }

  date = getNowIfDateInvalid(date);

  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    timeType,
    date.getHours() >= 13 ? date.getHours() - 12 : date.getHours(), // 12小时制
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    // 获取年月日组合，转换成number
    `${date.getFullYear()}${addZero(date.getMonth() + 1)}${addZero(date.getDate())}` - 0,
    `${date.getFullYear()}${addZero(date.getMonth() + 1)}${addZero(date.getDate())}` - 0,
  ];
}

// 通过年份获取一整年天数
function getDaysByYear(year) {
  const days = [];

  for (let i = 0; i < 13; i += 1) {
    getDates(year, i - 1).forEach((el) => {
      days.push(`${year}${addZero(i)}${addZero(el)}` - 0);
    });
  }
  return days;
}

function genOptions(value, props) {
  const initValue = props.value;
  let date = null;

  if (isObject(initValue)) {
    date = new Date(initValue.value);
  } else {
    date = initValue ? new Date(parseInt(initValue, 10)) : new Date();
  }

  date = getNowIfDateInvalid(date);

  const year = date.getFullYear();
  const options = [
    makeRange(year - 100, year + 100),
    makeRange(1, 12).map(v => ({ text: `${v}`, value: v - 1 })),
    getDates(value[0], value[1]),
    locale[props.locale].noon,
    makeRange(0, 12),
    makeRange(0, 23),
    makeRange(0, 59),
    makeRange(0, 59),
    getDaysByYear(value[0]),
    getDaysByYear(value[0]),
  ];

  return options;
}

function numToDate(num) {
  const str = `${num}`;
  const Y = str.substring(0, 4);
  const M = str.substring(4, 6);
  const D = str.substring(6);
  return `${Y}-${M}-${D}`;
}

// 根据日期获取一周中的一天
// sure 可以控制是否添加周"几"
function addDayOfWeek(days, props, sure = true) {
  if (isArray(days)) {
    days.forEach((day) => {
      const date = new Date(numToDate(day.value));
      if (sure) {
        day.text = `${dateFormat(date, 'YYYY/MM/DD')} ${locale[props.locale].week[date.getDay()]}`;
      } else {
        day.text = dateFormat(date, 'YYYY/MM/DD');
      }
    });
    return;
  }

  const date = new Date(numToDate(days.value));
  if (sure) {
    days.text = `${dateFormat(date, 'YYYY/MM/DD')} ${locale[props.locale].week[date.getDay()]}`;
  } else {
    days.text = dateFormat(date, 'YYYY/MM/DD');
  }
}

// 根据props定制渲染
function formatFromProps(arr, props) {
  const { columns } = props;
  const displayList = [];
  for (let i = 0; i < columns.length; i += 1) {
    if (colFlags.indexOf(columns[i]) !== -1) {
      displayList.push(arr[colFlags.indexOf(columns[i])]);
    }
    if (columns[i] === 'YMDW') {
      addDayOfWeek(displayList[i], props);
    }
    if (columns[i] === 'YMD') {
      addDayOfWeek(displayList[i], props, false);
    }
  }

  return displayList;
}

/**
 * 使用 slot 的内置方法对数据进行格式化，返回一个 slot 格式的数据结构
 * @param value: 对象或时间戳
 * @param props: props对象
 * @returns {Array}:
 * [
 *  {text: 2017, value: 2017},
 *  {text: '7', value: 6},
 *  {text: 20, value: 20},
 * ]
 */
function getSlotFormattedValue(value, props) {
  // 使用当前时间或传入时间作为默认值
  const currentValue = parseValue(value);
  // 形成候选项
  const options = genOptions(currentValue, props);
  // 数据格式化
  const ret = Slot.formatDataValue([].concat(options), [].concat(currentValue));

  return value ? formatFromProps(ret.value, props) : [];
}

class Datetime extends React.Component {
  constructor(props) {
    super(props);

    // 如果二者同时存在，是提示出错
    if (props.columns.indexOf('T') !== -1 && props.columns.indexOf('H') !== -1) {
      throw new Error('Please refer to tingle-document.');
    }

    // 使用当前时间或传入时间作为默认值
    const currentValue = parseValue(props.value);
    // 形成候选项
    this.options = genOptions(currentValue, props);
    // 数据格式化
    const ret = Slot.formatDataValue([].concat(this.options), [].concat(currentValue));

    this.state = {
      /* eslint-disable react/no-unused-state */
      data: formatFromProps(this.formatText(ret.data), props),
      value: formatFromProps(this.formatText(ret.value), props),
      /* eslint-enable react/no-unused-state */
      // confirmedValue: props.value ? formatFromProps(ret.value, props) : [],
    };

    this.slotChanged = false;
  }

  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    const t = this;
    const { value } = nextProps;

    if (value) {
      t.setValue(parseValue(nextProps.value), true, nextProps);
    }
    /* else {
     t.setState({
     confirmedValue: [],
     });
     } */
  }

  // value to time stamp
  getPlainDate(value) {
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
  }

  setValue(val, confirm, props) {
    const t = this;
    const options = genOptions(val, props);
    const newProps = props || t.props;

    /* if (val.length && isNaN(val[0])) {
     const ret = Slot.formatDataValue(
     this.options,
     parseValue(props.value),
     );
     t.setState({
     confirmedValue: props.value ? formatFromProps(ret.value, props) : [],
     });
     return;
     } */

    const { data, value } = Slot.formatDataValue(options, val);
    let changes = null;

    if (value.length > 2) {
      // 为确保有对应的日期，需要重新设置日期
      const dates = getDates(value[0].value, value[1].value);
      const ret = Slot.formatColumnValue(dates);
      data[2] = ret.columnData;
      changes = {
        data: formatFromProps(this.formatText(data), newProps),
        value: formatFromProps(this.formatText(value), newProps),
      };
    } else {
      changes = { value: formatFromProps(this.formatText(value), newProps) };
    }
    // if (confirm) {
    //   changes.confirmedValue = formatFromProps(value, props);
    // }
    t.setState(changes);
  }

  // 添加年月日等文本
  formatText(arr, text) {
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

  handleConfirm(value) {
    const t = this;
    const val = t.slotChanged ? value : t.state.value;
    t.props.onConfirm(t.getPlainDate(val));
  }

  handleCancel() {
    const t = this;
    // if (t.state.confirmedValue && t.state.confirmedValue.length) {
    //   t.setValue(t.state.confirmedValue, true, t.props);
    // }
    t.props.onCancel();
  }

  // 值改变回调
  handleChange(value, column) {
    const t = this;

    if (!t.slotChanged) {
      t.slotChanged = true;
    }

    if (t.props.columns.indexOf('D') !== -1) {
      // 此处判断当前月份是否存在此日期2月没有30号
      const dateRule = getDates(value[0].value, value[1].value);

      if (dateRule.indexOf(value[2].value) === -1) {
        value[2].value = dateRule[dateRule.length - 1];
      }
    }

    const updateObj = { value };

    if (value.length > 2) {
      const shouldChangeOptions = (column === 1) || (column === 0 && value[1].value === 1);

      if (shouldChangeOptions) {
        const currentValue = parseValue(t.getPlainDate(value));
        t.options = genOptions(currentValue, t.props);
        const ret = Slot.formatDataValue(t.options, currentValue);
        updateObj.data = formatFromProps(t.formatText(ret.data), t.props);
      }
    }

    t.setState(updateObj);
  }

  render() {
    const t = this;

    return (
      <Slot
        className={Context.prefixClass('datetime-field-border-none')}
        ref={t.props.slotRef}
        columnsFlex={columnsFlexMap[t.props.columns.join('')]}
        title={t.props.title}
        confirmText={t.props.confirmText || locale[this.props.locale].confirmText}
        cancelText={t.props.cancelText || locale[this.props.locale].cancelText}
        data={t.state.data}
        value={t.state.value}
        onChange={(value, column) => { t.handleChange(value, column); }}
        onCancel={() => { t.handleCancel(); }}
        onConfirm={(value) => { t.handleConfirm(value); }}
      />
    );
  }
}

Datetime.Y = Y;
Datetime.YM = YM;
Datetime.YMD = YMD;
Datetime.YMDT = YMDT;
Datetime.YMDHM = YMDHM;
Datetime.YMDWHM = YMDWHM;
Datetime.getSlotFormattedValue = getSlotFormattedValue;

Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: Datetime.YMD,
  onConfirm: _ => _,
  onCancel: _ => _,
  slotRef: _ => _,
};

// http://facebook.github.io/react/docs/reusable-components.html
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
  slotRef: React.PropTypes.func,
};

Datetime.displayName = 'Datetime';

export default Datetime;
