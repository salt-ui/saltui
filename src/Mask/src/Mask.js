/**
 * Mask Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const { prefixClass, noop } = require('@ali/tingle-context');

class Mask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  componentDidUpdate(prevPorps) {
    if (this.props.visible && !prevPorps.visible) {
      document.body.style.overflow = 'hidden';
    } else if (!this.props.visible && prevPorps.visible) {
      document.body.style.overflow = '';
    }
  }

  handleClick() {
    const t = this;
    if (t.props.closeable === false || t.props.onWillHide() === false) {
      return;
    }
    t.setState({
      visible: false,
    }, () => {
      t.props.onDidHide();
    });
  }

  render() {
    const t = this;
    const { className, opacity, zIndex, type, ...other } = t.props;
    const { visible } = t.state;

    const styleMap = {
      display: visible ? 'block' : 'none',
      opacity,
      zIndex,
    };

    return (
      <div
        ref={(c) => { this.root = c; }}
        className={classnames(prefixClass('mask'), {
          visible,
          [className]: !!className,
        })}
        style={styleMap}
        onClick={() => { t.handleClick(); }}
        {...other}
      />
    );
  }
}

Mask.defaultProps = {
  opacity: 0.4,
  closeable: true,
  onDidHide: noop,
  onWillHide: noop,
  visible: false,
  zIndex: 1000,
};

// http://facebook.github.io/react/docs/reusable-components.html
Mask.propTypes = {
  className: React.PropTypes.string,
  closeable: React.PropTypes.bool,
  opacity: React.PropTypes.number,
  onDidHide: React.PropTypes.func,
  onWillHide: React.PropTypes.func,
  visible: React.PropTypes.bool,
  zIndex: React.PropTypes.number,
};

Mask.displayName = 'Mask';

module.exports = Mask;
