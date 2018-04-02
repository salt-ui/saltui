/**
 * ImageViewer Component for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PopupView from './PopupView';
import { stopBodyScrolling } from '../Utils';

let div;

const remove = () => {
  ReactDOM.unmountComponentAtNode(div);
  div.parentNode.removeChild(div);
  stopBodyScrolling(false);
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
  let prevVisible = false;
  const renderComponent = (visible = true) => {
    if (prevVisible === false && visible === true) {
      stopBodyScrolling(true);
    } else if (prevVisible === true && visible === false) {
      stopBodyScrolling(false);
    }
    prevVisible = visible;
    ReactDOM.render(
      <PopupView
        {...props}
        visible={visible}
        prefixCls={`${prefixCls}-popup`}
        onClick={() => {
          renderComponent(false);
        }}
      />,
      div,
    );
  };

  renderComponent();

  return {
    remove,
  };
};

ImageViewer.defaultProps = {
  className: undefined,
  prefixcls: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
ImageViewer.propTypes = {
  className: PropTypes.string,
  prefixcls: 't-image-viewer',
};

ImageViewer.displayName = 'ImageViewer';

export default ImageViewer;
