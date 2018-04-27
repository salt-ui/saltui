

## 搜索条

<img src="//gw.alicdn.com/tps/TB1LDd6LXXXXXbkXXXXXXXXXXXX-684-92.png" width="342">

<img src="//gw.alicdn.com/tps/TB1TCV9LXXXXXXgXXXXXXXXXXXX-684-352.png" width="342">


## Simple Usage

```html
<SearchBar
  onSearch={(value)=> {
    console.info(`Do search>>${value}`);
  }}
/>

<SearchBar.WithContainer
  onSearch={(value)=> {
    console.info(`Do search>>${value}`);
  }}
>
  {this.renderSearchResult()}
</SearchBar.WithContainer>
    
```

## from 1.x -> 3.x

SearchBar 本身只关心本身自己的逻辑，移除history 和 result 面板，原有功能改用通过 SearchBar.WithContainer 实现。

## Props

| 配置项        | 类型        | 必填    | 默认值  | 功能/备注                      |
| ---------- | --------- | ----- | ---- | -------------------------- |
| className | `String` | 否 | - | 自定义样式的`class`名称 |
| placeholder | `string`  或 i18n `object` | 否 | `'{'zh-cn': '搜索', 'en-us': 'Search'}` | 
| locale | `string` | 否 | `zh-cn` | 语言，zh-cn 或 en-us |
| value | `string` | 否 | - | 填充值 |
| instantSearch | `boolean` | 否 | `true` | 是否开启即时搜索，即输入过程中触发搜索，和属性searchDelay配合使用 |
| searchDelay | `number` | 否 | `350` | 触发频率限制，输入过程中多少毫秒后未输入才触发搜索 |
| exitAfterEnter | `boolean` | 否 | `false` | 是否在回车后退出搜索模式 | 
| onSearch | `funtion` | 否 | noop | 搜索触发 callback |
| onChange | `funtion` | 否 | noop | 输入内容变化 callback (from为变化来源 输入'input'和清空'clear') |
| onEnter | `funtion` | 否 | noop | 进入搜索模式 callback |
| onExit | `funtion` | 否 | noop | 退出搜索模式 callback |

## WithContainer.Props (WithContainer 通过 SearchBar.WithContainer 获取)

| 配置项        | 类型        | 必填    | 默认值  | 功能/备注                      |
| ---------- | --------- | ----- | ---- | -------------------------- |
| hasHistory | `boolean` | 否 | `true` | 是否开启搜索历史功能，搜索历史保存于localstorage中，key名使用属性historyName |
| historyName | `string` | 否 | `'SEARCH_BAR_HISTORY'` | 历史记录存储键名 |


