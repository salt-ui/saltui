

## Picker 

一个选择的弹框，从右侧滑出面板，上面包含搜索和列表，支持单选和多选两种模式，选择后触发回调

## Simple Usage

```jsx
constructor(props) {
  super(props);
  this.state = {
    // 选中的值
    visible: false,
  };
}
showPicker = (value) => {
  // 数据确认变更
  this.setState({ visible: true });
}
render() {
  return (
    <div>
      <button onClick={this.showPicker}></button>
      <Picker visible={this.state.visible}/>
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

```jsx
<Picker className="customClass"></Picker>
```

### value

描述：选中项。
类型：`object`
默认：`无`
必选：否

示例：

```jsx
var value = [{
  text: '江苏',
  value: 'jiangsu'
}];

...

<Picker value={value}></Picker>
```

### visible

描述：是否显示。
类型：`boolean`
默认：`false`
必选：否

### locale  
描述：国际化。  
类型：`String`  
默认：`zh-cn`  
必选：否  

### readOnly

描述：是否只读。
类型：`boolean`
默认：`false`
必选：否

示例：

```jsx
<Picker readOnly={false}></Picker>
```

### placeholder

描述：提示文案。
类型：`string`
默认：`'请选择'`
必选：否

示例：

```jsx
<Picker placeholder="请输入"></Picker>
```

### confirmText

描述：确认文案。
类型：`string`
默认：`'确认'`
必选：否

示例：

```jsx
<Picker confirmText="完成"></Picker>
```

### options

描述：选项内容，可由本地传入。
类型：`array`
默认：`无`
必选：否

示例：

```jsx
<Picker options={[{ value: 1, text: '选项 1' }, { value: 2, text: '选项 2' }]}></Picker>
```

### fetchUrl

描述：搜索接口地址。未传入 `options` 时有效。
类型：`string`
默认：`无`
必选：否

示例：

```jsx
<Picker fetchUrl="http://domain.com/url.jsonp"></Picker>
```

### fetchDataOnOpen

描述：打开搜索界面时是否自动搜索一次。
类型：`boolean`
默认：`true`
必选：否

示例：

```jsx
<Picker fetchDataOnOpen={false}></Picker>
```

### dataType

描述：发送 ajax 请求的类型。
类型：`string`
默认：`jsonp`
必选：否

示例：

```jsx
<Picker dataType="jsonp"></Picker>
```

### beforeFetch

描述：会传入 {q: value}， value 为搜索框中变化的值，在发出 ajax 请求之前，将数据处理为应该发送的格式，并需返回该数据。
类型：`function`
默认：`obj => obj`
必选：否

示例：

```jsx
beforeFetch(obj) {
  obj.foo = 'bar';
  return obj;
}

...

<Picker beforeFetch={this.beforeFetch}></Picker>
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

```jsx
fitResponse(response) {
  return {
    content: response.content || response,
    success: response.success === undefined ? true : response.success,
  };
}

...

<Picker fitResponse={this.fitResponse}></Picker>
```

### afterFetch

描述：会传入返回的数据， 将其处理后返回。
类型：`function`
默认：`obj => obj`
必选：否

示例：

```jsx
afterFetch(arr) {
  return arr.map((item) => {
    item.foo = 'bar';
    return item;
  });
}

...

<Picker afterFetch={this.afterFetch}></Picker>
```

### showSearch

描述：是否显示搜索框。
类型：`bool`
默认：`true`
必选：否

示例：

```jsx
<Picker showSearch={false}></Picker>
```


### searchDelay

描述：搜索延迟触发时间（毫秒）。
类型：`number`
默认：`100`
必选：否

示例：

```jsx
<Picker searchDelay={100}></Picker>
```

### searchPlaceholder

描述：搜索框占位文案。
类型：`string`
默认：`搜索`
必选：否

示例：

```jsx
<Picker searchPlaceholder="搜索"></Picker>
```

### searchNotFoundContent

描述：搜索内容不存在时的文案。
类型：`string`
默认：`无搜索结果`
必选：否

示例：

```jsx
<Picker searchNotFoundContent="无匹配内容"></Picker>
```

### formatter

描述：显示文本格式化方法。
类型：`function`
默认：`value => (value ? value.text : '')`
必选：否

示例：

```jsx
formatItem(value, type) {
  if (type === 'label') { // 对回填值格式化
    return value && value.label || ''
  }
  
  if (type === 'option') { // 对panel中的显示值格式化
    return value ? (value.text + '自定义文字') : '';
  }
  
}

...

<Picker value={this.state.value} formatter={this.formatItem}></Picker>
```

### phonetic

描述：获取选项对应拼音的方法，返回每个字的拼音数组。用于首字母分组或本地数据模糊搜索。
类型：`function`
默认：`value => (value.phonetic || [])`
必选：否

示例：

```jsx
import pinyin from 'simple-pinyin';
getPhonetic(value) {
  return pinyin(value.text, { pinyinOnly: false });
}

...

<Picker formatter={getPhonetic}></Picker>
```

### multiple

描述：是否是多选。
类型：`bool`
默认：`false`
必选：否

示例：

```jsx
<Picker multiple></Picker>
```

### grouping

描述：是否按照首字母分组，并在右侧显示分组快速跳转列表。
类型：`bool`
默认：`false`
必选：否

示例：

```jsx
<Picker grouping></Picker>
```

### groupingIndicator

描述：点击分组快速跳转列表时，是否放大展示当前字母。仅在 `grouping` 为真时有效。
类型：`bool`
默认：`false`
必选：否

示例：

```jsx
<Picker grouping groupingIndicator></Picker>
```

### resultFormatter


描述：自定义选择结果显示格式化方法。
类型：`function`
默认：`无`
必选：否

```jsx
import PlusCircle from 'salt-icon/lib/PlusCircle'

<Picker resultFormatter={value => (`我已经选择了${value.length}项`) } />} />
```


