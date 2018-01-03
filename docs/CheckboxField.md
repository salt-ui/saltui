
复选框犹如韩信点兵，多多益善。

slot交互方式的截图:
![](https://img.alicdn.com/tps/TB1aBwhOpXXXXXsXXXXXXXXXXXX-325-458.png)

list交互方式的截图 
![](http://gtms03.alicdn.com/tps/i3/TB1w9vZJFXXXXceXFXX8ziN1XXX-322-193.png)

## Simple Usage

```javascript
let CheckboxFieldProps = {
    data:[
        {
            value:"1",
            checked:false,
            content:(<div>你好</div>),
            disable:false
        },
        {
            value:"2",
            checked:true,
            content:"他好",
            disable:true
        },
        {
            value:"3",
            checked:true,
            content:"我也好",
            disable:false
        },
        {
            value:"4",
            checked:false,
            content:"大家都好",
            disable:true
        }
    ],
    onChange:function(value,index,data) {
        console.log(value,index,data)
    }
}
return <div>
    <CheckboxField {...CheckboxFieldProps}/>
</div>
```


## Props
#### className

描述：自定义的扩展样式名称

类型：`String`

默认： `''`

必填：否


### mode

描述：交互方式, 有slot和list两种交互。

类型：`String`

默认：`'slot'`

必选：否


#### label

描述：一个checkbox组的label

类型：`String`

默认：空字符串

必填：否


#### data

描述：复选框所需数据

类型：`Array`

数组对象：
```javascript
{
    value: '', // 当前复选框的value
    checked: false, // 非必填，默认为false，是否选中，Boolean
    content: '', // 非必填，默认空文本，文本域填充内容，String/JSX。该属性原名text，可继续使用，但不推荐。
    disable: false, // 非必填，默认false，是否禁用，Bollean
    slotText: '', // 非必填，当mode='slot'时，选中后的展示值，String，如果该值不存在，则取text值
}    
```

默认：`[]`

必填：否


#### onChange

描述：点击按钮的回调

类型：`Function`  

默认：`function (data) {}`

必填：否

注入的参数:   
data，当前选中的数据


### readOnly

描述：是否只读。

类型：`Boolen`

默认：`false`

必选：否


### slot交互方式特有的属性


### placeholder

描述：提示文案。

类型：`String`

默认：`''`

必选：否


### confirmText

描述：确认文案。

类型：`String`

默认：`'完成'`

必选：否


### cancelText

描述：取消文案。

类型：`String`

默认：`'取消'`

必选：否


### maskCloseable

描述：是否可以关闭遮罩层。

类型：`Boolen`

默认：`true`

必选：否


### list交互方式特有的属性

#### groupListFlag

描述：是否使用 Group 来布局 Checkbox

类型：`Boolen`

默认：`true`

必填：否


#### groupListArgument

描述：如果 groupListFlag 为 true，可以传入 Group 相关参数。参考 `https://salt-ui.github.io/components/group`

类型：`Object`

默认：  
```
{
    lineIndent:0,
    itemIndent:18
}
```

必填：否


#### iconPosition

描述：icon的位置

类型：String

默认：'left' // 'left'、'right'

必填：否


## APIs
#### getData()

描述：获取当前选中数据

类型：Function

### 注意事项

点击disable的复选框，不会触发用户注册的回调函数。

