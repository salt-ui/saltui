import React from 'react';

const EmptyContent = props => (
  <div key="empty-content" className="empty-content">
    <div className="icon" style={{ backgroundImage: `url(${props.image})` }} />
    <div className="text">{props.text}</div>
  </div>
);

EmptyContent.propTypes = {
  image: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default EmptyContent;
