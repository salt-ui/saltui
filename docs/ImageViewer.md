### .show()

描述：显示大图

示例1：直接显示弹窗

```javascript
const viewer = ImageViewer.show({
  photos: [
    { src: '图片地址' }
  ], // required
  current: 1, // optional 当前显示在第几张，默认为 0。
});

viewer.remove(); // 在页面或者 React 组件销毁时调用，通知 viewer 销毁。
```
