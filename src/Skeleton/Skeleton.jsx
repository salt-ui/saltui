/**
 * Skeleton Component for Skeleton
 * @author lj124435
 *
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
    const {
      visible, rows, type, className,
    } = this.props;
    const contentList = [];
    for (let i = 0; i < rows; i++) {
      contentList.push(t.getSkeletonContent(type, i));
    }
    if (visible) {
      return (
        <div className={className}>
          {contentList}
        </div>
      );
    }
    return <noscript />;
  }
}

Skeleton.Element = Element;

Skeleton.defaultProps = {
  visible: true,
  animate: false,
  rows: 1,
  type: 1,
  className: '',
};

Skeleton.propTypes = {
  visible: PropTypes.bool,
  animate: PropTypes.bool,
  rows: PropTypes.number,
  type: PropTypes.number,
  className: PropTypes.string,
};


Skeleton.displayName = 'Skeleton';


const traversal = (node, number) => {
  const styleObj = pick(window.getComputedStyle(node, null), [
    'width',
    'height',
    'borderRadius',
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
    return `<div style={${JSON.stringify(styleObj)}}>${Array.prototype.map.call(node.children, item => (traversal(item, traversalLevel - 1))).join('')}</div>`;
  }
  return `<Element animate style={${JSON.stringify(styleObj)}}/>`;
};

window.node2skeleton = (node, number) => {
  console.log(traversal(node, number));
};

polyfill(Skeleton);
export default Skeleton;
