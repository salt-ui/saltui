

DatetimeField 是时间选择输入表单域。

![](https://img.alicdn.com/tfs/TB1InAIcEgQMeJjy0FgXXc5dXXa-2250-1334.png)

## Simple Usage

``` js
constructor(props) {
    super(props);
    this.state = {
        value1: new Date().getTime(), // 时间戳
        value2: {
            dateTime: '2017-7-20', // 日期字符串，不推荐这种丢失时区信息的格式
            timeType: 'PM', // AM表示上午, PM表示下午
        },
        value3: '2017-7-20 12:42:44', // 时间字符串
    };
}
handleChange(name, value) {
    this.setState({
        value: value
    });
}
render() {
    let t = this;
    return (
        <div>
            <DatetimeField label="日期选择" onSelect={t.handleChange.bind(t, 'value1')} value={t.state.value1} columns={DatetimeField.YMD} />
            <DatetimeField label="日期/上下午选择" onSelect={t.handleChange.bind(t, 'value2')} value={t.state.value2} columns={DatetimeField.YMDT} />
            <DatetimeField label="时间选择" onSelect={t.handleChange.bind(t, 'value3')} value={t.state.value3} columns={DatetimeField.DHM} />
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

``` js
<DatetimeField className="customClass"></DatetimeField>
```

### locale

描述：国际化。`zh-cn`表示简体中文，`en-us`表示英语。
类型：`string`
默认：`zh-cn`
必选：否

示例：

``` js
<DatetimeField locale="en-us"></DatetimeField>
```


### label

描述：表单域名称。
类型：`string`
默认：`''`
必选：否

示例：

``` js
<DatetimeField label="名称"></DatetimeField>
```

### placeholder

描述：提示文案。
类型：`string`
默认：`''`
必选：否

示例：

``` js
<DatetimeField placeholder="请输入"></DatetimeField>
```

### confirmText

描述：确认文案。
类型：`string`
默认：`'完成'`
必选：否

示例：

``` js
<DatetimeField confirmText="完成"></DatetimeField>
```

### cancelText

描述：取消文案。
类型：`string`
默认：`'取消'`
必选：否

示例：

``` js
<DatetimeField cancelText="取消"></DatetimeField>
```

### readOnly

描述：是否只读。
类型：`boolean`
默认：`false`
必选：否

示例：

``` js
<DatetimeField readOnly={false}></DatetimeField>
```

### value

描述：

日期时间。

* 如果是number类型，则表示时间戳。
* 如果是对象，则value字段表示时间戳，timeType表示上下午，`AM`表示上午，`PM`表示下午。

类型：`number`|`object`
默认：无
必选：否

示例：

``` js
var value1 = {
    value: new Date().getTime(), // 时间戳
    timeType: 'PM' // 'PM' or 'AM'
};
var value3 = new Date().getTime();

<DatetimeField value={value1}></DatetimeField>
<DatetimeField value={value2}></DatetimeField>
<DatetimeField value={value3}></DatetimeField>
```

> #### 改动：
> ##### 版本 2.0.0
> * 增加了object类型支持，使用timeType字段表示上/下午。
> * 取消了字符串类型。

### columns

描述：时间展示类型。

* DatetimeField.Y 表示年。
* DatetimeField.YM 表示年月。
* DatetimeField.YMD 表示年月日。
* DatetimeField.YMDT 表示年月日上下午。
* DatetimeField.YMDHM 表示年月日时分。
* DatetimeField.YMDWHM 表示年月日周时分。

类型：`array<string>`
默认：`DatetimeField.YMD`
必选：否

示例：

``` js
var colums1 = DatetimeField.YMD
var colums2 = DatetimeField.YMDT
var colums3 = DatetimeField.DHM

<DatetimeField columns={colums1}></DatetimeField>
<DatetimeField columns={colums2}></DatetimeField>
<DatetimeField columns={colums3}></DatetimeField>
```

> #### 改动：
> ##### 版本 2.0.0
> * 不再支持展示列自由组合，改为只支持三种情况，以DatetimeField.YMD等常量形式给出。

### onSelect/onConfirm

描述：点击确认后触发的事件。
类型：`function`
默认：无
必选：否

回调函数参数是一个对象，value字段表示时间戳，timeType字段表示上/下午，`AM`表示上午，`PM`表示下午。

示例：

``` js
onSelect(value) {
    this.setState({
        //此处value格式为{value: 1497952858666, timeType: "PM"}
        value: value
    });
}

// ...

<DatetimeField value={this.state.value} onSelect={this.onSelect}></DatetimeField>
```

> #### 改动：
> ##### 版本 2.0.0
> * 参数改为对象，value字段表示时间戳，timeType字段表示上/下午。

