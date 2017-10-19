/**
 * Group.List Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  genIcon(icon) {
    if (React.isValidElement(icon) && icon.type && icon.type.displayName === 'Icon') {
      return React.cloneElement(icon, {
        width: 14,
        height: 14,
        fill: '#fff',
      });
    }
    return icon;
  }

  render() {
    const t = this;
    const tailBackground = {
      background: t.props.color,
    };
    const dotStyle = {
      background: t.props.color,
    };
    if (t.props.active) {
      dotStyle['border-color'] = t.props.color;
    }
    return (
      <div
        className={classnames(Context.prefixClass('timeline-item'), {
          [t.props.className]: !!t.props.className,
          active: t.props.active,
        })} key={t.props.index}
      >
        <div className={classnames(Context.prefixClass('timeline-header'))}>
          {
            t.props.icon ?
              <div className={classnames(Context.prefixClass('timeline-icon'))} >
                {
                  typeof t.props.icon === 'string' ?
                    <img
                      src={t.props.icon}
                      alt=""
                    /> : t.genIcon(t.props.icon)
                }
              </div> :
              <div
                style={dotStyle}
                className={classnames(Context.prefixClass('timeline-header-dot'), {
                  active: t.props.active,
                })}
              >
                <i className="dot-core" />
              </div>
          }
          {
            !t.props.last && <div
              style={tailBackground}
              className={classnames(Context.prefixClass('timeline-tail'))}
            />
          }
        </div>
        <div className={classnames(Context.prefixClass('timeline-main'))} >
          {
            t.props.children ?
              <div className={classnames(Context.prefixClass('timeline-main-title'))} >{t.props.children}</div> :
              undefined
          }
          {
            t.props.description ?
              <div className={classnames(Context.prefixClass('timeline-main-description'))}>{t.props.description}</div> :
              undefined
          }
        </div>
      </div>
    );
  }
}

Item.displayName = 'Timeline.Item';

const indentType = React.PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.string,
  React.PropTypes.array,
  React.PropTypes.object,
]);

Item.propTypes = {
  className: React.PropTypes.string,
  icon: indentType,
  index: indentType,
  last: React.PropTypes.bool,
  active: React.PropTypes.bool,
  title: indentType,
  description: indentType,
};

Item.defaultProps = {};

module.exports = Item;

