/**
 * Created by ex90rts on 12/05/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from './utils';

class ButtonGroup extends React.Component {
  render() {
    const classes = {
      [`${prefixClass('button-group')}`]: true,
    };
    return (
      <div className={classnames(classes)}>
        {this.props.children}
      </div>
    );
  }
}

ButtonGroup.defaultProps = {
  children: [],
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default ButtonGroup;
