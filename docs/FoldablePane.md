

折叠面板组件。

## Simple Usage

```jsx
<FoldablePane
  className="my-test-demo-foldable"
  foldHeight={300}
  isFold
  onFold={(foldStatus) => { alert(foldStatus); }}
>
  <h1>开发原则</h1>
  <p>我们的开发原则 ...</p>
</FoldablePane>
```

## Props

| 配置项        | 类型        | 必填    | 默认值  | 功能/备注                      |
| ---------- | --------- | ----- | ---- | -------------------------- |
| className  | string    | false |   | 自定义的当前组件容器上对应的类名               |
| foldHeight | number    | false | 240  | 折叠高度                       |
| isFold     | bool      | false | true | 初始化状态时是否折叠                 |
| onFold     | func      | false |      | 点击折叠按钮后的回调函数，第一个参数为当前的折叠状态 |


