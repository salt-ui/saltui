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
import pick from 'lodash/pick';
import classnames from 'classnames';
import Context from '../Context';
import SkeletonCircle from './tpls/Circle';
import SkeletonImageSmall from './tpls/ImageSmall';
import SkeletonTextBar from './tpls/TextBar';
import SkeletonImageBig from './tpls/ImageBig';
import SkeletonOperationBar from './tpls/OperationBar';


const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

class Skeleton extends React.Component {
  getSkeletonContent(type, index) {
    const { animate } = this.props;
    if (type === 1) {
      return (
        <div key={`${type}-${index}`} className={classnames(Context.prefixClass('skeleton-wrapper'))}>
          <div className={classnames(Context.prefixClass('skeleton-header-wrapper'))}>
            <SkeletonChunk animate={animate} size="small" />
          </div>
          <div className={classnames(Context.prefixClass('skeleton-content-wrapper'))}>
            <SkeletonTextBar animate={animate} />
          </div>
        </div>
      );
    } else if (type === 2) {
      return (
        <SkeletonChunk animate={animate} width="100%" height={50} />
      );
    }
    return null;
  }

  render() {
    const t = this;
    const { visible, rows } = this.props;
    const contentList = [];
    for (let i = 0; i < rows; i++) {
      contentList.push(t.getSkeletonContent(1, i));
    }
    if (visible) {
      return contentList;
    }
    return null;
  }
}

Skeleton.defaultProps = {
  visible: false,
  animate: false,
  rows: 1,
};

// http://facebook.github.io/react/docs/reusable-components.html
Skeleton.propTypes = {
  visible: PropTypes.bool,
  animate: PropTypes.bool,
  rows: PropTypes.number,
};


Skeleton.displayName = 'Skeleton';

Skeleton.OperationBar = SkeletonOperationBar;
Skeleton.ImageSmall = SkeletonImageSmall;
Skeleton.ImageBig = SkeletonImageBig;
Skeleton.TextBar = SkeletonTextBar;
Skeleton.Circle = SkeletonCircle;


const traversal = (node, number) => {
  const styleObj = pick(window.getComputedStyle(node, null), [
    'width',
    'height',
    'position',
    'top',
    'bottom',
    'left',
    'right',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'display',
    'flex',
    'flexDirection']);
  if (node.children.length > 0 && number > 1) {
    // 往下遍历
    return `<SkeletonChunk style={${JSON.stringify(styleObj)}} className="${node.className}">${Array.prototype.map.call(node.children, item => (traversal(item, number - 1))).join('')}</SkeletonChunk>`;
  }
  return `<SkeletonChunk style={${JSON.stringify(styleObj)}} className="${node.className}"/>`;
};

window.node2skeleton = (node, number) => {
  console.log(traversal(node, number));
};

polyfill(Skeleton);
export default Skeleton;
