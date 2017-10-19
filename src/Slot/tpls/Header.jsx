const React = require('react');
const classnames = require('classnames');
const Context = require('../../Context');

class SlotHeader extends React.Component {

  static displayName = 'SlotHeader'

  // http://facebook.github.io/react/docs/reusable-components.html
  static propTypes = {
    title: React.PropTypes.string,
    confirmText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    isScrolling: React.PropTypes.bool,
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  }


  static defaultProps = {
    title: '',
    cancelText: '取消',
    confirmText: '完成',
    isScrolling: false,
    onConfirm() { },
    onCancel() { },
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
        <div className={classnames(Context.prefixClass('slot-confirm'), {
          enable: !isScrolling,
        })} onClick={onConfirm}
        >{confirmText}</div>
      </div>
    );
  }
}


module.exports = SlotHeader;
