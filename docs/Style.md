

`Style`是`saltui`的底层样式实现方案，包括两个部分的实现：

#### CSS

* reset：即样式重置，部分功能不需要在组件中手动调用和处理，对下面文档中提到的几个关键点知晓即可。
* flexbox + util：以局部样式声明为粒度的通用样式切片，注意，这里的粒度不是组件级别的。详见下面的文档。
* var：`stylus`的辅助样式函数

#### JS

* util.js：通过`js`操作样式的辅助函数


## CSS Reset

> 文件：[reset.styl](https://github.com/salt-ui/saltui/blob/master/src/Style/reset.styl)

#### border box：

* 默认**所有元素**的盒模型类型为**`border-box`**

#### list style：

* 列表元素`ul`和`ol`的样式默认为`none`值。

#### input, textarea

* 消除输入框和按钮的原生外观
* 去掉点击链接和文本框对象时默认的灰色半透明覆盖层(iOS)或者虚框(Android)

#### and more...

更多的reset不再一一列举，详见原文件。

## CSS Flexbox

> 文件：[flexbox.styl](https://github.com/salt-ui/saltui/blob/master/src/Style/flexbox.styl)


`saltui` 中，所有 `flexbox` 相关的 `class` 值，都以 `t-FB` 为前缀。

#### 定义伸缩容器：

* t-FBH: 即`flexbox horizontal`，指定目标元素成为伸缩容器，且内部子元素水平排列。
* t-FBV: 即`flexbox vertical`，指定目标元素成为伸缩容器，且内部子元素垂直排列。

#### 对齐子元素(包括伸缩元素)：

* t-FBAS: 即`cross axis's align start`，将子元素对齐到`cross`轴的起点上。
* t-FBAC: 即`cross axis's align center`，将子元素对齐到`cross`轴的中点上。
* t-FBAE: 即`cross axis's align end`，将子元素对齐到`cross`轴的终点上。
* t-FBJS: 即`main axis's justify start`，将子元素对齐到`main`轴的起点上。
* t-FBJC: 即`main axis's justify center`，将子元素对齐到`main`轴的起点上。
* t-FBJE: 即`main axis's justify end`，将子元素对齐到`main`轴的起点上。

## CSS Utils

> 文件：[util.styl](https://github.com/salt-ui/saltui/blob/master/src/Style/util.styl)

#### float(移动端不建议使用float)：

* t-CL / t-Clear: 即`clear`，清除浮动
* t-FL: 即`float left`
* t-FR: 即`float right`

#### radius：

* t-R{n}: 即`border-radius`，`n`的可选值为`3 4 5 6`
* t-RT{n}: 左上角和右上角为圆角，`n`的可选值同上
* t-RR{n}: 右上角和右下角为圆角，`n`的可选值同上
* t-RB{n}: 左下角和右下角为圆角，`n`的可选值同上
* t-RL{n}: 左上角和左下角为圆角，`n`的可选值同上


#### padding：

* t-P{n}: 即`padding`，`n`的可选值为`0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30`，即从`0`开始，到`30`为止的所有偶数。
* t-PT{n}: 即`padding-top`，`n`的可选值同上
* t-PR{n}: 即`padding-right`，`n`的可选值同上
* t-PB{n}: 即`padding-bottom`，`n`的可选值同上
* t-PL{n}: 即`padding-left`，`n`的可选值同上

#### margin：

* t-M{n}: 即`margin`，`n`的可选值为`0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30`，即从`0`开始，到`30`为止的所有偶数。
* t-MT{n}: 即`margin-top`，`n`的可选值同上
* t-MR{n}: 即`margin-right`，`n`的可选值同上
* t-MB{n}: 即`margin-bottom`，`n`的可选值同上
* t-ML{n}: 即`margin-left`，`n`的可选值同上

#### position:

* t-PR: 即`position: relative`
* t-PF: 即`position: fixed`
* t-PA: 即`position: absolute`

#### visibility:

* t-DN / t-Hide: 即`display: none`
* t-DB: 即`display: block`
* t-DIB: 即`display: inline-block`
* t-BHide: 即`-webkit-backface-visibility: hidden`

#### ellipsis:

* t-Omit: 强制在一行内显示文字，多余部分用`...`显示
* t-Omit2: 强制在两行内显示文字，多余部分用`...`显示，通常需要和**设置父容器高度**一起使用。
* t-Omit3: 强制在三行内显示文字，多余部分用`...`显示，通常需要和**设置父容器高度**一起使用。

#### line height:

规则：`1 ≤ n ≤ 2`之间的值表示字号的倍数，且小数点用`_`表示。

* t-LH{em}: 基于字号的行高，`em`的可选值为`1、1_3、1_4、1_5、1_6、1_7、1_8、1_9、2`。如：`t-LH1`表示`line-height: 1em`，`t-LH1_3`表示`line-height: 1.3em`。
* t-LH{px}: 基于`px`的行高，`px`的可选值为`30、44`，如：`t-LH30`表示`line-height: 30px`。

#### width:

* t-W{px}: 基于`px`的宽度，`px`的可选值包括：`0、16、32、64、128、30、44`。如`t-W44`表示`width: 44px`。

#### height:

* t-H{px}: 基于`px`的高度，`px`的可选值包括：`0、16、32、64、128、30、44`。如`t-H44`表示`height: 44px`。

#### square:

宽度和高度相等的情况，最常用于`icon`大小的设置。

* t-WH{px}: `px`的可选值包括：`0、16、32、64、128、30、44`。如`t-WH44`表示`width: 44px; height: 44px`。

#### font size:

* t-FS{px}: 即`font-size`，`px`的可选值包括`0 12 14 16 18 20 22 24 26 28 30`

#### font color:

* t-FC{x}: 即`color: #xxx`，`x`的可选值包括`0、3、4、5、6、7、8、9、a、b、c、d、e、f`。如：`t-FCa`表示`color: #aaa;`。


#### font align:

* t-FAL: 即`text-align: left`
* t-FAC: 即`text-align: center`
* t-FAR: 即`text-align: right`

#### backgrond color:

* t-BC{x}: 即`background-color: #xxx`，`x`的可选值包括`0、3、4、5、6、7、8、9、a、b、c、d、e、f`。如`t-BC0`表示`background-color: #000`。

#### opacity:

* t-OP{n}: 即`opacity`，设置透明度，`n`的可选值包括`0、10、30、50、80、100`。如`t-OP30`表示`opacity: 0.3`。

#### 3d speed up:

* t-3D: 即`transform translateZ(0)`，开启3D加速，谨慎使用。

## CSS Var

> 文件：[var.styl](https://github.com/salt-ui/saltui/blob/master/src/Style/var.styl)

#### radius(n)

创建圆角样式，单位`px`

#### shadow(x, y, b, s, a)

创建阴影样式，单位`px`

#### rem(px)

将`px`值转换为`rem`值

## JS Utils

> 文件：[util.js](https://github.com/salt-ui/saltui/blob/master/src/Style/util.js)

#### createStyleContext

创建一个带有`add`方法的样式上下文对象，用于动态生成样式。

> 什么叫动态生成样式？  
> 当然是相对于写在`css`文件里的静态样式而言啦，动态样式的最明显标志就是样式的名称或者样式的值中包含`js`的变量。见下面示例的第三步。

语法：

```js
// 第一步：引入模块
import { Style } from 'saltui';

const { createStyleContext } = Style;

// 第二步：创建一个样式对象
let style = createStyleContext(contextId);

// 第三步：在该对象下添加样式
style.add(ruleId, ruleString); // ruleId可选，但强烈建议使用它。
```
参数：

* contextId：{String} required 上下文样式对象的唯一标识
* ruleId：{String} optional 新样式的唯一标识，建议使用，这样可以优化去重
* ruleString：{String} required 新样式的内容，建议使用ES6的字符串语法，见下面的`demo`

示例：

```js
// 第一步：引入模块
import { Style } from 'saltui';

const { createStyleContext } = Style;

// 第二步：创建一个样式对象
let style = createStyleContext('t-Group_List');

// 第三步：添加带有唯一标记的样式(内部会根据ruleId做去重优化)
// NOTE：省略了部分代码，定义了下面了indent，value，lowerSide变量
style.add(`lineIndent${indent}`, `
    .t-Group_List.lineIndent${indent} .t-Group_List-Item:after{
        ${lowerSide}: ${value}
    }
`);

```

#### unitize

添加长度单位，默认单位是`px`，返回`0`或者是带有单位的长度字符串值。

语法：

```js
// 第一步：引入模块
import { Style } from 'saltui';

const { unitize } = Style;

// 第二步：语法
let value = unitize(any);
```

参数：

* any {Number|String|*} optional 要处理的长度值

示例：

```js
unitize(10);     // 10px
unitize('10px'); // 10px
unitize('1rem'); // 1rem
unitize();       // 0
```
