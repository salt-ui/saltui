
一句话描述
一张截图

## Usage
```js

import { Steps } from 'saltui';

const { Step } = Steps;

ReactDOM.render(
    <Steps>
        <Steps.Step title="第一步"></Steps.Step>
        <Steps.Step title="第二步"></Steps.Step>
        <Steps.Step title="第三步"></Steps.Step>
    </Steps>, target)
```

## API

## Props

### Steps
| 配置项 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| className | additional class name added to wrap | string | | |
|current | 可选参数，指定当前处理正在执行状态的步骤，从0开始记数。在子Step元素中，可以通过status属性覆盖状态。 | number | 无 | 0|
|direction | 可选参数，指定步骤条方向（目前支持水平和竖直两种方向，默认水平方向）。 | string | vertical | 无 |
|maxDescriptionWidth | 可选参数，指定步骤的详细描述文字的最大宽度。 | number | 无 | 100 |
|showIcon | 步骤节点是否显示图标或数字 | bool | `true` or `false` | true |
|type | 步骤条类型 | string | `default` `title-on-top` or `long-desc` | `default` |
|showDetail | 可选参数[direction=vertical或type=long-desc不生效],是否显示详情面板[step的children] | bool | `true` `false` | `false` |
|currentDetail | 可选参数[direction=vertical或type=long-desc不生效],指定当前正在显示的详情面板，从0开始记数 | number | `0` ... | `0` |
|onChange | 可选参数[direction=vertical或type=long-desc不生效],指定步骤icon点击事件回调,参数为被点击步骤对应数字 | func |  | (v)=>{} |

### Steps.Step
| 配置项 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
|status | 可选参数，指定状态。当不配置该属性时，会使用父Steps元素的current来自动指定状态。 | string | wait, process, finish | wait |
|title | 必要参数，标题。 | string/jsx | 无 | 无 |
|description | 可选参数，步骤的详情描述。 | string/jsx | 无 | 空 |
|icon | 可选参数，步骤的Icon。如果不指定，则使用默认的样式。 | string/jsx | 无 | 空 |

