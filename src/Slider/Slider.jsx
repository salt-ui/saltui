import React from 'react';
import PropTypes from 'prop-types';
import RcSlider from 'rc-slider/lib/Slider';
import Context from '../Context';

const { noop } = Context;

export default class Slider extends React.Component {
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
Slider.displayName = Slider;
Slider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  marks: PropTypes.object,
  dots: PropTypes.bool,
  included: PropTypes.bool,
  handleStyle: PropTypes.object,
  trackStyle: PropTypes.object,
  railStyle: PropTypes.object,
};

Slider.defaultProps = {
  value: undefined,
  className: undefined,
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 0,
  disabled: false,
  dots: false,
  marks: {},
  included: true,
  handleStyle: {},
  trackStyle: {},
  railStyle: {},
  onChange: noop,
  onAfterChange: noop,
};
