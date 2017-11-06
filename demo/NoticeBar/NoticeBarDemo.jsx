/**
 * NoticeBar Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import NoticeBar from 'salt-notice-bar';

class NoticeBarDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  handleClose() {
    console.log(1);
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    const t = this;
    return (
      <div>
        <div className="notice-div">
          <NoticeBar
            className="noticeMessage"
            message={'这是一个message这是这是这是这是这是这是这是这是这是这是'}
            type="info"
            visible={this.state.visible}
            optionsType={'close'}
            onClose={() => {
              t.handleClose();
            }}

          /></div>
        <div className="notice-div">
          <NoticeBar
            className="noticeMessage"
            message={'这是一个message'}
            type="success"
            optionsType={'jumpto'}
            onClick={() => {
              console.log('1');
            }}
          />
        </div>
        <div className="notice-div"><NoticeBar className="noticeMessage" message={'这是一个message'} type="error" /></div>
        <div className="notice-div"><NoticeBar className="noticeMessage" message={'这是一个message'} closable={false} type="warning" /></div>
        <div
          className="notice-div"
          onClick={() => {
            t.handleClose();
          }}
        >
          toggle
        </div>
      </div>
    );
  }
}

export default NoticeBarDemo;
