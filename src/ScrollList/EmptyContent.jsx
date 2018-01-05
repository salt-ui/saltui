import React from 'react';
import PropTypes from 'prop-types';

const EmptyContent = props => (
  <div key="empty-content" className="empty-content">
    <div className="icon" style={{ backgroundImage: `url(${props.image})` }} />
    <div className="text">{props.text}</div>
  </div>
);

EmptyContent.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

export default EmptyContent;
