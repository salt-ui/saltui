import React from 'react';
import classnames from 'classnames';
import { prefixClass } from '../../Context';
import Field from '../../Field';
import Calendar from '../../Calendar';
import Datetime from '../../Datetime';
import Formatter from 'uxcore-formatter';
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

  handleFieldClick() {
    const t = this;
    if (t.props.readOnly) {
      return;
    }
    t.setState({
      visible: true,
    });
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

  // 制造"周X"的文案
  makeWeekText(data, type) {
    const t = this;
    data[`${type}Week`] = t.locale.weekTitle[new Date(data[type]).getDay()];
    if (t.props.locale === Locale.cn) {
      data[`${type}Week`] = `周${  data[`${type}Week`]}`;
    }
  }

  // 根据情景，制造value，用于显示
  // 此方法会被子类使用，本应拆分，由子类复写，但因处理较复杂，所以未拆分
  makeViewValue() {
    const t = this;
    const result = {};
    if (isStringOrNumber(t.props.value)) {
      result.start = result.end = t.props.value ? t.props.value : '';
    } else if (t.props.singleMode && isObject(t.props.value)) {
      result.start = result.end = t.props.value.value;
    } else if (Array.isArray(t.props.value)) {
      result.start = t.props.value[0];
      result.end = t.props.value[1];
    } else if (isObject(t.props.value)) {
      result.start = t.props.value.startDate ? t.props.value.startDate : '';
      result.end = t.props.value.endDate ? t.props.value.endDate : '';
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
      case 'dayWithSlot':
      case 'dayWithHalf':
      case 'dayWithTime':
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
        if (t.props.singleMode) {
          result.startDateType = result.endDateType =
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
    if (t.props.showWeek && value[`${key  }Week`]) {
      return <span className="week">{value[`${key  }Week`]}</span>;
    }
    return null;
  }

  renderDateTypeText(value, key) {
    const t = this;
    if (t.props.showDateType && value[`${key  }DateType`]) {
      return <span className="date-type">{value[`${key  }DateType`]}</span>;
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
          >{value[`${key}Date`]}</span>
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
    const { placeholder, readOnly } = t.props;
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

  renderCalendar(props) {
    return <Calendar {...props} />;
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

  // 获取表单域额外的classnames，主要用于年、月
  getExtraClassNames() {
    return '';
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
  placeholder: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  locale: React.PropTypes.string,
  type: React.PropTypes.string,
  formatter: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  showWeek: React.PropTypes.bool,
  showDateType: React.PropTypes.bool,
  multiLine: React.PropTypes.bool,
  onCancel: React.PropTypes.func,
  onOk: React.PropTypes.func,
  disabledDate: React.PropTypes.func,
  renderDayBadge: React.PropTypes.func,
  renderCustomDayLabel: React.PropTypes.func,
  onChange: React.PropTypes.func,
};

export default DayField;
