

日期及时间、上下午选择组件。

![](https://img.alicdn.com/tfs/TB1InAIcEgQMeJjy0FgXXc5dXXa-2250-1334.png)

## Simple Usage

```jsx
import React from 'react';
import { Datetime, Button } from 'saltui';

class DatetimeDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {
        value: '2017-7-20 12:42:44',
        timeType: 'PM',
      },
    };
  }

  onConfirm(value) {
    console.log('onConfirm', value);
    this.setState({
      value,
    });
  }

  onCancel() {
    console.log('cancel');
  }

  showSlot(id) {
    this.slot.show();
  }

  render() {
    const t = this;
    return (
      <div className="t-datetime-demo">
        <Button onClick={() => {
          t.showSlot();
        }}>日期/上下午选择</Button>
        <Datetime
          {...this.datetimeProps}
          locale="zh-cn"
          slotRef={(s) => t.slot = s}
          title="日期选择"
          value={t.state.value}
          columns={Datetime.YMDT}
          onConfirm={(value) => { this.onConfirm(value); }}
          onCancel={() => { this.onCancel(); }}
        />
      </div>
    );
  }
}

export default DatetimeDemo;

```

## Props

### className
描述：自定义样式的`class`名称。  
类型：`String`  
默认：`''`   
必选：否  

### title  
描述：浮窗的title。  
类型：`String`  
默认：`''`  
必选：否  

### locale  
描述：国际化。  
类型：`String`  
默认：`zh-cn`  
必选：否  

### columns  
描述：展示的格式。
可供选择的有：

* Datetime.Y（年）
* Datetime.YM（年月）
* Datetime.YMD（年月日）
* Datetime.YMDT（年月日上下午）
* Datetime.YMDHM（年月日时分）
* Datetime.YMDWHM（年月日周时分）

默认：`Datetime.YMD`  
必选：否  
示例：`<Datetime columns={Datetime.DHM} />`  


### minDate
描述：最小可选日期。
类型： `number, string, date`
默认值： 946656000000,
示例：`<Datetime minDate={new Date(2000,0,1).getTime()} />` 

### maxDate
描述：最大可选日期。
类型： `number, string, date`
默认值： 1924876800000
示例：`<Datetime maxDate={new Date(2030,11,31).getTime()} />`

### minuteStep
描述： 分钟数递增步长设置
类型： `Number`
默认值： 1
示例：`<Datetime minuteStep={5} />`
### disabledDate
描述： 仅能禁止日期（年月日）
类型： `function`
返回值类型：`Array`
示例：`<Datetime disabledDate={() => [ { start: new Deat(2002,0,1) },{start: new Date(2017, 0, 1), end: new Date(2017,5,1)}, new Date(2018, 11,1), { start: new Deat(2020,0,1) } ]} />`
### slotRef  
描述：通过 react ref 的方式获取 slot 浮窗的 ref，主要用于控制组件显隐。
类型：`Function`  
默认：`new Function`  
必选：否  
示例：  
```
<Datetime slotRef={(slot)=>{ this.slot = slot; }} />
// 使用：
this.slot.show();
```

### onConfirm  
描述：确定选择时触发的回调。  
类型：`Function`  
默认：`new Function`  
必选：否  
示例：
```
<Datetime onConfirm={(value)=>{console.log(value)}} />
```

### onCancel  
描述：取消选择时触发的回调。  
类型：`Function`  
默认：`new Function`  
必选：否  
示例：
```
<Datetime onCancel={()=>{console.log('Canceled!')}} />
```
### onChange

描述：取消选择时触发的回调。  
类型：`Function`  
默认：`new Function`  
必选：否  
示例：
```
<Datetime onChange={( value, column) => {console.log(value, column);}}} />
```
