/**
 * RadioField Component Demo for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
window.FastClick && FastClick.attach(document.body);

// 渲染demo
var Demo = require('./RadioFieldDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
