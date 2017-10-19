/**
 * DatetimeField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');
const Field = require('../Field');
const Datetime = require('../Datetime');
const isObject = require('lodash/isObject');

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
    const slotValue = Datetime.getSlotFormattedValue(nextProps.value, nextProps);
    this.setState({
      slotValue,
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
      if (isNaN(date.getTime())) {
        return result;
      }
    }

    const columns = t.props.columns;
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
    const { className, value, placeholder, readOnly } = t.props;

    return (
      <Field {...t.props}
        icon={t.props.readOnly ? null : {
          className: Context.prefixClass('datetime-field-icon'),
          name: 'angle-right',
          width: 26,
          height: 26,
          onClick: t.handleClick.bind(t),
        }}
        className={classnames(Context.prefixClass('datetime-field'), {
          [className]: !!className,
        })}
      >
        <div onClick={t.handleClick.bind(t)}>
          {
            ((isObject(value) && value.value) || (!isObject(value) && value)) ?
              '' :
                <div className={Context.prefixClass('omit datetime-field-placeholder')}>{placeholder}</div>
          }
          <div className={Context.prefixClass('datetime-field-value FBH FBAC')}>
            <span
              className={
                classnames(Context.prefixClass('FB1 omit'), {
                  [Context.prefixClass('datetime-field-readonly')]: !!readOnly,
                })
              }
            >
              {t.formatter(t.state.slotValue)}
            </span>
          </div>
        </div>
        <Datetime
          slotRef={(c) => { this.slot = c; }}
          title={t.props.label}
          locale={t.props.locale}
          columns={t.props.columns}
          value={t.props.value}
          confirmText={t.props.confirmText}
          cancelText={t.props.cancelText}
          onCancel={t.props.onCancel.bind(t)}
          onConfirm={t.handleConfirm.bind(t)}
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
  label: React.PropTypes.string.isRequired,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  onSelect: React.PropTypes.func,
};

DatetimeField.displayName = 'DatetimeField';

module.exports = DatetimeField;
