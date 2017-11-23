# tingle-field [![tnpm version](http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-field.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@ali/tingle-field)

基础表单域

![](http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/tingle-ui/tingle-ui/3ec396b0848940e8ef9d3b4a03889140/image.png)

## Install

```
tnpm install @ali/tingle-field --save
```

## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### label

描述：表单域label文字标签

类型：String

默认：''

必填：否

#### tappable

描述：是否有 tap 效果

类型：Boolean

默认：false

必填：否

#### multiLine

描述：是否多行显示模式

类型：Boolean

默认：false

必填：否

#### icon

描述：传入 icon 可以显示右侧图标, icon 为 tingle-icon 的使用参数, 如 `{name: 'angle-right', fill: '#ccc'}`, 图标支持tingle-icon-souce里的全局图标,详见http://gitlab.alibaba-inc.com/tingle-ui/tingle-icon-source

类型：Object

默认：{}

必填：否

#### layout

描述：label 布局,支持上下结构`v`和左右结构`h`,

类型：String

默认：'h'

必填：否

#### required

描述：是否显示星号（必填）

类型：Boolean

默认：false

必填：否

#### tip

描述：提示信息,

类型：String/React Element

默认：''

必填：否

#### errMsg

描述：错误信息, 非空时会显示错误提示

类型：String/React Element

默认：''

必填：否

#### extra

描述：放一些额外的元素(比如: 图标),

类型：String/React Element

默认：''

必填：否

## Static Method

* Field.getFieldProps(props): 获取所有可以传给 Field 的 props，返回值为一个对象。

## Simple Usage

```
    class Demo extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render() {
            return (
                <div>
                    <Group.List>
                        <Field layout='v' label="上下结构" icon={{name: 'angle-right', fill: '#ccc'}}>
                            <div>自定义输入元素的区域, 带图标</div>
                        </Field>
                    </Group.List>
                </div>
            );
        }
    };

```

