/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * 继承自Panel，只处理级联相关的逻辑
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Toast from '../../Toast';
import { prefixClass } from '../../Context';
import Button from '../../Button';
import Panel from './Panel';
import { halfDayType } from './const';
import util, { adaptCascadeDate } from '../util';

class CascadePanel extends Panel {
  static propTypes = {
    ...Panel.propTypes,
  };

  static defaultProps = {
    ...Panel.defaultProps,
  };

  constructor(props) {
    super(props);
    this.isASC = true; // 是否是正序选择。第二次点击的日期，晚于第一次点击的日期，则为正序选择
  }

  showToast(start = true) {
    const content = start ?
      this.locale.cascadeToastTip.start :
      this.locale.cascadeToastTip.end;
    Toast.show({
      className: prefixClass('day-calendar-cascade-tip'),
      content,
    });
  }

  processValue(propValue) {
    let value = cloneDeep(propValue);
    if (util.isNil(value)) {
      value = {};
    } else if (/^\d*$/.test(value)) {
      value = {
        startDate: new Date(parseInt(value, 10)).getTime(),
      };
    } else if (typeof value === 'string') {
      value = {
        startDate: new Date(value).getTime(),
      };
    }
    if (Object.prototype.toString.call(propValue) === '[object Object]') {
      const result = adaptCascadeDate(propValue.startDate, propValue.endDate);
      value = {
        startDate: result.startDate,
        endDate: result.endDate,
      };
    } else if (Object.prototype.toString.call(propValue) === '[object Array]') {
      const result = adaptCascadeDate(propValue[0], propValue[1] || propValue[0]);
      value = {
        startDate: result.startDate,
        endDate: result.endDate,
      };
    }
    const newValue = {
      ...propValue,
      ...value,
    };

    if (!newValue.startDate) {
      this.showToast(true);
    } else if (!newValue.endDate) {
      this.showToast(false);
    }

    let activeDate;
    let activeType = '';

    if (!util.isNil(newValue.startDate)) {
      activeDate = newValue.startDate;
      activeType = 'start';
    }
    if (!util.isNil(newValue.endDate)) {
      activeDate = newValue.endDate;
      activeType = 'end';
    }

    this.setState({
      value: newValue,
      activeDate,
      activeType,
    });
  }

  onDaySelected(timestamp) {
    const t = this;
    t.isASC = true;
    let {
      startDate, endDate, startDateType, endDateType,
    } = t.state.value;
    let activeType = '';
    if (!startDate && !endDate) {
      startDate = timestamp;
      startDateType = halfDayType.FULL;
      endDateType = halfDayType.FULL;
      activeType = 'start';
    } else if (!startDate && endDate) {
      if (timestamp > endDate) {
        startDate = endDate;
        endDate = timestamp;
        startDateType = halfDayType.FULL;
        endDateType = halfDayType.FULL;
        activeType = 'end';
      } else {
        startDate = timestamp;
        startDateType = halfDayType.FULL;
        if (!endDateType || endDateType === 'PM') {
          endDateType = halfDayType.FULL;
        }
        activeType = 'start';
        t.isASC = false;
      }
    } else if (startDate && !endDate) {
      if (timestamp < startDate) {
        endDate = startDate;
        startDate = timestamp;
        startDateType = halfDayType.FULL;
        endDateType = halfDayType.FULL;
        activeType = 'start';
        t.isASC = false;
      } else {
        endDate = timestamp;
        if (!startDateType || startDateType === 'AM') {
          startDateType = halfDayType.FULL;
        }
        endDateType = halfDayType.FULL;
        activeType = 'end';
      }
    } else if (startDate && endDate) {
      startDate = timestamp;
      endDate = null;
      startDateType = halfDayType.FULL;
      endDateType = halfDayType.FULL;
      activeType = 'start';
    }
    const newValue = {
      ...t.state.value,
      startDate,
      endDate,
      startDateType,
      endDateType,
    };

    if (!newValue.startDate) {
      t.showToast(true);
    } else if (!newValue.endDate) {
      t.showToast(false);
    }

    t.setState({
      value: newValue,
      activeDate: timestamp,
      activeType,
    });

    t.props.onChange({
      startDate: newValue.startDate,
      endDate: newValue.endDate,
      startDateType: newValue.startDateType,
      endDateType: newValue.endDateType,
    });

    // 在 slide 模式，且不显示 halfDay 的情况下，只要起止值都已经完整，则触发 onOk
    if (t.props.animationType === 'slideLeft' && !t.props.showHalfDay && newValue.startDate && newValue.endDate) {
      t.props.onOk(cloneDeep(newValue));
    }
  }

  onHalfButtonClick(halfType) {
    const t = this;
    const newValue = cloneDeep(t.state.value);
    newValue[`${t.state.activeType}DateType`] = halfType;
    this.setState({
      value: newValue,
    });
    t.props.onChange(cloneDeep(newValue));
  }

  onOk() {
    const t = this;
    t.props.onOk(cloneDeep(t.state.value));
  }

  renderHalfDay() {
    const t = this;
    const halfType = t.state.value[`${t.state.activeType}DateType`];

    const full =
      (
        <li
          className={classnames(prefixClass('tap'), 'day-type-item full', {
          active: halfType === halfDayType.FULL,
        })}
          key="half-day-full"
          onClick={(e) => { t.onHalfButtonClick(halfDayType.FULL, e); }}
          role="menuitem"
        >
          {t.locale.dayTipMap.FULL}
        </li>);

    const am =
      (
        <li
          className={classnames(prefixClass('tap'), 'day-type-item am', {
            active: halfType === halfDayType.AM,
          })}
          key="half-day-am"
          onClick={(e) => { t.onHalfButtonClick(halfDayType.AM, e); }}
          role="menuitem"
        >
          {t.locale.dayTipMap.AM}
        </li>);

    const pm =
      (
        <li
          className={classnames(prefixClass('tap'), 'day-type-item pm', {
            active: halfType === halfDayType.PM,
          })}
          key="half-day-pm"
          onClick={(e) => { t.onHalfButtonClick(halfDayType.PM, e); }}
          role="menuitem"
        >{t.locale.dayTipMap.PM}
        </li>);

    let halfButtons = [full, am, pm];

    if (t.isASC && t.state.activeType === 'end') {
      halfButtons = [full, am];
    }
    if (!t.isASC && t.state.activeType === 'start') {
      halfButtons = [full, pm];
    }

    return (
      <div
        className={prefixClass('day-calendar-half-day-wrapper')}
      >
        <div
          className={prefixClass('day-calendar-half-day-container')}
        >
          <ul className="day-type-list">{halfButtons}</ul>
        </div>
        <Button
          type="primary"
          display="banner"
          onClick={(e) => { t.onOk(e); }}
        >{t.locale.button.confirm}
        </Button>
      </div>
    );
  }
}

export default CascadePanel;
