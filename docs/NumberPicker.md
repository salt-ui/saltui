

数字步进器。

![更改.png](https://work.alibaba-inc.com/aliwork_tfs/g01_alibaba-inc_com/tfscom/TB1FvvoQpXXXXXmapXXXXXXXXXX.tfsprivate.png)

## Props

属性 | 类型 | 默认值| 描述
---- | ---- | ----- | ----
|className|string|-|自定义class|
|useTouch|boolean|true|是否使用touch事件|
|showNumber|boolean|true|是否显示数字|
|focusOnUpDown|boolean|false|开启键盘上下键进行加减,注意：当设置为true时，在移动端点击按钮时会调出键盘|
|value|number|0|默认值|
|max|number|-|最大值|
|min|number|-|最小值|
|step|number|1|步长，可以为小数|
|onChange|optional|-|变化时回调函数|
|readOnly|boolean|false|只读状态 不可编辑（目前按钮也不可操作）|
|disabled|boolean|false|是否禁用|

## Demo

```
class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleValueChange(newValue) {
        this.setState({
            value: newValue
        });
    }

    render() {
        let t = this;
        return (
            <NumberPicker value={t.state.value} max={4} step={1} onChange={t.handleValueChange.bind(t)} />
        );
    }
};

```


