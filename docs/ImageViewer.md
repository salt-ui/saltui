# tingle-image-viewer [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-image-viewer.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-image-viewer)
一句话描述
一张截图

## How to develop

### install

```bash
tnpm i salt-tools -g
npm run tnpm-dep 
npm start
```

### update

```bash
npm run tnpm-update
```

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

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-image-viewer/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)
