
一句话描述
一张截图

## Simple Usage

## APIs


### .show(content: React.Element, options: Object): instance

`options` 可选项：

- maskClosable (bool) - 点击蒙层是否允许关闭，默认允许
- animationType (string) - 弹出动画类型 `slide-up` (默认，向上划出)、`slide-down` 、`slide-left`、 `slide-right`
- className (string) - popup 区域的顶级样式类名
- transitionName (string) - 自定义显示隐藏变换动画
- maskTransitionName (string) - 自定义遮罩层变换动画
- onMaskClose (function) - 遮罩层关闭时的回调，支持返回 Promise

返回 `instance` 实例：

- hide: 关闭该 instance
- instanceId: 每个实例的 id
- update: 实例的 update 方法，从外部向 content 传递数据时需要调用。

### .hide():

关闭 Popup

## Props 

```jsx
<Popup>
  <div> 这里是 Trigger</divv>
</Popop>
```

属性 | 类型 | 必填 | 说明
----|------|-----|-----
content | React Element | 是 | Popup 里的内容
visible | Bool | 否 | 传值后进入受控模式，maskClosable 失效

其他 Options 的可选项都可以传入 props，如

```jsx
<Popup className="custom">
  <div> 这里是 Trigger</divv>
</Popop>
```
