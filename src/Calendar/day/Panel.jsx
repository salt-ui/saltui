/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import deepEqual from 'lodash/isEqual';
import util, { getMonthDays, getRealMonthPool } from '../util';
import { prefixClass } from '../../Context';
import locale from '../locale';
import MonthBody from './MonthBody';
import MonthTitle from './MonthTitle';
import formatter from '../formatter';

const shadowArray = [1, 2]; // 只是用来提供一个长度的数组，本身的值没什么用
// const maxMonth = 5; // 最多渲染这么多个月

class Panel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string,
    height: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
    ]),
    singleMode: PropTypes.bool, // 是否是单选模式
    onChange: PropTypes.func,
    showHalfDay: PropTypes.bool,
    onOk: PropTypes.func,
    animationType: PropTypes.any,
  };

  static defaultProps = {
    singleMode: true,
    onChange: () => {},
    showHalfDay: false,
    className: undefined,
    locale: undefined,
    height: undefined,
    value: undefined,
    onOk: () => { },
    animationType: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      monthPool: [], // 数据结构如：['m201707_150', [1501545600000, 1501632000000], 'm201709_166']
    };
    this.monthAreaHeight = props.showHalfDay ? props.height - 104 : 'auto';
    // 距顶或距底小于这个距离时，就动态加载
    this.bufferDistance = props.showHalfDay ? (this.monthAreaHeight) / 2 : props.height;
    this.startY = 0; // 手指滑动时的初始Y坐标
    this.endY = 0; // 手指滑动时的初始Y坐标
    this.monthLoading = false; // 是否正在加载month
    this.direction = '';
  }

  componentWillMount() {
    const t = this;
    t.locale = locale[t.props.locale];
    t.processValue(t.props.value);
    // 初始化添加一些月份
    t.updateMonthPool();
  }

  componentDidMount() {
    const t = this;

    t.updateMonthPool(true, () => {
      t.root.scrollTop = t.getHeadNewMonthHeight();
    });

    t.root.addEventListener('touchstart', (ev) => {
      t.startY = ev.touches[0].screenY;
    }, false);

    t.root.addEventListener('touchmove', (ev) => {
      // debounce touchmove callback to prevent load too much month in iOS
      // when -webkit-touch-scrolling is set touch
      if (this.moveTimer) {
        clearTimeout(this.moveTimer);
        this.moveTimer = null;
      }
      ev.stopPropagation();
      this.moveTimer = setTimeout(() => {
        t.endY = ev.touches[0].screenY;
        if (t.endY - t.startY < 0) {
          t.direction = 'up';
          t.loadMonth();
        } else {
          t.direction = 'down';
          if (!t.locked) {
            t.loadMonth();
            t.locked = true;
            setTimeout(() => {
              t.locked = false;
              this.loadMonth();
            }, 30);
          }
        }
        this.moveTimer = null;
      }, 200);
    }, false);
  }

  componentWillReceiveProps(nextProps) {
    this.processValue(nextProps.value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state);
  }

  componentWillUnmount() {
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
      this.moveTimer = null;
    }
  }

  onDaySelected(timestamp) {
    this.setState({
      value: timestamp,
    });
    this.props.onChange({
      value: timestamp,
    });
    // singleMode = true，且 viewMode = slide，点击即关闭，所以触发 onOk
    if (this.props.animationType === 'slideLeft') {
      this.props.onOk({
        value: timestamp,
      });
    }
  }

  getRefByTimestamp(timestamp) {
    return this[`month${formatter(timestamp, 'yyyyMM')}`];
  }

  getHeadNewMonthHeight() {
    const t = this;
    let preNewMonthHeight = 0;
    // 依次取出头部新加的月份，计算其高度
    shadowArray.forEach((val, key) => {
      const ref = t.getRefByTimestamp(t.state.monthPool[key][0]);
      preNewMonthHeight += ref.offsetHeight;
    });
    return preNewMonthHeight;
  }

  getMonthHeight(yyyyMM) {
    const t = this;
    const ref = t[`month${yyyyMM}`];
    return ref ? ref.offsetHeight : 0;
  }

  /*
   * 设置monthPool
   * @param pre 向队列的头部插入
   * 每次向队首或队尾添加或减少与shadowArray相同长度的月
   */
  updateMonthPool(pre = false, callback) {
    const t = this;
    const monthPool = cloneDeep(t.state.monthPool);
    let {
      firstRealMonthIndex,
      lastRealMonthIndex,
    } = getRealMonthPool(monthPool);
    if (pre) {
      shadowArray.forEach(() => {
        const firstDayInFirstMonth = monthPool[firstRealMonthIndex][0];
        // 月份-1
        const preMonth = new Date(parseInt(firstDayInFirstMonth, 10))
          .setMonth(new Date(parseInt(firstDayInFirstMonth, 10)).getMonth() - 1);
        if (firstRealMonthIndex === 0) {
          monthPool.splice(0, 0, getMonthDays(preMonth));
        } else {
          monthPool.splice(firstRealMonthIndex - 1, 1, getMonthDays(preMonth));
          firstRealMonthIndex -= 1;
        }
        lastRealMonthIndex += 1;
      });
    } else {
      shadowArray.forEach(() => {
        // 取队列尾部的月份
        const lastMonth = monthPool[lastRealMonthIndex] || [];
        // 取该月中的第一天，有可能为 undefined
        const firstDayInLastMonth = lastMonth[0];
        if (!firstDayInLastMonth) {
          let firstValue = !util.isNil(t.props.value) ? t.props.value : Date.now();
          if (isObject(firstValue)) {
            firstValue = firstValue.startDate || firstValue.endDate ||
            firstValue.value || Date.now();
          } else if (isArray(firstValue)) {
            firstValue = firstValue[0] || Date.now();
          }
          monthPool.splice(lastRealMonthIndex, 0, getMonthDays(firstValue));
        } else {
          // 月份加1
          const nextMonth = new Date(parseInt(firstDayInLastMonth, 10))
            .setMonth(new Date(parseInt(firstDayInLastMonth, 10)).getMonth() + 1);
          monthPool.splice(lastRealMonthIndex + 1, 1, getMonthDays(nextMonth));
          lastRealMonthIndex += 1;
        }
      });
    }
    t.setState({
      monthPool,
    }, callback);
  }

  processValue(propValue) {
    this.setState({
      value: propValue,
    });
  }

  loadMonth() {
    const t = this;
    const docHeight = t.root.scrollHeight;
    const { clientHeight } = t.root;
    const { scrollTop } = t.root;
    const scrollBottom = docHeight - scrollTop - clientHeight;
    // 正在加载，或者滑动距离小于100px，都不触发loadMonth
    if (t.monthLoading || Math.abs(t.endY - t.startY) < 50) {
      return;
    }

    if (t.direction === 'up' && scrollBottom < t.bufferDistance) { // 向上滑动，加载未来的月份
      t.monthLoading = true;
      t.updateMonthPool(false, () => {
        t.monthLoading = false;
      });
    } else if (t.direction === 'down' && scrollTop < t.bufferDistance) { // 向下滑动，加载过去的月份
      t.monthLoading = true;

      t.updateMonthPool(true, () => {
        t.monthLoading = false;
        if (t.root.scrollTop === 0) {
          t.root.scrollTop = 10;
        }
        if (util.isIos()) {
          t.root.scrollTop += t.getHeadNewMonthHeight();
        }
      });
    }
  }


  renderMonth(props) {
    const t = this;
    return t.state.monthPool.map((monthDays) => {
      if (!Array.isArray(monthDays)) {
        return null;
      }
      const firstDay = monthDays[0];
      return (
        <div
          className={prefixClass('day-calendar-month-block')}
          key={formatter(firstDay, 'yyyyMM')}
          ref={(c) => { t[`month${formatter(firstDay, 'yyyyMM')}`] = c; }}
        >
          <MonthTitle anyDayInMonth={firstDay} locale={t.props.locale} />
          <MonthBody
            {...props}
            value={t.state.value}
            days={monthDays}
            onSelected={(data) => { t.onDaySelected(data); }}
          />
        </div>
      );
    });
  }
  /* eslint-disable class-methods-use-this */
  // 只有级联才用到上下午
  renderHalfDay() {
    return null;
  }
  /* eslint-enable class-methods-use-this */


  render() {
    const t = this;
    const { className, height, ...others } = t.props;
    const showHalfDay = !t.props.singleMode && t.props.showHalfDay;
    return (
      <div
        ref={(p) => { if (!showHalfDay) { this.root = p; } }}
        className={classnames(prefixClass('day-calendar-panel'), {
          [className]: !!className,
          'not-show-half-button': !showHalfDay,
        })}
        style={{ height }}
      >
        {
          showHalfDay ?
            <div
              className={`${prefixClass('month-area')}`}
              style={{ height: t.monthAreaHeight }}
              ref={(p) => { this.root = p; }}
            >{t.renderMonth(others)}
            </div> :
            t.renderMonth(others)
        }
        {
          showHalfDay && t.renderHalfDay()
        }
      </div>
    );
  }
}

export default Panel;
