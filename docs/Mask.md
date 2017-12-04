

提供蒙层基础服务


## Simple Usage

```js

import { Mask } from 'saltui';

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maskVisiable: false
        }
    }

    showMask() {
        this.setState({
            maskVisiable: true
        });
    }

    handleWillHide() {
        console.log('mask will hide');
        // 如果返回false 则Mask是不能关闭的
        //return false;
    }

    handleDidHide() {
        console.log('mask did hide');
    }

    render() {
        let t = this;
        return (
            <div>
                <h3 onClick={t.showMask.bind(this)}>点击打开mask</h3>
                <Mask visiable={t.state.maskVisiable}
                      onWillHide={t.handleWillHide.bind(t)}
                      onDidHide={t.handleDidHide.bind(t)}
                />
            </div>
        );
    }
}
```

## Props

#### className

自定义样式的class名称。 

* 类型：String 
* 默认：'' 
* 必选：否

#### closeable

决定Mask是否可以关闭。如果是false，则不会执行`onWillHide`。

* 类型：Boolean 
* 默认：true
* 必选：否

#### opacity

样式透明度。 

* 类型：Number 
* 默认：0.6
* 范围：0~1
* 必选：否

#### onWillHide

当`closeable`为`true`时，则关闭之前会执行该事件，如果该事件返回`false`，则阻止关闭。 

* 类型：Function 
* 默认：空函数
* 必选：否

#### onDidHide

Mask关闭后执行的事件。 

* 类型：Function 
* 默认：空函数 
* 必选：否

#### visible

Mask是否显示。依赖Mask的组件，需要通过切换该值来控制Mask是否可见。

* 类型：Boolean 
* 默认：false
* 必选：否

#### zIndex

样式的Z轴数值。 

* 类型：Number 
* 默认：1000
* 必选：否

#### renderToBody

是否渲染到body中。

* 类型：Boolean
* 默认：true
* 必选：否

## APIs

无

