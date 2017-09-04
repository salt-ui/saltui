import React from 'react';

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
  visible: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default Mask;
