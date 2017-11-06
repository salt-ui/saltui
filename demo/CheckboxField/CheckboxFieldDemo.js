/**
 * CheckboxField Component Demo for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import Group from 'salt-group';

import CheckboxField from 'salt-checkbox-field';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const CheckboxField = require('../../dist');


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCheckboxFieldProps() {
    return {
      data: [
        {
          checked: false,
          text: (
            <table className="demoTable">
              <tbody>
                <tr>
                  <td className="avatar-td">
                    <img
                      role="presentation"
                      className="avatar"
                      src="https://img.alicdn.com/tps/TB1vZnyJFXXXXX5XpXXXXXXXXXX-32-32.png"
                    />
                  </td>
                  <td className="info-td">
                    <div className="name">周姮</div>
                    <div className="postName">资深交互设计师</div>
                  </td>
                </tr>
              </tbody>
            </table>),
          disable: false,
          value: '1',
          slotText: '周姮',
        }, {
          checked: false,
          text: (
            <table className="demoTable">
              <tbody>
                <tr>
                  <td className="avatar-td">
                    <img
                      role="presentation"
                      className="avatar"
                      src="https://img.alicdn.com/tps/TB1CmDsJFXXXXcxXpXXXXXXXXXX-32-32.png"
                    />
                  </td>
                  <td className="info-td">
                    <div className="name">李伟（孟则）</div>
                    <div className="postName">资深交互设计师</div>
                  </td>
                </tr>
              </tbody>
            </table>
          ),
          disable: true,
          value: '2',
          slotText: '李伟（孟则）',
        },
        {
          checked: true,
          text: '刘艳芬',
          disable: true,
          value: '3',
        },
        {
          checked: false,
          text: '邓丽娲',
          disable: false,
          value: '4',
        },
      ],
      readOnly: false,
      placeholder: '请选择',
      maskCloseable: true,
      groupListFlag: true,
      onChange(data) {
        console.log(data);
      },
      /* groupListArgument: {
          lineIndent: 25,
          itemIndent: 45
      },*/
      label: '多选（list模式）',
      mode: 'list',
      required: true,
      tip: <div>这里是提示信息</div>,
      // iconPosition: 'right',
    };
  }

  render() {
    const CheckboxFieldProps = this.getCheckboxFieldProps();
    return (
      <div className="checkbox-field-demo">
        <Group className="checkbox-field-demo-group">
          <Group.List><CheckboxField {...CheckboxFieldProps} /></Group.List>
        </Group>
        <Group className="checkbox-field-demo-group">
          <Group.List>
            <CheckboxField {...CheckboxFieldProps} iconPosition="right" />
          </Group.List>
        </Group>
        <Group className="checkbox-field-demo-group">
          <Group.List>
            <CheckboxField
              {...CheckboxFieldProps}
              mode="slot"
              label="多选（slot）"
              required={false}
            />
          </Group.List>
        </Group>
      </div>

    );
  }
}

export default Demo;
