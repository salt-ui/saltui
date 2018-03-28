
常用方法合集


## API

* toTop(): 返回顶部

### Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|className|string|optional|-|额外的顶级类名|
|to|number|optional|10|回到顶部时据顶端距离，单位 px|
|distance|number|optional|30|向下滑多少距离出现回到顶部，单位 px|
|duration|number|optional|600|动画持续时间，值为0位立即到达顶部|
|hideToTopButton|bool|optional|true|是否显示返回顶部按钮|
|icon|React.Element|optional|替换返回顶部的按钮，推荐使用 `salt-icon`|
|size|number|optional|medium|按钮的尺寸，枚举值 `medium (48px)`, `small (40px)`|
|type| string | optional | `secondary` | 按钮的类型，枚举值 `primary`, `secondary` | 

### Box.Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|className| string | optional | | 额外类名 | 
|size|number|optional|medium|同上|
|type| string | optional | primary | 同上 | 
|onClick| | func | optional | 点击按钮时的回调 | 


### API
- toTop

