

#

<img src="https://img.alicdn.com/tps/TB1dJjWJpXXXXazXFXXXXXXXXXX-750-1254.png" width="375"/>

## Simple Usage

```js
class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      on1: true,
      on2: false,
      on3: false
    }
  }

  handleChange(form, on) {
    this.setState({
      [form]: on
    });
  }

  render() {
    return (
      <div>
        <Switch on={this.state.on1} onChange={this.handleChange.bind(this, "on1")}/>
        <Switch on={this.state.on2} onChange={this.handleChange.bind(this, "on2")}/>
        <Switch on={this.state.on3} readOnly={true} onChange={this.handleChange.bind(this, "on3")}/>
      </div>
    );
  }
}
```

## Props

### className

描述：自定义样式`class`名称。

类型：`String`

默认：`''`

必选：否

示例：

```js
<Switch className="customClass" />

```

### on

描述：当前开关的状态

类型：`Boolean`

默认：`true`

必选：是

示例：

```js
<Switch className="customClass" on={true} />

```

### readOnly

描述：当前开关是否只读

类型：`Boolean`

默认：`false`

必选：否

示例：

```js
<Switch on={this.state.on3} readOnly={true} />

```

### onChange(on,e)

描述：当前开关的change事件处理函数

类型：`Function`

必选：是

参数： on 当前返回的开关状态

参数：e  The `SyntheticEvent` object

示例：

```js

  handleChange(form, on) {
    this.setState({
      [form]: on
    });
  }
  render (){
    return <Switch on={this.state.on2} onChange={this.handleChange.bind(this, "on2")}/>
  }

```

