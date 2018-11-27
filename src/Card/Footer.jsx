import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';

// 根据规则，action最多允许最多3个，移动端权重从右往左，所以会优先截取后3个，忽略其他。
export default class Footer extends React.Component {
  render () {
    const { actions, children, content } = this.props
    if (actions && actions.length > 3) {
      console.error('Error from card component: Maximum 3 actions are allowed')
    }
    return (
      children ? 
      <div className={prefixClass('card-footer')}>{children}</div> : 
      <div className={prefixClass('card-footer')}>
        <div className={prefixClass('card-footer-content')}>{content}</div>
        <div className={prefixClass('card-footer-actions')}>
          { actions && actions.slice(-3).map((action, key) => <span data-rule="fragment" key={`action-${key}`}>{action}</span>) }
        </div>
      </div>
    )
  }
}

Footer.contextTypes = {
  locale: PropTypes.string
}

Footer.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  content: PropTypes.node,
  locale: PropTypes.string
}