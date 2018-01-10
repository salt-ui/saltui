import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import cssAnim from 'css-animation';
import classnames from 'classnames';
import { prefixClass, noop } from '../Context';

class MaskBody extends React.Component {
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

  toggle(node, show, done) {
    const { opacity } = this.props;
    const nodeNew = node;
    cssAnim(nodeNew, `__css-animation__${prefixClass('mask')}`, {
      start() {
        if (show) {
          nodeNew.style.opacity = 0;
        }
      },
      active() {
        nodeNew.style.opacity = show ? opacity : 0;
      },
      end() {
        done();
      },
    });
  }

  render() {
    const t = this;
    const {
      className, zIndex, visible, onWillHide, onDidHide, closeable, ...other
    } = t.props;
    // const { className, zIndex, ...other } = t.props;
    // const { visible } = t.state;

    const styleMap = {
      display: visible ? 'block' : 'none',
      zIndex,
    };

    return (
      <Animate
        component=""
        animation={{
                    appear: (node, done) => {
                        this.toggle(node, true, done);
                    },
                    enter: (node, done) => {
                        this.toggle(node, true, done);
                    },
                    leave: (node, done) => {
                        this.toggle(node, false, done);
                    },
                }}
      >
        {
                    visible ? (
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
                    ) : null
                }
      </Animate>
    );
  }
}

MaskBody.defaultProps = {
  opacity: 0.4,
  closeable: true,
  onDidHide: noop,
  onWillHide: noop,
  visible: false,
  zIndex: 1000,
  className: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
MaskBody.propTypes = {
  className: PropTypes.string,
  closeable: PropTypes.bool,
  opacity: PropTypes.number,
  onDidHide: PropTypes.func,
  onWillHide: PropTypes.func,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
};

MaskBody.displayName = 'MaskBody';

export default MaskBody;
