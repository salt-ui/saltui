# tingle-scroll-view [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-scroll-view.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-scroll-view)
一句话描述

专注滑动列表, 功能: 下拉刷新，上来加载更多, 见Demo

![](https://img.alicdn.com/tps/TB1WtTVLXXXXXbbXVXXXXXXXXXX-387-521.gif)

### install

```
tnpm install @ali/tingle-scroll-list --save
```

## note

- tingle-scroll-view组件所在的容器必须要限定高度

## Simple Usage

```
  <ScrollView refreshControl={true} infiniteScroll={true}>
       <ItemOne/>
       <ItemTwo/>
       <RepeatItem/>
  </ScrollView>

```


## Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|refreshControl|required|bool|false| 是否需要下拉刷新功能，当需要此功能时，设置为true |
|refreshControlOptions|optinal|object|{}|下拉刷新的自定义配置项，参见RefreshControl的配置项|
|infiniteScroll|required|bool|false| 是否需要底部自动加载功能，当需要此功能时，设置为true |
|infiniteScrollOptions|optional|object|{}|底部自动加载的自定义配置项，参见InfiniteScroll的配置项|


