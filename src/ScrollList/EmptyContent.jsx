import React from 'react';
import PropTypes from 'prop-types';

const EmptyContent = props => (
  <div key="empty-content" className="empty-content">
    {props.image ? <div className="icon" style={{ backgroundImage: `url(${props.image})` }} /> : null}
    {props.text ? <div className="text">{props.text}</div> : null}
  </div>
);
EmptyContent.defaultProps = {
  image: undefined,
  text: undefined,
};
EmptyContent.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

export default EmptyContent;
