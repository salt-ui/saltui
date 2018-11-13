import React from 'react';
import PropTypes from 'prop-types';
import RcSlider from 'rc-slider/lib/Slider';
import './Slider'
import Context from '../Context';

export default class Slider extends React.Component {
  static defaultProps = {
    className: 'salt-ui-slider',
  };

  render() {
    return (
      <div className={`${this.props.className}-wrapper`}>
        <RcSlider
          className={this.props.className}
          prefixCls={Context.prefixClass('slider')}
          {...this.props}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  defaultValue: PropTypes.number,
  tipFormatter: PropTypes.func,
  disabled: PropTypes.boolean,
  handle: PropTypes.any,
  className: PropTypes.string,
  marks: PropTypes.object,
  dots: PropTypes.boolean,
  included: PropTypes.boolean,
  handleStyle: React.CSSProperties,
  trackStyle: React.CSSProperties,
  railStyle: React.CSSProperties,
}
