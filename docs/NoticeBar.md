# tingle-notice-bar [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-notice-bar.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-notice-bar)

移动端的tip提示信息组件

 ![3e3c726c78b76f7c.png](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/15565/3e3c726c78b76f7c.png) 

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
render() {
  return (<div>
    <NoticeBar
            className="noticeMessage"
            message={'这是一个message这是这是这是这是这是这是这是这是这是这是'}
            type="info"
            visible={true}
            optionsType={"jumpto"}
            onClick={() => {
              console.log('1');
            }}
          />
  </div>)
}

```

## Props

### className

描述：自定义class

类型：string

默认：''

必填：否

### message

描述：notice 中提示的内容

类型：string / jsx

默认：''

必填：否

### type

描述：消息提醒的类型

类型：string

默认：'info'

目前支持：'info','success','error','warning'

必填：否

### optionsType

描述：后面操作的按钮类型，目前支持详情箭头还有关闭2种操作

类型：string

默认：''；支持的类型：'jumpto','close'

必填：否

### visible

描述：控制当前noticeBar 是否关闭

类型：Boolean

默认：true

必填：否

### onClick 

静态方法,点击noticeBar之后的callback;

### onClose

点击关闭按钮的时候的回调

## Links

- [Issues](http://gitlab.alibaba-inc.com/tingle-ui/tingle-notice-bar/issues)
- [README 标准写法](http://gitlab.alibaba-inc.com/tingle-ui/doc/blob/master/README%E6%A0%87%E5%87%86%E5%86%99%E6%B3%95.md)
