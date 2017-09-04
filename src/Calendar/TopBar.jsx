import React from 'react';
import Context from '../Context';
import locale from './locale';

const prefixClass = Context.prefixClass;

class TopBar extends React.Component {

  static displayName = 'TopBar';

  static propTypes = {
    className: React.PropTypes.string,
    locale: React.PropTypes.string,
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
        <div className="confirm" onClick={t.props.onOk}
        >{t.locale.button.confirm}</div>
      </div>
    );
  }
}

export default TopBar;
