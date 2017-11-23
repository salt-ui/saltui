# tingle-calendar-field [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-calendar-field.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-calendar-field)

级联日期表单组件

<img src="https://img.alicdn.com/tps/TB1me1UPFXXXXajXVXXXXXXXXXX-750-1334.png" width="375">

## How to develop

### install

```bash
tnpm i salt-tools -g
npm run tnpm-dep 
npm start
```

### update

```bash
npm run tnpm-update
```

## Simple Usage

## Props

- 支持表单域的所有属性和方法，[参见这里](http://gitlab.alibaba-inc.com/tingle-ui/tingle-field#props)
- 面板模式选择天、上下午：支持tingle-calendar的属性和方法，[参见这里](http://gitlab.alibaba-inc.com/tingle-ui/tingle-calendar#props)
- 滚轮模式选择天、年、月、上下午、时间：支持tingle-datetime的属性和方法，[参见这里](http://gitlab.alibaba-inc.com/tingle-ui/tingle-datetime#props)

- 另外支持以下属性:

#### type
描述：calendar类型
类型：`String`
默认：`day` // 可选值：year, month, day(面板形式), dayWithSlot(拨盘形式), dayWithHalf, dayWithTime
必选：否

#### placeholder
描述：占位文字
类型：`String|Array`
默认：`['开始日期', '结束日期']`
必选：否

#### formatter
描述：要显示的日期格式
类型：`String`
默认：`yyyy-MM-dd`
必选：否

#### readOnly
描述：要显示的日期格式
类型：`Boolean`
默认：`false`
必选：否

#### showWeek
描述：是否显示周几
类型：`Boolean`
默认：`true`
必选：否

#### showDateType
描述：展示选中值时，是否显示“全天”“上午”“下午”
类型：`Boolean`
默认：`true`
必选：否
注意：当 type === day && singleMode === true时，该属性会失效

### onOk
描述：确定选择时触发的回调。
类型：`Function`
默认：`new Function`
必选：否
示例：
```
<CalendarField onOk={(value)=>{console.log(value)}} />

// 如果 singleMode === true，此 value 的格式为：
  {
    value: xxxxxxxxx,
    timeType: "AM" // 可能没有该属性
  }

// 如果 singleMode === true，此 value 的格式为：
  {
    startDate: 1452038400000,
    startDateType: "FULL", // AM PM FULL
    endDate: 1452643200000,
    endDateType: "FULL"
  }
```

### onCancel
描述：取消选择时触发的回调。
类型：`Function`
默认：`new Function`
必选：否
示例：
```
<CalendarField onCancel={()=>{console.log('Canceled!')}} />
```

