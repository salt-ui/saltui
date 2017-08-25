/**
 * Popup Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Button from '@ali/tingle-button';
import Popup from '../../src';

class PopupDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: 1,
    };
  }

  getContent() {
    const content = (
      <div className="demo-popup-container-2">
        <input
          value={this.state.keyword}
          onChange={(e) => {
            this.setState({ keyword: e.target.value }, () => {
              this.instance.update(this.getContent());
            });
          }}
        />
      </div>
    );
    return content;
  }

  render() {
    return (
      <div>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
            animationType: 'slide-up',
          });
        }}
        >默认向上划出</Button>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
            animationType: 'slide-down',
          });
        }}
        >向下划出</Button>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
            animationType: 'slide-right',
          });
        }}
        >向右划出</Button>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
            animationType: 'slide-left',
          });
        }}
        >向左划出</Button>
        <Button onClick={() => {
          Popup.show(
            <div className="demo-popup-container-2">
              <div onClick={() => {
                Popup.hide();
              }}
              >点我关闭 popup</div>
            </div>, {
              maskClosable: false,
            });
        }}
        >手动控制关闭 Popup</Button>
        <Button onClick={() => {
          this.instance = Popup.show(
            this.getContent()
            , {});
        }}
        >测试内部数据透传</Button>
      </div>
    );
  }
}

export default PopupDemo;
