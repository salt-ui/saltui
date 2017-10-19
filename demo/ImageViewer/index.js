/**
 * ImageViewer Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
import './ImageViewerDemo.styl';
window.FastClick && FastClick.attach(document.body);

// 渲染demo
var Demo = require('./ImageViewerDemo');
export default Demo;
