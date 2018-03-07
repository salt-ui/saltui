/**
 * RadioField Component Demo for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Group from 'salt-group';
import RadioField from 'salt-radio-field';

class Demo extends React.Component {
  render() {
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
                  <td className="avatar-td"><img alt="" className="avatar" src="https://img.alicdn.com/tps/TB1vZnyJFXXXXX5XpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">周姮</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: false,
          label: '周姮',
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
                  <td className="avatar-td"><img alt="" className="avatar" src="https://img.alicdn.com/tps/TB1CmDsJFXXXXcxXpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">李伟（孟则）</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: false,
          label: '李伟（孟则）',
        },
        {
          value: 'plain',
          content: '纯文本条目不需要指定 label',
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
                  <td className="avatar-td"><img alt="" className="avatar" src="https://img.alicdn.com/tps/TB1vZnyJFXXXXX5XpXXXXXXXXXX-32-32.png" /></td>
                  <td className="info-td"><div className="name">周姮</div><div className="postName">资深交互设计师</div></td>
                </tr>
              </tbody>
            </table>
          ),
          disable: true,
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
                  <td className="avatar-td"><img alt="" className="avatar" src="https://img.alicdn.com/tps/TB1CmDsJFXXXXcxXpXXXXXXXXXX-32-32.png" /></td>
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
        <Group>
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">popup 显示</Group.Head>
          <Group.List>
            <RadioField {...radioFieldProps1} mode="popup" label="复选" />
            <RadioField {...radioFieldProps2} iconPosition="right" label="单选（图标在右）" />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
