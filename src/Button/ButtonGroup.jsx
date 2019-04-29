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
    let hasDisabled = false
    let child = []
    if (!children.length || !children.splice) {
      child.push(children)
    } else {
      child = [...children]
    }
    child.forEach(item => {
      const { type, disabled, display } = item.props;
      if (type !== 'primary') {
        // 非主按钮存在disable状态
        if (disabled) {
          hasDisabled = true
        }
      } else {
        // 主按钮存在disable状态
        if (disabled) {
          // 如果只有一个主按钮，那就设置成disable的颜色，否则设置成其它普通按钮的颜色
          bg = child.length === 1 ? disableBackground : defaultBackground
        }
      }
      if (display === 'banner') {
        hasBanner = true
      }
    });
    // 非主按钮存在disable状态时，一律返回disable颜色
    if (hasDisabled) {
      bg = disableBackground
    }
    return (hasBanner || fixedBottom ) ? bg : 'transparent'
  }
  render() {
    const { fixedBottom } = this.props
    const classes = {
      [`${prefixClass('button-group')}`]: true,
      [`fixed-bottom`]: fixedBottom,
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
