import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';

// 根据规则，action最多允许最多3个，移动端权重从右往左，所以会优先截取后3个，忽略其他。
export default class Footer extends React.Component {
  render () {
    const { actions, content } = this.props
    return (
      <div className={prefixClass('card-footer')}>
        <div className={prefixClass('card-footer-content')}>{content}</div>
        <div className={prefixClass('card-footer-actions')}>{actions}</div>
      </div>
    )
  }
}

Footer.contextTypes = {
  locale: PropTypes.string
}

Footer.propTypes = {
  actions: PropTypes.node,
  content: PropTypes.node,
  locale: PropTypes.string
}