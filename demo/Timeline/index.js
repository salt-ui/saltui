/**
 * Timeline Component Demo for tingle
 * @author zhongsisi
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
import './TimelineDemo.styl';
window.FastClick && FastClick.attach(document.body);

// 插入通用svg
require('salt-icon-source');

// 插入私有svg



// 渲染demo
var Demo = require('./TimelineDemo');
export default Demo;
