

人员选择表单域


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
| className  | string    | false |   | 自定义的当前组件容器上对应的类名               |
| corpId | string    | true | ''  | 调用钉钉api所使用的企业id                     |
| placeholder     | string      | false | '' | 占位符                 |
| multiple     | bool      | false |   true   | 是否允许多选 |
| isNeedSearch     | bool      | false |   true   | 是否需要搜索 |
| locale     | string      | false |   'zh-cn'   | 语言 |
| startWithDepartmentId     | string      | false |    -1  | -1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持) |
| readOnly     | bool      | false |   false   | 是否只读 |
| value     | array      | false |   []   | 值 |
| onChange     | func      | false |      | function(list){} |

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
  avater: 'http://www.xxxxxx.com/aaa.jpg',
}]
```

