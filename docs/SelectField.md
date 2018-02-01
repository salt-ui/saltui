

## SelectField 选择输入表单域

<img src="https://gw.alicdn.com/tfscom/TB1HoAiJFXXXXXlXpXXXXXXXXXX" width="375"/>


## Simple Usage

```js
constructor(props) {
  super(props);
  this.state = {
    // 数据模型
    options: [
      { value: 0, text: '一月' },
      { value: 1, text: '二月' },
      { value: 2, text: '三月' },
      { value: 3, text: '四月' },
      { value: 4, text: '五月' },
      { value: 5, text: '六月' },
      { value: 6, text: '七月' },
      { value: 7, text: '八月' },
      { value: 8, text: '九月' },
      { value: 9, text: '十月' },
      { value: 10, text: '十一月' },
      { value: 11, text: '十二月' }
    ],
    // 选中的值
    value: { value: 6, text: '七月' }
  };
}
handleChange(value) {
  // 数据确认变更
  this.setState({
    value: value
  });
}
render() {
  var t = this;
  return (
    <div>
      <SelectField label="下拉选择" options={t.state.options} onSelect={t.handleChange.bind(t)} value={t.state.value}/>
    </div>
  );
}
```

## Props

### className

描述：自定义样式的 `class` 名称。
类型：`string`
默认：`''`
必选：否

示例：

```
<SelectField className="customClass"></SelectField>
```

### label

描述：表单域名称。
类型：`string`
默认：`''`
必选：否

示例：

```
<SelectField label="名称"></SelectField>
```

### placeholder

描述：提示文案。
类型：`string`
默认：`''`
必选：否

示例：

```
<SelectField placeholder="请输入"></SelectField>
```

### confirmText

描述：确认文案。
类型：`string`
默认：`'完成'`
必选：否

示例：

```
<SelectField confirmText="完成"></SelectField>
```

### cancelText

描述：取消文案。
类型：`string`
默认：`'取消'`
必选：否

示例：

```
<SelectField cancelText="取消"></SelectField>
```

### readOnly

描述：是否只读。
类型：`boolean`
默认：`false`
必选：否

示例：

```
<SelectField readOnly={false}></SelectField>
```

### options

描述：候选项。
类型：`Array`
默认：`[]`
必选：否

每个选项必须包括 text（显示的文字） 和 value（选项的值） 属性。

示例：

```
var options = [ {
  text: '江苏',
  value: 'jiangsu'
}, {
  text: '浙江',
  value: zhejiang
} ];

...

<SelectField options={options}></SelectField>
```

### value

描述：选中项。
类型：`Array`
默认：`options 数组的第一项（如有的话）`
必选：否

一般为 options 中对应选项的引用，也可以通过 value 属性来和选项建立绑定。

示例：

```
var value = {
  text: '江苏',
  value: 'jiangsu'
};

...

<SelectField value={value}></SelectField>
```

### onSelect

描述：值变化触发的事件。
类型：`Array`
默认：`options 数组的第一项（如有的话）`
必选：否

示例：

```
onSelect(value) {
  this.setState({
    value: value
  });
}

...

<SelectField value={this.state.value} onSelect={this.onSelect}></SelectField>
```
