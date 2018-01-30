import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RcTabs, { TabPane } from 'rc-tabs';
import SwipeableTabContent from 'rc-tabs/lib/SwipeableTabContent';
import TabContent from 'rc-tabs/lib/TabContent';
import InkTabBar from 'rc-tabs/lib/InkTabBar';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import Bottom from 'salt-icon/lib/DirectionBottom';
import Top from 'salt-icon/lib/DirectionTop';
import Context from '../Context';

const { prefixClass } = Context;

const getActiveKey = (props) => {
  if (props.active !== undefined) {
    console.warn('props.active is deprecated, use props.activeKey instead');
    return props.active;
  }
  return props.activeKey;
};

// https://github.com/hammerjs/hammer.js/issues/1050
// a hack bug fix for chrome 55, side effect may be involved.
const isChromeLargerThan55 = () => {
  if (typeof navigator !== 'undefined') {
    const match = navigator.userAgent.match(/Chrome\/(\d\d)/);
    if (match instanceof Array) {
      const chromeVer = match[1] || 0;
      return parseInt(chromeVer, 10) >= 55;
    }
    return false;
  }
  return false;
};

// https://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes
// in some case(maybe iOS 11 & dingtalk 4.2 ?),
// table content cannot be shown if repaint is not called

const forceRepaint = (node) => {
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-unused-expressions */
  node.style.display = 'none';
  node.offsetHeight; // no need to store this anywhere, the reference is enough
  node.style.display = '';
  /* eslint-enable no-unused-expressions */
  /* eslint-enable no-param-reassign */
};

export default class Tabs extends React.Component {
  static TabPane = TabPane;
  static Item = TabPane;

  static propTypes = {
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultActive: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showExpandAll: PropTypes.bool,
    fixedTop: PropTypes.bool,
    fixedBottom: PropTypes.bool,
    onChange: PropTypes.func,
    onTabClick: PropTypes.func,
    tabBarPosition: PropTypes.oneOf(['top', 'bottom']),
    animated: PropTypes.bool,
    swipeable: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    destroyInactiveTabPane: PropTypes.bool,
    pageSize: PropTypes.number,
    speed: PropTypes.number,
    tabBarhammerOptions: PropTypes.any,
    hammerOptions: PropTypes.any,
    inkBarWidth: PropTypes.number,
  };

