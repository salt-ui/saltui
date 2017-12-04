
一句话描述
![img](https://img.alicdn.com/tfs/TB11PhARVXXXXXDXFXXXXXXXXXX-337-855.png)

## Simple Usage

## Props

Menu API

| name     | description    | type     | default
|----------|----------------|----------|--------|
|className| 额外类名 | string | |
|style | 根节点样式 | object | {} |
|multiple | 是否多选 | boolean | false |
|selectedKeys | 当前选中的菜单项 key 数组 | array | [] |
|openKeys | 当前展开的菜单项 key 数组 | array | [] |
|onSelect | 被选中时调用，参数 {item, key, selectedKeys} 对象 | function | 无 |
|onDeselect | 取消选中时调用，参数 {item, key, selectedKeys} 对象，仅在 multiple 生效 | function | 无 |
|onClick | 点击 menuitem 调用此函数，参数为 {item, key} | function | 无 |

#### MenuItem props

|名称|描述|类型|
|----|---|---|
|title|显示的标签|string/ReactElement|
|key|item 的唯一标志| string/number |
|disabled|是否可选| bool|

