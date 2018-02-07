/**
 * Popover Component Demo for tingle
 * @author wenzhao.fw
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Menu from 'salt-menu';
import Popover from 'salt-popover';
import CheckRound from 'salt-icon/lib/CheckRound';
import Upload from 'salt-icon/lib/Upload';
import Eye from 'salt-icon/lib/Eye';

const { MenuItem } = Menu;

const text = (
  <div>
    <p>这里是</p>
    <p>Popover的</p>
    <p>提示文字</p>
  </div>
);
const styles = {
  display: 'inline-block',
  lineHeight: '40px',
  height: '40px',
  width: '80px',
  textAlign: 'center',
  background: '#f6f6f6',
  marginRight: '1em',
  marginBottom: '1em',
  borderRadius: '6px',
};

class PopoverDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const menu = (
      <Menu
        onClick={({ key }) => { alert(key); }}
        multiple
      >
        <MenuItem title="这是操作1" key="1" keyNew="1" />
        <MenuItem title="这是操作1-2" key="1-2" keyNew="1-2" />
        <MenuItem title="这是操作3" key="3" keyNew="3" />
      </Menu>
    );
    const menuHaveIcon = (
      <Menu
        onClick={({ key }) => { alert(key); }}
        multiple
      >
        <MenuItem
          title={
            <div>
              <CheckRound className="demo-icon" width={20} height={20} fill="rgba(0,0,0,0.8)" />
              <span>这是操作1</span>
            </div>
          }
          key="1"
        />
        <MenuItem
          title={
            <div>
              <Upload className="demo-icon" width={20} height={20} fill="rgba(0,0,0,0.8)" />
              <span>这是操作2</span>
            </div>
          }
          key="1-2"
        />
        <MenuItem
          title={
            <div>
              <Eye className="demo-icon" width={20} height={20} fill="rgba(0,0,0,0.8)" />
              <span>这是操作3</span>
            </div>
          }
          key="3"
        />
      </Menu>
    );
    return (
      <div>
        <Popover placement="bottom" overlay={text} overlayClassName="t-popover-demo">
          <a style={styles}>下边</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="right" overlay={text} >
          <a style={styles}>右边</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="left" overlay={text}>
          <a style={styles}>左边</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="top" overlay={text}>
          <a style={styles}>上边</a>
        </Popover>
        <br />
        <Popover overlayClassName="t-popover-demo" placement="rightTop" overlay={text}>
          <a style={styles}>右上</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="leftBottom" overlay={text}>
          <a style={styles}>左下</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="leftTop" overlay={text}>
          <a style={styles}>左上</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="rightBottom" overlay={text}>
          <a style={styles}>右下</a>
        </Popover>
        <br />
        <Popover overlayClassName="t-popover-demo" placement="bottomRight" overlay={text} mask>
          <a style={styles}>下右</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="topRight" overlay={text}>
          <a style={styles}>上右</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="topLeft" overlay={text}>
          <a style={styles}>上左</a>
        </Popover>
        <Popover overlayClassName="t-popover-demo" placement="bottomLeft" overlay={text}>
          <a style={styles}>下左</a>
        </Popover>
        <h1>和 Menu 公用</h1>
        <Popover placement="bottomLeft" overlay={menu} mask overlayClassName="t-popover-menu">
          <div style={{ marginLeft: '20px', marginBottom: '10px' }}>操作</div>
        </Popover>
        <h1>图标配合展示</h1>
        <Popover placement="bottomLeft" overlay={menuHaveIcon} mask overlayClassName="t-popover-menu">
          <div style={{ marginLeft: '20px', marginBottom: '10px' }}>操作</div>
        </Popover>
      </div>
    );
  }
}

export default PopoverDemo;
