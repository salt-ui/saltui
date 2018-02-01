

密码输入框

## Simple Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { PasswordInput } from 'saltui';

class Demo extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
          value: '',
        };
    }

    handleChange(value) {
        this.setState({
            value: value,
        });
    }

    render() {
        return (
            <PasswordInput
                placeholder="请输入密码"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('SaltDemo'));

```

## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### placeholder

描述：水印提示

类型：String

默认：''

必填：否

#### value

描述：输入框的值

类型：String

默认：''

必填：是

#### decrypted

描述：输入框中处于加密状态

类型：Boolean

默认：true

必填：否

#### hideIcon

描述：是否隐藏前面的锁图标

类型：Boolean

默认：false

必填：否

#### onFocus

描述：获取焦点时的回调，第一个参数是当前值，第二个参数是e

类型：Function

默认：Context.noop

必填：否

#### onBlur

描述：失去焦点时的回调，第一个参数是当前值，第二个参数是e

类型：Function

默认：Context.noop

#### onChange

描述：输入框的值改变时的回调，第一个参数是当前值，第二个参数是e

类型：Function

默认：Context.noop

必填：否

#### onDecryptedChange

描述：输入框加密状态切换时的回调，第一个参数是切换后的状态（Boolean），第二个参数是e

类型：Function

默认：Context.noop
