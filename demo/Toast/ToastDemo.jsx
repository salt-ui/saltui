/**
 * Tip Component Demo for tingle
 * @author minjie
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Button from 'salt-button';
import Toast from 'salt-toast';

const showToast = (options) => {
  Toast.show(options);
};

const showLoadingToast = () => {
  Toast.show({
    type: 'loading',
    content: '加载中...',
  });
};

class Demo extends React.Component {
  render() {
    return (<div className="demoWrap">
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'success',
            content: '提交成功你好',
            onDidHide: () => {
              console.log('hide');
            },
          });
        }}
      >success
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'success',
            content: '提交成功你好好',
          });
        }}
      >has icon overLength
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'error',
            content: '提交出错',
          });
        }}
      >error
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'fail',
            content: '网络连接失败',
          });
        }}
      >fail
      </Button>
      <Button
        className="demo"
        onClick={() => { showLoadingToast(); }}
      >loading
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            content: '你好听狗',
          });
        }}
      >text only
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            content: '字字字字字字字字字字字字字字字',
          });
        }}
      >long text
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            content: '字字字字字字字字字字字字字字字字',
          });
        }}
      >long text overLentgh
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'success',
            content: '带遮罩层',
            hasMask: true,
            autoHide: false,
            duration: 2000,
          });
          setTimeout(() => {
            Toast.hide(() => {
              console.log(888);
            });
          }, 10000);
        }}
      >with mask
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'light',
            content: '这是一句轻提示这是一句轻提示好',
            onDidHide: () => {
              console.log('hide');
            },
          });
        }}
      >light toast
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'light',
            content: '这是一句轻提示这是一句轻提示好吗',
            onDidHide: () => {
              console.log('hide');
            },
          });
        }}
      >light toast overLength
      </Button>
      <Button
        className="demo"
        onClick={() => {
          showToast({
            type: 'light',
            transitionName: 'fix-bottom',
            content: '这是一句轻提示这是一句轻提示好',
            onDidHide: () => {
              console.log('hide');
            },
          });
        }}
      >light toast fix-bottom
      </Button>
            </div>);
  }
}

export default Demo;
