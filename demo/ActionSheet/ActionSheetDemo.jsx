/**
 * ActionSheet Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Button from 'salt-button';
import ActionSheet from 'salt-action-sheet';
import Icon from 'salt-icon';


const iconStyle = {
  width: '40px',
  height: '40px',
  fill: 'rgba(31,56,88,.4)',
};

const iconList = [
  { icon: <img role="presentation" src="https://zos.alipayobjects.com/rmsportal/WmEzpOsElbbvgmrexFSH.png" />, title: '发送朋友' },
  { icon: <img role="presentation" src="https://zos.alipayobjects.com/rmsportal/HssPJKvrjEByyVWJIFwl.png" />, title: '新浪微博' },
  { icon: <img role="presentation" src="https://zos.alipayobjects.com/rmsportal/HCGowLrLFMFglxRAKjWd.png" />, title: '生活圈' },
  { icon: <img role="presentation" src="https://zos.alipayobjects.com/rmsportal/LeZNKxCTkLHDWsjFfqqn.png" />, title: '微信好友' },
  { icon: <img role="presentation" src="https://zos.alipayobjects.com/rmsportal/YHHFcpGxlvQIqCAvZdbw.png" />, title: 'QQ' },
  { icon: <Icon name="toast-loading" {...iconStyle} />, title: '刷新' },
  { icon: <Icon name="user" {...iconStyle} />, title: '很长很长很长很长的文字' },
];

class ActionSheetDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Button onClick={() => {
          window.instance = ActionSheet.show({
            options: ['操作一', '操作二', '操作三', '清空聊天记录'],
            destructiveButtonIndex: 3,
            title: '我是标题',
            message: '我是描述我是描述',
          }, (index) => {
            console.log(index);
          });
        }}
        >默认状态
        </Button>
        <Button onClick={() => {
          ActionSheet.showShare({
            options: iconList,
            title: '我是标题',
          }, (index) => {
            console.log(index);
          });
        }}
        >分享面板
        </Button>
        <Button onClick={() => {
          ActionSheet.showShare({
            options: [iconList, [iconList[5], iconList[6]]],
            message: '我是描述我是描述',
          }, (index, rowIndex) => {
            console.log(index, rowIndex);
          });
        }}
        >分享面板(双排)
        </Button>
      </div>
    );
  }
}

export default ActionSheetDemo;
