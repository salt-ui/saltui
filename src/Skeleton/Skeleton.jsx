/**
 * Skeleton Component for tingle
 * @author lj124435
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import Context from '../Context';
import SkeletonCircle from './tpls/Circle';
import SkeletonTitleBar from './tpls/TitleBar';
import SkeletonTextBar from './tpls/TextBar';
import SkeletonChunk from './tpls/Chunk';


const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

class Skeleton extends React.Component {
  constructor(props) {
    super(props);
    const t = this;
    const { visible } = props;
    // 初始状态
    t.state = {
      visible,
    };
  }
  render() {
    const { visible, animate } = this.props;
    if (visible) {
      return (
        <div>
          <div className="test">xxx</div>
          <SkeletonCircle animate={animate} />
          <SkeletonChunk animate={animate} />
          <SkeletonTitleBar animate={animate} />
          <SkeletonTextBar animate={animate} />
        </div>
      );
    }
    return null;
  }
}
Skeleton.defaultProps = {
  visible: false,
  animate: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
Skeleton.propTypes = {
  visible: PropTypes.bool,
  animate: PropTypes.bool,
};


Skeleton.displayName = 'Skeleton';

Skeleton.TitleBar = SkeletonTitleBar;
Skeleton.TextBar = SkeletonTextBar;
Skeleton.Circle = SkeletonCircle;
Skeleton.Chunk = SkeletonChunk;

window.dom2skeleton = (dom) => {
  const computedStyle = getComputedStyle(dom);
  const {
    width,
    height,
    position,
    left,
    right,
    top,
    bottom,
    flex,
  } = computedStyle;
  console.log({
    width,
    height,
    position,
    left,
    right,
    top,
    bottom,
    flex,
  });
};

polyfill(Skeleton);
export default Skeleton;
