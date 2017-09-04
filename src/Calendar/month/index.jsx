import React from 'react';

class MonthCalendar extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    locale: React.PropTypes.string, // 国际化语言
    viewMode: React.PropTypes.string,
    singleMode: React.PropTypes.bool, // 是否是单选模式
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    locale: 'zh-cn',
    viewMode: 'slide', //  slide | popup
    singleMode: true,
    onChange: () => {},
  };

  static displayName = 'YearCalendar';

  render() {
    return null;
  }
}

export default MonthCalendar;