import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  strokeWidth: 1,
  trailWidth: 1,
};
class Circle extends React.Component {
  static displayName = 'Progress-Circle'
  static propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'success']),
    percent: PropTypes.number,
    strokeWidth: PropTypes.number,
    size: PropTypes.number,
    showInfo: PropTypes.bool,
  }
  static defaultProps = {
    status: 'normal', // exception active
    percent: 0,
    strokeWidth: 10,
    size: 156,
    showInfo: true,
  }
  render() {
    const props = { ...this.props };
    const { strokeWidth } = props;
    const radius = (50 - (strokeWidth / 2));
    const pathString = `M 50,50 m 0,-${radius}
        a ${radius},${radius} 0 1 1 0,${2 * radius}
        a ${radius},${radius} 0 1 1 0,-${2 * radius}`;
    const len = Math.PI * 2 * radius;
    const pathStyle = {
      strokeDasharray: `${len}px ${len}px`,
      strokeDashoffset: `${(((100 - props.percent) / 100) * len)}px`,
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
    };

    ['strokeWidth', 'trailWidth'].forEach((item) => {
      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
        props.trailWidth = props.strokeWidth;
        return;
      }
      if (!props[item]) {
        props[item] = defaultProps[item];
      }
    });

    return (
      <svg className="t-progress-circle" viewBox="0 0 100 100">
        <path
          className="t-progress-circle-trail"
          d={pathString}
          strokeWidth={props.trailWidth}
          fillOpacity="0"
        />
        <path
          className="t-progress-circle-path"
          d={pathString}
          strokeLinecap="round"
          strokeWidth={props.strokeWidth}
          fillOpacity="0"
          style={pathStyle}
        />
      </svg>
    );
  }
}

export default Circle;
