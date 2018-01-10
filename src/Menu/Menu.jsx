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
import assign from 'object-assign';
import Context from '../Context';
import Submenu from './SubMenu';
import MenuItem from './MenuItem';
import { toArray, loopChildren } from './utils';


class Menu extends Component {
  render() {
    const {
      style, selectedKeys, defaultSelectedKeys, multiple,
      openKeys, defaultOpenKeys, onClick, onSelect, onDeselect, className,
    } = this.props;
    const prefixCls = Context.prefixClass('menu') || 't-menu';
    const renderedData = {};
    let options = [];
    if (this.props.children) {
      options = loopChildren(this.props.children, 0, (item, pos) => {
        renderedData[pos] = item;
      });
    }

    const allProps = {
      prefixCls,
      onClick,
      onSelect,
      onDeselect,
      renderedData,
      multiple,
      selectedKeys: 'selectedKeys' in this.props ? toArray(selectedKeys) : toArray(defaultSelectedKeys),
      openKeys: 'openKeys' in this.props ? toArray(openKeys) : toArray(defaultOpenKeys),
    };

    const recursive = (children, level = 0, isLastLeftofPa = true) =>
      children.map((item, index) => {
        const pos = `${level}-${index}`;
        const childrenLen = (item.children && item.children.length) || 0;
        const newprops = {
          pos,
          childrenLen,
          value: item.key,
          level: pos.split('-').length - 1,
        };
        newprops.isLastLeft = (children.length - 1 === index && isLastLeftofPa) ||
          newprops.level === 1;

        assign(newprops, item);

        delete newprops.children;
        if (childrenLen > 0) {
          return (
            <Submenu {...newprops} {...allProps} key={item.key}>
              {recursive(item.children, pos, newprops.isLastLeft)}
            </Submenu>);
        }
        return <Submenu {...newprops} {...allProps} key={item.key} />;
      });

    const menuData = recursive(options);

    return (
      <div
        className={classnames(`${prefixCls}`, {
          [className]: !!className,
        })}
        style={style}
      >
        <ul className={`${prefixCls}-content`}>
          {menuData}
        </ul>
      </div>
    );
  }
}

Menu.MenuItem = MenuItem;
Menu.displayName = 'Menu';

Menu.defaultProps = {
  defaultSelectedKeys: [],
  onClick: () => { },
  onSelect: () => { },
  onDeselect: () => { },
  multiple: false,
  style: {},
  className: undefined,
  selectedKeys: undefined,
  openKeys: undefined,
  defaultOpenKeys: undefined,
  children: undefined,
};

Menu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  selectedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  children: PropTypes.node,
};

export default Menu;
