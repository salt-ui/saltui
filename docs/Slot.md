

## Slot 老虎机滚轮选择器

<img src="https://gw.alicdn.com/tfscom/TB1wU3hJFXXXXafXpXXXXXXXXXX" width="375"/>

## Simple Usage

```js
constructor(props) {
  super(props);
  this.state = {
    // 数据模型
    data: [
      [
        { text: 'Jan', value: 0 }, { text: 'Feb', value: 1 },
        { text: 'Mar', value: 2 }, { text: 'Apr', value: 3 },
        { text: 'May', value: 4 }, { text: 'Jun', value: 5 },
        { text: 'Jul', value: 6 }, { text: 'Aug', value: 7 },
        { text: 'Sep', value: 8 }, { text: 'Oct', value: 9 },
        { text: 'Nov', value: 10 }, { text: 'Dec', value: 11 }
      ]
    ],
    // 选中的值
    value: [ { text: 'Aug', value: 7 } ],
    // 上次选中的值（取消选择时恢复用）
    confirmedValue: [ { text: 'Aug', value: 7 } ]
  };
}
showSlot() {
  this.refs.slot.show();
}
handleConfirm(value) {
  // 确认选中项目
  this.setState({
    confirmedValue: value,
    value: value
  });
}
handleChange(value, column, index) {
  // 选中项目改变
  this.setState({
    value: value
  });
}
handleCancel() {
  // 取消之前的操作，恢复上次确认的值
  this.setState({
    value: this.state.confirmedValue
  });
}
render() {
  var t = this;
  return (
    <div>
      <Button size="l" onClick={t.showSlot.bind(t)}>show slot</Button>
      <Slot ref="slot" data={t.state.data} value={t.state.value} title="title" onConfirm={t.handleConfirm.bind(t)} onChange={t.handleChange.bind(t)} onCancel={t.handleCancel.bind(t)}/>
    </div>
  );
}
```

### 也可以单独使用

![DingTalk20170503192636.png](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/8588/689548c533e442e1.png)

```js
  <Slot.Pane {...props}/>
```



## Props

Slot 对数据格式的要求比较苛刻，但这是必要的！为了方便用户的使用，提供了两个静态的 formatXxx 函数供用户使用，详见下面的 API。

### className

描述：自定义样式的 `class` 名称。
类型：`string`
必选：否

示例：

```
<Slot className="customClass"></Slot>
```

### data

描述：数据。
类型：`Array<Array<Object>>`
必选：否

> data 是一个二维数组，第一维表示滚轮列，第二维表示各列中的选项。

每个选项必须包括 text（显示的文字） 和 value（选项的值） 属性。典型的格式如下：

示例：

```js
[
  [
    {
      text: '江苏',
      value: 'jiangsu'
    },
    {
      text: '浙江',
      value: 'zhejiang'
    }
  ],
  [
    {
      text: '杭州',
      value: 'hangzhou'
    },
    {
      text: '宁波',
      value: 'ningbo'
    }
  ]
]
```

### value

描述：选中数据。
类型：`Array<Object>`
必选：否

> value 是一个一维数组，分别表示每一列的选中值。

数组中的元素一般为 data 中对应选项的引用，也可以通过 value 属性来和选项建立绑定。典型的格式如下：

示例：

```js
[
  {
    text: '浙江',
    value: 'zhejiang'
  },
  {
    text: '杭州',
    value: 'hangzhou'
  }
]
```

### title

描述：弹出滚动选择器的标题。
类型：`string`
必选：否

示例：

```js
<Slot title="标题"></Slot>
```

### confirmText

描述：确认文案。
类型：`string`
默认：`'完成'`
必选：否

示例：

```js
<Slot confirmText="完成"></Slot>
```

### cancelText

描述：取消文案。
类型：`string`
默认：`'取消'`
必选：否

示例：

```js
<Slot cancelText="取消"></Slot>
```

### scrollMod

描述：数据替换后的滚动模式。
类型：`function`
默认：`'reset'`
必选：否

示例：

```js
<Slot scrollMod="reset"></Slot>
```

### columns

描述：列头文案。
类型：`array<string>`
默认：`[]`
必选：否

示例：

```js
<Slot columns={["年","月","日","时","分"]}></Slot>
```

> scrollMod 目前有两种模式：

  - `reset` 模式（默认），会直接替换列数据，并定位到第一个值
  - `keep` 模式，会尝试在新的列数据中查找旧列的已选中值，并定位到该值


## columnsFlex

描述：列宽占比，默认情况下每列占比相同，平分总宽度，可以用此参数微调。
类型：`array<string>`
默认：无
必选：否

示例：

```js
<Slot columns={[1.24, 1.1, 1.1]} />
```

### maskCloseable

描述：点击蒙层是否关闭。
类型：`bool`
默认：`true`
必选：否

示例：

```js
<Slot maskCloseable={true}></Slot>
```

### onChange(value, column, index)

描述：列选中变化触发的事件。
类型：`function`
必选：否

示例：

```js
<Slot onChange={(value, column, index) => {
  // value（当前选中值数组）, column（当前变更的列）, index（当前选中的项）
  // DO SOMETHING
}}></Slot>
```

### onConfirm(value)

描述：确认所有选中触发的事件。
类型：`function`
必选：否

示例：

```js
<Slot onConfirm={(value) => {
  // value（当前选中值数组）
  // DO SOMETHING
}}></Slot>
```

### onCancel()

描述：取消当前选中触发的事件。
类型：`function`
必选：否

示例：

```js
<Slot onCancel={() => {
  // DO SOMETHING
}}></Slot>
```

## APIs

### .show()

描述：显示选择器。

示例：

```js
slot.show();
```

### .hide()

描述：隐藏选择器。

示例：

```js
slot.hide();
```

### Slot.formatDataValue(data[, value])

描述：`data` 和 `value` 的非标准格式兼容，返回标准格式的 { data, value }。

示例：

```js
t.setState(Slot.formatDataValue(xxData, xxValue));
```

- data 格式兼容以下几种场景

  - data 选项中如果 text 或 value 缺少任意一项，都会用另一项替代。

    ```js
    [
      [
        { text: '江苏' }, // => { text: '江苏', value: '江苏' }
        { value: '浙江' } // => { text: '浙江', value: '浙江' }
      ]
    ]
    ```

  - 如果数组元素不是对象，那么 text 和 value 都会被赋值为元素本身。

    ```js
    [
      [
        '江苏', // => { text: '江苏', value: '江苏' }
        '浙江'  // => { text: '浙江', value: '浙江' }
      ]
    ]
    ```

  - 如果传入是一个一维数组，则自动包裹为二维数组。

    ```js
    [ '江苏', '浙江' ] // => [ [ { text: '江苏', value: '江苏' }, { text: '浙江', value: '浙江' } ] ]
    ```

- value 格式兼容以下场景

  - 数组元素不是对象。会对应到 value 是数组元素本身的选项。
  - 如果数组元素不能对应到任何选项，则默认对应到第一个选项。

### Slot.formatColumnValue(columnData[, columnValue])

描述：替换单列的 data 和 value 时使用，兼容规则同上。

`columnData` 列数据，一维数组。

`columnValue` 选中的选项。

返回标准格式的 { columnData, columnValue }

示例：

```js
t.setState(Slot.formatColumnValue(xxData, xxValue));
```
