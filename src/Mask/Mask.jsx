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
import MaskBody from './MaskBody';


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
