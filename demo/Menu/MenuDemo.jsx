/**
 * Menu Component Demo for tingle
 * @author wb-cq231719
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Icon from 'salt-icon';
import Badge from 'salt-badge';
import Button from 'salt-button';
import Popup from 'salt-popup';
import Popover from 'salt-popover';
import Menu from 'salt-menu';

const { MenuItem } = Menu;

class MenuDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: ['zhejiang'],
    };

    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
  }

  // 测试回调
  onClick({ key, keyPath, item, domEvent }) {
    console.log('click： ', key, keyPath, item, domEvent);
    keyPath.shift();
    this.setState({ selectedKeys: [key] }, () => {
      if (this.popup) {
        this.popup.update(this.getContent());
      }
    });
  }

  onSelect({ item, key, selectedKeys }) {
    console.log('选中select ', item, key, selectedKeys);
    // this.setState({ selectedKeys });
  }

  onDeselect({ item, key, selectedKeys }) {
    console.log('取消选中select ', item, key, selectedKeys);
    // this.setState({ selectedKeys });
  }

  handlePopup() {
    this.popup = Popup.show(
      this.getContent(),
      {
        animationType: 'slide-right',
        className: 't-menu-popup',
      }
    );
  }

  getContent() {
    const { selectedKeys, openKeys } = this.state;
    const testSpan = <span className="test">测试节点</span>;
    return (
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClick={this.onClick}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        multiple
      >
        <MenuItem title="浙江" key="zhejiang" keyNew="zhejiang">
          <MenuItem title="杭州" key="hangzhou" keyNew="hangzhou" />
          <MenuItem title="温州" key="wenzhou" keyNew="wenzhou" />
          <MenuItem title={testSpan} disabled key="lishui" keyNew="lishui" />
        </MenuItem>
        <MenuItem title="江苏" key="jiangsu" keyNew="jiangsu" />
      </Menu>
    );
  }

  render() {
    const { selectedKeys, openKeys } = this.state;
    const style = {
      cursor: 'pointer',
      margin: '20px',
    };

    const testSpan = <span className="test">测试节点</span>;

    const menu1 = (
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClick={this.onClick}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        multiple
      >
        <MenuItem title="浙江" key="zhejiang" keyNew="zhejiang" />
        <MenuItem title="江苏" key="jiangsu" keyNew="jiangsu" />
        <MenuItem title="河北" key="hebei" keyNew="hebei" />
      </Menu>
    );

    return (
      <div style={style}>
        <p className="menu-demo-title">普通</p>
        {menu1}
        <p className="menu-demo-title">使用icon</p>
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={this.onClick}
          onSelect={this.onSelect}
          onDeselect={this.onDeselect}
          multiple
        >
          <MenuItem
            title={
              <div>
                <Icon name="lock" className="demo-icon" width={20} height={20} fill="rgba(0,0,0,0.8)" />
                <span>浙江1</span>
              </div>
            }
            key="zhejiang"
            keyNew="zhejiang"
          >
            <MenuItem title="杭州" key="hangzhou" keyNew="hangzhou" />
            <MenuItem title="温州" key="wenzhou" keyNew="wenzhou" />
            <MenuItem title={testSpan} disabled key="lishui" keyNew="lishui" />
          </MenuItem>
          <MenuItem
            title={
              <div>
                <Icon name="lock" className="demo-icon" width={20} height={20} fill="rgba(0,0,0,0.8)" />
                <span>江苏</span>
              </div>
            }
            key="jiangsu"
            keyNew="jiangsu"
          />
        </Menu>
        <p className="menu-demo-title">使用badge</p>
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={this.onClick}
          onSelect={this.onSelect}
          onDeselect={this.onDeselect}
          multiple
        >
          <MenuItem
            title={(
              <span>
                <span>浙江1</span>
                <Badge
                  count={8}
                  style={{
                    left: 70,
                  }}
                />
              </span>
            )}
            key="zhejiang"
          >
            <MenuItem title="杭州" key="hangzhou" keyNew="hangzhou" />
            <MenuItem title="温州" key="wenzhou" keyNew="wenzhou" />
            <MenuItem title={testSpan} disabled key="lishui" keyNew="lishui" />
          </MenuItem>
          <MenuItem title="江苏" key="jiangsu" keyNew="jiangsu" />
        </Menu>
        <p className="menu-demo-title">和 popup 一起使用</p>
        <Button onClick={() => { this.handlePopup(); }}>操作</Button>
        <p className="menu-demo-title">和 popover 一起使用</p>
        <Popover overlay={menu1} mask overlayClassName="t-popover-menu">
          <a>操作</a>
        </Popover>
      </div>

    );
  }
}

export default MenuDemo;
