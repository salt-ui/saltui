
一句话描述
一张截图

## Simple Usage

## Props

## APIs

### .show()

描述：显示大图

示例1：直接显示弹窗

```javascript
ImageViewer.show({
  photos: [
    { src: '图片地址' }
  ], // required
  current: 1, // optional 当前显示在第几张，默认为 0。
})
```