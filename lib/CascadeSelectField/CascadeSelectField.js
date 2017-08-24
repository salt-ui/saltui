/**
 * CascadeSelectField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const cloneDeep = require('lodash/fp/cloneDeep');

const Context = require('@ali/tingle-context');
const Slot = require('@ali/tingle-slot');
const Field = require('@ali/tingle-field');
const Popup = require('@ali/tingle-popup');
const CascadeSlot = require('./CascadeSlot');

function parseProps(p) {
  const props = cloneDeep(p);
  let { options, value } = props;
  let cursor = options;
  options = [];
  value = value || [];
  const confirmedValue = value.length ? value : [];
  for (let deep = 0; cursor && deep < props.columns.length; deep++) {
    let index = 0;
    options[deep] = cursor.map((o, i) => {
      const option = {
        value: o.value,
        text: o.label,
      };
      let val = value[deep];
      if ((typeof val === 'object') && ('value' in value[deep])) {
        val = value[deep].value;
      }
      if (o.value === val) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    cursor = cursor[index] ? cursor[index].children : null;
  }
  // when its readOnly mode show whatever passed in values
  if (props.readOnly && props.options && props.options.length <= 0) {
    const values = value.map(v => ({ text: v, value: v }));
    return {
      options: [],
      value: values,
      confirmedValue: values,
      originOptions: p.options,
    };
  }
  return {
    options,
    value,
    confirmedValue,
    originOptions: p.options,
  };
}

function parseState(value, options) {
  let cursor = options;
  options = [];
  for (let deep = 0; cursor; deep++) {
    let index = 0;
    options[deep] = cursor.map((o, i) => {
      const option = {
        value: o.value,
        text: o.label,
      };
      if ((deep in value) && o.value == value[deep].value) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    cursor = cursor[index] ? cursor[index].children : null;
  }
  return {
    options,
    value,
  };
}

class CascadeSelectField extends React.Component {
  constructor(props) {
    super(props);
    const t = this;

    // 数据格式化
    t.state = parseProps(props);
    t.state.confirmedValue = props.value ? t.state.value : [];
  }

  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    const t = this;
    t.setState(parseProps(nextProps));
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly) {
      if (t.props.mode === 'normal') {
        t.refs.slot.show();
      } else if (t.props.mode === 'complex') {
        // this.setState({ cascadeSlotVisible: true });
        this.showCascadeSlot();
      }
    }
  }

  showCascadeSlot() {
    const t = this;
    Popup.show((
      <CascadeSlot
        visible
        title={t.props.label}
        confirmText={t.props.confirmText}
        cancelText={t.props.cancelText}
        options={t.state.originOptions}
        value={t.state.value}
        onChange={t.handleChange.bind(t)}
        onCancel={t.handleCancel.bind(t)}
        onConfirm={t.handleConfirm.bind(t)}
      />
    ), { maskClosable: false });
  }

  handleChange(value) {
    const t = this;
    t.setState(parseState(value, t.props.options));
  }

  handleConfirm(value) {
    const t = this;
    // 确认选中项目
    t.props.onSelect(value);
    Popup.hide();
  }

  handleCancel() {
    const t = this;
    if (t.state.confirmedValue.length) {
      t.setState(parseState(t.state.confirmedValue, t.props.options));
    }
    Popup.hide();
  }

  render() {
    const t = this;
    return (
      <Field
        {...t.props}
        icon={t.props.readOnly ? null : {
          className: Context.prefixClass('cascade-select-field-icon'),
          name: 'angle-right',
          width: 26,
          height: 26,
          onClick: t.handleClick.bind(t),
        }}
        className={classnames(Context.prefixClass('cascade-select-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div onClick={t.handleClick.bind(t)}>
          {!t.state.confirmedValue.length ? <div className={Context.prefixClass('omit cascade-select-field-placeholder')}>{t.props.placeholder}</div> : ''}
          <div className={Context.prefixClass('cascade-select-field-value FBH FBAC')}>
            <span
              className={classnames(Context.prefixClass('FB1 omit'), {
                [Context.prefixClass('cascade-select-field-readonly')]: !!t.props.readOnly,
              })}
            >{t.props.formatter(t.state.confirmedValue)}</span>
          </div>
        </div>
        {
          this.props.mode === 'normal' ?
            <Slot
              ref="slot"
              title={t.props.label}
              confirmText={t.props.confirmText}
              cancelText={t.props.cancelText}
              data={t.state.options}
              value={t.state.value}
              onChange={t.handleChange.bind(t)}
              onCancel={t.handleCancel.bind(t)}
              onConfirm={t.handleConfirm.bind(t)}
              columns={t.props.columns}
            /> :
            null
        }
      </Field>
    );
  }
}

CascadeSelectField.defaultProps = {
  options: [],
  value: [],
  formatter: value => value.map(v => v.text).join('/'),
  onChange: () => { },
  onSelect: () => { },
  readOnly: false,
  placeholder: '',
  columns: [],
  mode: 'normal',
};

// http://facebook.github.io/react/docs/reusable-components.html
CascadeSelectField.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array,
  value: React.PropTypes.array,
  formatter: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  columns: React.PropTypes.array,
  mode: React.PropTypes.oneOf(['normal', 'complex']),
};

CascadeSelectField.displayName = 'CascadeSelectField';

module.exports = CascadeSelectField;
