/**
 * Layer Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Layer from 'salt-layer';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handleClick(e) {
    const id = e.target.getAttribute('data-id');
    e.stopPropagation();
    this.setState({
      index: id,
    });
  }

  render() {
    const index = this.state.index;
    return (
      <div className="demo">
        <div className="demoItem" onClick={(e) => { this.handleClick(e); }} >
          <b data-id="1">↖</b>
          <b data-id="2" >↑</b>
          <b data-id="3">↗</b><br />
          <b data-id="4">←</b>
          <b data-id="5">・</b>
          <b data-id="6">→</b><br />
          <b data-id="7">↙</b>
          <b data-id="8">↓</b>
          <b data-id="9">↘</b><br />
        </div>
        <Layer top="0" left="0" visible={index == 1} zIndex={888} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: 100, backgroundColor: '#fff' }} className="t-FBV">
            <img
              src="http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/tingle-ui/tingle-layer/96fc6e8c9db3a94a7d150fa551587782/image.png"
              style={{ width: 100, height: 80 }}
            />
            <span>I am Left Top</span>
          </div>
        </Layer>
        <Layer top="0" visible={index == 2} onClick={(e) => { this.handleClick(e); }} zIndex={100} maskCloseable>
          <div style={{ height: 100, backgroundColor: 'red' }} />
        </Layer>
        <Layer width="auto" top="0" right="0" visible={index == 3} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        </Layer>
        <Layer width="auto" left="0" height="100%" visible={index == 4} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: '100%', backgroundColor: 'red' }} />
        </Layer>
        <Layer width="auto" visible={index == 5} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        </Layer>
        <Layer width="auto" right="0" height="100%" visible={index == 6} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: '100%', backgroundColor: 'red' }} />
        </Layer>
        <Layer width="auto" bottom="0" left="0" visible={index == 7} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        </Layer>
        <Layer bottom="0" visible={index == 8} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ height: 100, backgroundColor: 'red' }} />
        </Layer>
        <Layer width="auto" bottom="0" right="0" visible={index == 9} onClick={(e) => { this.handleClick(e); }} maskCloseable>
          <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        </Layer>
      </div>
    );
  }
}

export default Demo;
