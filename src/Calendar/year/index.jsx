import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../../Context';


class YearCalendar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string, // 国际化语言
    animationType: PropTypes.string,
    singleMode: PropTypes.bool, // 是否是单选模式
    onChange: PropTypes.func,
  };

  static defaultProps = {
    locale: 'zh-cn',
    animationType: 'slideLeft', //  slideUp | slideLeft
    singleMode: true,
    onChange: () => {},
    className: undefined,
  };

  static displayName = 'YearCalendar';

  render() {
    return (
      <div className={prefixClass('calendar year-calendar')}>
        <p>Calendar.YearCalendar 不再支持：</p>
        <p>如果想选择『年份』，请换用 Datetime/DatetimeField 组件；</p>
        <p>如果想选择『年份区间』，请换用 CalendarField 组件。</p>
      </div>
    );
  }
}

export default YearCalendar;
