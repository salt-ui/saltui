# tingle-menu [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-menu.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-menu)
一句话描述
![img](https://img.alicdn.com/tfs/TB11PhARVXXXXXDXFXXXXXXXXXX-337-855.png)


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

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-menu/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)
