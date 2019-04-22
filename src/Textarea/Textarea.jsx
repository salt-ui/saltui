import React from 'react';
import PropTypes from 'prop-types';
import calculateHeight from './calculateHeight';
import { shouldUpdate } from '../Utils';

export default class Textarea extends React.Component {
  static defaultProps = {
    onChange: () => {},
    minRows: 1,
    maxRows: 10,
    rows: undefined,
  }
  static propTypes = {
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
    onChange: PropTypes.func,
    rows: PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
    };
  }
  componentDidMount() {
    this.resize();
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    if ('value' in this.props
    && shouldUpdate(prevProps, this.props, ['value', 'rows', 'minRows', 'maxRows', 'placeholder'])) {
      this.resize();
    }
  }
  resize() {
    this.setState(calculateHeight(
      this.textarea,
      this.props.minRows || this.props.rows,
      this.props.maxRows,
    ));
  }
  handleChange(e) {
    this.props.onChange(e);
    if (!('value' in this.props)) {
      this.resize();
    }
  }
  render() {
    const { minRows, maxRows, ...otherProps } = this.props;
    return (
      <textarea
        {...otherProps}
        rows={this.state.rows}
        ref={(c) => { this.textarea = c; }}
        onChange={this.handleChange}
      />
    );
  }
}
