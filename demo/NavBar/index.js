/**
 * NavBar Component Demo for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('@ali/tingle-context');
window.FastClick && FastClick.attach(document.body);

// 渲染demo
var Demo = require('./NavBarDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
