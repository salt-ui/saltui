# tingle-pagination [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-pagination.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-pagination)
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

参数 | 说明 | 类型 | 默认值
--- | --- | --- | ---
className | 给组件添加额外 className | string | ''
locale | 语言(zh-cn/en-us) | string | zh-cn
current | 当前页 | number | 1
total | 数据总数 | number/jsx | 0
pageSize | 每页条数 | number | 10
onChange | 页码改变的回调，参数是改变后的页码 | function | noop
simple | 当添加该属性时，显示为简单分页 | boolean | false

