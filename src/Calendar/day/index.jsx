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
import Context from '../../Context';
import cloneDeep from 'lodash/cloneDeep';
import WeekBar from './WeekBar';
import Panel from './Panel';
import CascadePanel from './CascadePanel';
import TopBar from '../TopBar';

const prefixClass = Context.prefixClass;

class DayCalendar extends React.Component {

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
  };

  static displayName = 'DayCalendar';

  constructor(props) {
    super(props);
    this.height = props.animationType === 'slideUp' ? 446 : document.documentElement.clientHeight;
    this.value = cloneDeep(props.value);
  }

  onTopBarOk() {
    this.props.onOk(this.value);
  }

  onChange(value) {
    this.value = value;
    this.props.onChange(value);
  }

  render() {
    const t = this;
    const { className, ...others } = t.props;
    const paneHeight = t.height - 28;
    return (
      <div
        ref={(r) => { this.root = r; }}
        className={classnames(prefixClass('calendar day-calendar FBV'), {
          [className]: !!className,
        })}
      >
        {
          t.props.animationType === 'slideUp' &&
            <TopBar {...t.props} onOk={() => { t.onTopBarOk(); }} />
        }
        <WeekBar locale={t.props.locale} />
        {
          t.props.singleMode ?
            <Panel
              className={prefixClass('FB1')}
              {...others}
              height={paneHeight}
              onChange={(value) => { t.onChange(value); }}
            /> :
            <CascadePanel
              className={prefixClass('FB1')}
              {...others}
              height={paneHeight}
              onChange={(value) => { t.onChange(value); }}
            />
        }
      </div>
    );
  }
}

export default DayCalendar;
