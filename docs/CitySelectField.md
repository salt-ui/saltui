

CitySelectField 是针对中国的城市选择输入表单域。

![CitySelectField](https://img.alicdn.com/tps/TB11mR4PFXXXXcYXVXXXXXXXXXX-314-565.jpg)

## Simple Usage

```js
class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  render() {
    return (
      <div>
        <CitySelectField
          districtData={districtData}
          onSelect={value => this.setState({ value })}
        />
      </div>
    );
  }
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
<CitySelectField className="customClass"></CitySelectField>
```

### label

描述：表单域名称。
类型：`string`
默认：`''`
必选：否

示例：

```
<CitySelectField label="名称"></CitySelectField>
```

### placeholder

描述：提示文案。
类型：`string`
默认：`''`
必选：否

示例：

```
<DatetimeField placeholder="请输入"></DatetimeField>
```

### confirmText

描述：确认文案。
类型：`string`
默认：`'完成'`
必选：否

示例：

```
<CitySelectField confirmText="完成"></DatetimeField>
```

### cancelText

描述：清除文案。
类型：`string`
默认：`'清除'`
必选：否

示例：

```
<CitySelectField cancelText="取消"></DatetimeField>
```

### cancelText

描述：清除文案。
类型：`string`
默认：`'清除'`
必选：否

### cancelText

描述：清除文案。
类型：`string`
默认：`'清除'`
必选：否

### cancelText

描述：清除文案。
类型：`string`
默认：`'清除'`
必选：否

### provinceText

描述：省文案。
类型：`string`
默认：`'省/自治区/直辖市'`

### cityText

描述：市文案。
类型：`string`
默认：`'市'`
必选：否

### districtText

描述：区文案。
类型：`string`
默认：`'区'`

### layout 

描述：Field 展示方式。
类型：`string`
默认：`v`
必选：否

垂直或者水平显示。两个可选值 `v` or `h`

### selectorType

描述：城市选择的类型。
类型：`string`
默认：`default`
必选：否

- `default`: 省市区
- `city`: 省市
- `province`: 省

### required

描述：是否必填。
类型：`boolean`
默认: `false`
必选：否


### readOnly

描述：是否只读。
类型：`boolean`
默认：`false`
必选：否

示例：

```
<CitySelectField readOnly={false}></CitySelectField>
```


### districtData

描述：省市区数据。
类型：` array`
默认：`[]`
必选：否


示例：

```
districtData = [{ label: '北京', value: '100001', children: [{
    label: '西城区',
    value: '100002',
    children: [ ... ]
  }] 
}]
<CitySelectField districtData={districtData}></CitySelectField>
```

### value

描述：选中项。
类型：`array`
默认：`[]`
必选：否

value 为省市区的对应编码构成的数组。

示例：

```
<CitySelectField value={['100010', '100011]}></CitySelectField>
```

### onSelect

描述：值变化触发的事件。
类型：`function`
默认：无
必选：否

参数是时间戳。

示例：

```
onSelect(value) {
    this.setState({
        value: value
    });
}

...

<CitySelectField value={this.state.value} onSelect={this.onSelect}></CitySelectField>
```

### onCancel

描述：清除值时的事件。
类型：`function`
默认：无
必选：否

参数是时间戳。

示例：

```
onCancel(value) {
    this.setState({
        value: []
    });
}

...

<CitySelectField value={this.state.value}  onCancel={this.onCancel}></CitySelectField>
```