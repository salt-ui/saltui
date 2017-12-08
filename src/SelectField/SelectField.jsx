/**
 * SelectField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const AngleRight = require('salt-icon/lib/AngleRight');
const Context = require('../Context');
const Slot = require('../Slot');
const Field = require('../Field');

const isNil = value => (value === null || value === undefined);

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    const t = this;
    const value = props.value;
    t.state = {
      value: isNil(value) ? value : [value],
      confirmedValue: [value],
    };
  }

  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    const t = this;
    const value = nextProps.value;
    t.setState({
      value: [value],
      confirmedValue: [value],
    });
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly) {
      t.slot.show();
    }
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  handleConfirm(value) {
    this.props.onSelect(value[0]);
  }

  handleCancel() {
    const t = this;
    t.setState({
      value: t.state.confirmedValue,
    });
  }

  render() {
    const t = this;
    const icon = !t.props.readOnly ? (
      <AngleRight 
        className={Context.prefixClass('select-field-icon')}
        width={26}
        height={26}
        onClick={t.handleClick.bind(t)}
      />
    ) : null;
    return (
      <Field
        {...t.props} icon={icon}
        className={classnames(Context.prefixClass('select-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div onClick={t.handleClick.bind(t)}>
          {!t.state.confirmedValue[0] ? <div className={Context.prefixClass('omit select-field-placeholder')}>{t.props.placeholder}</div> : ''}
          <div className={Context.prefixClass('select-field-value FBH FBAC')}>
            <span
              className={classnames(Context.prefixClass('FB1 omit'), {
                [Context.prefixClass('select-field-readonly')]: !!t.props.readOnly,
              })}
            >{t.props.formatter(t.state.confirmedValue[0])}</span>
          </div>
        </div>
        <Slot
          ref={(c) => { this.slot = c; }}
          title={t.props.label}
          confirmText={t.props.confirmText}
          cancelText={t.props.cancelText}
          data={[t.props.options]}
          value={t.state.value}
          onChange={t.handleChange.bind(t)}
          onCancel={t.handleCancel.bind(t)}
          onConfirm={t.handleConfirm.bind(t)}
        />
      </Field>
    );
  }
}

SelectField.defaultProps = {
  options: [],
  formatter: value => (value ? value.text : ''),
  onSelect() {},
  readOnly: false,
  placeholder: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
SelectField.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.object,
  formatter: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
};

SelectField.displayName = 'SelectField';

module.exports = SelectField;
