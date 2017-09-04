/**
 * DatetimeField Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import 'salt-context';
import ReactDOM from 'react-dom';

const Demo = require('./DatetimeFieldDemo');

if (window.FastClick) {
  window.FastClick.attach(document.body);
}
// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
