/**
 * Dialog Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
window.FastClick && FastClick.attach(document.body);





// 渲染demo
var Demo = require('./DialogDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
