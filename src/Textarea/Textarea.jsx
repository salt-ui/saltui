import React from 'react';
import calculateHeight from './calculateHeight';
import { shouldUpdate } from '../Utils';

export default class Textarea extends React.Component {
  static defaultProps = {
    onChange: () => {},
    minRows: 1,
    maxRows: 10,
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
    && shouldUpdate(prevProps, this.props, ['value', 'rows', 'minRows', 'maxRows'])) {
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
    this.resize();
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
