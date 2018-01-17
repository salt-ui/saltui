/**
 * Layer Component, all model tips's base backbone
 * (Dialog, loading...) for tinglejs
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import LayerBody from './LayerBody';

class Layer extends React.Component {
  static propTypes = {
    renderToBody: PropTypes.bool,
  };

  static defaultProps = {
    renderToBody: true,
  };

  static displayName = 'Layer';

  componentDidMount() {
    if (this.props.renderToBody) {
      ReactDOM.render(<LayerBody {...this.props} />, this.getWrapper());
    }
  }

  componentDidUpdate() {
    if (this.props.renderToBody) {
      ReactDOM.render(<LayerBody {...this.props} />, this.getWrapper());
    }
  }

  componentWillUnmount() {
    if (this.props.renderToBody && this.wrapper) {
      ReactDOM.unmountComponentAtNode(this.wrapper);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  getWrapper() {
    if (!this.wrapper) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      this.wrapper = div;
    }
    return this.wrapper;
  }

  render() {
    if (this.props.renderToBody) {
      return null;
    }
    return <LayerBody {...this.props} />;
  }
}

export default Layer;
