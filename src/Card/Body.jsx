import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';

export default class Body extends React.Component {
  render () {
    const { image, title, subTitle, content, reverse } = this.props
    return (
      <div className={classnames(prefixClass('card-body'), { 'reverse': reverse })}>
        {image && <div className={classnames(prefixClass('card-body-image'), { 'reverse': reverse })}>{image}</div>}
        <div className={prefixClass('card-body-wrapper')}>
          <div className="title"><span>{title}</span> {subTitle && <span className="title-sub">{subTitle}</span>}</div>
          <div className="content">{content}</div>
        </div>
      </div>
    )
  }
}

Body.contextTypes = {
  locale: PropTypes.string
}

Body.propTypes = {
  image: PropTypes.node,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  content: PropTypes.node,
  reverse: PropTypes.bool
}