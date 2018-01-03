

## 单行文本输入框

## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### value

描述：输入框的值

类型：String

默认：''

必填：是

#### label

描述：表单域label文字标签

类型：String

默认：''

必填：否

#### onChange

描述：当输入值时触发的回调，第一个参数是输入的新值，第二个参数是e

类型：Function

默认：Context.noop

必填：是

#### filter

描述：自定义的value过滤器，参数是用户输入的值，返回过滤后的值，默认不处理

类型：Function

默认：Context.noop

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

必填：否

#### placeholder

描述：水印提示

类型：String

默认：''

必填：否

#### readOnly

描述：设置是否是只读状态

类型：Boolean

默认：false

必填：否

#### layout

描述：label 布局,支持上下结构`v`和左右结构`h`,

类型：String

默认：'h'

必填：否

#### allowClear

描述：是否允许清空,

类型：Bool,

默认：true

必填：否


## Sub Component

### TextField.LeftAddon / TextField.RightAddon

```javascript
<TextField
    label="后缀" value={t.state.t1}
    onChange={t.handleTextChange.bind(t, 't1')}
>
    <RightAddon>
        <span>PST</span>
    </RightAddon>
</TextField>
```

### TextField.Count

```javascript
<TextField
    label="计数器" value={t.state.t1}
    onChange={t.handleTextChange.bind(t, 't1')}
>
    <Count total={20} length={t.state.t1.length} />
</TextField>
```

## Demos

```
class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleTextChange(newValue) {
        this.setState({
            text: newValue
        });
    }

    render() {
        let t = this;
        return (
            <TextField label="姓名" placeholder="请输入" value={t.state.text} onChange={t.handleTextChange.bind(t)}/>
        );
    }
};


```

> text-field组件本身是没有背景色的，通常会配合Group一起使用。


```
    <div>
        <Group.Head className='t-FS12 t-LH2 t-PT16'>文本框</Group.Head>
        <Group.List >
            <TextField label="姓名" placeholder="请输入" value={t.state.text} onChange={t.handleTextChange.bind(t)}/>
        </Group.List>
    </div>
```

