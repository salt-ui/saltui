/**
 * Crumb Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import Scroller from '../Scroller';
import Item from './CrumbItem';

class Crumb extends React.Component {
  componentDidMount() {
    // 计算宽度和滚动
    const t = this;
    if (t.props.showScroll) {
      let w = 0;
      const scrollEl = t.scroll;
      const chNodes = scrollEl.childNodes;
      for (let i = 0, l = chNodes.length; i < l; i += 1) {
        w += chNodes[i].offsetWidth + 1;
      }

      scrollEl.style.width = `${w}px`;
      // t.refs.root.scroller.scrollTo(-w, 0, 1000, IScroll.utils.ease.elastic);
      t.root.scroller.scrollTo(-w);
      // 实例化滚动
      t.root.scroller.refresh();
    }
  }

  renderItems() {
    const t = this;
    const len = React.Children.count(t.props.children);
    const crumbArray = [];
    React.Children.forEach(t.props.children, (child, idx) => {
      if (child.type.displayName === 'CrumbItem') {
        crumbArray.push(React.cloneElement(child, {
          key: idx,
          className: t.props.showScroll ? Context.prefixClass('FL') : '',
          disabled: idx === len - 1,
          onClick: t.props.onClick.bind(t, idx),
        }));
        if (idx !== len - 1) {
          crumbArray.push((
            <span
              key={`nav-${idx}`}
              className={classnames(Context.prefixClass('crumb-nav-icon'), {
                [Context.prefixClass('FL')]: t.props.showScroll,
              })}
            >
              {t.props.separator}
            </span>
          ));
        }
      }
    });
    return crumbArray;
  }

  render() {
    const t = this;
    const scroll = t.props.showScroll;
    const classNames = classnames(Context.prefixClass('crumb'), {
      [t.props.className]: !!t.props.className,
    });
    if (scroll) {
      return (
        <Scroller
          ref={(c) => { this.root = c; }}
          className={classNames}
          scrollX
          scrollY={false}
        >
          <div className={Context.prefixClass('CL crumb-scroll')} ref={(c) => { this.scroll = c; }}>
            {
              t.renderItems()
            }
          </div>
        </Scroller>
      );
    }
    return (
      <div
        ref={(c) => { this.root = c; }}
        className={classNames}
      >
        {
          t.renderItems()
        }
      </div>
    );
  }
}

Crumb.defaultProps = {
  className: '',
  showScroll: true,
  onClick: () => { },
  separator: '>',
};

// http://facebook.github.io/react/docs/reusable-components.html
Crumb.propTypes = {
  className: PropTypes.string,
  showScroll: PropTypes.bool,
  onClick: PropTypes.func,
  separator: PropTypes.string,
};

Crumb.displayName = 'Crumb';

Crumb.Item = Item;

export default Crumb;
