/**
* Slide Component for tingle
* @author gnosaij,changming
*
* Copyright 2014-2017, Tingle Team, Alinw.
* All rights reserved.
*/
import React, { PropTypes } from 'react';
import { prefixClass } from './utils';

const SlideItem = ({ title, children, className, style }) => {
  const defaultStyle = { height: '100%' };
  return (
    <div
      className={`${prefixClass('slide-item-inner')} ${className}`}
      style={{ ...defaultStyle, ...style }}
    >
      {children}
      {
        title ? <div className={`${prefixClass('slide-item-title')}`}><div>{title}</div></div> : null
      }
    </div>
  );
};

SlideItem.displayName = 'SlideItem';

SlideItem.defaultProps = {
  className: '',
  style: {},
};

SlideItem.propTypes = {
  title: PropTypes.node,
  children: PropTypes.any.isRequired,
  showTitle: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SlideItem;
