import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';
import { PropContext } from './prop-context';

export default class Body extends React.Component {
    render () {
        const { image, title, subTitle, content, reverse, children } = this.props
        return (
            <div className={classnames(prefixClass('carder-body'), { 'reverse': reverse })}>
                {image && <div className={classnames(prefixClass('carder-body-image'), { 'reverse': reverse })}>{image}</div>}
                <div className={prefixClass('carder-body-wrapper')}>
                    <div className="title"><span>{title}</span> {subTitle && <span className="title-sub">{subTitle}</span>}</div>
                    <div className="content">{children ? children : content}</div>
                </div>  
            </div>
        )
    }
}

Body.contextType = PropContext

Body.propTypes = {
    image: PropTypes.node,
    title: PropTypes.node,
    subTitle: PropTypes.node,
    content: PropTypes.node,
    reverse: PropTypes.bool
}