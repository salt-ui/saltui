import React from 'react';
import PropTypes from 'prop-types';
import Context, { prefixClass } from '../Context';
import i18n from './locale';


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

  render() {
    const t = this;
    const {
      locale, topPanelTitle, onCancel, onOk,
    } = t.props;
    return (
      <div
        className={prefixClass('calendar-top-bar FBH FBAC')}
      >
        <div className="cancel" onClick={onCancel}>{i18n[locale].button.cancel}</div>
        <div className={`${Context.prefixClass('FB1 FAC')} title`}>{topPanelTitle}</div>
        <div
          className="confirm"
          onClick={onOk}
        >{i18n[locale].button.confirm}
        </div>
      </div>
    );
  }
}

export default TopBar;
