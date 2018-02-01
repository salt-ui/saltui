/**
 * Rate Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import StarFullIcon from 'salt-icon/lib/StarFull';
import StarLineIcon from 'salt-icon/lib/StarLine';
import classnames from 'classnames';
import { unitize } from '../Style';
import Context from '../Context';


class Rate extends React.Component {
  static displayName = 'Rate';

  static defaultProps = {
    total: 5,
    value: 0,
    showTip: true,
    size: 'normal',
    scoreTips: ['不满意', '一般', '基本满意', '满意', '非常满意'],
    readOnly: false,
    onChange: () => { },
    className: undefined,
    totalScore: undefined,
    score: undefined,
  };

  // http://facebook.github.io/react/docs/reusable-components.html
  static propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
    totalScore: PropTypes.number,
    total: PropTypes.number,
    scoreTips: PropTypes.array,
    showTip: PropTypes.bool,
    score: PropTypes.number,
    value: PropTypes.number,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
  };


  getValue() {
    const { value, score } = this.props;
    if (score !== undefined) {
      console.warn('Rate: score is deprecated, use value instead');
      return score;
    }
    return value;
  }

  getTotal() {
    const { total, totalScore } = this.props;
    if (totalScore !== undefined) {
      console.warn('Rate: totalScore is deprecated, use total instead');
      return totalScore;
    }
    return total;
  }

  handleItemClick(v) {
    const t = this;
    if (t.props.readOnly) {
      return;
    }
    t.props.onChange(v);
  }

  render() {
    const t = this;
    const { size } = t.props;
    const width = size && size === 'large' ? 36 : 26;
    const gap = size && size === 'large' ? 4 : 2.5;
    const items = [];
    const value = this.getValue();
    const total = this.getTotal();
    for (let i = 1; i <= total; i++) {
      const item = (
        <div
          className={classnames(Context.prefixClass('rate-item'), {
            't-DIB': true,
            't-PR': true,
            active: i <= value,
          })}
          key={i}
          onClick={() => { t.handleItemClick(i); }}
          style={{
            width: unitize(width),
            height: unitize(width - 1),
            paddingLeft: unitize(gap),
            paddingRight: unitize(gap),
          }}
        >
          {
            i <= value ?
              <StarFullIcon className={classnames(Context.prefixClass('rate-icon'))} /> :
              <StarLineIcon className={classnames(Context.prefixClass('rate-icon'))} />
          }
        </div>
      );
      items.push(item);
    }
    return (
      <div
        className={classnames(
Context.prefixClass('rate'),
          {
            't-FBH': t.props.size === 'normal',
            readOnly: t.props.readOnly,
            [t.props.className]: !!t.props.className,
          },
)}
      >
        <div className={classnames({ 't-FBH': true, 'show-center': t.props.size === 'large' })} style={{ width: unitize((width + 3) * 5) }}>
          {items}
        </div>
        {t.props.showTip ?
          <div className="rate-tip" style={{ lineHeight: unitize(width), textAlign: t.props.size === 'large' ? 'center' : 'left' }}>{t.props.scoreTips[value - 1]}</div>
          : ''}
      </div>
    );
  }
}

export default Rate;
