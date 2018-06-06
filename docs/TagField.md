## 标签

## Props

### TagField props

|属性名称|必选|数据类型|默认值|备注|
|---|---|---|---|---|
|className|-|string|-|className
|onChange|-|function(tags)| noop | 添加或者删除时触发，返回被改变后的标签组

### TagField.Item props

|属性名称|必选|数据类型|默认值|备注|
|---|---|---|---|---|
|tag|yes|string| | 标签的值 |
|canDelete|no|bool|true|是否可以删除|

```jsx
<TagField.Item tag="标签一" />
```