/**
 * PickerField Component for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import utils from './utils';

const alphabet = utils.alphabet.split('');

class GroupingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holding: null,
      indicatorPos: 0,
    };
  }

  hold(e) {
    const t = this;
    const clientX = utils.getPageSize().width - 10;
    const { clientY } = e.touches[0];
    const target = document.elementFromPoint(clientX, clientY);
    const key = target && target.getAttribute('data-key');

    e.preventDefault();
    if (t.state.key !== key) {
      t.setState({
        holding: key,
        indicatorPos: target.offsetTop,
      });
      this.props.onSelect(key);
    }
  }

  release() {
    const t = this;
    t.setState({
      holding: null,
    });
  }

  render() {
    const t = this;
    return (
      <div
        className={Context.prefixClass('picker-field-grouping-bar')}
        onTouchStart={t.hold.bind(t)}
        onTouchMove={t.hold.bind(t)}
        onTouchEnd={t.release.bind(t)}
        onTouchCancel={t.release.bind(t)}
        onContextMenu={e => e.preventDefault()}
      >
        {alphabet.map(key => (
          <div
            className={classnames(
              Context.prefixClass('picker-field-group'),
              t.props.keys.indexOf(key) > -1 ? Context.prefixClass('picker-field-avilible-group') : null,
              t.state.holding === key ? Context.prefixClass('picker-field-active-group') : null,
            )}
            key={key}
            data-key={key}
          >{key}
          </div>
        ))}
        {t.props.indicator ? (
          <div
            className={classnames(
              Context.prefixClass('picker-field-grouping-indicator'),
              t.state.holding ? null : Context.prefixClass('picker-field-grouping-indicator-hide'),
              t.props.keys.indexOf(t.state.holding) > -1 ? Context.prefixClass('picker-field-avilible-group') : null,
            )}
            style={{ transform: `translateY(${t.state.indicatorPos}px)`, WebkitTransform: `translateY(${t.state.indicatorPos}px)` }}
          >
            {t.state.holding}
          </div>
        ) : null}
      </div>
    );
  }
}

GroupingBar.defaultProps = {
  keys: [],
  onSelect() { },
  indicator: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
GroupingBar.propTypes = {
  keys: PropTypes.array,
  indicator: PropTypes.bool,
  onSelect: PropTypes.func,
};

GroupingBar.displayName = 'GroupingBar';

export default GroupingBar;
