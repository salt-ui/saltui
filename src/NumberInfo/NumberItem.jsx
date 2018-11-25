/**
 * NumberInfo Component for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

function renderNumber() {
  const { number, digits, groupDigits, spliter, max, showSign } = this.props;
  let n = Math.min(Math.abs(number), max || Infinity);
  if (!n) {
    n = 0;
  }
  let str = digits === undefined ? `${n}` : n.toFixed(digits);
  if (groupDigits >= 1 && spliter) {
    let [int, dec] = str.split('.');
    str = '';
    while (int.length > groupDigits) {
      str = `${spliter}${int.substr(-groupDigits)}${str}`;
      int = int.substr(0, int.length - groupDigits);
    }
    str = `${int}${str}`;
    if (dec) {
      str = `${str}.${dec}`;
    }
  }
  if (showSign !== false && number < 0) {
    str = `-${str}`;
  } else if (showSign === true && number > 0) {
    str = `+${str}`;
  }
  if (max && Math.abs(number) > max) {
    str = `${str}+`;
  }
  return str;
}

export default class NumberItem extends React.Component {
  render() {
    return `${renderNumber.call(this)}${this.props.unit || ''}`;
  }
}

NumberItem.defaultProps = {
  number: 0,
  digits: undefined,
  groupDigits: 3,
  spliter: ',',
  max: 0,
  unit: '',
  showSign: undefined,
  secondary: false,
};

NumberItem.propTypes = {
  number: PropTypes.number,
  digits: PropTypes.number,
  groupDigits: PropTypes.number,
  spliter: PropTypes.string,
  max: PropTypes.number,
  showSign: PropTypes.bool,
  positiveColor: PropTypes.string,
  negativeColor: PropTypes.string,
  unit: PropTypes.string,
  secondary: PropTypes.bool,
};

NumberItem.displayName = 'NumberItem';
NumberItem.renderNumber = renderNumber;

