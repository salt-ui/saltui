/**
 * IconSource Component for tingle
 * @author fushan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const ReactDOM = require('react-dom');
var IconSource = require('./svg/tingle-icon-symbols.svg');

let WRAPPER_ID = '__TingleIconSymbols__';
let doc = document;
let wrapper = doc.getElementById(WRAPPER_ID);
if (!wrapper) {
    wrapper = doc.createElement('div');
    wrapper.id = WRAPPER_ID;
    wrapper.style.display = 'none';
    doc.body.appendChild(wrapper);
    ReactDOM.render(<IconSource/>, wrapper);
}

module.exports = IconSource;
