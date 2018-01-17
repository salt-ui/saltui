/**
 * Totop Component for tingle
 * @author shaochao.wsc
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/fp/debounce';
import IconToTop from 'salt-icon/lib/Totop';
import Animate from 'rc-animate';
import classnames from 'classnames';
import Context from '../Context';
import util from './utils';
import Box from './Box';

class Totop extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    hideToTopButton: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    type: PropTypes.oneOf(['primary', 'secondary']),
    debounceNum: PropTypes.number,
    distance: PropTypes.number,
    onScroll: PropTypes.func,
    icon: PropTypes.element,
    duration: PropTypes.number,
  };

  static defaultProps = {
    hideToTopButton: false,
    type: 'secondary',
    debounceNum: 300,
    distance: 30,
    duration: 600,
    onScroll: () => { },
    className: undefined,
    size: undefined,
    icon: undefined,
  };
  static displayName = 'Totop';

  constructor(props) {
    super(props);
    this.state = {
      hide: true,
    };
    this.scrolling = false;
  }

  componentDidMount() {
    const t = this;
    const { debounceNum } = t.props;

    this.toggleShow();

    t.scrollListener = debounce(debounceNum, (e) => {
      this.toggleShow(e);
    });

    window.addEventListener(
      'scroll',
      t.scrollListener,
      false,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener('scroll', this.scrollListener, false);
  }

  toggleShow(e) {
    const { onScroll, distance } = this.props;
    if (window.scrollY >= distance) {
      onScroll(e);
      this.setState({ hide: false });
    } else {
      this.setState({ hide: true });
    }
  }

  scrollTo(to, duration, callback) {
    const t = this;
    if (duration <= 0) {
      if (callback) {
        callback();
      }
      return;
    }
    const y = util.getWindowScrollY();
    const difference = to - y;
    const perTick = (difference / duration) * 10;
    t.timer = setTimeout(() => {
      const targetScrollY = y + perTick;
      util.setWindowScrollY(targetScrollY < to ? to : targetScrollY);
      t.scrollTo(to, duration - 10, callback);
    }, 10);
  }

  toTop() {
    const t = this;
    const to = t.props.to || 10;
    const { duration } = t.props;
    const { scrolling } = t;
    if (scrolling) {
      return;
    }

    t.scrolling = true;

    if (duration === 0) {
      document.body.scrollTop = to;
      t.scrolling = false;
    } else {
      t.scrollTo(to, duration, () => {
        t.scrolling = false;
      });
    }
  }

  renderToTopButton() {
    const {
      hideToTopButton, icon, type, size,
    } = this.props;
    if (hideToTopButton || this.state.hide) {
      return null;
    }
    return (
      <Box type={type} size={size} onClick={() => { this.toTop(); }}>
        {icon || <IconToTop />}
      </Box>
    );
  }

  render() {
    const t = this;
    const { className, children } = t.props;
    const prefixCls = Context.prefixClass('totop');
    return (
      <div
        className={classnames(prefixCls, {
          [className]: !!className,
        })}
      >
        {children}
        <Animate transitionName={`${prefixCls}-button`} transitionAppear component="">
          {this.renderToTopButton()}
        </Animate>
      </div>
    );
  }
}

Totop.Box = Box;

export default Totop;