  static defaultProps = {
    prefixCls: 't-tab',
    activeKey: '0',
    animated: true,
    swipeable: false,
    showExpandAll: true,
    fixedTop: false,
    fixedBottom: false,
    tabBarPosition: 'top',
    hammerOptions: {},
    tabBarhammerOptions: {},
    pageSize: 5,
    speed: 8,
    inkBarWidth: 20,
    onChange() {},
    onTabClick() {},
    active: undefined,
    defaultActive: undefined,
    children: undefined,
    className: undefined,
    destroyInactiveTabPane: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: getActiveKey(props),
    };
  }

  componentDidMount() {
    if (this.root) {
      forceRepaint(this.root);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active ||
      nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        activeKey: getActiveKey(nextProps),
      });
    }
  }


  doChange(activeKey, data) {
    const preActive = this.state.activeKey;

    this.setState({
      activeKey,
    }, () => {
      this.props.onChange({
        active: activeKey,
        activeKey,
        preActive,
        preActiveKey: preActive,
        data,
      });
    });
  }

  handleItemClick(key, data) {
    if (`${key}` === `${this.state.activeKey}`) {
      return;
    }

    this.toggleAll(true);
    this.doChange(`${key}`, data);
  }

  handleTabChange(key) {
    const active = `${key}`;
    let tabItem;
    for (let i = 0; i < this.tabs.length; i++) {
      const item = this.tabs[i];
      if (`${item.key}` === active) {
        tabItem = item;
        break;
      }
    }
    if (tabItem) {
      this.doChange(active, tabItem.data);
    }
  }

  toggleAll(prompt) {
    const tabHeight = 42;
    const allTabsHeight = this.allTabs.offsetHeight;
    const { classList } = this.root;

    const arrow = this.arrowBtnWrap.querySelector('.arrow-icon');
    this.arrowRotate = this.arrowRotate || 0;
    this.arrowRotate += 180;
    arrow.style.transform = `rotate(${this.arrowRotate}deg)`;

    if (classList.contains('show-all-layer')) {
      this.root.style.minHeight = '';
      if (prompt) {
        classList.remove('show-all-layer');
      } else {
        classList.add('show-all-title');
        classList.remove('show-all-layer');
        setTimeout(() => {
          classList.remove('show-all-title');
        }, 250);
      }
    } else {
      this.root.style.minHeight = `${allTabsHeight + tabHeight + 10}px`;
      classList.add('show-all-layer');
    }
  }

  renderTabContent = () => {
    const { animated, swipeable, hammerOptions } = this.props;
    return swipeable ? (
      <SwipeableTabContent animated={animated} hammerOptions={hammerOptions} />
    ) : (
      <TabContent animated={animated} />
    );
  }

  renderTabBar = () => {
    const {
      children, animated, speed, pageSize, tabBarhammerOptions, onTabClick,
    } = this.props;
    if (children.length > pageSize) {
      return (
        <SwipeableInkTabBar
          onTabClick={() => {
          }}
          speed={speed}
          pageSize={pageSize}
          hammerOptions={tabBarhammerOptions}
          styles={{
            inkBar: {
              width: this.props.inkBarWidth,
            },
          }}
        />
      );
    }
    return (
      <InkTabBar
        inkBarAnimated={animated}
        onTabClick={onTabClick}
        styles={{
          inkBar: {
            width: this.props.inkBarWidth,
          },
        }}
      />
    );
  }


  renderAllBtn(fix) {
    const bottom = fix === 'fix-bottom';
    const BottomIcon = bottom ? Top : Bottom;
    /* eslint-disable react/no-array-index-key */
    return (
      <div className={prefixClass('tab-all-wrap')}>
        <div
          ref={(ref) => {
            this.allTitle = ref;
          }}
          className={prefixClass('tab-all-title PA')}
        >
          <span>全部类目</span>
        </div>
        <div
          ref={(ref) => {
            this.arrowBtnWrap = ref;
          }}
          className={prefixClass('tab-all PA FBH FBAC FBJC')}
          onClick={() => {
            this.toggleAll();
          }}
        >
          <BottomIcon className="arrow-icon" width={16} height={16} />
        </div>
        <div className={prefixClass('tab-all PA tab-curve-shadow')} />
        <div className={prefixClass('tab-popup-container PA')}>
          <ul
            ref={(ref) => {
              this.allTabs = ref;
            }}
            className={prefixClass('tab-all-body FBH')}
          >
            {this.tabs.map((item, i) => (
              <li
                key={`tab-item-${i}`}
                onClick={(e) => { this.handleItemClick(item.key, item.datas, e); }}
                className={classnames(prefixClass('tab-all-item'), {
                  [prefixClass('tab-all-item__disabled')]: `${item.key}` === `${this.state.activeKey}`,
                  [prefixClass('tab-all-item-row-last')]: i % 3 === 2,
                })}
                role="menuitem"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }

  render() {
    const { children } = this.props;
    const shouldFixBug = isChromeLargerThan55();
    const clonedChildren = [];
    let fix = '';
    if (this.props.fixedTop) {
      fix = 'fix-top';
    } else if (this.props.fixedBottom) {
      fix = 'fix-bottom';
    }

    this.tabs = [];
    React.Children.forEach(children, (child, index) => {
      this.tabs.push({
        title: child.props.title,
        key: child.key || index,
        data: child.props.data,
      });
      clonedChildren.push(React.cloneElement(child, {
        tab: child.props.title,
        key: child.key || index,
      }));
    });

    const showAllBtn = this.props.showExpandAll && this.tabs.length > this.props.pageSize;

    return (
      <div
        ref={(ref) => {
          this.root = ref;
        }}
        className={classnames(prefixClass(`tab-wrap PR ${fix}`), {
          [prefixClass('tab-pan-bugfix')]: shouldFixBug,
          'show-all-btn': showAllBtn,
        })}
      >
        <RcTabs
          {...this.props}
          renderTabBar={this.renderTabBar}
          renderTabContent={this.renderTabContent}
          activeKey={this.state.activeKey}
          onChange={(key) => { this.handleTabChange(key); }}
        >
          {clonedChildren}
        </RcTabs>
        {showAllBtn ?
          this.renderAllBtn(fix) : null}
      </div>
    );
  }
}
