#  按钮

## Button 普通按钮

### Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### disabled

描述：按钮失效

类型：Boolean

默认：false

必填：否

#### type

描述：按钮的类型, 可选的参数 primary、secondary、minor、danger

类型：String

默认：'primary'

必填：否

#### size

描述：按钮的大小, 可选的参数 small 、medium 、large

类型：String

默认：'medium'

必填：否

#### display

描述：按钮的显示方式，可行参数 inline、normal、banner，inline显示为行内块级元素；normal显示为普通块级元素；banner显示为通栏；

类型：String

默认：normal

必填：否

#### onClick

描述：按钮点击时的回调

类型：Function

默认：noop

必填：否

#### style

描述：按钮的行内样式复写

类型：object

默认：`{}`

必填：否

### Simple Usage

```javascript
import { Button } from 'saltui';

let View = React.createClass({
  handleClick() {
    console.log('a button clicked')
  },

  render() {
      return (
        <div style={{padding:'20px'}}>
          <Button>默认按钮</Button> <br/>
          <Button type="primary" onClick={this.handleClick}>一级按钮</Button> <br/>
          <Button type="secondary" onClick={this.handleClick}>二级按钮</Button> <br/>
          <Button type="minor" onClick={this.handleClick}>次要按钮</Button> <br/>
          <Button disabled={true}>不可点击</Button> <br/>
          <Button style={{marginLeft:-20,marginRight:-20,borderRadius:0}} onClick={this.handleClick}>通栏按钮</Button> <br/>
          <Button type="primary" size="large" onClick={this.handleClick}>大按钮</Button> <br/>
          <Button type="primary" size="medium" onClick={this.handleClick}>中按钮</Button> <br/>
          <Button type="primary" size="small" onClick={this.handleClick}>小按钮</Button> <br/>
        </div>
      )
  }
})
```

## TextButton 文本按钮

### Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### disabled

描述：按钮失效

类型：Boolean

默认：false

必填：否

#### type

描述：按钮的类型, 可选参数 primary、secondary

类型：String

默认：primary

必填：否

#### size

描述：按钮的大小, 可选的参数 small 、medium 、large

类型：String

默认：'medium'

必填：否

#### display

> 注意：TextButton的显示方式没有banner项

描述：按钮的显示方式，可行参数 inline、normal, inline显示为行内块级元素；normal显示为普通块级元素；

类型：String

默认：normal

必填：否

#### onClick

描述：按钮点击时的回调

类型：Function

默认：noop

必填：否

#### style

描述：按钮的行内样式复写

类型：object

默认：`{}`

必填：否

### Simple Usage

用法：
```
import { Button } from 'saltui';

const { TextButton } = Button;

// render
<TextButton type="primary" size="large" onClick={this.handleClick}>文字按钮</TextButton>
```

## IconButton 纯图标按钮

> 纯图标按钮，如果希望普通按钮使用图标，请直接使用Button，将ICON通过子元素传入

### Props

#### className

描述：自定义的扩展样式名称

类型：String

默认：''

必填：否

#### disabled

描述：按钮失效

类型：Boolean

默认：false

必填：否

#### type

描述：按钮的类型, 可选参数 primary、secondary

类型：String

默认：primary

必填：否

#### onClick

描述：按钮点击时的回调

类型：Function

默认：noop

必填：否

#### style

描述：按钮的行内样式复写

类型：object

默认：`{}`

必填：否

### Simple Usage

用法：
```
import { Button } from 'saltui';

const { IconButton } = Button;

// render
<IconButton type="secondary" name="setting" onClick={this.handleClick} />
```

## ButtonGroup 按钮分组

> 也可以使用别名 Button.Group 引用；按钮分组的子元素为Button，仅支持display为inline或banner，type为primary或minor

### Props

> 暂无

### Simple Usage

用法：
```
import { Button } from 'saltui';

const { ButtonGroup } = Button; // 或者直接使用 Buttom.Group

// render
<ButtonGroup>
  <Button type="minor" display="inline" onClick={this.handleClick}>加签</Button>
  <Button type="minor" display="inline" onClick={this.handleClick}>拒绝</Button>
  <Button type="primary" display="inline" onClick={this.handleClick}>同意</Button>
</ButtonGroup>
```
