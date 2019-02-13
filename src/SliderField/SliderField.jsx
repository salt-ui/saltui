import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Slider from '../Slider';
import Field from '../Field';
import Context from '../Context';

export default class SliderField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.onChange(value);
    if (this.props.showValue) {
      this.setState({
        value,
      });
    }
  }

  render() {
    const t = this;
    const fieldProps = {};
    const sliderProps = {};
    Object.entries(t.props).forEach(([k, v]) => {
      if (Object.keys(Field.propTypes).includes(k)) {
        fieldProps[k] = v;
      }
      if (Object.keys(Slider.propTypes).includes(k)) {
        sliderProps[k] = v;
      }
    });

    return (
      <Field
        {...fieldProps}
        className={classnames(Context.prefixClass('slider-field'), {})}
      >
        <Slider
          {...sliderProps}
          className={classnames({
              'show-value': t.props.showValue,
              [t.props.className]: !!t.props.className,
            })}
          onChange={t.handleChange}
        />
        {t.props.showValue ? <span className="value-display">{t.state.value != null ? t.state.value : t.props.defaultValue}</span> : null}
      </Field>
    );
  }
}

SliderField.propTypes = {
  ...Field.propTypes,
  ...Slider.propTypes,
  showValue: PropTypes.bool,
};

SliderField.defaultProps = {
  ...Field.defaultProps,
  ...Slider.defaultProps,
  showValue: false,
};

SliderField.displayName = 'SliderField';

