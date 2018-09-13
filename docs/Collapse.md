## Simple Usage
```js
<Collapse>
  <Panel header="第一段">this is panel content this is panel content this is panel content</Panel>
  <Panel header="第二段">this is panel content2 or other</Panel>
</Collapse>
```
## Props

### Collapse

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>activeKey</td>
          <td>String|Array<String></td>
          <th>第一个面板的 key</th>
          <td>受控模式下，当前展开的面板</td>
      </tr>
      <tr>
        <td>className</td>
        <td>String or object</td>
        <th></th>
        <td>额外顶级样式类名</td>
      </tr>
      <tr>
          <td>defaultActiveKey</td>
          <td>String|Array<String></td>
          <th>null</th>
          <td>非受控模式下，当前展开的面板</td>
      </tr>
      <tr>
          <td>destroyInactivePanel</td>
          <td>Boolean</td>
          <th>false</th>
          <td>不激活的面板是否被销毁</td>
      </tr>
      <tr>
          <td>accordion</td>
          <td>Boolean</td>
          <th>false</th>
          <td>手风琴模式</td>
      </tr>
      <tr>
          <td>onChange</td>
          <td>Function(key)</td>
          <th>noop</th>
          <td>当展开情况放生变化时触发</td>
      </tr>
    </tbody>
</table>


如果 `accordion` 是 null 或者 false, 面板可以被同时展开.  展开一个面板将不会收起其他面板。`activeKey` 的类型应该是一个 `array` 。

如果 `accordion` 是 true, 只有一个面板可以被展开.  展开一个面板将导致之前展开的面板被收起。`activeKey` 的类型应该是一个 `string`, 如果传进一个数组，那么数组的第一个 key 对应的面板将被展开。

### Collapse.Panel

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>header</td>
          <td>String or node</td>
          <th></th>
          <td>面板头部的内容</td>
      </tr>
      <tr>
          <td>headerClass</td>
          <td>String</td>
          <th>' '</th>
          <td>面板头部的样式类名</td>
      </tr>
      <tr>
          <td>showArrow</td>
          <td>boolean</td>
          <th>true</th>
          <td>是否在头部显示箭头</td>
      </tr>
      <tr>
        <td>className</td>
        <td>String or object</td>
        <th></th>
        <td>额外顶级类名</td>
      </tr>
      <tr>
        <td>style</td>
        <td>object</td>
        <th></th>
        <td>定制样式</td>
      </tr>
    </tbody>
</table>

