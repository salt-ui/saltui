/**
 * DataView Component for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

import Data from './Data';

export default class DataView extends React.Component {

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  }

  renderNumber(data) {
    const { positiveColor, negativeColor, number } = data.props;
    return <span style={{
      color: number > 0 ? positiveColor : (number < 0 ? negativeColor : '')
    }}>
      <span>{Data.renderNumber.call(data)}</span>
      {data.props.unit ? <span className={Context.prefixClass('data-view-unit')}>{data.props.unit}</span> : null}
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
      if (child.type !== Data) {
        console.warn('Only <Data> components are allowed inside <DataView>.');
        return null;
      }
      (child.props.secondary ? secondary : primary).push(this.renderNumber(child));
    });
    return <div className={Context.prefixClass('data-view-number')}>
      {this.renderSequence(primary)}
      {secondary.length ? <span> ({this.renderSequence(secondary)})</span> : null}
    </div>
  }

  renderLabel() {
    const { label } = this.props;
    return label ? <div className={classnames(Context.prefixClass('data-view-label'))}>{label}</div> : null;
  }

  render() {
    const t = this;
    const { className, layout } = t.props;
    return layout === 'h' ?
      <div onClick={this.handleClick}
        className={classnames(className, Context.prefixClass('data-view'), Context.prefixClass('data-view-h'))}
      >
        {this.renderLabel()}
        {this.renderData()}
      </div>
    :
      <div onClick={this.handleClick}
        className={classnames(className, Context.prefixClass('data-view'))}
      >
        {this.renderData()}
        {this.renderLabel()}
      </div>
  }
}

DataView.defaultProps = {
  className: '',
  label: '',
  layout: 'v',
  onClick: () => { },
};

DataView.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.oneOf('v', 'h'),
  onClick: PropTypes.func,
};

DataView.displayName = 'DataView';

DataView.Data = Data;
