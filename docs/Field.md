

基础表单域

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

描述：传入 icon 可以显示右侧图标, icon 可以是 salt-icon 的图表实例，如 `import Eye from 'salt-icon/lib/Eye';`

类型：React Element

默认: 无

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

#### showErrInTip

描述：默认错误提示显示在 tip 区域，如果希望收缩在一个 icon 当中，通过 toast 显示出来则设置为 false

类型：Boolen

默认：true

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

