import React from 'react';
import classnames from 'classnames';
import Datetime from '../../Datetime';
import { prefixClass } from '../../Context';
import { getTimestamp, isObject, isStringOrNumber } from './util';
import DayField from './DayField';

class YearField extends DayField {
  static displayName = 'YearField';

  processValue(value, key) {
    const t = this;
    const valueNew = { ...value };
    // 非级联模式
    if (t.props.singleMode) {
      if (isObject(valueNew) && !Object.prototype.hasOwnProperty.call(valueNew, 'value')) {
        valueNew.value = valueNew.startDate;
      }
      return valueNew;
    }
    // 级联模式，要拼装成具有 startDate 和 endDate 的对象
    if (isStringOrNumber(value) || !value) {
      return {
        startDate: value,
        endDate: value,
      };
    }
    if (Array.isArray(value)) {
      return {
        startDate: value[0],
        endDate: value[1],
      };
    }
    if (isObject(value)) {
      let { startDate } = value;
      const { endDate } = value;
      // 如果是初始化，且 startDate 为空，则把 value 置为 startDate
      // key 也可以用来判断是初始化还是点击之后触发的该方法
      if (!key && !startDate) {
        startDate = value.value;
      }
      let start = getTimestamp(startDate);
      let end = getTimestamp(endDate);
      if (start > end) {
        // 如果初始化时，传入的endDate比startDate还早，则设置为相等的值
        if (!key) {
          end = start;
        }
        if (key === 'start') {
          console.warn('current key is startDate, but startDate > endDate, so endDate will be clear');
          end = null;
        }
        if (key === 'end') {
          console.warn('current key is endDate, but startDate > endDate, so startDate will be clear');
          start = null;
        }
      }
      return {
        startDate: start,
        startDateType: value.startDateType,
        endDate: end,
        endDateType: value.endDateType,
      };
    }
    return value;
  }

  onOk(value, key) {
    const t = this;
    let mergedValue = value;
    // 级联模式下，合并 value
    if (!t.props.singleMode) {
      mergedValue = {
        ...t.props.value,
        ...value,
        [`${key}DateType`]: value.timeType,
        [`${key}Date`]: value.value,
      };
    }
    const result = t.processValue(mergedValue, key);

    t.props.onOk(result);

    // 级联模式，选择了开始时间，未选择结束时间或结束时间被置空，则自动弹出选择结束日期面板
    if (!t.props.singleMode && key === 'start' && !result.endDate) {
      t.yearEnd.show();
    }
  }

  onCancel() {
    const t = this;
    t.props.onCancel();
  }

  handleFieldClick(key) {
    const t = this;
    if (t.props.readOnly) {
      return;
    }
    if (t.props.singleMode) {
      t.year.show();
      return;
    }
    t[`year${key[0].toUpperCase()}${key.substring(1)}`].show();
  }

  renderPlaceholder(value, key) {
    const t = this;
    const { placeholder } = t.props;
    return (
      <div
        className={prefixClass('omit calendar-field-placeholder')}
        onClick={
          t.props.singleMode ?
            null :
            t.handleFieldClick.bind(t, key)}
      >
        {
          typeof placeholder === 'string' ? placeholder : placeholder[key === 'start' ? 0 : 1]
        }
      </div>
    );
  }

  renderDateBlock(value, key) {
    const t = this;
    if (value[`${key}Date`]) {
      return (
        <div
          className={prefixClass('calendar-field-value')}
          onClick={
            t.props.singleMode ?
              null :
              t.handleFieldClick.bind(t, key)}
        >
          <span
            className={classnames('date-text', {
              [prefixClass('calendar-field-readonly')]: !!t.props.readOnly,
            })}
          >
            {value[`${key}Date`]}
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

  // 渲染展示区域
  renderView() {
    const t = this;
    if (t.props.singleMode) {
      return (
        <div onClick={t.handleFieldClick.bind(t)}>
          {
            t.renderSingleModeView()
          }
        </div>
      );
    }
    return t.renderCascadeModeView();
  }

  renderCalendar(props) {
    const t = this;
    let component;
    // 级联模式
    if (!t.props.singleMode) {
      // 处理title
      let { title } = props;
      if (typeof props.title === 'string') {
        title = [props.title, props.title];
      }

      component = (
        <div>
          <Datetime
            {...props}
            title={title[0]}
            value={{
              value: props.value.startDate,
              timeType: props.value.startDateType,
            }}
            slotRef={(r) => { t.yearStart = r; }}
            onConfirm={(val) => { t.onOk(val, 'start'); }}
            onCancel={() => { t.onCancel(); }}
          />
          <Datetime
            {...props}
            title={title[1]}
            value={{
              value: props.value.endDate,
              timeType: props.value.endDateType,
            }}
            slotRef={(r) => { t.yearEnd = r; }}
            onConfirm={(val) => { t.onOk(val, 'end'); }}
            onCancel={() => { t.onCancel(); }}
          />
        </div>
      );
    } else {
      let { title } = props;
      if (typeof props.title !== 'string') {
        [title] = [props.title[0]];
      }
      component = (
        <Datetime
          {...props}
          title={title}
          slotRef={(r) => { this.year = r; }}
          onConfirm={(val) => { t.onOk(val); }}
          onCancel={() => { t.onCancel(); }}
        />
      );
    }
    return component;
  }
  /* eslint-disable class-methods-use-this */
  getExtraProps() {
    return {};
  }
  /* eslint-enable class-methods-use-this */

  getCalendarProps() {
    const t = this;
    return {
      title: t.props.title || t.props.placeholder, // 如果没有title，则把placeholder作为title
      locale: t.props.locale,
      value: t.processValue(t.props.value),
      columns: Datetime.Y,
      confirmText: t.props.confirmText,
      cancelText: t.props.cancelText,
      ...t.getExtraProps(),
    };
  }
}

export default YearField;
