'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Group.Head Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');

var Head = function Head(props) {
    return React.createElement(
        'div',
        { className: classnames(Context.prefixClass('group-head'), _defineProperty({}, props.className, !!props.className)) },
        props.children
    );
};

Head.displayName = 'Group.Head';

Head.propTypes = {
    className: React.PropTypes.string
};

Head.defaultProps = {};

module.exports = Head;