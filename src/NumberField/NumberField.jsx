/**
 * NumberField Component for SaltUI
 * @author
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Formatter from 'uxcore-formatter';
import classnames from 'classnames';
import TextField from '../TextField';


class NumberField extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    deFormat: PropTypes.func,
    format: PropTypes.func,
    type: PropTypes.oneOf(['money', 'card', 'cnmobile', 'cnidcard']),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    delimiter: PropTypes.string,
    fixedNum: PropTypes.number,
    formatOnBlur: PropTypes.bool,
    inputType: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 't-number-field',
    onChange: () => {},
    onBlur: () => {},
    delimiter: ' ',
    deFormat: (str, delimiter) => str.split(delimiter).join(''),
    className: undefined,
    format: undefined,
    type: undefined,
    value: undefined,
    fixedNum: undefined,
    formatOnBlur: false,
    inputType: undefined,
  };

  static displayName = 'NumberField';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const { value } = prevProps;
    const { inputSelection } = this;
    if (inputSelection) {
      if (inputSelection.start < this.formatValue(value).length) {
        const input = this.getInput();
        input.selectionStart = inputSelection.start;
        input.selectionEnd = inputSelection.end;
        this.inputSelection = null;
      }
    }
  }

  getInput() {
    if (this.textField) {
      return this.textField.getInput();
    }
    return null;
  }


  formatValue(value = this.props.value) {
    const {
      type, delimiter, format, fixedNum,
    } = this.props;

    if (value === undefined || value === null || value === '') return '';
    const newValue = `${value}`;
    if (format) {
      return format(newValue, delimiter);
    }
    if (type === 'money') {
      if (newValue.match(/\.(\d+)/) && newValue.match(/\.(\d+)/)[1].length > fixedNum) {
        return Formatter.money(newValue, delimiter, fixedNum);
      }
      return Formatter.money(newValue, delimiter);
    } else if (['card', 'cnmobile'].indexOf(type) !== -1) {
      return Formatter[type](newValue, delimiter);
    }
    return newValue;
  }

  formatValueOnBlur() {
    const {
      value, type, delimiter, format, fixedNum,
    } = this.props;
    if (value === undefined || value === null || value === '') return '';
    const newValue = `${value}`;
    if (format) {
      return format(newValue, delimiter);
    }
    if (type === 'money') {
      return Formatter.money(newValue, delimiter, fixedNum);
    } else if (['card', 'cnmobile'].indexOf(type) !== -1) {
      return Formatter[type](newValue, delimiter);
    }
    return newValue;
  }

  saveCursorPosition() {
    const input = this.getInput();
    if (input) {
      this.inputSelection = {
        start: input.selectionStart,
        end: input.selectionEnd,
      };
    }
  }

  handleChange(value) {
    this.saveCursorPosition();
    setTimeout(() => {
      const { deFormat, onChange, delimiter } = this.props;
      onChange(deFormat(value, delimiter));
    });
  }

  render() {
    const t = this;
    const {
      prefixCls, className, formatOnBlur, inputType, ...otherProps
    } = t.props;
    ['value', 'onChange'].forEach((key) => {
      delete otherProps[key];
    });
    return (
      <TextField
        {...otherProps}
        ref={(c) => { this.textField = c; }}
        className={classnames(prefixCls, {
          [className]: !!className,
        })}
        type={inputType}
        value={this.formatValue()}
        onChange={(value, e) => {
          this.handleChange(value, e);
        }}
        onFocus={() => {
          this.saveCursorPosition();
        }}
        onBlur={(value, e) => {
          otherProps.onBlur(value, e);
          if (formatOnBlur) {
            const { deFormat, onChange, delimiter } = this.props;
            onChange(deFormat(this.formatValueOnBlur(deFormat(value, delimiter)), delimiter));
          }
        }}
      />
    );
  }
}

export default NumberField;
