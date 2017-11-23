/**
 * Box Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

import React from 'react';

import classnames from 'classnames';
import { prefixClass } from '../Context';

const START = 'start';
const CENTER = 'center';
const END = 'end';
const ALIGN_VALUES = [START, CENTER, END];

/**
 * 水平方向弹性容器
 * @param props
 * @returns {XML}
 * @constructor
 */
const HBox = (props) => {
  const {
    className,
    flex,
    vAlign,
    hAlign,
    ...other
  } = props;
  const c = classnames(prefixClass('FBH'), {
    [prefixClass(`FB${flex}`)]: !!flex,
    [prefixClass('FBAS')]: vAlign === START,
    [prefixClass('FBAC')]: vAlign === CENTER,
    [prefixClass('FBAE')]: vAlign === END,
    [prefixClass('FBJS')]: hAlign === START,
    [prefixClass('FBJC')]: hAlign === CENTER,
    [prefixClass('FBJE')]: hAlign === END,
    [className]: !!className,
  });

  return (
    <div {...other} className={c}>
      {props.children}
    </div>
  );
};

HBox.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.number,
  hAlign: React.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: React.PropTypes.oneOf(ALIGN_VALUES),
};
HBox.defaultProps = {
  className: '',
  flex: 0,
};

HBox.displayName = 'HBox';

/**
 * 垂直方向弹性容器
 * @param props
 * @returns {XML}
 * @constructor
 */
const VBox = (props) => {
  const {
    className, flex, vAlign, hAlign, ...other
  } = props;
  const c = classnames(prefixClass('FBV'), {
    [prefixClass(`FB${flex}`)]: !!flex,
    [prefixClass('FBJS')]: vAlign === START,
    [prefixClass('FBJC')]: vAlign === CENTER,
    [prefixClass('FBJE')]: vAlign === END,
    [prefixClass('FBAS')]: hAlign === START,
    [prefixClass('FBAC')]: hAlign === CENTER,
    [prefixClass('FBAE')]: hAlign === END,
    [className]: !!className,
  });

  return (
    <div {...other} className={c}>
      {props.children}
    </div>
  );
};
VBox.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.number,
  hAlign: React.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: React.PropTypes.oneOf(ALIGN_VALUES),
};
VBox.defaultProps = {
  className: '',
  flex: 0,
};
VBox.displayName = 'VBox';

/**
 * 伸缩子元素
 * @param props
 * @returns {XML}
 * @constructor
 */
const Box = (props) => {
  const { className, flex, ...other } = props;
  const c = classnames({
    [prefixClass(`FB${flex}`)]: !!flex,
    [className]: !!className,
  });

  return (
    <div {...other} className={c}>
      {props.children}
    </div>
  );
};

Box.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.number,
  hAlign: React.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: React.PropTypes.oneOf(ALIGN_VALUES),
};
Box.defaultProps = {
  className: '',
  flex: 0,
};
Box.displayName = 'Box';

export default { HBox, VBox, Box };
