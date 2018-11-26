import React from 'react';
import { prefixClass } from '../Context';
import { PropContext } from './prop-context';

export default class Header extends React.Component {
    render() {
        return (
            <div className={prefixClass('carder-header')}>{this.props.children}</div>
        )
    }
}

Header.contextType = PropContext