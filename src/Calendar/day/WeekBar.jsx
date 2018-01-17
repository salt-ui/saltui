/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from '../../Context';
import locale from '../locale';


class WeekBar extends React.Component {
  static propTypes = {
    className: PropTypes.string, // 国际化语言
    locale: PropTypes.string, // 国际化语言
  };

  static defaultProps = {
    locale: 'zh-cn',
    className: undefined,
  };

  static displayName = 'WeekBar';

  componentWillMount() {
    this.locale = locale[this.props.locale];
  }

  render() {
    const t = this;
    /* eslint-disable react/no-array-index-key */
    return (
      <div
        className={classnames(prefixClass('day-calendar-week-bar FBH'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        {
          t.locale.weekTitle.map((item, index) => (
            <div
              className={classnames(prefixClass('FB1 FBAC'), 'week-bar-item', {
                first: index === 0,
                last: index === 6,
              })}
              key={index}
            >{item}
            </div>
            ))
        }
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

export default WeekBar;
