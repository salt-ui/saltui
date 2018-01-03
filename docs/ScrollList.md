

专注滑动列表, 功能: 下拉刷新，上拉加载更多,迭代渲染List, 渲染OtherItem+Repeat Item,见Demo

![](https://img.alicdn.com/tfs/TB1Ou9eQXXXXXXSXXXXXXXXXXXX-364-648.gif)


## note

- ScrollList 组件所在的容器必须要限定高度
- 传给 ScrollList 的子组件, 只有最后一个会用后端返回的数据循环渲染, 其他子组件正常渲染, 详见 Demo
- 如果要使用内置数据源(数据加载在组件内部完成), 需要给 ScrollList 传 url, 这时自定义数据源相关的属性不需要传, 相反不需要传内置数据源相关属性


## 使用内置数据源的Demo

```
const Item = (props) => <div className="demo-item">{`${props.index} ${props.name}`}</div>;

<ScrollList
  url={'http://dip.alibaba-inc.com/api/v2/services/schema/mock/36906.jsonp'}
  pageSize={10}
  beforeFetch={(data) => data}
  processData={(data) => data}
>
  <Item />
</ScrollList>

// url接口返回的数据结构如下:
{
  "content": {
    "data": [{
        "name": "小王",
      }]
    "currentPage": 1,
  },
  "success": true
}
// 注意: 后端如果没有返回currentPage字段, 需要前端自己在processData里处理
```


## 自定义数据源Demo
```

const Item = (props) => <div className="demo-item">{`${props.index} ${props.name}`}</div>;
const Other1 = () => <div className="demo-item other1">{'Other1'}</div>;
const Other2 = () => <div className="demo-item other2">{'Other2'}</div>;

function getJsonp(page, size) {
  const now = (new Date()).getTime();
  const url = `http://dip.alibaba-inc.com/api/v2/services/schema/mock/36906.jsonp?callback=jsonpCallbak&currentPage=${page}&pageSize=${size}&rnd=${now}`;
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataGetted: false,
      data: [],
      hasError: false,
      pageSize: 10,
      currentPage: 1,
      loading: false,
      refreshing: false,
    };

    this.fetchTimes = 1;
  }

  onRefresh() {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.bindJsonpCallback((noMore, items) => {
        this.setState({
          refreshing: false,
          dataGetted: true,
          data: this.state.data.concat(items),
          currentPage: 1,
          noMore: true,
          hasError: false,
        });
      }, () => {
        this.setState({
          refreshing: false,
          dataGetted: true,
          noMore: true,
          hasError: true,
        });
      });

      getJsonp(1, this.state.pageSize);
    }, 2000);
  }

  onLoad() {
    const curr = this.state.currentPage;

    this.setState({ loading: true });

    setTimeout(() => {
      this.bindJsonpCallback((noMore, items) => {
        this.setState({
          loading: false,
          dataGetted: true,
          data: this.state.data.concat(items),
          currentPage: curr + 1,
          noMore,
          hasError: false,
        });
      }, () => {
        this.setState({
          loading: false,
          dataGetted: true,
          noMore: false,
          hasError: true,
        });
      });
      getJsonp(curr, this.state.pageSize);
    }, 2000);
  }

  bindJsonpCallback(success, error) {
    const i = this.fetchTimes;

    window.jsonpCallbak = (data) => {
      if (this.fetchTimes !== i) return;

      if (!data || !data.success) {
        error();
      } else {
        const items = data.content.data;
        const hasNoMore = !items || items.length < this.state.pageSize;

        success(hasNoMore, items);
      }
    };
  }

  render() {
    return (<div >
      <div className="container">
        <ScrollList
          className="scroll-list-demo"
          dataGetted={this.state.dataGetted}
          data={this.state.data}
          hasError={this.state.hasError}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          loading={this.state.loading}
          onLoad={this.onLoad.bind(this)}
        >
          <Other1 />
          <Other2 />
          <Item />
        </ScrollList>
      </div>
    </div>);
  }
}
```


## Props

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|className|optional|string|''|className
|scrollRefresh|optional|bool|true|是否需要下拉刷新|
|scrollLoad|optional|bool|true|是否需要上拉加载更多|
|pullLoadTip|optional|string|'下拉显示更多'|下拉加载更多的提示文案|
|loadDataTip|optional|string|'释放加载数据'|释放加载数据的提示文案|
|loadingTip|optional|string|'加载中...'|数据加载中的提示文案|
|noMoreDataTip|optional|string|'没有更多了'|没有更多数据的提示文案|
|errorTip|optional|string|'获取数据失败'|数据加载出错的提示文案|
|noDataImage|optional|string|'https://img.alicdn.com/tps/TB1K6mHNpXXXXXiXpXXXXXXXXXX-1000-1000.svg'|没有数据的背景图|
|noDataTip|optional|string|'暂无数据'|没有数据的提示文案|
|fetchDataOnOpen|optional|bool|true|组件初始化时是否自动加载数据, 如果不自动加载后面请用fetcthData手动加载|



### 自定义数据源相关属性

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|dataGetted|required|bool|false|数据是否加载完成|
|data|required|array|[]|传给组件的数据|
|refreshing|required|bool|false|下拉刷新是否在刷新中|
|loading|optional|bool|false|触底加载是否正在加载中|
|onRefresh|required|func|null|下拉刷新回调|
|onLoad|required|func|null|触底刷新的触发方法|
|noMore|optional|bool|false|没有更多数据标志位|
|hasError|required|bool|false|加载数据时是否出错|

### 内置数据源相关属性

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|url|required|string|''|数据源的请求地址|
|dataType|optional|string| |可以是json或者是jsonp|
|pageSize|optional|number|10|分页大小|
|beforeFetch|optional|func| |用于处理请求前的参数|
|processData|optional|func| |用于处理请求后的数据|
|currentPageKey|optional|string|'currentPage'|分页参数的key, 当后端的分页参数不叫currentPage时用到|


## Item.Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|img|string|optional| - | 头像或图片 |
|title|string|optional| - | 标题 |
|description|string|optional| -| 描述 |
|extra|React Element|optional| - | 右侧自定义区域 |
|desMaxLine|number|optional| 2 | 描述占据几行 |



### 1.x里的属性(在2.x中已经废弃)

|属性名称|required|数据类型|默认值|备注|
|---|---|---|---|---|
|~~cache~~|~~optional~~|~~bool~~|~~true~~|~~是否缓存数据~~|
|~~options~~|~~optional~~|~~object~~| |~~传给iscroll的参数~~|
|~~pushLoadTip~~|~~optional~~|~~string~~| |~~上推加载更多的提示文案~~|




## 2.x 和 1.x 之间的差异

#### 删除属性

* 删除 iscroll 的 `options` 属性
* 删除 `pushLoadTip`
* 删除 `cache` 属性

#### 删除 API

* 删除 `clearCache` 方法

#### 添加的属性

* 增加 `refreshing` 属性
* 增加 `loading` 属性
* 添加 `noMore` 属性

#### 运行机制变动

* 使用 `ScrollView` 封装实现，去除了 `iscroll` 的依赖
* 底部加载的交互方式从手动上拉加载更换为触底自动加载
* `onLoad` 回调分解为两个方法：`onRefresh` 和 `onLoad`。分别对应下拉刷新和触底加载的回调。

#### 注意事项

* 新版本的 dom 结构和 class 名称有变化，做了自定义样式的同学需要验证一下新版本的展示是否正确
* onLoad的使用方式有变化，分解为了 `onRefresh` 和 `onLoad`




## APIs
### fetchData(from)
手动触发重新数据加载
 from: 标记是从哪里触发的数据加载, 这个参数会传给beforeFetch, 组件里用top和bottom分别表示顶部下拉刷新和底部上拉加载更多

### ~~clearCache~~
~~如果已经加载的某些数据发生了变化可以在组件渲染前调用clearCache来清除缓存数据~~



## 相关组件

* [ScrollView](https://salt-ui.github.io/components/scroll-view)
* [Refreshcontrol](https://salt-ui.github.io/components/refreshcontrol)
* [InfiniteScroll](https://salt-ui.github.io/components/infinite-scroll)


