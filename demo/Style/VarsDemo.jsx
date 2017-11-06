/**
 * Style Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>主题色</h2>
        <div className="demo-item">
          <div className="color B1">B1</div>
          <div className="color B3">B3</div>
          <div className="color B1-3">B1-3</div>
          <div className="color B1-6">B1-6</div>
          <div className="color B1-7">B1-7</div>
          <div className="color B1-8">B1-8</div>
        </div>
        <h2>中立色</h2>
        <div>
          <div className="color N-2">N-2</div>
          <div className="color N-3">N-3</div>
          <div className="color N-4">N-4</div>
          <div className="color N-5">N-5</div>
          <div className="color N-6">N-6</div>
          <div className="color N-7">N-7</div>
          <div className="color N-8">N-8</div>
          <div className="color N-9">N-9</div>
        </div>
        <h2>黑色</h2>
        <div>
          <div className="color D-1">D-1</div>
          <div className="color D-2">D-2</div>
          <div className="color D-3">D-3</div>
          <div className="color D-4">D-4</div>
          <div className="color D-5">D-5</div>
          <div className="color D-6">D-6</div>
        </div>
        <h2>白色</h2>
        <div style={{ background: '#2C2F33', padding: '10px 0' }}>
          <div className="color W-2">W-2</div>
          <div className="color W-3">W-3</div>
          <div className="color W-4">W-4</div>
          <div className="color W-5">W-5</div>
          <div className="color W-6">W-6</div>
          <div className="color W-7">W-7</div>
        </div>
        <h2>功能色</h2>
        <div>
          <div className="color F1-1">F1-1</div>
          <div className="color F1-1-2">F112</div>
          <div className="color F1-1-8">F118</div>
          <div className="color F1-2">F1-2</div>
          <div className="color F2-1">F2-1</div>
          <div className="color F2-1-2">F212</div>
          <div className="color F3-1">F3-1</div>
          <div className="color F3-1-2">F312</div>
          <div className="color F4-1">F4-1</div>
          <div className="color F4-1-2">F412</div>
          <div className="color F4-2">F4-2</div>
          <div className="color F5-1">F5-1</div>
          <div className="color F5-2">F5-2</div>
        </div>
        <h2>圆角</h2>
        <div>
          <div className="radius R1">4px</div>
          <div className="radius R2">8px</div>
        </div>
        <h2>阴影</h2>
        <div>
          <div className="shadow S1">S1</div>
          <div className="shadow S2">S2</div>
          <div className="shadow S3">S3</div>
        </div>
      </div>
    );
  }
}

export default Reset;
