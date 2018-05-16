/**
* Dialog Component Demo for tingle
* @author minjie
*
* Copyright 2014-2015, Tingle Team, Alinw.
* All rights reserved.
*/

import React from 'react';

import Button from 'salt-button';
import Dialog from 'salt-dialog';
class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: true,
      showConfirm: false,
      showMultiBtns: false,
      showMultiBtnsVertical: false,
      showTransBg: false,
      showNoPadding: false,
      text: '测试文本',
    };
  }

  handleAlert() {
    Dialog.alert({
      title: '测试',
      content: '我是 Dialog.alert 的调用',
      onConfirm() {
        console.log('alert confirm');
      },
    });
  }

  handleTitle() {
    Dialog.alert({
      content: '我是测试内容我是测试内容',
      onConfirm() {
        console.log('no title confirm');
      },
    });
  }

  handleMultiLines() {
    Dialog.alert({
      title: '提示',
      content: '同学，你赢了！同学，你赢了！同学，你赢了！同学，你赢了！同学，你赢了！',
      onConfirm() {
        console.log('multi lines confirm');
      },
    });
  }

  handleConfirm() {
    Dialog.confirm({
      title: '测试',
      locale: 'en_US',
      content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
      onConfirm() {
        console.log('confirm confirm');
      },
      onCancel() {
        console.log('confirm cancel');
      },
    });
  }

  handleShow(stateProps, show) {
    this.setState({
      [stateProps]: show,
    });
  }

  render() {
    const t = this;

    return (
      <div className="demoWrap">

        <Button key="aler" className="demo" onClick={this.handleAlert.bind(this)}>Alert</Button>

        <Button key="confirm" className="demo" onClick={this.handleConfirm.bind(this)}>Confirm</Button>

        <Button key="notitle" className="demo" onClick={this.handleTitle.bind(this)}>No title</Button>

        <Button key="multi line" className="demo" onClick={this.handleMultiLines.bind(this)}>Multi lines</Button>

        <Button key="show-alert" className="demo" onClick={this.handleShow.bind(this, 'showAlert', true)}>Use show prop Alert</Button>

        <Button key="show-confirm" className="demo" onClick={this.handleShow.bind(this, 'showConfirm', true)}>Use show prop Confirm</Button>

        <Button key="show-multi-btn" className="demo" onClick={this.handleShow.bind(this, 'showMultiBtns', true)}>Multi Horizontal Btns</Button>

        <Button key="show-multi-btn-vertical" className="demo" onClick={this.handleShow.bind(this, 'showMultiBtnsVertical', true)}>Multi Vertical Btns</Button>

        <Button key="show-trans" className="demo" onClick={this.handleShow.bind(this, 'showTransBg', true)}>showTransBg</Button>

        <Button key="no-padding" className="demo" onClick={this.handleShow.bind(this, 'showNoPadding', true)}>showNoPadding</Button>

        <Dialog
          key="d-alert"
          title="2.0版本上线啦"
          show={this.state.showAlert}
          onConfirm={() => { console.log('Use show props Alert confirm'); this.handleShow('showAlert', false); }}
        >
          <div>
            <p>我们来自阿里巴巴信息平台事业部用户体验平台，我们的日常是支持集团200+系统／产品的迭代与升级。</p>
            <p>面对200+复杂的产品／系统，我们先进行了调研，其中有鲜活的门户页面也有逻辑复杂的后台页面，更不乏诸多工具类的系统界面。然后，我们记录了每一条业务线上产品的特性，最终提炼出 “通用” “高效” “亲切” 三个关键词，它将指导基础规范的落地和成为我们后续不断迭代的一份指南。</p>
          </div>
        </Dialog>

        <Dialog
          key="d-confirm"
          title="Absolute Confirm"
          show={this.state.showConfirm}
          type="confirm"
          onConfirm={() => { console.log('confirm confirm'); this.handleShow('showConfirm', false); }}
          onCancel={() => { console.log('cancel confirm'); this.handleShow('showConfirm', false); }}
        >
          {/* <textarea value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />*/}
          <h3>{this.state.text}</h3>
        </Dialog>

        <Dialog
          key="d-no-padding"
          show={this.state.showNoPadding}
          type="confirm"
          className="t-dialog-no-padding"
          onConfirm={() => { console.log('confirm'); this.handleShow('showNoPadding', false); }}
          onCancel={() => { console.log('cancel'); this.handleShow('showNoPadding', false); }}
        >
          <div style={{ fontSize: 0, lineHeight: 0 }}>
            <img
              src="https://img.alicdn.com/tfs/TB1auCSSXXXXXaJXXXXXXXXXXXX-295-374.png"
              alt="pic"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </div>
        </Dialog>
        <Dialog
          show={this.state.showMultiBtns}
          title="多按钮title"
          btnDir="horizontal"
          buttons={[
            {
              content: '按钮1',
              callback: () => { console.log('click btn1'); this.handleShow('showMultiBtns', false); },

            },
            {
              content: '按钮2',
              callback: () => {
                console.log('click btn2');
                this.handleShow('showMultiBtns', false);
              },
            },
            {
              content: '按钮3',
              callback: () => {
                console.log('click btn3');
                this.handleShow('showMultiBtns', false);
              },
              // 设置 primary 展示为主要按钮样式(文本为品牌色)
              primary: true,
            },
          ]}
        >
          这是一个多水平按钮的弹窗
                    自定 buttons 和 btnDir 设置为 `horizontal`
        </Dialog>

        <Dialog
          key="d-multi-btns-horizontal"
          title="Multi Btns"
          content={<div>Content Content Content</div>}
          show={this.state.showMultiBtnsVertical}
          onConfirm={() => { this.setState({ showMultiBtns: false }); }}
          onCancel={() => { this.setState({ showMultiBtns: false }); }}
          buttons={[
            {
              content: '按钮1',
              primary: true,
              callback: () => { this.handleShow('showMultiBtnsVertical', false); console.log('click btn 1'); },
            },
            {
              content: '按钮2',
              primary: false,
              callback: () => { this.handleShow('showMultiBtnsVertical', false); console.log('click btn 2'); },
            },
            {
              content: '按钮3',
              primaty: false,
              callback: () => { this.handleShow('showMultiBtnsVertical', false); console.log('click btn 3'); },
            },
          ]}
        />

        <Dialog
          content={<img style={{ width: '100%' }} src="https://img.alicdn.com/tfs/TB1YhbHQpXXXXcNapXXXXXXXXXX-546-506.png" alt="图片" />}
          show={this.state.showTransBg}
          transparentMode
          onConfirm={() => { this.handleShow('showTransBg', false); console.log('transparent confirm'); }}
        />

      </div>
    );
  }
}
export default Demo;
