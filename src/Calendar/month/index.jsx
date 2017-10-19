import React from 'react';
import Context from '../../Context';

const prefixClass = Context.prefixClass;

class MonthCalendar extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    locale: React.PropTypes.string, // 国际化语言
    animationType: React.PropTypes.string,
    singleMode: React.PropTypes.bool, // 是否是单选模式
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    locale: 'zh-cn',
    animationType: 'slideLeft', //  slideUp | slideLeft
    singleMode: true,
    onChange: () => {},
  };

  static displayName = 'MonthCalendar';

  render() {
    return (
      <div className={prefixClass('calendar month-calendar')}>
        <p>Calendar.MonthCalendar 不再支持：</p>
        <p>如果想选择『月份』，请换用 Datetime/DatetimeField 组件；</p>
        <p>如果想选择『月份区间』，请换用 CalendarField 组件。</p>
      </div>
    );
  }
}

export default MonthCalendar;