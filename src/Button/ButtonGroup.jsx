/**
 * Created by ex90rts on 12/05/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from './utils';

const disableBackground = '#f6f7f8'
const defaultBackground = '#fff'
class ButtonGroup extends React.Component {
  getBackground() {

    const { children, fixedBottom, background } = this.props
    let bg = background
    let hasBanner = false
    children.forEach(item => {
      const { type, disabled, display } = item.props;
      if (type !== 'primary') {
        if (disabled) {
          bg = disableBackground
        }
      } else {
        if (disabled) {
          bg = defaultBackground
        }
      }
      if (display === 'banner') {
        hasBanner = true
      }
    });
    return (hasBanner || fixedBottom) ? bg: 'transparent'
  }
  render() {
    const classes = {
      [`${prefixClass('button-group')}`]: true,
      [`fixed-bottom`]: this.props.fixedBottom
    };
    return (
      <div className={classnames(classes)} style={{background: this.getBackground()}}>
        {this.props.children}
      </div>
    );
  }
}

ButtonGroup.defaultProps = {
  children: [],
  fixedBottom: false,
  background: defaultBackground,
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  fixedBottom: PropTypes.bool,
  background: PropTypes.string,
};

export default ButtonGroup;
