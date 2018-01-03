包括三个子Component：

* HBox：水平方向的弹性容器
* VBox：垂直方向的弹性容器
* Box：弹性元素

弹性容器(HBox和VBox)的可以多层嵌套的。

## Simple Usage

```js
import { Boxs } from 'saltui';

const { HBox, VBox, Box } = Boxs;

<HBox vAlign="center">
    <Box>60 * 60</Box>
    <Box>auto * auto</Box>
    <Box flex={1}>flex:1</Box>
</HBox>
```

## Props

className

* 描述：自定义样式的class名称。 
* 类型：String 
* 默认：'' 
* 必选：否

hAlign

* 描述：水平方向的对齐方式，仅适用于`HBox`和`VBox`
* 类型：String
* 范围：`start`，`center`，`end`，不设置则无对齐方式
* 默认：无对齐，此时，弹性元素的高度和弹性容器的高度相同
* 必选：否

vAlign

* 描述：垂直方向的对齐方式，仅适用于`HBox`和`VBox`
* 类型：String
* 范围：`start`，`center`，`end`，不设置则无对齐方式
* 默认：无对齐，此时，弹性元素的宽度和弹性容器的宽度相同
* 必选：否

flex

* 描述：弹性比例，适用于`HBox`、`VBox`和`Box`
* 类型：String
* 范围：`start`，`center`，`end`
* 默认：无对齐，此时，弹性元素的高度和弹性容器的高度相同
* 必选：否

通用的`props`也依然支持，比如`style`等。

## APIs

可以把`HBox`、`VBox`和`Box`看做是不同的`div`元素，所以`onClick`等原生事件默认支持。

