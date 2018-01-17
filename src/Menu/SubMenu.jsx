/**
 * Menu Component for tingle
 * @author wb-cq231719 chenqiu
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Animate from 'rc-animate';
import DirectionBottomIcon from 'salt-icon/lib/DirectionBottom';
import CheckIcon from 'salt-icon/lib/Check';
import { getParentPos, toArray } from './utils';

class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: props.openKeys.indexOf(props.value) > -1 || false,
    };

    this.onClickdMenu = this.onClickdMenu.bind(this);
  }

  /*
   * 点击子菜单的回调
   */
  onClickdMenu(e) {
    e.stopPropagation();
    const {
      childrenLen, pos, disabled, renderedData, selectedKeys,
      multiple, onSelect, value, onDeselect, onClick,
    } = this.props;
    if (disabled) {
      return;
    }
    const { expand } = this.state;
    if (childrenLen > 0) {
      this.setState({
        expand: !expand,
      });
    } else {
      const key = value;
      let selectedKeysBak = selectedKeys.slice();
      const keyPath = [];
      const selectIndex = selectedKeys.indexOf(key);
      getParentPos(pos, (index) => {
        keyPath.unshift(renderedData[index].key);
      });

      if (multiple) {
        if (selectIndex === -1) {
          selectedKeysBak.push(key);
          onSelect({ item: this, key, selectedKeys: selectedKeysBak });
        } else {
          selectedKeysBak.splice(selectIndex, 1);
          onDeselect({ item: this, key, selectedKeys: selectedKeysBak });
        }
      } else if (selectIndex === -1) {
        selectedKeysBak = toArray(key);
        onSelect({ item: this, key, selectedKeys: selectedKeysBak });
      }

      onClick({
        key, keyPath, item: this, domEvent: e,
      });
    }
  }

  render() {
    const {
      children, childrenLen, prefixCls, title, level, disabled,
      isLastLeft, value, selectedKeys,
    } = this.props;

    const { expand } = this.state;
    const subMenuPrefixCls = `${prefixCls}-submenu`;

    const liCls = {
      [subMenuPrefixCls]: true,
    };

    const iconCls = {
      [`${subMenuPrefixCls}-icon`]: true,
      [`${subMenuPrefixCls}-icon-expand`]: expand,
    };

    const selectIconCls = {
      [`${subMenuPrefixCls}-icon`]: true,
      [`${subMenuPrefixCls}-icon-selected`]: childrenLen < 1 && selectedKeys.indexOf(value) > -1,
    };

    const itemCls = {
      [`${subMenuPrefixCls}-unit`]: true,
      [`${subMenuPrefixCls}-unit-sub`]: level > 1,
      [`${subMenuPrefixCls}-unit-disabled`]: disabled,
      [`${subMenuPrefixCls}-unit-selected`]: selectedKeys.indexOf(value) > -1,
      [`${subMenuPrefixCls}-unit-superSub`]: level > 2,
      [`${subMenuPrefixCls}-unit-sub-isLastLeft`]: isLastLeft && !expand,
    };

    // 偏移量是个比较基础的值，与层级有关
    const offset = 12 * (level - 1);

    // 如果有图标，那么为了文字不覆盖图标，要额外有一些padding
    const hasIcon = (childrenLen > 0) || (selectedKeys.indexOf(value) > -1);

    const style = {
      marginLeft: `${offset}px`,
      paddingRight: `${16 + offset + (hasIcon ? 21 : 0)}px`,
    };

    const renderContent = (
      <div>
        <span className={`${subMenuPrefixCls}-title`} style={style}>
          <span className={`${subMenuPrefixCls}-title-inner`}>{title}</span>
        </span>
        {childrenLen > 0 &&
        <DirectionBottomIcon
          className={classnames(iconCls)}
          width={18}
          height={18}
        />
      }
        {
        childrenLen < 1 && selectedKeys.indexOf(value) > -1 &&
        <CheckIcon
          className={classnames(selectIconCls)}
          width={20}
          height={20}
        />
      }
        {level > 1 && !(isLastLeft && !expand) && <div
          style={{
          left: `${offset}px`,
        }}
          className={`${subMenuPrefixCls}-line`}
        />}
      </div>);
    return (
      <li className={classnames(liCls)}>
        <div className={classnames(itemCls)} onClick={this.onClickdMenu} >
          {renderContent}
        </div>
        {
          childrenLen > 0 &&
          <Animate
            component="ul"
            transitionName={`${subMenuPrefixCls}-animate`}
          >
            {expand ? children : <li />}
          </Animate>
        }
      </li>
    );
  }
}

Submenu.propTypes = {
  children: PropTypes.node,
  childrenLen: PropTypes.number,
  pos: PropTypes.string,
  level: PropTypes.number,
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.node,
  ]),
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  isLastLeft: PropTypes.bool,
  prefixCls: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  renderedData: PropTypes.object,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  target: PropTypes.string,
  href: PropTypes.string,
  expandPos: PropTypes.array,
};


Submenu.defaultProps = {
  target: '_self',
  href: '',
  disabled: false,
  expandPos: [],
  children: undefined,
  childrenLen: undefined,
  pos: undefined,
  level: undefined,
  title: undefined,
  multiple: undefined,
  isLastLeft: undefined,
  prefixCls: undefined,
  onClick: undefined,
  value: undefined,
  selectedKeys: undefined,
  openKeys: undefined,
  renderedData: undefined,
  onSelect: undefined,
  onDeselect: undefined,
};

export default Submenu;
