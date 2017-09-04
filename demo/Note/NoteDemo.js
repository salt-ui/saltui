/**
 * Note Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const classnames = require('classnames');
const Context = require('salt-context');

const Note = require('salt-note');

// build之后, 测试一下下面一行, 把上面一行注释掉
//const Note = require('../../dist');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClose() {
        console.log('查看详情');
    }

    render() {
        return (
            <div>
                <Note message='当前年假余额10天' type='warning' onClose={this.handleClose.bind(this)} closeText='查看详情'/>
                <Note message='当前年假余额10天' type='warning' onClose={this.handleClose.bind(this)} closeText=''/>
                <Note message='当前年假余额10天' type='message' onClose={this.handleClose.bind(this)} closeText=''/>
                <Note closable={true} message='当前年假余额10天' type='warning' closeText=''/>
                <Note closable={true} message='当前年假余额10天' type='message' closeText=''/>
                <Note closable={true} message='当前年假余额10天' type='warning' closeText='关闭'/>
            </div>
        );
    }
};

module.exports = Demo;
