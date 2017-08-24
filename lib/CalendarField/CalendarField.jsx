/**
 * CalendarField Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import { prefixClass } from '@ali/tingle-context';
import Field from '@ali/tingle-field';
import Calendar from '@ali/tingle-calendar';
import Formatter from 'uxcore-formatter';

const defaultFormatter = {
  y: 'YYYY',
  m: 'YYYY-MM',
  d: 'YYYY-MM-DD',
};

const Locale = {
  cn: 'zh-cn',
  en: 'en-us',
};

class CalendarField extends React.Component {

  static displayName = 'CalendarField';

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillMount() {
    this.locale = Calendar.I18n[this.props.locale];
  }

  handleClick() {
    const t = this;
    if (t.props.readOnly) {
      return;
    }
    t.setState({
      visible: true
    });
  }

  onOk(value) {
    const t = this;
    t.setState({
      visible: false
    });
    t.props.onOk(value);
  }

  onCancel() {
    const t = this;
    t.setState({
      visible: false
    });
    t.props.onCancel();
  }

  onMaskClick() {
    const t = this;
    t.setState({
      visible: false
    });
    t.props.onCancel();
  }

  // 制造"周X"的文案
  makeWeekText(data, type) {
    const t = this;
    data[`${type}Week`] = t.locale.weekTitle[new Date(data[type]).getDay()];
    if (t.props.locale === Locale.cn) {
      data[`${type}Week`] = '周' + data[`${type}Week`];
    }
  }

  // 根据情景，制造value，用于显示
  makeValue() {
    const t = this;
    let result = {};
    if (typeof t.props.value == "string" || /^\d*$/.test(t.props.value)) {
      result.start = result.end = t.props.value ? t.props.value : '';
    } else {
      result.start = t.props.value.startDate ? t.props.value.startDate : '';
      result.end = t.props.value.endDate ? t.props.value.endDate : '';
      /* if (!result.start && result.end) {
        result.start = result.end;
      } else if (result.start && !result.end) {
        result.end = result.start;
      }*/
      // 如果传入的endDate比startDate还早，则设置为相等的值
      if (new Date(result.start).getTime() > new Date(result.end).getTime()) {
        result.end = result.start;
      }
    }
    // 如果value非Date类型，则临时存放起来，最后再返回
    if (isNaN(new Date(result.start))) {
      result.tempStart = result.start;
    }
    if (isNaN(new Date(result.end))) {
      result.tempEnd = result.end;
    }
    switch (t.props.type) {
      case 'year':
        result.start = Formatter.date(result.start, defaultFormatter.y);
        result.end = Formatter.date(result.end, defaultFormatter.y);
        break;
      case 'month':
        result.start = Formatter.date(result.start, t.props.formatter || defaultFormatter.m);
        result.end = Formatter.date(result.end, t.props.formatter || defaultFormatter.m);
        break;
      default:
      case 'day':
        // 格式化日期
        result.start = Formatter.date(result.start, t.props.formatter || defaultFormatter.d);
        result.end = Formatter.date(result.end, t.props.formatter || defaultFormatter.d);
        if (!isNaN(new Date(result.start))) {
          t.makeWeekText(result, 'start');
        }
        if (!isNaN(new Date(result.end))) {
          t.makeWeekText(result, 'end');
        }
        // result
        result.startDateType = t.locale.dayTipMap[t.props.value.startDateType];
        result.endDateType = t.locale.dayTipMap[t.props.value.endDateType];
        break;
    }
    // 如果有临时值
    if (result.tempStart) {
      result.start = result.tempStart;
    }
    if (result.tempEnd) {
      result.end = result.tempEnd;
    }
    return result;
  }

  // 级联的每一项结构是相同的，所以可以提出来共用
  renderDateBlock(dateValue, key) {
    const t = this;
    const { placeholder } = t.props;
    if (dateValue[key]) {
      return (
        <div className={prefixClass('calendar-field-value')}>
          <span className={classnames('date-text', {
            [prefixClass('calendar-field-readonly')]: !!t.props.readOnly
          })}>{dateValue[key]}</span>
          {
            t.props.showWeek && dateValue[key + 'Week'] && <span className="week">{dateValue[key + 'Week']}</span>
          }
          {
            t.props.showDateType && dateValue[key + 'DateType'] && <span className="date-type">{dateValue[key + 'DateType']}</span>
          }
        </div>
      );
    }
    return (
      <div className={prefixClass('omit calendar-field-placeholder')}>
        {
          typeof placeholder === 'string' ? placeholder : placeholder[key === 'start' ? 0 : 1]
        }
      </div>
    );
  }

  // 区间模式
  renderCascadeMode() {
    const t = this;
    let value = t.makeValue();
    return (
      <div className={classnames(prefixClass('calendar-field-show-box'), {
        'h-layout': t.props.layout === 'h',
        'v-layout': t.props.layout === 'v',
        [prefixClass('FBH')]: t.props.layout === 'v',
        [prefixClass('FBAC')]: t.props.layout === 'v',
      })}>
        {
          t.renderDateBlock(value, 'start')
        }
        {
          t.props.layout === 'v' && !t.props.singleMode && <span className="split-line" />
        }
        {
          t.renderDateBlock(value, 'end')
        }
      </div>
    );
  }

  // 单选模式
  renderSingleMode() {
    const t = this;
    const { placeholder, readOnly } = t.props;
    const value = t.makeValue();
    return (
      <div>
        {
          !t.props.value &&
            <div className={prefixClass('omit calendar-field-placeholder')}>
              {
                typeof placeholder === 'string' ? placeholder : placeholder[0]
              }
            </div>
        }
        {
          t.renderDateBlock(value, 'start')
        }
      </div>
    );
  }

  renderCalendar(props) {
    let component = <Calendar {...props} />;
    switch (this.props.type) {
      case 'year':
        component = <Calendar.YearCalendar {...props} />;
        break;
      case 'month':
        component = <Calendar.MonthCalendar {...props} />;
        break;
    }
    return component;
  }

  render() {
    const t = this;
    const fieldProps = {
      label: t.props.label,
      tappable: t.props.tappable,
      required: t.props.required,
      multiLine: t.props.multiLine,
      icon: t.props.icon,
      layout: t.props.layout,
      tip: t.props.tip,
      readOnly: t.props.readOnly,
    };
    const calendarProps = {
      visible: t.state.visible,
      locale: t.props.locale,
      calendarCode: t.props.calendarCode,
      singleMode: t.props.singleMode,
      showHalfDay: t.props.showHalfDay,
      showTopPanel: t.props.showTopPanel,
      showBottomPanel: t.props.showBottomPanel,
      extraClass: t.props.extraClass,
      topPanelTitle: t.props.topPanelTitle,
      value: t.props.value,
      onCancel: t.onCancel.bind(t),
      onOk: t.onOk.bind(t),
      onSelecting: t.props.onSelecting,
      onMaskClick: t.onMaskClick.bind(t),
    };
    return (
      <div>
        <Field
          {...fieldProps}
          className={classnames(prefixClass('calendar-field'), t.props.className, {
            readonly: t.props.readOnly
          })}
        >
          <div onClick={t.handleClick.bind(t)}>
            {
              calendarProps.singleMode ? t.renderSingleMode() : t.renderCascadeMode()
            }
          </div>
        </Field>
        {
          t.renderCalendar(calendarProps)
        }
      </div>
    );
  }
}

CalendarField.defaultProps = {
  ...Calendar.defaultProps,
  ...Field.defaultProps,
  placeholder: [
    '开始日期',
    '结束日期'
  ],
  locale: 'zh-cn',
  type: 'day', // year, month, day
  formatter: '',
  readOnly: false,
  showWeek: true, // 是否显示周几
  showDateType: true, // 是否显示“全天”“上午”“下午”
  multiLine: true,
};

CalendarField.propTypes = {
  ...Calendar.propTypes,
  ...Field.propTypes,
  placeholder: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  locale: React.PropTypes.string,
  type: React.PropTypes.string,
  formatter: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  showWeek: React.PropTypes.bool,
  showDateType: React.PropTypes.bool,
  multiLine: React.PropTypes.bool,
};

export default CalendarField;
