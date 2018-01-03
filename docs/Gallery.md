

图片轮播

<img src="https://img.alicdn.com/tps/TB1pu_pJFXXXXX2XFXXXXXXXXXX-640-320.png" width="300"/>


## Simple Usage

```javascript
var images = [{
    src: 'https://gw.alicdn.com/tps/TB1CO7CJpXXXXbQXpXXXXXXXXXX-690-431.jpg',
    name: '图片一',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1ZfsHJpXXXXchXXXXXXXXXXXX-640-387.jpg',
    name: '图片二图片二图片二图片二图片二图片二图片二图片二图片二图片二图片二图片二',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1iXo1JpXXXXbiXpXXXXXXXXXX-640-340.jpg',
    name: '图片三',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1mRFvJXXXXXbPXpXXXXXXXXXX-640-340.jpg',
    name: '图片一',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1HMQVJpXXXXbZXpXXXXXXXXXX-640-340.jpg',
    name: '图片一',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1X.oFJpXXXXbMXVXXXXXXXXXX-484-282.png',
    name: '图片一',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1E2M9JpXXXXXQXXXXXXXXXXXX-820-356.png',
    name: '图片一',
    href: 'http://domain.html'
},
{
    src: 'https://gw.alicdn.com/tps/TB1Qy3RJpXXXXcxXFXXXXXXXXXX-2000-680.jpg',
    name: '图片一',
    href: 'http://domain.html'
}];

<Gallery images={images}
    lazyLoad={false}
    showNav={true}/>
```

## Props

> 与 `Slide` 的参数一致，`Slide` 的参数可以 [[参考这里]](https://salt-ui.github.io/components/slide) ，此外还有两个额外参数：

### images

- 描述：要显示的图片数据，请参考上面的demo
- 类型：`Array`
- 默认：`null`
- 必选：**是**

示例：

```javascript
<Gallery images={images} showNav={true}/>
```

### lazyLoad

- 描述：是否启用懒加载，懒加载策略是会预先加载当前显示的图片及该张图片的前后两张
- 类型：`Boolean`
- 默认：`true`
- 必选：否

示例：

```javascript
<Gallery images={images} lazyLoad={true} showNav={true}/>
```

### onGalleryClick

- 描述：轮播点击事件处理，接收两个参数 `(imageIndex, imageData)`，图片的位置属性，图片对象
- 类型：`function`
- 默认：`null`
- 必选：否

示例：

```javascript
<Gallery images={images} onGalleryClick={(index, image) => console.debug(index, image)}/>
```

