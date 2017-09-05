/**
 * Button Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '@ali/tingle-context';
import IconSymbols from './svg/tingle-icon-symbols.svg';
import Demo from './ButtonDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 插入svg
ReactDOM.render(<IconSymbols />, document.getElementById('TingleIconSymbols'));

// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
