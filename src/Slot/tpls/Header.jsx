import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SlotHeader extends React.Component {
  static displayName = 'SlotHeader'

  // http://facebook.github.io/react/docs/reusable-components.html
  static propTypes = {
    title: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    isScrolling: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    className: PropTypes.any,
  }


  static defaultProps = {
    title: '',
    cancelText: '取消',
    confirmText: '完成',
    isScrolling: false,
    onConfirm() { },
    onCancel() { },
    className: undefined,
  }


  render() {
    const {
      className,
      title,
      confirmText,
      cancelText,
      isScrolling,
      onConfirm,
      onCancel,
      ...others
    } = this.props;
    return (
      <div className={Context.prefixClass('slot-header FBH FBAC')} {...others}>
        <div className={Context.prefixClass('slot-cancel')} onClick={onCancel}>{cancelText}</div>
        <div className={Context.prefixClass('FB1 FAC slot-title')}>{title}</div>
        <div
          className={classnames(Context.prefixClass('slot-confirm'), {
          enable: !isScrolling,
        })}
          onClick={onConfirm}
        >{confirmText}
        </div>
      </div>
    );
  }
}


module.exports = SlotHeader;
