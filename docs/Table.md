
一句话描述
一张截图


### 普通表格

![不隐藏分割线.png](https://work.alibaba-inc.com/aliwork_tfs/g01_alibaba-inc_com/tfscom/TB1La55RpXXXXbbXFXXXXXXXXXX.tfsprivate.png)


### 列固定

![隐藏分割线.png](https://work.alibaba-inc.com/aliwork_tfs/g01_alibaba-inc_com/tfscom/TB1E6mJRpXXXXXyapXXXXXXXXXX.tfsprivate.png)



## Props

| 配置项 | 必填 | 默认值 | 功能/备注 |
|---|----|---|----|
|data|required|{}|数据源|
|columns|required|-|列配置项|
|className|optional|-|额外的类名，用于定制|
|emptyText|optional|'暂无数据'|没有数据时的展示|
|leftFixed|optional|0|左侧有几列固定|
|showHeader|optional|true|是否显示横向表头，默认显示|
|hideSplitLine|optional|false|为true时，横向表头隐藏横向分割线，纵向表头隐藏纵向分割线，false不隐藏分割线|
|onPagerChange|optional|noop|在翻页时触发，参数为要跳转的页数|


### Columns 配置

| 配置项 | 必填 | 默认值 | 功能/备注 |
|-----|----|---|----|
|title|required|''|列头|
|dataKey|required|''|表格的数据中用于查看模式展示的字段|
|width|optional|0.25|只支持小数配置，表示占屏幕的比例|
|align|optional|'left'|该列的对其方式|
|render|optional| null | 列的定制化渲染 function(cellData, rowData) { return xxx; } |


### data 的数据结构

```javascript
{
    "data":[
        {   
            "id":'1'
            "grade":"grade1",
            "email":"email1",
            "firstName":"firstName1",
            "lastName":"lastName1",
            "birthDate":"birthDate1",
            "country":"country1",
            "city":"city1"
        }
        ...

    ],
}
```

### Demo

```javascript
class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        data: [
          {
            email: 'xw@abc.com',
            nameId: '是不会变得说不出街道办事处比较说的ng',
            name: '小王',
            cityId: 'bj',
            city: '北京东路的日子无与伦比的美丽',
            sex: '女',
          },
          {
            email: 'xl@abc.com',
            nameId: 'xiaoli',
            name: '小李',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
          },
        ],
      },
      columns: [
            { dataKey: 'city', title: '城市', align: 'center' },
            { dataKey: 'name', title: '姓名', align: 'center' },
            { dataKey: 'email', title: '邮件', align: 'center' },
            { dataKey: 'email', title: '邮件', align: 'center' },
            { dataKey: 'email', title: '邮件', align: 'center' },
      ],
    };
  }

  render() {
    const t = this;
    return (
      <div>
        <Table
          columns={t.state.columns}
          data={t.state.data}
          leftFixed={0}
        />
      </div>
    );
  }
}

```
