![](https://img.alicdn.com/tfs/TB12cKiRXXXXXcNXpXXXXXXXXXX-374-665.png)

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
          <th>The first panel key</th>
          <td>current active Panel key</td>
      </tr>
      <tr>
        <td>className</td>
        <td>String or object</td>
        <th></th>
        <td>custom className to apply</td>
      </tr>
      <tr>
          <td>defaultActiveKey</td>
          <td>String|Array<String></td>
          <th>null</th>
          <td>default active key</td>
      </tr>
      <tr>
          <td>destroyInactivePanel</td>
          <td>Boolean</td>
          <th>false</th>
          <td>If destroy the panel which not active, default false. </td>
      </tr>
      <tr>
          <td>accordion</td>
          <td>Boolean</td>
          <th>false</th>
          <td>accordion mode, default is null, is collapse mode</td>
      </tr>
      <tr>
          <td>onChange</td>
          <td>Function(key)</td>
          <th>noop</th>
          <td>called when collapse Panel is changed</td>
      </tr>
    </tbody>
</table>

If `accordion` is null or false, every panel can open.  Opening another panel will not close any of the other panels.
`activeKey` should be an string, if passing an array (the first item in the array will be used).

If `accordion` is true, only one panel can be open.  Opening another panel will cause the previously opened panel to close.
`activeKey` should be an string, if passing an array (the first item in the array will be used).

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
          <td>header content of Panel</td>
      </tr>
      <tr>
          <td>headerClass</td>
          <td>String</td>
          <th>' '</th>
          <td>custom className to apply to header</td>
      </tr>
      <tr>
          <td>showArrow</td>
          <td>boolean</td>
          <th>true</th>
          <td>show arrow beside header</td>
      </tr>
      <tr>
        <td>className</td>
        <td>String or object</td>
        <th></th>
        <td>custom className to apply</td>
      </tr>
      <tr>
        <td>style</td>
        <td>object</td>
        <th></th>
        <td>custom style</td>
      </tr>
    </tbody>
</table>

