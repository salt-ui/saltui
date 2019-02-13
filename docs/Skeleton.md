
加载占位-骨架


## API

* node2skeleton(): 全局方法，详见常用方法三

### Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|className|string|optional|-|额外的顶级类名|
|animate|bool|optional|false|占位动画效果|
|row|number|optional|1|仅对Skeleton组件生效，加载条数|


### 常用方法一
``` javascript
  <Skeleton animate rows={2} type={1} />
```
type：1|2|3 对应于设计稿三种固化骨架
row：骨架图行数

### 常用方法二
``` javascript

  <Element className="skeleton-circle" animate style={{ width: 100, height: 100 }} />

  <Element className="skeleton-text-bar" animate />
  <Element className="skeleton-text-bar" animate style={{ width: '80%' }} />

  <Element className="skeleton-image-small" animate />

  <Element className="skeleton-image-big" animate />

  <Element className="skeleton-operation-left" animate />
  <Element className="skeleton-operation-mid" animate />
  <Element className="skeleton-operation-right" animate />
```
利以上几种原子组件，可自定义布局完成自己想要的骨架结构

### 常用方法三
``` javascript
  node2skeleton(document.querySelector('.testNode'));
```
用全局方法可以自动生成大致关于该节点以下的骨架图，用户可根据生成之后代码进行微调达到自己想要的效果


