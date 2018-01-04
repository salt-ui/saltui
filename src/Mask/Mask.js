/**
 * Mask Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
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
    cssAnim(node, `__css-animation__${prefixClass('mask')}`, {
      start() {
        if (show) {
          node.style.opacity = 0;
        }
      },
      active() {
        node.style.opacity = show ? opacity : 0;
      },
      end() {
        done();
      },
    });
  }

  render() {
    const t = this;
    const { className, zIndex, visible, onWillHide, onDidHide, closeable, ...other } = t.props;
    //const { className, zIndex, ...other } = t.props;
    //const { visible } = t.state;

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

class Mask extends React.Component {
  componentDidMount() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    this.wrapper = div;
    if (this.props.renderToBody) {
      this.mountInBody();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.renderToBody && !nextProps.renderToBody) {
      this.unmountInBody();
    }
  }

  componentDidUpdate() {
    if (this.props.renderToBody) {
      this.mountInBody();
    }
  }

  componentWillUnmount() {
    this.unmountInBody();
    document.body.removeChild(this.wrapper);
  }

  mountInBody() {
    ReactDOM.render(this.renderMaskBody(), this.wrapper);
  }

  unmountInBody() {
    ReactDOM.unmountComponentAtNode(this.wrapper);
  }

  renderMaskBody() {
    const newProps = { ...this.props };
    delete newProps.renderToBody;
    return <MaskBody {...newProps} />;
  }

  render() {
    if (this.props.renderToBody) {
      return null;
    }
    return this.renderMaskBody();
  }
}

Mask.defaultProps = {
  ...MaskBody.defaultProps,
  renderToBody: true,
};

Mask.propTypes = {
  ...MaskBody.propTypes,
  renderToBody: PropTypes.bool,
};

export default Mask;
