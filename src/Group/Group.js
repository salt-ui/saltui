/**
 * Group Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import Head from './Head';
import List from './List';

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

export default Group;
