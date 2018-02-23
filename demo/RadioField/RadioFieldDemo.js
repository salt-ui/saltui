/**
 * RadioField Component Demo for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import RadioField from 'salt-radio-field';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onMaskClick() {
    this.setState({
      visible: false,
    });
  }
  handleClick() {
    this.setState({
      visible: true,
    });
  }
  render() {
    const t = this;
    const radioFieldProps1 = {
      data: [
        {
          value: {
            name: '周姮',
            postName: '资深交互设计师',
          },
          checked: true,
          content: (
            <table className="demoTable">
              <tbody>
                <tr>
                  <td className="avatar-td"><img className="avatar" src="https://img.alicdn.com/tps/TB1vZnyJFXXXXX5XpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">周姮</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: false,
        },
        {
          value: {
            name: '李伟（孟则）',
            postName: '资深交互设计师',
          },
          checked: false,
          content: (
            <table className="demoTable">
              <tbody>
                <tr>
                  <td className="avatar-td"><img className="avatar" src="https://img.alicdn.com/tps/TB1CmDsJFXXXXcxXpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">李伟（孟则）</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: false,
        },
      ],
      onChange(value, index, data) {
        t.setState({
          visible: false,
        });
      },
      groupListArgument: {
        lineIndent: 15,
        itemIndent: 15,
      },
    };
    const radioFieldProps2 = {
      data: [
        {
          value: {
            name: '周姮',
            postName: '资深交互设计师',
          },
          checked: false,
          content: (
            <table className="demoTable">
              <tbody>
                <tr>
                  <td className="avatar-td"><img className="avatar" src="https://img.alicdn.com/tps/TB1vZnyJFXXXXX5XpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">周姮</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: false,
        },
        {
          value: {
            name: '李伟（孟则）',
            postName: '资深交互设计师',
          },
          checked: false,
          content: (
            <table className="demoTable">
              <tbody>
                <tr>
                  <td className="avatar-td"><img className="avatar" src="https://img.alicdn.com/tps/TB1CmDsJFXXXXcxXpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">李伟（孟则）</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: false,
        },
        {
          value: '1',
          checked: true,
          content: '我也好',
          disable: false,
        },
        {
          value: '2',
          checked: false,
          content: '大家都好大家都好大家都好大家都好大家都好大家都好',
          disable: false,
        },
      ],
      onChange(value, index, data) {
        console.log(value, index, data);
      },
      groupListArgument: {
        lineIndent: 15,
        itemIndent: 15,
      },
    };
    return (
      <div>
        <div
          style={{
 border: '1px', height: '40px', lineHeight: '40px', textAlign: 'center',
}}
          onClick={this.handleClick.bind(t)}
        >popup 显示
        </div>
        <RadioField {...radioFieldProps1} layoutType="popup" onMaskClick={this.onMaskClick.bind(this)} visible={this.state.visible} />
        <RadioField {...radioFieldProps2} iconPosition="right" label="单选（图标在右）" />
      </div>
    );
  }
}

export default Demo;
