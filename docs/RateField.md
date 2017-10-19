# tingle-rate-field [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-rate-field.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-rate-field)

评分展示表单

![tingle-rate-field](https://img.alicdn.com/tfs/TB1HiJgQXXXXXb3apXXXXXXXXXX-396-410.png)

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

```js
<Rate totalScore={5} width={18} gap={7} score={t.state.score} showTip={true} rateTip={['不合格','合格','良好','优秀','卓越']} isCenter={false} onChange={t.handleChange.bind(t)} />
```

## Props

该组件继承自 [tingle-field](https://salt-ui.github.io/components/tingle-field)，继承基类的全部 props

#### className

描述：自定义样式的class名称。

类型：String

默认：''

必选：否



#### total

描述：icon的个数，即总分。

类型：Number

默认：5

必选：否



#### gap

描述：每一项的padding-let 和 padding-right的总和。但第一项的padding-let和最后一项padding-right均为: 0 !important。

类型：Number 或 String

默认：10

必选：否


#### value

描述：默认已得到的分数。

类型：Number

默认：0

必选：否


#### showTip

描述：评分后是否显示结果提示。

类型：Boolean

默认：true

必选：否


#### scoreTips

描述：评分后结果提示。

类型：Array

默认：["不满意", "一般", "基本满意","满意", "非常满意"]

必选：否


#### onChange

描述：回调函数，会返回选中的分数onChange(currentScore)。

类型：Function

默认：noop

必选：否

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-rate-field/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)
