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
      docked: false,
    };
  }

  onOpenChange = (open, from) => {
    console.log(open, from);
    this.setState({ docked: open });
  }

  toggleOpen = () => {
    this.setState({ docked: !this.state.docked });
  }

  render() {
    const drawerProps = {
      docked: this.state.docked,
      onOpenChange: this.onOpenChange,
      enableDragHandle: false
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
          Dock in Document
        </div>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight - 44 }}
          sidebar={sideBar}
          {...drawerProps}
        >
          <div
            style={{ width: document.documentElement.clientWidth }}
          >
            <p className="demo-tip">Click upper-left corner icon</p>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default DrawerDemo;
