import React from 'react';
import Formatter from 'uxcore-formatter';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from '../../Context';
import Field from '../../Field';
import Calendar from '../../Calendar';
import Datetime from '../../Datetime';
import { defaultFormatter, Locale, isObject, isStringOrNumber } from './util';


class DayField extends React.Component {
  static displayName = 'DayField';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillMount() {
    this.locale = Calendar.I18n[this.props.locale];
  }

  onOk(value) {
    const t = this;
    t.setState({
      visible: false,
    });
    t.props.onOk(value);
  }

  onCancel() {
    const t = this;
    t.setState({
      visible: false,
    });
    t.props.onCancel();
  }


  getFieldProps() {
    const t = this;
    return {
      label: t.props.label,
      tappable: t.props.tappable,
      required: t.props.required,
      multiLine: t.props.multiLine,
      icon: t.props.icon,
      layout: t.props.layout,
      tip: t.props.tip,
      readOnly: t.props.readOnly,
    };
  }


  getCalendarProps() {
    const t = this;
    return {
      visible: t.state.visible,
      locale: t.props.locale,
      animationType: t.props.animationType,
      singleMode: t.props.singleMode,
      showHalfDay: t.props.showHalfDay,
      topPanelTitle: t.props.topPanelTitle,
      value: t.props.value,
      disabledDate: t.props.disabledDate,
      renderDayBadge: t.props.renderDayBadge,
      renderCustomDayLabel: t.props.renderCustomDayLabel,
      maskClosable: t.props.maskClosable,
      onOk: t.onOk.bind(t),
      onCancel: t.onCancel.bind(t),
      onChange: t.props.onChange,
      onMaskClose: t.props.onMaskClose,
    };
  }
  /* eslint-disable class-methods-use-this */
  // 获取表单域额外的classnames，主要用于年、月
  getExtraClassNames() {
    return '';
  }
  /* eslint-enable class-methods-use-this */


  // 制造"周X"的文案
  makeWeekText(data, type) {
    const t = this;
    const dataNew = data;
    dataNew[`${type}Week`] = t.locale.weekTitle[new Date(dataNew[type]).getDay()];
    if (t.props.locale === Locale.cn) {
      dataNew[`${type}Week`] = `周${dataNew[`${type}Week`]}`;
    }
    return dataNew;
  }


  handleFieldClick() {
    const t = this;
    if (t.props.readOnly) {
      return;
    }
    t.setState({
      visible: true,
    });
  }


  // 根据情景，制造value，用于显示
  // 此方法会被子类使用，本应拆分，由子类复写，但因处理较复杂，所以未拆分
  makeViewValue() {
    const t = this;
    let result = {};
    if (isStringOrNumber(t.props.value)) {
      result.start = t.props.value ? t.props.value : '';
      result.end = t.props.value ? t.props.value : '';
    } else if (t.props.singleMode && isObject(t.props.value)) {
      result.start = t.props.value.value;
      result.end = t.props.value.value;
    } else if (Array.isArray(t.props.value)) {
      [result.start, result.end] = t.props.value;
    } else if (isObject(t.props.value)) {
      result.start = t.props.value.startDate ? t.props.value.startDate : '';
      result.end = t.props.value.endDate ? t.props.value.endDate : '';
      // 如果传入的endDate比startDate还早，则设置为相等的值
      if (new Date(result.start).getTime() > new Date(result.end).getTime()) {
        result.end = result.start;
      }
    }
    // 如果value非Date类型，则临时存放起来，最后再返回
    if (Number.isNaN(new Date(result.start))) {
      result.tempStart = result.start;
    }
    if (Number.isNaN(new Date(result.end))) {
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
      case 'dayWithSlot':
      case 'dayWithHalf':
      case 'dayWithTime':
        // 格式化日期
        result.start = Formatter.date(result.start, t.props.formatter || defaultFormatter.d);
        result.end = Formatter.date(result.end, t.props.formatter || defaultFormatter.d);
        if (!Number.isNaN(new Date(result.start))) {
          result = t.makeWeekText(result, 'start');
        }
        if (!Number.isNaN(new Date(result.end))) {
          result = t.makeWeekText(result, 'end');
        }
        // result
        if (t.props.singleMode) {
          result.startDateType =
          t.locale.dayTipMap[t.props.value.startDateType || t.props.value.timeType];
          result.endDateType =
          t.locale.dayTipMap[t.props.value.startDateType || t.props.value.timeType];
        } else if (isObject(t.props.value)) {
          result.startDateType = t.locale.dayTipMap[t.props.value.startDateType];
          result.endDateType = t.locale.dayTipMap[t.props.value.endDateType];
        }
        break;
    }
    // 如果有临时值
    if (result.tempStart) {
      result.start = result.tempStart;
    }
    if (result.tempEnd) {
      result.end = result.tempEnd;
    }
    result.startDate = result.start;
    delete result.start;
    result.endDate = result.end;
    delete result.end;
    return result;
  }
  /* eslint-disable class-methods-use-this */
  renderCalendar(props) {
    return <Calendar {...props} />;
  }
  /* eslint-enable class-methods-use-this */
  renderPlaceholder(value, key) {
    const t = this;
    const { placeholder } = t.props;
    return (
      <div className={prefixClass('omit calendar-field-placeholder')}>
        {
          typeof placeholder === 'string' ? placeholder : placeholder[key === 'start' ? 0 : 1]
        }
      </div>
    );
  }

