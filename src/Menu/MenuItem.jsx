import React from 'react';
import PropTypes from 'prop-types';

class MenuItem extends React.Component {

}

MenuItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  keyNew: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
};

MenuItem.defaultProps = {
  title: undefined,
  keyNew: undefined,
  disabled: undefined,
};

export default MenuItem;
