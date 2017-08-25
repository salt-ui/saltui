/**
 * Group.Head Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');

let Head = (props) => {
    return (
        <div className={classnames(Context.prefixClass('group-head'), {
            [props.className]: !!props.className
        })}>{props.children}</div>
    );
};

Head.displayName = 'Group.Head';

Head.propTypes = {
    className: React.PropTypes.string
};

Head.defaultProps = {};

module.exports = Head;