  renderWeekText(value, key) {
    const t = this;
    if (t.props.showWeek && value[`${key}Week`]) {
      return <span className="week">{value[`${key}Week`]}</span>;
    }
    return null;
  }

  renderDateTypeText(value, key) {
    const t = this;
    if (t.props.showDateType && value[`${key}DateType`]) {
      return <span className="date-type">{value[`${key}DateType`]}</span>;
    }
    return null;
  }

  // 级联的每一项结构是相同的，所以可以提出来共用
  renderDateBlock(value, key) {
    const t = this;
    if (value[`${key}Date`]) {
      return (
        <div className={prefixClass('calendar-field-value')}>
          <span className={classnames('date-text', {
            [prefixClass('calendar-field-readonly')]: !!t.props.readOnly,
          })}
          >{value[`${key}Date`]}
          </span>
          {
            t.renderWeekText(value, key)
          }
          {
            t.renderDateTypeText(value, key)
          }
        </div>
      );
    }
    return t.renderPlaceholder(value, key);
  }

  // 区间模式
  renderCascadeModeView() {
    const t = this;
    const value = t.makeViewValue();
    return (
      <div className={classnames(prefixClass('calendar-field-show-box'), {
        'h-layout': t.props.layout === 'h',
        'v-layout': t.props.layout === 'v',
        [prefixClass('FBH')]: t.props.layout === 'v',
        [prefixClass('FBAC')]: t.props.layout === 'v',
      })}
      >
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
  renderSingleModeView() {
    const t = this;
    const { placeholder } = t.props;
    const value = t.makeViewValue();
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

  // 渲染展示区域
  renderView(calendarProps) {
    const t = this;
    return (
      <div onClick={t.handleFieldClick.bind(t)}>
        {
          calendarProps.singleMode ? t.renderSingleModeView() : t.renderCascadeModeView()
        }
      </div>
    );
  }

  render() {
    const t = this;
    const fieldProps = t.getFieldProps();
    const calendarProps = t.getCalendarProps();
    return (
      <div>
        <Field
          {...fieldProps}
          className={classnames(prefixClass('calendar-field'), t.getExtraClassNames(), t.props.className, {
            readonly: t.props.readOnly,
          })}
        >
          {
            t.renderView(calendarProps)
          }
        </Field>
        {
          t.renderCalendar(calendarProps)
        }
      </div>
    );
  }
}

DayField.defaultProps = {
  ...Calendar.defaultProps,
  ...Datetime.defaultProps,
  ...Field.defaultProps,
  placeholder: [
    '请选择开始日期',
    '请选择结束日期',
  ],
  locale: 'zh-cn',
  type: 'day', // year, month, day(面板形式), dayWithSlot(拨盘形式), dayWithHalf, dayWithTime
  formatter: '',
  readOnly: false,
  showWeek: true, // 是否显示周几
  showDateType: true, // 是否显示“全天”“上午”“下午”
  multiLine: true,
  onCancel: () => {},
  onOk: () => {},
  disabledDate: () => {},
  renderDayBadge: () => {},
  renderCustomDayLabel: () => {},
  onChange: () => {},
};

DayField.propTypes = {
  ...Calendar.propTypes,
  ...Datetime.propTypes,
  ...Field.propTypes,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  locale: PropTypes.string,
  type: PropTypes.string,
  formatter: PropTypes.string,
  readOnly: PropTypes.bool,
  showWeek: PropTypes.bool,
  showDateType: PropTypes.bool,
  multiLine: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: PropTypes.func,
  renderDayBadge: PropTypes.func,
  renderCustomDayLabel: PropTypes.func,
  onChange: PropTypes.func,
};

export default DayField;
