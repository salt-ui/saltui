/**
 * NumberField Component for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import TextField from '../TextField';
import Formatter from 'uxcore-formatter';
import classnames from 'classnames';

class NumberField extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    prefixCls: React.PropTypes.string,
    onChange: React.PropTypes.func,
    deFormat: React.PropTypes.func,
    format: React.PropTypes.func,
    type: React.PropTypes.oneOf(['money', 'card', 'cnmobile', 'cnidcard']),
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    delimiter: React.PropTypes.string,
    fixedNum: React.PropTypes.number,
  };

  static defaultProps = {
    prefixCls: 't-number-field',
    onChange: () => {},
    delimiter: ' ',
    deFormat: (str, delimiter) => str.split(delimiter).join(''),
  };

  static displayName = 'NumberField';


  getValue() {
    const { value, type, delimiter, format, fixedNum } = this.props;
    if (value === undefined || value === null) return '';
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
  handleChange(value) {
    const { deFormat, onChange, delimiter } = this.props;
    onChange(deFormat(value, delimiter));
  }

  render() {
    const t = this;
    const { prefixCls, className, ...otherProps } = t.props;
    ['value', 'onChange'].forEach((key) => {
      delete otherProps[key];
    });
    return (
      <TextField
        {...otherProps}
        className={classnames(prefixCls, {
          [className]: !!className,
        })}
        value={this.getValue()}
        onChange={(value) => {
          this.handleChange(value);
        }}
      />
    );
  }
}

export default NumberField;
