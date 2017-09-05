/**
 * PhotoField Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import '@ali/tingle-context';
import ReactDOM from 'react-dom';
import React from 'react';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
const Demo = require('./PhotoFieldDemo');

ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
