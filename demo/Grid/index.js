/**
 * Collection Component Demo for tingle
 * @author gnosaij, changming.zy
 *
 * Copyright 2014-2017, Tingle Team, Alinw.
 * All rights reserved.
 */
require('salt-context');
window.FastClick && FastClick.attach(document.body);





// 渲染demo
var Demo = require('./GridDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
