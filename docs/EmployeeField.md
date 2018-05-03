

# 人员选择表单域

该组件依赖于钉钉 API，非钉钉容器内仅提供查看。

## Simple Usage

```js
<EmployeeField
  label="选择人员"
  placeholder="请选择"
  value={this.state.value}
  corpId={'xxxxxxxxx'}
  onChange={(value) => { this.onChange(value); }}
/>
```

## Props

| 配置项        | 类型        | 必填    | 默认值  | 功能/备注                      |
| ---------- | --------- | ----- | ---- | -------------------------- |
| className  | string    | No |   | 自定义的当前组件容器上对应的类名               |
| corpId | string    | Yes | ''  | 调用钉钉api所使用的企业id                     |
| placeholder     | string      | No | '' | 占位符                 |
| multiple     | bool      | No |   Yes   | 是否允许多选 |
| isNeedSearch     | bool      | No |   Yes   | 是否需要搜索 |
| locale     | string      | No |   'zh-cn'   | 语言 |
| startWithDepartmentId     | number      | No |    -1  | -1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持) |
| readOnly     | bool      | false |   No   | 是否只读 |
| value     | array      | No |   []   | 值 |
| onChange     | func      | No |      | function(list){} |
| enableNW | bool | No | false | 内部应用使用，是否在内外容器中启用，注意：内外需要在 loader 版本不小于 0.1.30，且内外容器版本不小于 v3.5.0 的情况下才可以开启使用 |

- 钉钉api接受的参数，请查看[这里](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.Du9ebD&treeId=171&articleId=104926&docType=1)

## Value 

| 配置项        | 类型        |意义        |
| ---------- | --------- | --------- |
| label  | string  | 显示的标签 |
| key | string  | 工号 |
| avatar | string | 头像 |

```js
[{
  label: '欧阳震华',
  key: '023456',
  avatar: 'https://gw.alicdn.com/tfs/TB1D9YIkb9YBuNjy0FgXXcxcXXa-200-200.jpg',
}]
```

