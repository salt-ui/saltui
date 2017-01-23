---
order: 0
title: basic
---



```jsx
const { Button } = SaltUI;

ReactDOM.render(
  <div>
    <Button>默认按钮</Button>
    <Button type="primary">主 按 钮</Button> 
    <Button type="secondary">次 按 钮</Button> 
    <Button type="danger">警告按钮</Button>
    <Button type="text">纯文本</Button>
    <Button type="primary" size="medium">中按钮</Button>
    <Button type="primary" size="large">大按钮</Button>
    <Button type="primary" size="small">小按钮</Button>
    <Button disabled={true}>不可点击</Button>
    <Button disabled={true} type="text">纯文本不可点击</Button>
    <Button disabled={true} size="small">不可点击</Button>
  </div>, mountNode
);
```