#  数据信息展示

## NumberInfo 数据信息视图

### Simple Usage

```javascript
import { NumberInfo } from 'saltui';
const { NumberItem } = NumberInfo;

render() {
  return (
    <NumberInfo label="年度申报">
      <NumberItem number={1.5} unit="天" />
      <NumberItem number={36} unit="小时" />
      <NumberItem number={18} unit="次" secondary />
    </NumberInfo>
  )
}
```

### Props

#### className

描述：自定义的扩展样式名称。

类型：String

默认：''

必填：否

#### layout

描述：数据信息视图的布局形式，支持水平（"h"）或垂直（"v"）。

类型："v" | "h"

默认："v"

必填：否

#### label

描述：数据信息视图的标签，显示在数据值的下方（垂直布局）或左方（水平布局）。

类型：String

默认：""

必填：否

#### onClick

描述：点击事件。

类型：() => void

默认：() => {}

必填：否

#### children

描述：要展示的数据项，只能传入 NumberItem 实例。若传入多个值，则默认使用逗号分隔。

类型：NumberItem[]

默认：null

必填：否


## NumberItem 数据项

> 通过 `const { NumberItem } = NumberInfo` 或 `NumberInfo.Item` 引用。

### Props

#### number

描述：数据项的数值。

类型：Number

默认：0

必填：否

#### digits

描述：数据项展示的小数点后位数，位数超出部分会被四舍五入，位数不足则补齐后导 0。传入 0 表示只展示整数部分，不传则默认展示所有小数部分。

类型：Number

默认：undefined

必填：否

#### groupDigits

描述：数据整数部分分组的位数，配合 spliter 属性使用，常用于千分位等。传入 0 表示不对数据进行分组展示。

类型：Number

默认：3

必填：否

#### spliter

描述：数据整数部分分组的分隔符。传入空字符串表示不对数据进行分组展示。

类型：String

默认：","

必填：否

#### max

描述：展示的最大数据值（绝对值），超出范围的数据带加号后缀。传入 0 表示不限制最大值。

类型：Number

默认：0

必填：否

#### showSign

描述：是否展示正负号，不传则自动判断（正数不加 "+"，负数加 "-"）。注意：如果强制传入 false，则必须用颜色等其他方式表示数的符号。

类型：Boolean

默认：undefined

必填：否

#### positiveColor / negativeColor

描述：正值和负值的展示颜色，通常用于财务、统计等场景。若不传，则展示默认颜色。

类型：String

默认：undefined

必填：否

#### unit

描述：数据的单位，展示在数据值之后。

类型：String

默认：""

必填：否

#### secondary

描述：是否为二级数据（将会展示在括号内）。

类型：Boolean

默认：false

必填：否


### Simple Usage

NumberItem 也可单独使用，render 的结果是一段被格式化后的字符串，可用于其他组件中。

```javascript
import { NumberInfo } from 'saltui';
<Button className="number-info-wrap-space">
  点赞 <NumberInfo.Item number={200} max={99} unit="次" />
</Button>
```

注意：单独使用的 NumberItem 组件，positiveColor、negativeColor、secondary 属性不可用。


## format() 格式化方法

### Simple Usage

```javascript
import { NumberInfo } from 'saltui';
console.log(NumberInfo.format(20000, { max: 9999, unit: '次' })); // "9,999+ 次"
// Or NumberInfo.Item.format(...)
```

format(number, [config])，入参为将要格式化的数字，以及格式化配置。格式化配置字段同 NumberItem 的 props。