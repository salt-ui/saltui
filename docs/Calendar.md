# 日期选择

## 何时使用？

* 短距离区间选择
* 日期还包含额外信息的情况，如日程
* 其余情况推荐使用 DateTime

## Props

### className
描述：自定义样式的`class`名称。  
类型：`String`  
默认：`''`  
必选：否

### visible
描述：显示隐藏。
类型：Boolean
默认：false
必选：否

### value
描述：今天。  
类型：`Object|String`  
默认：``  
必选：否
示例：
```
//可以是对象
<Calendar value={{startDate: '2016-01-02', startDateType: 'AM', endDate: '2016-01-03', endDateType: 'AM' }} />

//也可是字符串
<Calendar value={'2016-01-02'} />
```

### locale
描述：国际化。  
类型：`String`  
默认：`zh-cn`  
必选：否

### animationType
描述：日历面板的出现方式。
类型：`String`
默认：`slideLeft` // slideUp | slideLeft
必选：否

### singleMode
描述：使用单点模式，还是级联选择模式。
类型：`Boolean`  
默认：`true`  
必选：否

### showHalfDay
描述：是否显示半天的面板。
类型：`Boolean`
默认：`false`
必选：否


### disabledDate
描述：不可选择日期。
类型：`Function`
默认：`new Function`
必选：否
说明：仅适用于 type 为 day 的情况，disabledDate 会遍历日历上的每一个日期，返回 true 代表当前日期被禁用。参数 `current` 代表当前遍历到的日期，`value` 表示当前选中的值。
示例：
```
<Calendar disabledDate={(current, value)=>{console.log(current, value); return false;}} />
```

### renderDayBadge
描述：渲染日期右上角的徽标。
类型：`Function`
默认：`new Function`
必选：否
说明：Calerdar提供了一个便捷的渲染假期、上班日的工具方法，并支持国际化：Calendar.util.generateSpecialWorkdayOrHolidayRender
示例：
```
<Calendar renderDayBadge={(current, value)=>{console.log(current, value); return <YourBadge />;}} />
```

### renderCustomDayLabel
描述：渲染特殊日期的label，比如端午节等信息。
类型：`Function`
默认：`new Function`
必选：否
示例：
```
<Calendar renderCustomDayLabel={(current, value)=>{console.log(current, value); return <YourLabel />;}} />
```

### onCancel
描述：取消选择时触发的回调。
类型：`Function`  
默认：`new Function`  
必选：否
示例：
```
<Calendar onCancel={()=>{console.log('Canceled!')}} />
```

### maskClosable
描述：是否点击mask是否可关闭面板。
类型：`Boolean`
默认：`true`
必选：否

### onMaskClose
描述：animationType = slideUp 且 maskClosable = true 时，点击mask触发的回调。
类型：`Function`
默认：`new Function`
必选：否
示例：
```
<Calendar onMaskClose={()=>{console.log('maskClosed!')}} />
```

### onOk
描述：点击确定时触发回调。
类型：`Function`  
默认：`new Function`  
必选：否
说明：当mode为popup时、或当showHalfDay为true时，点击"确定"才会触发onOk
示例：
```
<Calendar onOk={(val)=>{console.log('Value:', val)}} />
```

### onChange
描述：当日期被点击时触发。
类型：`Function`
默认：`new Function`
必选：否
示例：
```
<Calendar onChange={(value)=>{console.log('arguments:', arguments)}} />
```

