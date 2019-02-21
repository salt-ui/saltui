/**
 * NumberInfo Component for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

function formatNumber(params) {
  const { number, digits, groupDigits, spliter, max, showSign } = params;
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

function formatUnit(params) {
  const { unit } = params;
  return unit ? (/^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]/.test(unit) ? ` ${unit}` : unit) : '';
}

function format(number, params) {
  return `${formatNumber({ ...NumberItem.defaultProps, ...(params || {}), number })}${formatUnit(params)}`;
}

export default class NumberItem extends React.Component {
  render() {
    return (
      <span className={this.props.className}>
        {`${formatNumber(this.props)}${formatUnit(this.props)}`}
      </span>
    );
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
NumberItem.formatNumber = formatNumber;
NumberItem.formatUnit = formatUnit;
NumberItem.format = format;
