/**
 * Table Component Demo for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Table from 'salt-table';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Table = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        data: [
          {
            title: '人物1',
            nameId: 'xiaowang',
            name: '小王',
            cityId: 'bj',
            city: '北京',
            sex: '女',
            age: '16',
          },
          {
            title: '人物2',
            nameId: 'xiaoli',
            name: '小李',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '18',
          },
          {
            title: '人物3',
            nameId: 'xiaowang',
            name: '小王',
            cityId: 'bj',
            city: '北京',
            sex: '女',
            age: '19',
          },
          {
            title: '人物4',
            nameId: 'xiaoli',
            name: '小李李李李李李刘丽',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '26',
          },
        ],
      },
      data2: {
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
          {
            email: 'xw@abc.com',
            nameId: 'xiaowang',
            name: '小王',
            cityId: 'bj',
            city: '北京',
            sex: '女',
          },
          {
            email: 'xl@abc.comhenchanhenchang',
            nameId: 'xiaoli',
            name: '尼古拉斯.赵四',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
          },
        ],
        currentPage: 1,
        totalCount: 20,
      },
      columns: [
        { dataKey: 'title', title: '表头', align: 'center' },
        { dataKey: 'name', title: '姓名', align: 'center' },
        { dataKey: 'sex', title: '性别', align: 'center' },
        { dataKey: 'age', title: '邮件', align: 'center' },
        { dataKey: 'city', title: '城市', align: 'center' },
      ],
      columns2: [
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
    const data = {
      data: [],
    };
    return (
      <div>
        <div className="tip">普通表格</div>
        <Table
          columns={t.state.columns2}
          data={t.state.data2}
          leftFixed={0}
        />
        <div className="tip">普通表格(隐藏分割线)</div>
        <Table
          columns={t.state.columns2}
          data={t.state.data2}
          hideSplitLine
          leftFixed={0}
        />
        <div className="tip">列固定 不显示标题</div>
        <Table
          columns={t.state.columns}
          data={t.state.data}
          leftFixed={1}
          rightFixed={1}
          showHeader={false}
        />
        <div className="tip">列固定 不显示标题（隐藏分割线）</div>
        <Table
          columns={t.state.columns}
          data={t.state.data}
          hideSplitLine
          leftFixed={1}
          showHeader={false}
        />
        <div className="tip">无数据展示</div>
        <Table
          columns={t.state.columns}
          data={data}
          leftFixed={0}
          showHeader
        />
      </div>
    );
  }
}

export default Demo;
