import React from 'react';
import classnames from 'classnames';

export default class Icon extends React.PureComponent {

  static defaultProps = {
    name: 'home',
  }

  static propTypes = {
    name: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, className, ...props } = this.props;
    return <i className={classnames('iconfont', className, `icon-${name}`)} {...props}></i>;
  }
}