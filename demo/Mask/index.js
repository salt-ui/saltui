/**
 * Mask Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';
import React from 'react';
import ReactDOM from 'react-dom';

import Demo from './MaskDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
