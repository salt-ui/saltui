/**
 * Popup Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Button from 'salt-button';
import Popup from 'salt-popup';

class PopupDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: 1,
      visible: false,
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
        >默认向上划出
        </Button>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
            animationType: 'slide-down',
          });
        }}
        >向下划出
        </Button>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
            animationType: 'slide-right',
          });
        }}
        >向右划出
        </Button>
        <Button onClick={() => {
          Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
            animationType: 'slide-left',
          });
        }}
        >向左划出
        </Button>
        <Button onClick={() => {
          Popup.show(
            (
              <div className="demo-popup-container-2">
                <div onClick={() => {
                  Popup.hide();
                }}
                >点我关闭 popup
                </div>
              </div>
            ), {
              maskClosable: false,
            },
          );
        }}
        >手动控制关闭 Popup
        </Button>
        <Button onClick={() => {
          this.instance = Popup.show(
            this.getContent()
            , {},
          );
        }}
        >测试内部数据透传
        </Button>
        <Popup
          content={
            <div>
              <input
                value={this.state.keyword}
                onChange={(e) => { this.setState({ keyword: e.target.value }); }}
              />
              <Button onClick={() => { this.setState({ visible: false }); }}>关闭 Popup</Button>
            </div>
          }
          animationType="slide-down"
          onMaskClick={() => { this.setState({ visible: false }); }}
          visible={this.state.visible}
        >
          {null}
        </Popup>
        <Button onClick={() => { this.setState({ visible: true }); }}>手动控制 Visible</Button>
      </div>
    );
  }
}

export default PopupDemo;
