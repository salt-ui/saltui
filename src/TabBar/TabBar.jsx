/**
 * TabBar Component for tingle
 * @author zhouwenjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import { HBox } from '../Boxs';
import { TabBarItem, TabBarItemCenter } from './TabBarItem';

class TabBar extends React.Component {
  static displayName = 'TabBar';

  static propTypes = {
    className: PropTypes.string,
    activeIndex: PropTypes.number,
    height: PropTypes.number,
    iconHeight: PropTypes.number,
    cIconHeight: PropTypes.number,
    onChange: PropTypes.func,
    tabBarStyle: PropTypes.object,
    menuFlat: PropTypes.bool,
    children: PropTypes.any,
    items: PropTypes.array,
    theme: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    activeIndex: 0,
    height: 50,
    iconHeight: 24,
    cIconHeight: 50,
    onChange: () => {
    },
    tabBarStyle: {},
    menuFlat: undefined,
    children: undefined,
    items: undefined,
    theme: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      centerMoreVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const t = this;
    const nextActiveIndex = nextProps.activeIndex;
    if (nextActiveIndex !== t.state.activeIndex) {
      t.setActiveIndex(nextActiveIndex);
    }
  }

  onItemClick(index, path) {
    if (index !== this.state.activeIndex) {
      this.setActiveIndex(index, path);
    }
    // this.props.onChange(index, path);
  }

  setActiveIndex(index, path) {
    const t = this;
    if (t.centerTabIndex && t.centerTabIndex === index) {
      t.props.onChange(index, path);
    } else {
      t.setState({
        activeIndex: index,
      }, () => {
        t.props.onChange(index, path);
      });
    }
  }

  handleCenterMoreVisibleChange(visible) {
    this.setState({
      centerMoreVisible: visible,
    });
  }

  /**
  * Tab bar items data from child React Element
  * like: <TabBar><TabBar.Item></TabBar.Item></TabBar> Render way
  */
  childrenRenderWay() {
    const t = this;
    return React.Children.map(this.props.children, (child, idx) => {
      if (!child) {
        return null;
      }
      if (child.props.items) {
        t.centerTabIndex = idx;
        return (
          <TabBarItemCenter
            key={idx}
            index={idx}
            item={child}
            moreVisible={this.state.centerMoreVisible}
            iconHeight={child.cIconHeight || t.props.cIconHeight}
            onMoreVisibleChange={(visible) => { this.handleCenterMoreVisibleChange(visible); }}
            childIconHeight={36}
            active={idx === t.state.activeIndex}
            activeIndex={t.state.activeIndex}
            type="center"
            onClick={(...rest) => {
              t.onItemClick(...rest);
            }}
          />
        );
      }
      return (
        <TabBarItem
          key={idx}
          item={child}
          iconHeight={t.props.iconHeight}
          active={idx === t.state.activeIndex}
          onClick={() => {
            t.onItemClick(idx, child.props.path);
          }}
        />
      );
    });
  }

  /**
  * Tab bar items data from props, like <TabBar items={}/>
  */
  propsRenderWay() {
    const t = this;
    return this.props.items.map((item, idx) => {
      if (item.items) {
        t.centerTabIndex = idx;
        return (
          <TabBarItemCenter
            {...item}
            key={idx.toString()}
            index={idx}
            moreVisible={this.state.centerMoreVisible}
            onMoreVisibleChange={(visible) => { this.handleCenterMoreVisibleChange(visible); }}
            iconHeight={item.cIconHeight || t.props.cIconHeight}
            childIconHeight={36}
            active={idx === t.state.activeIndex}
            activeIndex={t.state.activeIndex}
            type="center"
            onClick={(...rest) => {
              t.onItemClick(...rest);
            }}
          />
        );
      }
      return (
        <TabBarItem
          key={idx.toString()}
          {...item}
          iconHeight={t.props.iconHeight}
          active={idx === t.state.activeIndex}
          onClick={() => {
            t.onItemClick(idx, item.path);
          }}
        />
      );
    });
  }

  renderItems() {
    const t = this;
    let content;
    if (this.props.children) {
      content = t.childrenRenderWay();
    } else {
      content = t.propsRenderWay();
    }
    const style = {
      ...t.props.tabBarStyle,
    };

    return (
      <HBox
        className={Context.prefixClass('tabs-bar-items')}
        style={style}
        hAlign="center"
        vAlign="center"
      >
        {content}
      </HBox>
    );
  }
  render() {
    const t = this;
    const className = classnames(Context.prefixClass('tabs-bar'), {
      [t.props.className]: !!t.props.className,
      [Context.prefixClass('tabs-bar-dark')]: this.props.theme === 'dark',
    });
    const style = {};
    if (this.state.centerMoreVisible) {
      style.zIndex = 1010;
    }
    return (
      <div className={className} style={style}>
        {t.renderItems()}
      </div>
    );
  }
}

TabBar.Item = TabBarItem;
TabBar.Item2 = TabBarItemCenter;

export default TabBar;
