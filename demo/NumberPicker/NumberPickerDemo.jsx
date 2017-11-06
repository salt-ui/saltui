/**
 * NumberPicker Component Demo for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import NumberPicker from 'salt-number-picker';

class NumberPickerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '2',
      a: 4,
      b: 1,
      c: 2,
      d: 2,
      e: 2,
      f: 2,
      g: 2,
      h: 2,
      i: 2,
    };
  }

  handleChange(name, value) {
    const t = this;
    t.setState({
      [name]: value,
    });
  }
  render() {
    const t = this;
    return (
      <div>
        <div className="tip">可编辑</div>
        <div className="line">默认样式 <NumberPicker value={t.state.a} max={4} step={1} onChange={t.handleChange.bind(t, 'a')} /></div>
        <div className="line">禁用样式单个 <NumberPicker value={t.state.b} max={5} min={2} step={1} onChange={t.handleChange.bind(t, 'b')} /></div>
        <div className="line">禁用样式单个 <NumberPicker value={t.state.c} max={2} step={1} onChange={t.handleChange.bind(t, 'c')} /></div>
        <div className="line">全部禁用<NumberPicker value={t.state.count} max={4} step={1} disabled /></div>
        <div className="tip">不可编辑(按钮不可操作)</div>
        <div className="line">默认样式 <NumberPicker value={t.state.e} max={4} step={1} readOnly onChange={t.handleChange.bind(t, 'e')} /></div>
        <div className="line">禁用样式单个 <NumberPicker value={t.state.f} max={5} min={2} step={1} readOnly onChange={t.handleChange.bind(t, 'f')} /></div>
        <div className="line">禁用样式单个 <NumberPicker value={t.state.g} max={2} step={1} readOnly onChange={t.handleChange.bind(t, 'g')} /></div>
        <div className="line">全部禁用<NumberPicker value={t.state.h} max={5} step={4} readOnly disabled onChange={t.handleChange.bind(t, 'h')} /></div>
        <div className="tip">步长为小数</div>
        <div className="line">默认样式 <NumberPicker value={t.state.i} max={3} step={0.1} min={0} onChange={t.handleChange.bind(t, 'i')} /></div>
      </div>
    );
  }
}

export default NumberPickerDemo;
