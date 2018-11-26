

列表过滤器

## Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### options

描述：过滤器设置参数

类型：Array

默认：[]

必填：是

#### size

描述：显示过滤器个数

类型：Number

默认：4

必填：否

#### activeIndex

描述：默认激活的过滤器索引，-1 ~ (size - 1)

类型：number

默认：-1

必填：否


#### onSelect

描述：当过滤项被选中时触发

类型：Function

默认：() => {}

必填：否

#### onConfirm

描述：当通过点击确认按钮来处理批量选择时触发

类型：Function

默认: () => {}

必填：否

#### onReset

描述：当点击重置按钮时触发,

类型：Function

默认：() => {}

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

