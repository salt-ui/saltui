/**
 * IconSource Component Demo for tingle
 * @author fushan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const Icon = require('salt-icon');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div>
            <Icon name="angle-down"/>
            <Icon name="angle-left"/>
            <Icon name="angle-right"/>
            <Icon name="angle-up"/>
            <Icon name="check"/>
            <Icon name="cross-round"/>
            <Icon name="cross"/>
            <Icon name="info-circle"/>
            <Icon name="info-round"/>
            <Icon name="map"/>
            <Icon name="minus-round"/>
            <Icon name="minus-circle"/>
            <Icon name="note-round"/>
            <Icon name="pen"/>
            <Icon name="photo"/>
            <Icon name="plus-circle"/>
            <Icon name="plus-round"/>
            <Icon name="plus"/>
            <Icon name="search"/>
            <Icon name="setting"/>
            <Icon name="star"/>
            <Icon name="time"/>
            <Icon name="user"/>
            <Icon name="check-round"/>
        </div>
    }
};

module.exports = Demo;
