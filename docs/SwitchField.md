
## Simple Usage

```jsx
class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            on: true,
            on1: false,
            on2: true,
            on3: false
        }
    }

    handleChange(key,value) {
        this.setState({
            [key]: value
        })
    }

    render() {
        return (
            <div>
                <Group.List title="开关控件">
                    <SwitchField label="默认选中" on={this.state.on} onChange={this.handleChange.bind(this,'on')}/>
                    <SwitchField label="默认没选中" on={this.state.on1} onChange={this.handleChange.bind(this,'on1')}/>
                    <SwitchField label="不可选" on={this.state.on2} readOnly={true} onChange={this.handleChange.bind(this,'on2')}/>
                    <SwitchField label="不可选" on={this.state.on3} readOnly={true} onChange={this.handleChange.bind(this,'on3')}/>
                </Group.List>
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
<SwitchField className="customClass" />

```

### label

描述：field 中自定义的内容简述

类型：`String`

默认：`''`

必须：否


### on

描述：当前开关的状态

类型：`Boolean`

默认：`true`

必选：是


### onChange

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
        return <SwitchField label="不可选" on={this.state.on3} readOnly={true} onChange={this.handleChange.bind(this,'on3')}/>
    }

```
