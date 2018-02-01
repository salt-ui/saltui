

## 表单多行文本框

<img src="https://img.alicdn.com/tps/TB16O_3JpXXXXbeXpXXXXXXXXXX-750-1254.png" alt="" width="375"/>

## Simple Usage

```javascript
class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleChange(newValue) {
    this.setState({
      text: newValue
    });
  }

  render() {
    let t = this;
    return (
    	<div>
	    	<TextareaField label="三个字" minRows={2} maxRows={5}
	    	  placeholder="3个行高 最大5个行高" value={t.state.text}
	    	  onChange={t.handleChange.bind(t)}/>

	    	<TextareaField label="只读" value="不能更改" readOnly={true}/>
    	</div>
    );
  }
};

```

## Props

### className

描述：自定义样式的`class`名称。  

类型：`String`  

默认：`''`  

必选：否

示例：

```
<TextareaField className="customClass"></Grid>
```

#### value

描述：输入框的值

类型：String

默认：''

必填：是

### minRows

描述：最小显示行

类型：`Interger`  

默认：`1`  

必选：否


### maxRows

描述：最大行，超过则显示滚动条

类型：`Interger`  

默认：`10`  

必选：否

### placeholder

描述：提醒文案，默认空

类型：`String`  

默认：`''`  

必选：否

### readOnly

描述：是否只读，只读时不能输入，默认false

类型：`Bool`  

默认：`false`  

必选：否

### lineHeight

描述：行高

类型：`String`  

默认：`1.3`  

必选：否

### onChange(newValue, e)

描述：输入时触发。

示例1：输入内容变化时触发，将值与state绑定

```javascript
// 新值和事件对象
onChange(newValue,e) {
  let me = this;

  me.setState({
    text: newValue
  })
}

```

类型：Function

默认：Context.noop

必填：是

### onFocus(e)

描述：获取到输入焦点时触发

类型：Function

默认：Context.noop

必填：否

### onBlur(e)

描述：焦点离开时响应

类型：Function

默认：Context.noop

必填：否

#### layout

描述：label 布局,支持上下结构`v`和左右结构`h`,

类型：String

默认：'h'

必填：否

