/**
 * Calendar Component for SaltUI
 * @author quanyun.mqy
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from '../../Context';
import i18n from '../locale';


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

  render() {
    const t = this;
    const { locale, className } = t.props;
    /* eslint-disable react/no-array-index-key */
    return (
      <div
        className={classnames(prefixClass('day-calendar-week-bar FBH'), {
          [className]: !!className,
        })}
      >
        {
          i18n[locale].weekTitle.map((item, index) => (
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
