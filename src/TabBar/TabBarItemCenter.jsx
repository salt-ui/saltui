import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import { Box, HBox } from '../Boxs';
import Layer from '../Layer';
import Animate from 'rc-animate';
import TabBarItemIcon from './TabBarItemIcon';
import TabBarItemMore from './TabBarItemMore';


/**
* Center Item of Tab Bar, be center of Tab Bar
*/
class TabBarItemCenter extends React.Component {
  static displayName = 'TabBarItemCenter';
  static propTypes = {
    onClick: React.PropTypes.func,
    onMoreVisibleChange: React.PropTypes.func,
    path: React.PropTypes.string,
    index: React.PropTypes.number,
    moreVisible: React.PropTypes.bool,
  };

  static defaultProps = {
    onMoreVisibleChange: () => { },
  }

  hideMoreItems(e) {
    e.stopPropagation();
    this.props.onMoreVisibleChange(false);
  }

  toggleMoreItems(e) {
    e.stopPropagation();
    this.props.onMoreVisibleChange(!this.props.moreVisible);
  }

  doClick() {
    this.props.onClick(this.props.index, this.props.path);
  }

  render() {
    const t = this;
    const active = t.props.active;
    const item = t.props.item ? t.props.item : t;
    let clickCB;
    if (item.props.items.length > 0) {
      clickCB = (e) => { t.toggleMoreItems(e); };
    } else {
      clickCB = (e) => { t.doClick(e); };
    }
    return (
      <Box
        className={classnames(Context.prefixClass('tabs-bar-item'), {
          active,
        })}
        onClick={clickCB}
        flex={1}
      >
        <TabBarItemIcon
          {...item.props}
          className={classnames(Context.prefixClass('tabs-bar-item-icon-more-center'), {
            [Context.prefixClass('tabs-bar-item-icon-more-center__more-visible')]: this.props.moreVisible,
          })}
          active={active}
          iconHeight={t.props.iconHeight}
        />

        <Animate showProp="visible" transitionName={Context.prefixClass('tabs-bar-item-fade')} transitionAppear component="">
          <Layer
            key="fade"
            className={classnames(Context.prefixClass('tabs-bar-item-more-container'))}
            visible={this.props.moreVisible}
            bottom="0"
            hasMask={false}
            renderToBody={false}
          >
            <HBox className={Context.prefixClass('tabs-bar-item-more-container-inner')}>
              {
                item.props.items.map((it, idx) =>
                  (<TabBarItemMore
                    key={idx.toString()}
                    index={t.props.index - idx}
                    {...it}
                    iconHeight={t.props.childIconHeight}
                    onClick={t.props.onClick}
                    hideMoreItems={(e) => { t.hideMoreItems(e); }}
                    type={'more'}
                  />),
                )
              }
            </HBox>
          </Layer>
        </Animate>
      </Box>
    );
  }
}

export default TabBarItemCenter;
