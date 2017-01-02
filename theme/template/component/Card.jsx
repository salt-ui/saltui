import React from 'react';
import classnames from 'classnames';

export default class Card extends React.PureComponent {

  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let { className, children, style } = this.props;
    return (
      <div className={classnames('card', className)} style={style}>
        { children }
      </div>
    );
  }
} 
