/**
 * Style Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import 'salt-context';
// import Demo from './StyleDemo';
// import Demo from './Reset';
// import Demo from './Flexbox';
import Demo from './VarsDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
