/**
 * OnOff Component Demo for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import Switch from 'salt-switch';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on1: false,
      on2: true,
      on3: false,
      on4: true,
    };
  }

  handleChange(from, on) {
    this.setState({
      [from]: on,
    });
  }

  render() {
    return (
      <div className="demo">
        <div className="demo-item"><label className="label-txt">开关-off</label><Switch on={this.state.on1} onChange={this.handleChange.bind(this, 'on1')} /></div>
        <div className="demo-item"><label className="label-txt">开关-on</label><Switch on={this.state.on2} onChange={this.handleChange.bind(this, 'on2')} /></div>
        <div className="demo-item"><label className="label-txt">开关-disable-off</label><Switch on={this.state.on3} readOnly onChange={this.handleChange.bind(this, 'on3')} /></div>
        <div className="demo-item"><label className="label-txt">开关-disable-on</label><Switch on={this.state.on4} readOnly onChange={this.handleChange.bind(this, 'on4')} /></div>
      </div>
    );
  }
}

export default Demo;
