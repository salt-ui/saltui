'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Head = require('./Head');

var _Head2 = _interopRequireDefault(_Head);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Group Component for tingle
                                                                                                                                                                                                                   * @author gnosaij
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                   */


var Group = function Group(props) {
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)(_Context2.default.prefixClass('group'), _defineProperty({}, props.className, !!props.className)) },
        props.children
    );
};

Group.displayName = 'Group';

Group.propTypes = {
    className: _react2.default.PropTypes.string
};

Group.defaultProps = {};

Group.Head = _Head2.default;
Group.List = _List2.default;

exports.default = Group;
module.exports = exports['default'];