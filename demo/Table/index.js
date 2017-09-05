/**
 * Table Component Demo for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('@ali/tingle-context');
window.FastClick && FastClick.attach(document.body);

// 渲染demo
var Demo = require('./TableDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
