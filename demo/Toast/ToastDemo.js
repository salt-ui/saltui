/**
 * Tip Component Demo for tingle
 * @author minjie
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
/* eslint-disable */
const classnames = require('classnames');
const Button = require('salt-button');
const Toast = require('salt-toast');

class Demo extends React.Component {
    constructor(props) {
        super(props);
    }

    showLoadingToast() {
        Toast.show({
            type: 'loading',
            content: '加载中...',
        });

        setTimeout(function(){
            Toast.hide(function () {
                console.log(888);
            });
        }, 4000);
    }

    showToast(options) {
        Toast.show(options);
    }


    render() {
        return <div className="demoWrap">
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'success',
                content: '提交成功你好'
            })}>success</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'success',
                content: '提交成功你好好'
            })}>has icon overLength</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'error',
                content: '提交出错'
            })}>error</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'fail',
                content: '网络连接失败'
            })}>fail</Button>
            <Button className="demo" onClick={this.showLoadingToast.bind(this)}>loading</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                content: '你好听狗'
            })}>text only</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                content: '字字字字字字字字字字字字字字字'
            })}>long text</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                content: '字字字字字字字字字字字字字字字字'
            })}>long text overLentgh</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'success',
                content: '带遮罩层',
                hasMask: true,
                duration: 2000
            })}>with mask</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'light',
                content: '这是一句轻提示这是一句轻提示好',
                onDidHide: () => {
                    console.log('hide');
                }
            })}>light toast</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'light',
                content: '这是一句轻提示这是一句轻提示好吗',
                onDidHide: () => {
                    console.log('hide');
                }
            })}>light toast overLength</Button>
            <Button className="demo" onClick={this.showToast.bind(this, {
                type: 'light',
                transitionName: 'fix-bottom',
                content: '这是一句轻提示这是一句轻提示好',
                onDidHide: () => {
                    console.log('hide');
                }
            })}>light toast fix-bottom</Button>
        </div>
    }
};

module.exports = Demo;
