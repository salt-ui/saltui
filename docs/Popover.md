

在点击控件或者某个区域后，浮出一个气泡菜单来做更多的操作。 如果设置了遮罩层，建议通过点击遮罩层的任一位置，进行退出。


## Simple Usage

```javascript
<Popover placement="bottomRight" overlay={text} mask>
  <a style={styles}>下右</a>
</Popover>
```

## Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">配置项	</th>
      <th style="width: 50px;">类型</th>
      <th style="width: 50px;">默认值</th>
      <th>功能/备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>overlayClassName</td>
      <td>string</td>
      <td></td>
      <td>给 overlay 设置 className </td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>string[]</td>
      <td>['click']</td>
      <td>触发 popover 的事件, 可以是 'hover','click','focus' 中的一个或多个</td>
    </tr>
    <tr>
      <td>mouseEnterDelay</td>
      <td>number</td>
      <td>0</td>
      <td>鼠标移入的延迟显示时间，单位: s.</td>
    </tr>
    <tr>
      <td>mouseLeaveDelay</td>
      <td>number</td>
      <td>0.1</td>
      <td>鼠标移出的延迟显示时间，单位: s.</td>
    </tr>
    <tr>
      <td>overlayStyle</td>
      <td>Object</td>
      <td></td>
      <td>添加给 overlay 的样式</td>
    </tr>
    <tr>
      <td>onVisibleChange</td>
      <td>Function</td>
      <td></td>
      <td>popover 显示/隐藏是触发的事件</td>
    </tr>
    <tr>
      <td>visible</td>
      <td>boolean</td>
      <td></td>
      <td>popover 是否显示/隐藏</td>
    </tr>
    <tr>
      <td>defaultVisible</td>
      <td>boolean</td>
      <td></td>
      <td>popover 初始化时是否显示/隐藏</td>
    </tr>
    <tr>
      <td>placement</td>
      <td>String</td>
      <td>bottomRight</td>
      <td>popover 的显示位置，可以是 'left','right','top','bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' 中的任意一个</td>
    </tr>
    <tr>
      <td>align</td>
      <td>Object: alignConfig of [dom-align](https://github.com/yiminghe/dom-align)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>onPopupAlign</td>
      <td>function(popupDomNode, align)	</td>
      <td></td>
      <td>callback when popup node is aligned</td>
    </tr>
    <tr>
      <td>overlay</td>
      <td>React.Element | () => React.Element</td>
      <td></td>
      <td>popover 弹出时显示的内容</td>
    </tr>
    <tr>
      <td>arrowContent</td>
      <td>React.Node</td>
      <td>null</td>
      <td>arrow content</td>
    </tr>
    <tr>
      <td>getTooltipContainer</td>
      <td>function</td>
      <td></td>
      <td>用于获取作为 popover 容器 html 节点的函数。默认会将 popover 附在 body 节点上。如果想改变，请直接返回一个新的element。</td>
    </tr>
    <tr>
      <td>destroyTooltipOnHide</td>
      <td>boolean</td>
      <td>false</td>
      <td>隐藏时是否销毁 popover 的 dom</td>
    </tr>
  </tbody>
</table>

更多 Props/API 可以看 [这里](https://github.com/react-component/tooltip/blob/master/README.md) 以及 [这里](https://github.com/react-component/trigger)

