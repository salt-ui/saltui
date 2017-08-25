/**
 * Group Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');
const Head = require('./Head');
const List = require('./List');

let Group = (props) => {
    return (
        <div className={classnames(Context.prefixClass('group'), {
            [props.className]: !!props.className
        })}>{props.children}</div>
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
