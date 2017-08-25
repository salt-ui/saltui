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
const Slot = require('../Slot');
const Field = require('../Field');

if (!React.addons || !React.addons.update) {
  console.warn('Please use react with addons!');
}

// 是否是闰年的判断
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function makeArray(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

// 获取某个月份的日期选项
function getDates(year, month) {
  let dates = [];
  switch ('1 1010110101'.split('')[month]) {
    case '1': // 大月
      dates = makeArray(1, 31);
      break;
    case '0': // 小月
      dates = makeArray(1, 30);
      break;
    case ' ': // 闰年 2 月 和 平年 2 月
      dates = isLeapYear(year) ? makeArray(1, 29) : makeArray(1, 28);
      break;
    default:
      break;
  }
  return dates;
}

function parseValue(value) {
  const date = value ? new Date(parseInt(value, 10)) : new Date();
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
}

function slice(array, props) {
  return array.slice(0, props.columns.length);
}

const getOptions = (value, props) => {
  const options = [
    makeArray(value[0] - 80, value[0] + 20),
    makeArray(1, 12).map(v => ({ text: `${v}`, value: v - 1 })),
    getDates(value[0], value[1]),
    makeArray(0, 23),
    makeArray(0, 59),
    makeArray(0, 59),
  ];
  return slice(options, props);
};

const getPlainDate = (value) => {
  const argv = value.map(v => v.value);
  for (let i = 0; i < 6; i++) {
    argv[i] = argv[i] || (i === 2 ? 1 : 0);
  }
  const date = new (Function.prototype.bind.apply(Date, [null].concat(argv)))();
  return date.getTime();
};


class DatetimeField extends React.Component {

  constructor(props) {
    super(props);
    const t = this;
    // 使用当前时间或传入时间作为默认值
    let currentValue = parseValue(props.value);
    // 形成候选项
    this.options = getOptions(currentValue, props);
    currentValue = slice(currentValue, props);
    // 数据格式化
    const ret = Slot.formatDataValue(this.options, currentValue);
    t.state = {
      data: ret.data,
      value: ret.value,
      confirmedValue: props.value ? ret.value : [],
    };
  }

  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    const t = this;
    const value = nextProps.value;
    if (value) {
      t.setValue(slice(parseValue(nextProps.value), nextProps), true, nextProps);
    } else {
      t.setState({
        confirmedValue: [],
      });
    }
  }

  setValue(val, confirm, props) {
    const t = this;
    props = props || t.props;

    if (val.length && isNaN(val[0])) {
      const ret = Slot.formatDataValue(
        slice(this.options, props),
        slice(parseValue(props.value), props)
      );
      t.setState({
        confirmedValue: props.value ? ret.value : [],
      });
      return;
    }

    const { data, value } = Slot.formatDataValue(slice(t.options, props), val);
    let changes;

    if (value.length > 2) {
      // 为确保有对应的日期，需要重新设置日期
      const dates = getDates(value[0].value, value[1].value);
      const ret = Slot.formatColumnValue(dates);
      data[2] = ret.columnData;
      changes = { data, value };
    } else {
      changes = { value };
    }
    if (confirm) {
      changes.confirmedValue = value;
    }
    t.setState(changes);
  }

  handleConfirm(value) {
    const t = this;
    // 确认选中项目
    t.props.onSelect(getPlainDate(value));
  }

  handleCancel() {
    const t = this;
    if (t.state.confirmedValue && t.state.confirmedValue.length) {
      t.setValue(t.state.confirmedValue);
    }
  }

  handleChange(value, column) {
    const updateObj = {
      value,
    };
    if (value.length > 2) {
      const shouldChangeOptions = column === 1 || (column === 0 && value[1].value === 1);
      if (shouldChangeOptions) {
        const currentValue = parseValue(getPlainDate(value));
        this.options = getOptions(currentValue, this.props);
        const ret = Slot.formatDataValue(this.options, currentValue);
        updateObj.data = ret.data;
      }
    }
    this.setState(updateObj);
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly) {
      t.slot.show();
    }
  }

  render() {
    const t = this;
    return (
      <Field {...t.props} icon={t.props.readOnly ? null : {
        className: Context.prefixClass('datetime-field-icon'),
        name: 'angle-right',
        width: 26,
        height: 26,
        onClick: t.handleClick.bind(t),
      }}
        className={classnames(Context.prefixClass('datetime-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div onClick={t.handleClick.bind(t)}>
          {
            !t.state.confirmedValue[0] && !t.props.value ?
              <div className={Context.prefixClass('omit datetime-field-placeholder')}>{t.props.placeholder}</div> :
              ''
          }
          <div className={Context.prefixClass('datetime-field-value FBH FBAC')}>
            <span className={classnames(Context.prefixClass('FB1 omit'), {
              [Context.prefixClass('datetime-field-readonly')]: !!t.props.readOnly,
            })}
            >{t.props.formatter(t.state.confirmedValue, t)}</span>
          </div>
        </div>
        <Slot
          ref={(c) => { this.slot = c; }}
          title={t.props.label}
          confirmText={t.props.confirmText}
          cancelText={t.props.cancelText}
          data={t.state.data}
          value={t.state.value}
          onChange={t.handleChange.bind(t)}
          onCancel={t.handleCancel.bind(t)}
          onConfirm={t.handleConfirm.bind(t)} columns={t.props.columns}
        />
      </Field>
    );
  }
}

DatetimeField.defaultProps = {
  formatter: (value, _this) => {
    // 只读状态下，可能传递一些用于加密的"***"之类的字符
    if (value.length && !value[0]) {
      return _this.props.value;
    }
    const arr = value.map(v => (
      v.text < 10 ? `0${v.text}` : v.text
    ));
    if (arr.length < 4) {
      return arr.join('-');
    }
    return `${arr.slice(0, 3).join('-')} ${arr.slice(3).join(':')}`;
  },
  onSelect: () => { },
  readOnly: false,
  placeholder: '',
  columns: ['年', '月', '日', '时', '分', '秒'],
};

// http://facebook.github.io/react/docs/reusable-components.html
DatetimeField.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  formatter: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  columns: React.PropTypes.array,
};

DatetimeField.displayName = 'DatetimeField';

module.exports = DatetimeField;
