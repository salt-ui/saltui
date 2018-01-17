/**
* Slide Component for tingle
* @author gnosaij,changming
*
* Copyright 2014-2015, Tingle Team, Alinw.
* All rights reserved.
*/
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

const prefixClass = function prefixClass(name) {
  return Context.prefixClass ? Context.prefixClass(name) : `t-${name}`;
};

class SlideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const t = this;
    const arr = [];
    for (let i = 0; i < t.props.num; i++) {
      arr.push((
        <div
          key={i}
          className={classnames({
            [`${prefixClass('M2 slide-nav-item')}`]: true,
            active: i === t.props.active,
          })}
        />
      ));
    }
    return (
      <div>
        {
          this.props.position === 'RIGHT' ?
            <div className={`${prefixClass('slide-nav FBH FBAC FBJE')}`}>{arr}</div> :
            <div className={`${prefixClass('slide-nav FBH FBAC FBJC')}`}>{arr}</div>
        }
      </div>
    );
  }
}

SlideNav.defaultProps = {
  num: 0,
  active: 0,
  position: 'CENTER',
};

// http://facebook.github.io/react/docs/reusable-components.html
SlideNav.propTypes = {
  num: PropTypes.number,
  active: PropTypes.number,
  position: PropTypes.oneOf(['CENTER', 'RIGHT']),
};

SlideNav.displayName = 'SlideNav';

export default SlideNav;
