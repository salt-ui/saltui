
一句话描述
一张截图

## Simple Usage

## Props

NumberField 共享 TextField 所有配置，除此外

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
| type | string | optional | "card" | 金额格式化的类型，枚举值 card/cnmobile/money |
| inputType | string | optional | "" | input tag 上的 type |
| delimiter | string | optional | “ ” | 格式化时用到的分隔符 |
| fixedNum | number | optional |  | type 为 money 时有效，指定最多几位小数 |  
| format | function(value, delimiter) | optional | noop | 自定义格式化函数，优先级高于 type |
| deFormat | func(value, delimiter) | optional | (str, delimiter) => str.split(delimiter).join('') | 去格式化的函数，在自己指定 format 的时候会用到。|
| formatOnBlur | bool | optional | false | 失焦时格式化 |

