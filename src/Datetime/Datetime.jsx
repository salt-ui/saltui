/**
 * Datetime Component for tingle
 * @author caoke.ck & shumi.lg
 * @modify quanyun.mqy 于 2017.9.8 从 tingle-datetime-field 中分拆出来
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

import {
  Slot,
  locale,
  getSlotFormattedValue,
  getOptions,
  getDaysByMonth,
  addZero,
  formatFromProps,
  formatText,
  isArray,
  filterDate,
  parseValue,
  Y,
  YM,
  YMD,
  YMDT,
  YMDHM,
  YMDWHM,
} from './util/index';

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
      throw new Error('Please refer to the component document.');
    }
    this.state = this.getState(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  }
  getState = (props) => {
    const { columns, minDate, maxDate } = props;
    const currentValue = parseValue(props.value);
    const options = getOptions(props.value, props);
    const ret = Slot.formatDataValue([].concat(options), [].concat(currentValue));
    let data = formatFromProps(formatText(ret.data, undefined, props), props);
    let value = formatFromProps(formatText(ret.value, undefined, props), props);
    const columnsStyle = columns[0];
    // disabledDate 仅支持 YMD
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
          props,
        });
        value = Slot.formatDataValue(data, value);
      }
    }
    return {
      data,
      value,
    };
  }
  getPlainDate = (value) => {
    const date = [];
    const { columns } = this.props;
    let timeType = 0;
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i] === 'Y') {
        date[0] = value[i].value;
      } else if (columns[i] === 'M') {
        date[1] = value[i].value;
      } else if (columns[i] === 'D') {
        date[2] = value[i].value;
      } else if (columns[i] === 'H') {
        date[3] = value[i].value;
      } else if (columns[i] === 'm') {
        date[4] = value[i].value;
      } else if (columns[i] === 's') {
        date[5] = value[i].value;
      } else if (columns[i] === 'T') {
        timeType = value[i].value;
      } else if (columns[i] === 'YMD' || columns[i] === 'YMDW') {
        if (value[1].value >= 12) {
          timeType = 1;
        }
        date[0] = (`${value[i].value}`).substring(0, 4);
        date[1] = (`${value[i].value}`).substring(4, 6) - 1;
        date[2] = (`${value[i].value}`).substring(6, 8);
      }
    }
    // 如果需要显示上下午
    if (columns.indexOf('T') !== -1) {
      date[3] = timeType ? 18 : 9;
      date[4] = 0;
      date[5] = 0;
    }
    const passedDate = date.length === 1 ? date.concat([0]) : date;
    return {
      value: new Date(...passedDate).getTime(),
      timeType: timeType ? 'PM' : 'AM',
    };
  }

  handleConfirm = (value) => {
    const outputDate = this.getPlainDate(value);
    this.props.onConfirm(outputDate);
  }

  handleCancel = () => {
    this.props.onCancel();
  };

  handleChange = (value, columnIndex) => {
    const {
      columns,
      minDate,
      maxDate,
      disabledDate,
      onChange,
    } = this.props;
    const columnsStyle = columns[columnIndex];
    const outputDate = this.getPlainDate(value);
    // YMD,YMDT 等模式 更改最后一列时不做处理, Y,YM,YMDHM, YMDWHM 更任意一列都不做处理
    if (columns.length <= 2 || columns[0] !== 'Y' || columns.length === (columnIndex + 1)) {
      this.setState({ value });
      onChange(outputDate);
      return;
    }
    const disabledArr = disabledDate ? disabledDate() : [];
    const data = [].concat(this.state.data);
    const yearData = data[0];
    const monthData = data[1];
    const yearValue = value[0].value;
    const monthValue = value[1].value;
    // disabledDate 仅支持 YMD、YMDT
    const updateObj = { value };
    if (isArray(disabledArr) && disabledArr.length && columns.length >= 3 && columns[0] === 'Y') {
      const newValue = parseValue(outputDate.value);
      const options = getOptions(outputDate.value, this.props);
      const ret = Slot.formatDataValue([].concat(options), [].concat(newValue));
      const newData = formatFromProps(formatText(ret.data, undefined, this.props), this.props);
      const oldData = {};
      if (columnsStyle === 'Y') {
        oldData.yearData = yearData;
      }
      if (columnsStyle === 'M') {
        oldData.yearData = yearData;
        oldData.monthData = monthData;
      }
      const AllData = filterDate({
        data: newData,
        disabledArr,
        value,
        columns,
        minDate,
        maxDate,
        oldData,
        props: this.props,
      });
      updateObj.data = AllData;
    } else if ((columnsStyle === 'Y' && monthValue === 1) || (columnsStyle === 'M')) {
      // 修改年根据年份，当月份是 2 月 动态计算日  或者 修改月份根据年份动态计算日
      let dayArr = getDaysByMonth({
        minDate, maxDate, year: yearValue, month: monthValue,
      });
      // dayArr = formatText(dayArr, undefined, this.props);
      const unit = locale[this.props.locale].surfix.D;
      dayArr = dayArr.map((item) => {
        item.text = addZero(item.text) + (unit || '');
        return item;
      });
      data[2] = dayArr;
      updateObj.data = data;
    }
    this.setState(updateObj);
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
        data={data}
        value={value}
        confirmText={props.confirmText || locale[props.locale].confirmText}
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
  minDate: new Date(1900, 0, 1).getTime(),
  maxDate: new Date(2051, 0, 1).getTime() - 1,
  disabledDate: () => [],
  title: undefined,
  value: undefined,
  confirmText: undefined,
  cancelText: undefined,
};

Datetime.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  locale: PropTypes.string,
  columns: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  slotRef: PropTypes.func,
  minuteStep: PropTypes.number,
  maxDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabledDate: PropTypes.func,
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
