用于头像显示, 如果没有头像则根据名字随机生成一个带背景颜色的头像，如果没有名字则显示一个默认图片。可给人员或公司默认 logo 等场景使用。

  头像生成规则如下：
  1. 定义一组颜色集合
  2. 通过名字来计算 hashCode ，hashCode 算法采用 java 中的 hashCode 实现方式， __如果和客户端同时开发项目，请注意和 ios/android 同学沟通保持一致的 hash算法__（可以通过 Avatar.hashCode('xxx'); Avatar.hashCode('xxx', true); 来测试 hash 值）。计算结果默认为 int 型（可能会为负数），也可通过传入 isLong: true 得到 long 型（过长会用科学计数法表示）。
  3. 将 hashCode 取绝对值，对颜色集合的总数进行取模，得到颜色的索引，即得到了背景颜色
  4. 名字显示规则
   * 纯英文，逗号点号多个空格都用一个空格替换。如果不存在空格则返回前两个字符，否则返回按空格分隔开来的第一串和第二串字符的首字符（比如Keyu Lin 显示KL）
   * 非纯英文，移除逗号点号多个空格后返回最后两个字符
   

  <img src="https://img.alicdn.com/tfs/TB1c3NBgMvD8KJjy0FlXXagBFXa-348-954.png" width="375"/>

## Simple Usage

```jsx
import {Avatar, Context} from 'saltui';

let global = Context.getGlobal('avatar');
global.colors = ['green', 'grey', 'orange', 'blue', 'red'];
global.defaultSrc = 'https://img.alicdn.com/tps/TB1.IgIKpXXXXbgXpXXXXXXXXXX-116-116.png';
class Demo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="avatar-demo">
                <Avatar name="天晟"/>
                <Avatar name="马天明"/>
                <Avatar name="欧阳夏丹"/>
                <Avatar src="" name="saltui"/>
                <Avatar src="https://img.alicdn.com/tps/TB1amOaKpXXXXbsXVXXXXXXXXXX-144-144.png"/>
                <Avatar />
            </div>
        );
    }
};

module.exports = Demo;
```

## Props

#### className

描述：自定义 class 属性

类型：`string`

默认：''

必填：否

#### colors

描述：用来生成背景的颜色集合，可通过 Context 进行全局设置， 也可以通过 props 传入

类型：`Array<string>`

默认：['#78C06E', '#3BC2B5', '#78919D', '#5EC9F6', '#F6BF26']

必填：否

#### ~~defaultColor~~

状态：**deprecated**，请配置 colors 为单元素数组

描述：固定背景颜色，若传入此参数，则背景颜色为当前参数颜色

类型：`string`

默认：''

必填：否

#### defaultSrc

描述：没有名字是显示的默认头像图片地址， 可通过 Context 进行全局设置， 也可以通过 props 传入

类型：`string`

默认：https://img.alicdn.com/tps/TB1.IgIKpXXXXbgXpXXXXXXXXXX-116-116.png

必填：否

#### hashCode

描述：hashCode 算法， 可通过 Context 进行全局设置， 也可以通过 props 传入(不建议自定义)

类型：`function`

默认：java 默认的 hashCode 算法

必填：否

#### icon

描述：图标

类型：`React.Element`

默认：null

必填：否

#### isLong

描述：hashCode 的类型

类型：`boolean`

默认：false

必填：否

#### name

描述：名字

类型：`string`

默认：''

必填：否

#### size

描述：头像大小

类型：`string` | `number`

默认：'normal'

可选值：'normal' | 'large' | ’50px‘

必填：否

#### src

描述：头像图片链接

类型：`string`

默认：''

必填：否

#### style

描述： 应用在最外层元素的自定义style

类型：`object`

默认：{}

必填：否

## APIs

### Avatar.hashCode(name, isLong)

静态方法，计算名字的 hashCode，__如果和客户端同时开发项目，可通过此方法测试 hashCode是否和 ios/android 同学保持一致__

### Avatar.formatName(name)

静态方法，按照名字显示规则返回名字

