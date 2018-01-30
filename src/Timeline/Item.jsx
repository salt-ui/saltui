/**
 * Group.List Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

const genIcon = (icon) => {
  if (React.isValidElement(icon) && icon.type && icon.type.displayName === 'Icon') {
    return React.cloneElement(icon, {
      width: 14,
      height: 14,
      fill: '#fff',
    });
  }
  return icon;
};
class Item extends React.Component {
  render() {
    const t = this;
    const tailBackground = {
      background: t.props.color,
    };
    const dotStyle = {
      background: t.props.color,
    };
    if (t.props.active) {
      dotStyle.borderColor = t.props.color;
    }
    return (
      <div
        className={classnames(Context.prefixClass('timeline-item'), {
          [t.props.className]: !!t.props.className,
          active: t.props.active,
        })}
        key={t.props.index}
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
                    /> : genIcon(t.props.icon)
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

const indentType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array,
  PropTypes.object,
]);

Item.propTypes = {
  className: PropTypes.string,
  icon: indentType,
  index: indentType,
  last: PropTypes.bool,
  active: PropTypes.bool,
  title: indentType,
  description: indentType,
};

Item.defaultProps = {
  className: undefined,
  icon: undefined,
  index: undefined,
  last: undefined,
  active: undefined,
  title: undefined,
  description: undefined,
};

export default Item;

