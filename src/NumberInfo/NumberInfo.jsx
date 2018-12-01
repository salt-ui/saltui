/**
 * NumberInfo Component for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

import NumberItem, { formatNumber, formatUnit } from './NumberItem';

export default class NumberInfo extends React.Component {

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  }

  renderNumber(data) {
    const { positiveColor, negativeColor, number } = data.props;
    const num = formatNumber(data.props);
    const unit = formatUnit(data.props);
    return <span style={{
      color: number > 0 ? positiveColor : (number < 0 ? negativeColor : '')
    }}>
      <span>{num}</span>
      {unit ? <span className={Context.prefixClass('number-info-unit')}>{unit}</span> : null}
    </span>
  }

  renderSequence(datas) {
    return datas.map((data, i) => <span key={i}>{i ? ', ' : ''}{data}</span>);
  }

  renderData() {
    const { children } = this.props;
    const primary = [];
    const secondary = [];
    React.Children.forEach(children, child => {
      if (child.type !== NumberItem) {
        console.warn('Only <NumberItem> components are allowed inside <NumberInfo>.');
        return null;
      }
      (child.props.secondary ? secondary : primary).push(this.renderNumber(child));
    });
    return <div className={Context.prefixClass('number-info-number')}>
      {this.renderSequence(primary)}
      {secondary.length ? <span> ({this.renderSequence(secondary)})</span> : null}
    </div>
  }

  renderLabel() {
    const { label } = this.props;
    return label ? <div className={classnames(Context.prefixClass('number-info-label'))}>{label}</div> : null;
  }

  render() {
    const t = this;
    const { className, layout } = t.props;
    return layout === 'h' ?
      <div onClick={this.handleClick}
        className={classnames(className, Context.prefixClass('number-info'), Context.prefixClass('number-info-h'))}
      >
        {this.renderLabel()}
        {this.renderData()}
      </div>
    :
      <div onClick={this.handleClick}
        className={classnames(className, Context.prefixClass('number-info'))}
      >
        {this.renderData()}
        {this.renderLabel()}
      </div>
  }
}

NumberInfo.defaultProps = {
  className: '',
  label: '',
  layout: 'v',
  onClick: () => { },
};

NumberInfo.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.oneOf('v', 'h'),
  onClick: PropTypes.func,
};

NumberInfo.displayName = 'NumberInfo';

NumberInfo.NumberItem = NumberItem;
NumberInfo.Item = NumberItem;
NumberInfo.format = NumberItem.format;
