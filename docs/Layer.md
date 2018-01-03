

模态对话框的基础,但NB的是提供了9宫格定位功能，使用 top,left,bottom,right 等来定位任意你想要定位的位置


## Simple Usage

```
<Layer width="auto" bottom="0" right="0"  zIndex={888} visible={index === 1} onClick={this.handleClick.bind(this)}>
      <div style={{width: 100, height: 100, backgroundColor: 'red'}}></div>
</Layer>
```

## Props

onClick

* 描述：点击之后的响应事件
* 类型：function
* 默认：noop
* 必填：否

onHide

* 描述：关闭时的响应事件
* 类型：function
* 默认：noop
* 必填：否

zIndex

* 描述：使用自动生成机制，但用户也可以自定义传入 
* 类型：number
* 默认：无
* 必填：否

hasMask

* 描述：是有遮罩层
* 类型：boolean
* 默认：true
* 必填：否

visible

* 描述：是否直接展示 
* 类型：boolean
* 默认：false
* 必填：否

renderToBody

* 描述：是否把节点插入到body
* 类型：boolean
* 默认：true
* 必填：否

