/**
 * DatetimeField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isObject from 'lodash/isObject';
import AngleRight from 'salt-icon/lib/AngleRight';
import Context from '../Context';
import Field from '../Field';
import Datetime from '../Datetime';

// 左边补零
function addZero(num) {
  return `${num < 10 ? '0' : ''}${num}`;
}

class DatetimeField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slotValue: Datetime.getSlotFormattedValue(props.value, props),
    };
    this.valueChanged = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      slotValue: Datetime.getSlotFormattedValue(nextProps.value, nextProps),
    });
  }

  handleConfirm(value) {
    const t = this;
    t.valueChanged = true;
    if (t.props.onSelect) {
      t.props.onSelect(value);
    } else {
      t.props.onConfirm(value);
    }
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly && t.slot) {
      t.slot.show();
    }
  }

  formatter(value) {
    const t = this;
    // 用户未点击过确认，即：未进行过日期选择，如果值合法，则展示格式化后的值，如果值非法，则原样输出
    // 只读状态下，可能传递一些用于加密的"***"之类的字符
    if (!t.valueChanged) {
      let date;
      let result;
      const propValue = t.props.value;
      if (isObject(propValue)) {
        date = propValue.value ? new Date(propValue.value) : new Date();
        result = propValue.value;
      } else {
        date = propValue ? new Date(parseInt(propValue, 10)) : new Date();
        result = propValue;
      }
      if (Number.isNaN(date.getTime())) {
        return result;
      }
    }

    const { columns } = t.props;
    const arr = value.map(v => (
      addZero(v.text)
    ));
    if (columns.indexOf('YMD') !== -1 || columns.indexOf('YMDW') !== -1) {
      return `${arr[0] || ''} ${arr.slice(1).join(':')}`.replace(new RegExp('/', 'gi'), '-');
    }
    return `${arr.slice(0, 3).join('-')} ${arr.slice(3).join(':')}`;
  }

  render() {
    const t = this;
    const {
      className, value, placeholder, readOnly,
      minDate, maxDate, disabledDate,
    } = t.props;
    const DatetimeProps = {
      minDate,
      maxDate,
      disabledDate,
    };
    const iconProps = {
      className: Context.prefixClass('datetime-field-icon'),
      name: 'angle-right',
      width: 26,
      height: 26,
      onClick: t.handleClick.bind(t),
    };

    const shouldShowValue = (isObject(value) && value.value) || (!isObject(value) && value);
    return (
      <Field
        {...t.props}
        icon={t.props.readOnly ? null : (
          <AngleRight {...iconProps} />
        )}
        layout="h"
        className={classnames(Context.prefixClass('datetime-field'), {
          [className]: !!className,
        })}
      >
        <div onClick={t.handleClick.bind(t)}>
          {
            shouldShowValue ? null : <div className={Context.prefixClass('omit datetime-field-placeholder')}>{placeholder}</div>
          }
          <div className={Context.prefixClass('datetime-field-value FBH FBAC')}>
            <span
              className={
                classnames(Context.prefixClass('FB1 omit'), {
                  [Context.prefixClass('datetime-field-readonly')]: !!readOnly,
                })
              }
            >
              {shouldShowValue ? t.formatter(t.state.slotValue) : null}
            </span>
          </div>
        </div>
        <Datetime
          slotRef={(c) => { this.slot = c; }}
          title={t.props.label}
          locale={t.props.locale}
          columns={t.props.columns}
          value={t.props.value}
          disabledDate={t.props.disabledDate}
          confirmText={t.props.confirmText}
          cancelText={t.props.cancelText}
          onCancel={t.props.onCancel.bind(t)}
          onConfirm={t.handleConfirm.bind(t)}
          {...DatetimeProps}
        />
      </Field>
    );
  }
}

DatetimeField.Y = Datetime.Y;
DatetimeField.YM = Datetime.YM;
DatetimeField.YMD = Datetime.YMD;
DatetimeField.YMDT = Datetime.YMDT;
DatetimeField.YMDHM = Datetime.YMDHM;
DatetimeField.YMDWHM = Datetime.YMDWHM;

DatetimeField.defaultProps = {
  ...Datetime.defaultProps,
  label: '',
  readOnly: false,
  placeholder: '',
  onSelect: _ => _,
};

// http://facebook.github.io/react/docs/reusable-components.html
DatetimeField.propTypes = {
  ...Datetime.propTypes,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
};

DatetimeField.displayName = 'DatetimeField';

export default DatetimeField;
