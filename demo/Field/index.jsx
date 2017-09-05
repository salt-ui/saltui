/**
 * Field Component Demo for tingle
 * @author jiasong.js
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import '@ali/tingle-context';
import ReactDOM from 'react-dom';
import React from 'react';

import Demo from './FieldDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
