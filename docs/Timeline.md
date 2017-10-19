# tingle-timeline [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-timeline.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-timeline)
用时间线来记录时间的过程和结果，方便查看与追溯

![img](https://img.alicdn.com/tfs/TB1lqmzRFXXXXc0aXXXXXXXXXXX-750-1334.png)

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
```javascript
<Timeline>
  <Timeline.Item
    description="2017/05/10"
    active
  >
    设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
  </Timeline.Item>
  <Timeline.Item
    description="2017/04/10"
  >
    <div className="txt">设计平台是信息平台UED重要的基石。</div>
  </Timeline.Item>
  <Timeline.Item
    description="2017/03/10"
  >
    设计平台是信息平台UED重要的基石。是团队进行设计活动所依赖的标准和方法。是为乐高提供设计元素和规则的基础平台。
  </Timeline.Item>
  <Timeline.Item
    description="2017/02/10"
  >
    设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
  </Timeline.Item>
  <Timeline.Item
    description="2017/01/10"
  >
    设计平台是信息平台UED重要的基石，是团队进行设计活动所依赖的标准和方法。
  </Timeline.Item>
</Timeline>
```

## Timeline.Item Props
属性 | 类型 | 默认值| 描述
---- | ---- | ----- | ----
color | string | - | 配置点和线的颜色
icon | object | - | 配置icon
description | object | - | 配置描述项
active | bool | false | 某一项是否高亮

## APIs

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-timeline/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)


