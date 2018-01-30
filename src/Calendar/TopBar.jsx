import React from 'react';
import PropTypes from 'prop-types';
import Context, { prefixClass } from '../Context';
import locale from './locale';


class TopBar extends React.Component {
  static displayName = 'TopBar';

  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string,
  };
  static defaultProps = {
    className: undefined,
    locale: undefined,
  };
  componentWillMount() {
    this.locale = locale[this.props.locale];
  }

  render() {
    const t = this;
    return (
      <div
        className={prefixClass('calendar-top-bar FBH FBAC')}
      >
        <div className="cancel" onClick={t.props.onCancel}>{t.locale.button.cancel}</div>
        <div className={`${Context.prefixClass('FB1 FAC')} title`}>{t.props.topPanelTitle}</div>
        <div
          className="confirm"
          onClick={t.props.onOk}
        >{t.locale.button.confirm}
        </div>
      </div>
    );
  }
}

export default TopBar;
