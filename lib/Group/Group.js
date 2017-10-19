'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Group Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');
var Head = require('./Head');
var List = require('./List');

var Group = function Group(props) {
    return React.createElement(
        'div',
        { className: classnames(Context.prefixClass('group'), _defineProperty({}, props.className, !!props.className)) },
        props.children
    );
};

Group.displayName = 'Group';

Group.propTypes = {
    className: React.PropTypes.string
};

Group.defaultProps = {};

Group.Head = Head;
Group.List = List;

module.exports = Group;