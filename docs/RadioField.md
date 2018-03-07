

单选框。

![](http://gtms01.alicdn.com/tps/i1/TB1NxzWJFXXXXXiXVXXbLzyZVXX-320-194.png)


## Simple Usage
```javascript
let radioFieldProps = {
    data: [
    {
        value:"1",
        checked: true,
        content: (<div>你好</div>),
        disable: false
    }, 
    {
        value:"2",
        checked: false,
        content: "他好",
        disable: true
    }, 
    {
        value:"3",
        checked: false,
        content: "我也好",
        disable: false
    }, 
    {
        value:"4",
        checked: false,
        content: "大家都好",
        disable: false
    }
    ],
    onChange: function (value, index, data) {
        console.log(value, index, data);
    }
}
return <div>
    <RadioField {...radioFieldProps} />
</div>
```
## Props
#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### data

描述：复选框所需数据

类型：Array

数组对象：
```javascript
{
    value: undefined, // 非必填，默认为undefined，当前复选框的value值，any
    checked:true, // 非必填，默认为false，是否选中，boolen
    content:"hello boys", // 非必填，默认空文本，文本域填充内容，String/jsx。该属性原名text，可继续使用，但不推荐。
    disable:true // 非必填，默认false，是否禁用，bollen
}    
```


默认：空数组

必填：否

#### onChange

描述：点击按钮的回调

类型：Function  

默认：空函数

必填：否

注入的参数:  
- value，当前复选框数据  
- index，当前复选框索引  
- data，所有复选框数据  

#### groupListFlag

描述：是否使用 Group 组件来布局 Checkbox

类型：Boolen

默认：true

必填：否

#### label

描述：一个 checkbox 组的 label

类型：String

默认：空字符串

必填：否

#### required

描述：是否必填

类型：bool

默认：false

必填：否

#### groupListArgument

描述：如果 groupListFlag 为true，可以传入 Group 相关参数。参考 `https://salt-ui.github.io/components/group`

类型：Object

默认：  
```
{
    lineIndent:0,
    itemIndent:18
}
```

#### iconPosition

描述：icon的位置

类型：String

默认：'right' // 'left'、'right'

必填：否

#### mode

描述：支持单选以何种方式渲染

类型：String

默认：'default' // 'popup' 以 popup 方式展现

必填：否

#### readOnly

描述：如果 `type` 为 `popup` 的时候是否只读

类型：bool

默认：false

必填：否

#### formatter

描述：如果 `type` 为 `popup` 时在外层如何展示条目文本

类型：function

默认：item => item.label || item.content.toString()

必填：否


## APIs
#### getData(TO DO)

描述：获取复选框组数据

类型：Function

### 注意事项

1. 点击disable的复选框，不会触发用户注册的回调函数。
2. 单选框语义上你只能传入一个checked:true，如果你传入多个，我不阻止。
3. 当RadioField 为popup 模式下 Props 参考 Popup 的 Props 配置;
