/**
 * ImageViewer Component for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PopupView from './PopupView';

let div;

const remove = () => {
  ReactDOM.unmountComponentAtNode(div);
  div.parentNode.removeChild(div);
  div = null;
};

const defaultGetContainer = () => {
  const defaultDiv = document.createElement('div');
  document.body.appendChild(defaultDiv);
  return defaultDiv;
};


class ImageViewer extends React.Component {
  render() {
    const t = this;
    const { prefixCls, className } = t.props;
    return (
      <div
        className={classnames(prefixCls, {
          [className]: !!className,
        })}
      >
        ImageViewer
      </div>
    );
  }
}

ImageViewer.show = (config = {}) => {
  const {
    getContainer = defaultGetContainer,
    prefixCls = 't-image-viewer',
    ...props
  } = config;
  if (!div) {
    div = getContainer();
  }

  const renderComponent = (visible = true) => {
    ReactDOM.render(
      <PopupView
        {...props}
        visible={visible}
        prefixCls={`${prefixCls}-popup`}
        onClick={() => {
          renderComponent(false);
        }}
      />,
    div);
  };

  renderComponent();

  return {
    remove,
  };
};

ImageViewer.defaultProps = {
};

// http://facebook.github.io/react/docs/reusable-components.html
ImageViewer.propTypes = {
  className: React.PropTypes.string,
  prefixcls: 't-image-viewer',
};

ImageViewer.displayName = 'ImageViewer';

module.exports = ImageViewer;
