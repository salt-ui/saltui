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
import { makeRange,
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
  getDaysByYear } from './utils';

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
      setValue(value, true, nextProps);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  onConfirm = (value) => {
    const val = this.slotChanged ? value : this.state.value;
    this.props.onConfirm(this.getPlainDate(val));
  };
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
    const timeType = false;
    return {
      value: new Date(value),
      timeType: timeType ? 'PM' : 'AM',
    };
  };
  getOptions = ({ value }, props) => {
    let { minDate, maxDate, minuteStep} = props;
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
      makeRange(0, 59, minuteStep),
      datYear,
      datYear,
    ];
    const ret = Slot.formatDataValue([].concat(options), [].concat(currentValue));
    return ret;
  }
  setOptions = (props, me) => {
    const ret = this.getOptions({ value: props.value }, props);
    let data = formatFromProps(this.formatText(ret.data), props);
    const value = formatFromProps(this.formatText(ret.value), props);
    const { columns } = props;
    if (props.disabledDate) {
      data = filterTime({ data, disabledDate: props.disabledDate, value, columns });
    };
    this.state = {
      data: data,
      value: value,
    };
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
    /* eslint no-unused-expressions: 0 */
    (this.props.onCancel && this.props.onCancel());
  };
  handleChange = (value, column) => {
    const { props } = this;
    const { columns } = props;
    const dateStr = parseDate({ columns, value });
    const now = new Date(dateStr);
    const options = this.getOptions({ value: now.getTime() }, props);
    let data = formatFromProps(this.formatText(options.data), props);
    if (props.disabledDate) {
      data = filterTime({ data, disabledDate: props.disabledDate, value, columns });
    }
    this.setState({
      data,
      value,
    });
    props.onChange && props.onChange(now, value, column);
  };
  // 初始化日历面板
  init = (props, me) => {
    this.setOptions(props, me);
  };
  render() {
    const { props, state } = this;
    const { data, value, disabled } = state;
    return (
      <Slot
        className={Context.prefixClass('datetime-field-border-none')}
        disabled={disabled}
        ref={props.slotRef}
        columnsFlex={columnsFlexMap[props.columns.join('')]}
        title={props.title}
        confirmText={props.confirmText || locale[props.locale].confirmText}
        data={data}
        value={value}
        onChange={this.handleChange}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      />
    );
  }
}

Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: YMDHM,
  onConfirm: _ => _,
  onCancel: _ => _,
  slotRef: _ => _,
  minuteStep: 1,
  minDate: '2000-01-01',
  maxDate: '2030-12-31',
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
  slotRef: React.PropTypes.func,
  minuteStep: React.PropTypes.number,
  minDate: React.PropTypes.string,
  maxDate: React.PropTypes.string,
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
