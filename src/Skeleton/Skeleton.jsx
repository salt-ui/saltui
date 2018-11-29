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
import pick from 'lodash/pick';
import classnames from 'classnames';
import Context from '../Context';
import Element from './tpls/Element';

class Skeleton extends React.Component {
  getSkeletonContent(type, index) {
    const { animate } = this.props;
    if (type === 1) {
      return (
        <div key={`${type}-${index}`} className={classnames(Context.prefixClass('skeleton-wrapper'))}>
          <div className={classnames(Context.prefixClass('skeleton-left-wrapper'))}>
            <Element className="skeleton-circle" animate={animate} />
          </div>
          <div className={classnames(Context.prefixClass('skeleton-right-wrapper'))}>
            <Element className="skeleton-text-bar" animate={animate} />
            <Element className="skeleton-text-bar" animate={animate} />
          </div>
        </div>
      );
    } else if (type === 2) {
      return (
        <div key={`${type}-${index}`} className={classnames(Context.prefixClass('skeleton-wrapper'))}>
          <div className={classnames(Context.prefixClass('skeleton-left-wrapper'))}>
            <Element className="skeleton-image-small" animate={animate} />
          </div>
          <div className={classnames(Context.prefixClass('skeleton-right-wrapper'))}>
            <Element className="skeleton-text-bar" animate={animate} />
            <Element className="skeleton-text-bar" animate={animate} />
          </div>
        </div>
      );
    } else if (type === 3) {
      return (
        <div key={`${type}-${index}`} className={classnames(Context.prefixClass('skeleton-wrapper'))}>
          <Element className="skeleton-image-big" animate={animate} />
          <div className={classnames(Context.prefixClass('skeleton-operation-bar'))}>
            <Element className="skeleton-operation-left" animate={animate} />
            <Element className="skeleton-operation-mid" animate={animate} />
            <Element className="skeleton-operation-right" animate={animate} />
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const t = this;
    const { visible, rows, type } = this.props;
    const contentList = [];
    for (let i = 0; i < rows; i++) {
      contentList.push(t.getSkeletonContent(type, i));
    }
    if (visible) {
      return contentList;
    }
    return null;
  }
}

Skeleton.Element = Element;

Skeleton.defaultProps = {
  visible: true,
  animate: false,
  rows: 1,
  type: 1,
};

// http://facebook.github.io/react/docs/reusable-components.html
Skeleton.propTypes = {
  visible: PropTypes.bool,
  animate: PropTypes.bool,
  rows: PropTypes.number,
  type: PropTypes.number,
};


Skeleton.displayName = 'Skeleton';


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
  const traversalLevel = number || 4;
  if (node.children.length > 0 && traversalLevel > 1) {
    // 往下遍历
    return `<SkeletonChunk style={${JSON.stringify(styleObj)}} className="${node.className}">${Array.prototype.map.call(node.children, item => (traversal(item, traversalLevel - 1))).join('')}</SkeletonChunk>`;
  }
  return `<SkeletonChunk style={${JSON.stringify(styleObj)}} className="${node.className}"/>`;
};

window.node2skeleton = (node, number) => {
  console.log(traversal(node, number));
};

polyfill(Skeleton);
export default Skeleton;
