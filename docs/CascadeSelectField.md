

CascadeSelectField 是级联选择输入表单域。

<img src="https://gw.alicdn.com/tfscom/TB1zxibLXXXXXbIaXXXXXXXXXXX.png" width="375">

## Props

名称 | 类型 | 描述
--- | --- | ---
className | string | class 名称
label | string | 表单域名称
placeholder | string | placeholder
confirmText | string | 确定操作文案
cancelText | string | 取消操作文案
readOnly | boolean | 只读性
options | array | 候选数据，数据格式参考下方 Simple Usage
value | array | 值，数据格式参考下方 Simple Usage
columns | array | 表头文案
onSelect | function | 选中回调函数
onCancel | function | 取消选中回调函数
formatter | function | 格式化显示值函数
mode | string | 'normal', 'complex' 其中之一，代表显示的模式
locale | string | 'zh-cn', 'en-us' 国际化文案

## Simple Usage

```js
constructor(props) {
    super(props);
    this.state = {
        value: null
    };
}
handleChange(value) {
    this.setState({
        value: value
    });
}
render() {
    let t = this;
    let options = [{
        value: 'zhejiang',
        label: '浙江',
        children: [{
            value: 'hangzhou',
            label: '杭州',
            children: [{
                value: 'xihu',
                label: '西湖',
            }],
        }],
    }];
    let columns = [ '省', '市', '景点' ];
    return (
        <div>
            <CascadeSelectField label="级联选择" options={options} onSelect={t.handleChange.bind(t)} value={t.state.value} placeholder="请输入" columns={columns}/>
        </div>
    );
}
```

## Props 详解

### options

示例：

```
let options = [{
    value: 'zhejiang',
    label: '浙江',
    children: [{
        value: 'hangzhou',
        label: '杭州',
        children: [{
            value: 'xihu',
            label: '西湖',
        }],
    }],
}];

<CascadeSelectField options={options}></CascadeSelectField>
```

### value

示例：

```
let value = ['zhejiang', 'hangzhou', 'xixi'];

// or [ { text: '浙江', value: 'zhejiang' }, { text: '杭州', value: 'hangzhou' }, { text: '西湖', value: 'xihu' } ]

<CascadeSelectField value={value}></CascadeSelectField>
```

### columns

示例：

```
<CascadeSelectField columns={['省', '市', '景点']}></CascadeSelectField>
```

### onSelect

参数是所有的选中项 value。

示例：

```
onSelect(value) {
    this.setState({
        value: value
    });
}

...

<CascadeSelectField value={this.state.value} onSelect={this.onSelect}></CascadeSelectField>
```

### onCancel

示例：

```
onCancel() {
    this.setState({
        value: []
    });
}

...

<CascadeSelectField value={this.state.value} onCancel={this.onCancel}></CascadeSelectField>
```

### formatter

描述：显示结果格式化函数。
类型：`function`
默认：`(value) => value.map((v) => v.text).join('/')`
必选：否

参数是选中对象。

示例：

```
formatter(value) {
    return value.map((v) => v.text).join('/');
}

...

<CascadeSelectField formatter={this.formatter}></CascadeSelectField>
```
