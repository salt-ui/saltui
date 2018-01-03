

## PickerField 

一个表单域，从右侧滑出面板，上面包含搜索和列表，支持单选和多选两种模式，选择后返回

## Simple Usage

```js
constructor(props) {
  super(props);
  this.state = {
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
      <PickerField label="请选择" onSelect={t.handleChange.bind(t)} value={t.state.value}/>
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
<PickerField className="customClass"></PickerField>
```

### label

描述：表单域名称。
类型：`string`
默认：`''`
必选：否

示例：

```
<PickerField label="名称"></PickerField>
```

### value

描述：选中项。
类型：`object`
默认：`无`
必选：否

示例：

```
var value = {
  text: '江苏',
  value: 'jiangsu'
};

...

<PickerField value={value}></PickerField>
```

### readOnly

描述：是否只读。
类型：`boolean`
默认：`false`
必选：否

示例：

```
<PickerField readOnly={false}></PickerField>
```

### placeholder

描述：提示文案。
类型：`string`
默认：`'请选择'`
必选：否

示例：

```
<PickerField placeholder="请输入"></PickerField>
```

### searchText

描述：搜索文案。
类型：`string`
默认：`'搜索'`
必选：否

示例：

```
<PickerField searchText="搜索"></PickerField>
```

### confirmText

描述：确认文案。
类型：`string`
默认：`'确认'`
必选：否

示例：

```
<PickerField confirmText="完成"></PickerField>
```

### cancelText

描述：取消文案。
类型：`string`
默认：`'取消'`
必选：否

示例：

```
<PickerField cancelText="取消"></PickerField>
```

### fetchUrl

描述：搜索接口地址。
类型：`string`
默认：`无`
必选：是

示例：

```
<PickerField fetchUrl="http://domain.com/url.jsonp"></PickerField>
```

### fetchDataOnOpen

描述：打开搜索界面时是否自动搜索一次。
类型：`boolean`
默认：`true`
必选：否

示例：

```
<PickerField fetchDataOnOpen={false}></PickerField>
```

### dataType

描述：发送 ajax 请求的类型。
类型：`string`
默认：`jsonp`
必选：否

示例：

```
<PickerField dataType="jsonp"></PickerField>
```

### beforeFetch

描述：会传入 {q: value}， value 为搜索框中变化的值，在发出 ajax 请求之前，将数据处理为应该发送的格式，并需返回该数据。
类型：`function`
默认：`obj => obj`
必选：否

示例：

```
beforeFetch(obj) {
  obj.foo = 'bar';
  return obj;
}

...

<PickerField beforeFetch={this.beforeFetch}></PickerField>
```

### fitResponse

描述：natty-fetch 的 fix 方法，返回符合 natty-fetch 规范的数据格式。
类型：`function`
默认：`response => ({
    content: response.content || response,
    success: response.success === undefined ? true : response.success,
  })`
必选：否

示例：

```
fitResponse(response) {
  return {
    content: response.content || response,
    success: response.success === undefined ? true : response.success,
  };
}

...

<PickerField fitResponse={this.fitResponse}></PickerField>
```

### afterFetch

描述：会传入返回的数据， 将其处理后返回。
类型：`function`
默认：`obj => obj`
必选：否

示例：

```
afterFetch(arr) {
  return arr.map((item) => {
    item.foo = 'bar';
    return item;
  });
}

...

<PickerField afterFetch={this.afterFetch}></PickerField>
```

### showSearch

描述：是否显示搜索框。
类型：`bool`
默认：`true`
必选：否

示例：

```
<PickerField showSearch={false}></PickerField>
```

### searchTitle

描述：搜索弹框标题。
类型：`string`
默认：`同 placeholder`
必选：否

示例：

```
<PickerField searchTitle="请搜索地区"></PickerField>
```

### searchDelay

描述：搜索延迟触发时间（毫秒）。
类型：`number`
默认：`100`
必选：否

示例：

```
<PickerField searchDelay={100}></PickerField>
```

### searchPlaceholder

描述：搜索框占位文案。
类型：`string`
默认：`搜索`
必选：否

示例：

```
<PickerField searchPlaceholder="搜索"></PickerField>
```

### searchNotFoundContent

描述：搜索内容不存在时的文案。
类型：`string`
默认：`无搜索结果`
必选：否

示例：

```
<PickerField searchNotFoundContent="无匹配内容"></PickerField>
```

### formatter

描述：显示文本格式化方法。
类型：`function`
默认：`value => (value ? value.text : '')`
必选：否

示例：

```
formatItem(value) {
  return value ? (value.text + '自定义文字') : '';
}

...

<PickerField value={this.state.value} formatter={this.formatItem}></PickerField>
```

### onSelect

描述：值变化触发的事件。
类型：`function`
默认：`无`
必选：否

示例：

```
onSelect(value) {
  this.setState({
    value: value
  });
}

...

<PickerField value={this.state.value} onSelect={this.onSelect}></PickerField>
```

### multiple

描述：是否是多选。
类型：`bool`
默认：`false`
必选：否

示例：

```
<PickerField multiple></PickerField>
```

### selectText

描述：多选时已选择项的文案。
类型：`string`
默认：`已选择：`
必选：否

示例：

```
<PickerField selectText="已选择："></PickerField>
```
