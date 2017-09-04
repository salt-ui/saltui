import React, { PropTypes } from 'react';

class MenuItem extends React.Component {

}

MenuItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  key: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
};

export default MenuItem;
