/**
 * Toast Component Demo for tingle
 * @author minjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
import './ToastDemo.styl';
window.FastClick && FastClick.attach(document.body);

// 渲染demo
var Demo = require('./ToastDemo');
export default Demo;
