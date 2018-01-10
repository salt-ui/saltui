import React from 'react';
import PropTypes from 'prop-types';

class Mask extends React.Component {
  render() {
    const { className, visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className={className} />
    );
  }
}

Mask.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
};

Mask.defaultProps = {
  visible: undefined,
  className: undefined,
};

export default Mask;
