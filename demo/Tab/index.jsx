/**
 * Tab Component Demo for tingle
 * @author zhangshun@alipay.com
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';
import ReactDOM from 'react-dom';
import React from 'react';
import Demo from './TabDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
