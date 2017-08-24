/**
 * Note Component for tingle
 * @author Kuncheng Zhao, zhouqan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Icon = require('@ali/tingle-icon');
const Context = require('@ali/tingle-context');

const prefixClass = Context.prefixClass;

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
  }

  handleClose(e) {
    this.props.closable && this.doClose();
    this.props.onClose.call(this, e);
  }

  doClose() {
    this.setState({
      closed: true,
    });
  }

    /**
     * 当closable为true的时候，展现关闭模式
     * 当closable为false的时候，展现查看详情模式
     */
  render() {
    const t = this;
    let iconName = 'info-round';
    if (t.props.type === 'warning') {
      iconName = 'note-round';
    }
    const html = (
      <div ref="root" className={classnames(prefixClass('FBH FBAC'), {
        [t.props.className]: !!t.props.className,
      }, prefixClass('note'))}
      >
        <Icon name={iconName} width={22} height={22} />
        <div className={prefixClass('note-message FB1 omit')}>{this.props.message}</div>
        <div className={prefixClass('FBH note-close')} onClick={t.handleClose.bind(t)}>
          {t.props.closeText}
          <Icon
            name={t.props.closable ? 'cross' : 'angle-right'}
            width={20}
            height={20}
          />
        </div>
      </div>
        );

    return this.state.closed ? null : html;
  }
}

Note.defaultProps = {
  type: 'message',
  closable: false,
  closeText: '',
  message: '',
  onClose: () => {
  },
};

// http://facebook.github.io/react/docs/reusable-components.html

Note.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['message', 'warning']),
  message: React.PropTypes.string,
  onClose: React.PropTypes.func,
  closeText: React.PropTypes.string,
};

Note.displayName = 'Note';

module.exports = Note;
