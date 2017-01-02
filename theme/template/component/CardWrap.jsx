import React from 'react';
import classnames from 'classnames';
import assign from 'object-assign';

export default class CardWrap extends React.PureComponent {

  static defaultProps = {
    width: 200,
    extendable: true,
  }

  static propTypes = {
    width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    extendable: React.PropTypes.bool,
  }

  render() {
    let { width, extendable, children, className } = this.props;
    return (
      <div className={classnames('card-wrap', className)}>
        {
          React.Children.map(children, el => {
            let newEle;
            if (el && el.type) {
              newEle = React.cloneElement(el, {
                style: assign({
                  width: width,
                  flexGrow: extendable ? 1 : 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                }, el.props.style)
              }); 
            } else {
              newEle = el;
            }
            return newEle;
          })
        }
      </div>
    );
  }
}
