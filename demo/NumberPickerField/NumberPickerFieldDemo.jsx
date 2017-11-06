/**
 * NumberPickerField Component Demo for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import NumberPickerField from 'salt-number-picker-field';

class NumberPickerFieldDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      a: 1,
      b: 1,
      c: 1,
      d: 1,
      e: 1,
      f: 1,
      g: 1,
      h: 1,
      i: 1,
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
        <NumberPickerField label="普通样式" tip="普通样式" step={0.1} min={-5} value={t.state.a} onChange={t.handleChange.bind(t, 'a')} />
        <NumberPickerField label="单个禁用样式" step={1} min={-5} value={t.state.b} max={1} onChange={t.handleChange.bind(t, 'b')} />
        <NumberPickerField label="单个禁用样式" step={1} min={1} value={t.state.c} max={5} onChange={t.handleChange.bind(t, 'c')} />
        <NumberPickerField label="禁用样式" disabled step={1} min={-5} value={t.state.d} max={5} onChange={t.handleChange.bind(t, 'd')} />
        <div className="tip">不可编辑</div>
        <NumberPickerField label="普通样式" step={1} min={-5} value={t.state.e} max={5} readOnly onChange={t.handleChange.bind(t, 'e')} />
        <NumberPickerField label="单个禁用样式" tip="单个禁用样式" step={1} min={-5} value={t.state.f} max={1} readOnly onChange={t.handleChange.bind(t, 'f')} />
        <NumberPickerField label="单个禁用样式" step={1} min={1} value={t.state.g} max={5} readOnly onChange={t.handleChange.bind(t, 'g')} />
        <NumberPickerField label="禁用样式" disabled step={1} min={-5} value={t.state.h} max={5} readOnly onChange={t.handleChange.bind(t, 'h')} />
        <div className="tip">不显示label</div>
        <NumberPickerField step={0.1} min={-5} value={t.state.i} max={5} onChange={t.handleChange.bind(t, 'i')} />
      </div>
    );
  }
}

export default NumberPickerFieldDemo;
