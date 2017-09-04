/**
 * Button Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import './ButtonDemo.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import 'salt-context';

import Demo from './ButtonDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}


// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
