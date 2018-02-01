

## Toast 浮层

目前包括 success/error/fail/loading/text 类型
## Simple Usage

```
Toast.show({
  type: 'success',
  content: '提交成功',
  onDidHide() {
      console.log('success tip is hidden');
  }
});
```

## APIs

### show(options)

#### options

type

* 描述：内置的集中类型，包括success，error，fail，loading.
* 类型：String
* 默认：''
* 必填：否

content

* 描述：提示文字
* 类型：String
* 默认：''
* 必填：否

autoHide

* 描述：是否自动隐藏
* 类型：Boolean
* 默认：true
* 必填：否

icon

* 描述：使用自定义的icon
* 类型：Icon Element
* 默认：''
* 必填：否

```jsx
import IconCheckRound from 'salt-icon/lib/CheckRound';

Toast.show({
  type: 'success',
  content: '提交成功',
  icon: <IconCheckRound />,
  onDidHide() {
    console.log('success tip is hidden');
  }
});
```

duration

* 描述：自动关闭的时间，单位ms
* 类型：Number
* 默认：1500
* 必填：否

onDidHide

* 描述：关闭后的回调函数
* 类型：Function
* 默认：noop
* 必填：否

width

* 描述：宽度
* 类型：String，Number
* 默认：'auto'
* 必填：否

height

* 描述：高度
* 类型：String，Number
* 默认：'auto'
* 必填：否

onDidHide

* 描述：关闭后的回调函数
* 类型：Function
* 默认：noop
* 必填：否

hasMask

* 描述：是有遮罩层
* 类型：boolean
* 默认：false
* 必填：否

transitionName

* 描述：动画名称（目前只支持轻toast和默认居中框）
* 类型：string
* 默认：'fix-top',包括'fix-top', 'fix-bottom'
* 必填：否

#### hide(onDidHide)

