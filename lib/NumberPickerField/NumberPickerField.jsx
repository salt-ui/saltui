/**
 * NumberPickerField Component for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import NumberPicker from '../NumberPicker';
import Field from '../Field';

class NumberPickerField extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  };

  static defaultProps = {
    label: '',
    value: 0,
    max: undefined,
    min: undefined,
    step: 1,
    onChange: Context.noop,
    readOnly: false,
    disabled: false,
  };

  static displayName = 'NumberPickerField';
  handleChange(value) {
    const t = this;
    t.props.onChange(value);
  }
  render() {
    const t = this;
    return (
      <Field {...t.props} className={classnames(Context.prefixClass('number-picker-field'), {
        [t.props.className]: !!t.props.className,
      })}
      >
        <NumberPicker
          onChange={t.handleChange.bind(t)}
          className={Context.prefixClass('tingle-number-picker')}
          value={t.props.value}
          max={t.props.max}
          min={t.props.min}
          step={t.props.step}
          readOnly={t.props.readOnly}
          disabled={t.props.disabled}
        />
      </Field>
    );
  }
}

export default NumberPickerField;
