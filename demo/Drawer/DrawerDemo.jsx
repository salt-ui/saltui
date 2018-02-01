/**
 * Drawer Component Demo for tingle
 * @author eternalsky
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Drawer from 'salt-drawer';
import Menu from 'salt-menu';
const { MenuItem } = Menu;

class DrawerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpenChange = (open, from) => {
    console.log(open, from);
    this.setState({ open });
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const drawerProps = {
      open: this.state.open,
      onOpenChange: this.onOpenChange,
    };

    const sideBar = (
      <div className="demo-sidebar">
        <Menu>
          <MenuItem title="Item 1" key="1" />
          <MenuItem title="Item 2" key="2" />
          <MenuItem title="Item 3" key="3" />
        </Menu>
      </div>
    );

    return (
      <div style={{ height: '100%' }}>
        <div className="demo-nav-bar">
          <div
            className="demo-nav-bar-icon"
            onClick={() => {
              this.toggleOpen();
            }}
          >...</div>
          Basic
        </div>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight - 44 }}
          sidebar={sideBar}
          {...drawerProps}
        >
          <p className="demo-tip">Click upper-left corner icon<br />or swipe from left edge</p>
        </Drawer>
      </div>
    );
  }
}

export default DrawerDemo;
