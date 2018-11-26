import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';
import Button from '../Button/Button';
import ActionSheet from '../ActionSheet/ActionSheet'
import { PropContext } from './prop-context';

function showMore(props) {
    const actions = props.actions.slice(0, -2)
    ActionSheet.show({
        options: actions.map(action => action.props.children)
    }, (index) => {
        try {
            actions[index].props.onClick()
        } catch (err) {}
    })
}

function ActionRender(props, context) {
    if (!props.actions || props.actions.length) return null;
    const text = !context.locale || context.locale === 'zh-cn' ? '更多' : 'More';
    return (
        <React.Fragment>
            { <Button type="minor" size="small" display="inline" onClick={() => showMore.call(this, props)}>{text}</Button> }
            { props.actions.slice(-2).map((action, key) => <React.Fragment key={`action-${key}`}>{action}</React.Fragment>) }
        </React.Fragment>
    )
}

export default class Footer extends React.Component {
    render () {
        const { actions, children, content } = this.props
        return (
            <div className={prefixClass('carder-footer')}>
                {
                    children ? 
                    children : 
                    <React.Fragment>
                        <div className={prefixClass('carder-footer-content')}>{content}</div>
                        <div className={prefixClass('carder-footer-actions')}>
                            { actions && actions.length <= 3
                            ? actions.map((action, key) => <React.Fragment key={`action-${key}`}>{action}</React.Fragment>)
                            : ActionRender.call(this, this.props, this.context)
                            }
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

Footer.contextType = PropContext

Footer.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node),
    content: PropTypes.node,
    locale: PropTypes.string
}