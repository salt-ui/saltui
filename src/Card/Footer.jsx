import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';
import Button from '../Button/Button';
import ActionSheet from '../ActionSheet/ActionSheet'

function showMore(props, context) {
  const actions = props.actions.slice(0, -2);
  const { locale } = context
  ActionSheet.show({
    options: actions.map(action => action.props.children),
    locale
  }, (index) => {
    try {
      actions[index].props.onClick()
    } catch (err) {}
  })
}

function ActionRender(props, context) {
  if (!props.actions || !props.actions.length) return null;
  const text = !context.locale || context.locale === 'zh-cn' ? '更多' : 'More';
  return (
    <div data-rule="fragment">
      { <span data-rule="fragment"><Button type="minor" size="small" display="inline" onClick={() => showMore.call(this, props, context)}>{text}</Button></span> }
      { props.actions.slice(-2).map((action, key) => <span data-rule="fragment" key={`action-${key}`}>{action}</span>) }
    </div>
  )
}

export default class Footer extends React.Component {
  render () {
    const { actions, children, content } = this.props
    return (
      children ? 
      <div className={prefixClass('card-footer')}>{children}</div> : 
      <div className={prefixClass('card-footer')}>
        <div className={prefixClass('card-footer-content')}>{content}</div>
        <div className={prefixClass('card-footer-actions')}>
          { actions && actions.length <= 3
          ? actions.map((action, key) => <span data-rule="fragment" key={`action-${key}`}>{action}</span>)
          : ActionRender.call(this, this.props, this.context)
          }
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