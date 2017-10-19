# tingle-icon

## 预览
![image](https://img.alicdn.com/tfs/TB1UTkQSXXXXXXQaXXXXXXXXXXX-1068-2376.png)

## Install

```
tnpm install @ali/tingle-icon --save

```

### 使用

- 方式一（推荐）：

```js
import Eye from '@ali/tingle-icon/lib/Eye';

render() {
    return <Eye />
}
```

- 方式二：

```js
import Icon from '@tingle-icon';

render() {
    return <Icon name='icon-name'/>
}
```

- 方法三：（不推荐）

```js
import Icon from '@tingle-icon/dist/Symbol';

render() {
    return <Icon name='icon-name'/>
}
```

使用 symbol & use 的方式使用 Icon，主要是为了兼容老的方案


## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

#### name

描述：`icon`所对应的`svg`文件的命名。

> 注意：写名称即可，不是写路径。

类型：String

默认：''

#### fill

描述：icon 颜色

类型：String

默认：'#000'

#### width

描述：icon 宽度

类型：Number/String

默认：'32px'

#### height

描述：icon 高度

类型：Number/String

默认：'32px'

#### onClick

描述：事件

类型：Function

默认：`() => {}`

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-icon/issues)