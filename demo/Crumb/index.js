/**
 * Crumb Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
import './CrumbDemo.styl';
window.FastClick && FastClick.attach(document.body);

// 插入通用svg
require('salt-icon-source');

// 插入私有svg



// 渲染demo
var Demo = require('./CrumbDemo');
export default Demo;
