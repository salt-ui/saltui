/**
 * Table Component Demo for SaltUI
 * @author sujingjing
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';

import Table from 'salt-table';
import Dialog from 'salt-dialog';

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
            data: [
              {
                title: '人物111',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
                data: [
                  {
                    title: '人物112',
                    nameId: 'xiaow',
                    name: '小王11',
                    cityId: 'bj11',
                    city: '11',
                    sex: '女11',
                    age: '1111',
                  },
                ]
              },
              {
                title: '人物113',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物114',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物115',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物116',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物117',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物118',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物119',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物1110',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物111',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物1112',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物1113',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物1114',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              },
              {
                title: '人物1115',
                nameId: 'xiaowang11',
                name: '小王11',
                cityId: 'bj11',
                city: '11',
                sex: '女11',
                age: '1111',
              }
            ]
          },
          {
            title: '人物2',
            nameId: 'xiaoli',
            name: '小李',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '18'
          },
          {
            title: '人物3',
            nameId: 'xiaowang',
            name: '小王',
            cityId: 'bj',
            city: '北京',
            sex: '女',
            age: '19',
            data: [
              {
                title: '人物11',
                nameId: 'xiaowang111',
                name: '小王12',
                cityId: 'b12j',
                city: '北123京',
                sex: '女123',
                age: '11231236',
              },
              {
                title: '人物11',
                nameId: 'xiaowang222',
                name: '小王12',
                cityId: 'b12j',
                city: '北123京',
                sex: '女123',
                age: '11231236',
              }
            ]
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
          {
            title: '人物4',
            nameId: 'xiaoli62345',
            name: '小李李李李李李刘丽',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '26',
          },
          {
            title: '人物4',
            nameId: 'xiaoli2134',
            name: '小李李李李李李刘丽',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '26',
          },
          {
            title: '人物4',
            nameId: 'xiaoli523',
            name: '小李李李李李李刘丽',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '26',
          },
          {
            title: '人物4',
            nameId: 'xiaoli233',
            name: '小李李李李李李刘丽',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
            age: '26',
          },
        ],
        totalCount: 16,
        currentPage: 1
      },
      data2: {
        data: [
          {
            title: '11',
            email: 'xw@abc.com',
            nameId: '是不会变得说不出街道办事处比较说的ng',
            name: '小王',
            cityId: 'bj',
            city: '北京东路的日子无与伦比的美丽',
            sex: '女',
            data: [
              {
                title: '人物11',
                nameId: 'xiaowang1',
                name: '小王12',
                cityId: 'b12j',
                city: '北123京',
                sex: '女123',
                age: '11231236',
              },
              {
                title: '人物11',
                nameId: 'xiaowang2',
                name: '小王12',
                cityId: 'b12j',
                city: '北123京',
                sex: '女123',
                age: '11231236',
              }
            ]
          },
          {
            title: '222',
            email: 'xl@abc.com',
            nameId: 'xiaoli',
            name: '小李',
            cityId: 'hz',
            city: '杭州',
            sex: '男',
          },
          {
            title: '33',
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
            data: [
              {
                title: '人物11',
                nameId: 'xiaowang1',
                name: '小王12',
                cityId: 'b12j',
                city: '北123京',
                sex: '女123',
                age: '11231236',
              },
              {
                title: '人物11',
                nameId: 'xiaowang2',
                name: '小王12',
                cityId: 'b12j',
                city: '北123京',
                sex: '女123',
                age: '11231236',
              }
            ]
          },
        ],
        currentPage: 1,
        totalCount: 20,
      },
      columns: [
        {
          dataKey: 'title',
          title: '表头',
          align: 'center',
          // fixed: true
        },
        {
          dataKey: 'name',
          title: '姓名',
          align: 'center',
          // rightFixed: true
        },
        { dataKey: 'sex', title: '性别', align: 'center' },
        { dataKey: 'age', title: '邮件', align: 'center' },
        // { dataKey: 'city', title: '城市', align: 'center' },
      ],
      columns2: [
        {
          dataKey: 'city',
          title: '城市',
          align: 'center',
          render: (cellData, b) => {
            return <div
              onClick={() => {
                Dialog.alert({
                  title: '测试',

                  content: '我是 Dialog.alert 的调用',
                  onConfirm() {
                    console.log('alert confirm');
                  },
                });
              }}
            >
              {cellData}
              <span style={{ fontSize: 18, color: '#ee3225', marginLeft: 1 }}>
                ↑
              </span>
            </div>
          },
        },
        { dataKey: 'name', title: '姓名', align: 'center' },
        { dataKey: 'email', title: '邮件', align: 'center' },
        { dataKey: 'email', title: '邮件', align: 'center' },
        { dataKey: 'email', title: '邮件', align: 'center' },
      ],
      hideSplitLine: false
    };

    setTimeout(() => {
      this.setState({
        // columns: [
        //   {
        //     dataKey: 'name',
        //     title: '姓名',
        //     align: 'center'
        //   }
        // ]
        // data: this.state.data2,
        // hideSplitLine: true
      })
    }, 2000)
  }

  render() {
    const t = this;
    const data = {
      data: [],
    };
    return (
      <div>
        {/*<div className="tip">普通表格</div>*/}
        {/*<Table*/}
          {/*columns={t.state.columns2}*/}
          {/*data={t.state.data2}*/}
          {/*leftFixed={0}*/}
        {/*/>*/}
        {/*<div className="tip">普通表格(隐藏分割线)</div>*/}
        {/*<Table*/}
          {/*columns={t.state.columns2}*/}
          {/*data={t.state.data2}*/}
          {/*hideSplitLine*/}
          {/*leftFixed={0}*/}
        {/*/>*/}
        {/*<div className="tip">列固定 不显示标题</div>*/}
        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={t.state.data}*/}
          {/*leftFixed={0}*/}
          {/*rightFixed={0}*/}
          {/*hideSplitLine={true}*/}
          {/*showHeader={true}*/}
        {/*/>*/}
        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={t.state.data}*/}
          {/*leftFixed={0}*/}
          {/*rightFixed={0}*/}
          {/*showHeader={true}*/}
        {/*/>*/}
        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={t.state.data}*/}
          {/*leftFixed={0}*/}
          {/*rightFixed={0}*/}
        {/*/>*/}
        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={t.state.data}*/}
          {/*leftFixed={1}*/}
          {/*rightFixed={0}*/}
          {/*hideSplitLine*/}
        {/*/>*/}

        <Table
          columns={t.state.columns}
          data={t.state.data}
          // showHeader={false}
          hideSplitLine={t.state.hideSplitLine}
          // leftFixed={1}
          // rightFixed={1}
          pageSize={8}
          subTablePageSize={6}
        />

        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={t.state.data}*/}
          {/*leftFixed={0}*/}
          {/*rightFixed={1}*/}
        {/*/>*/}
        {/*<div className="tip">列固定 不显示标题（隐藏分割线）</div>*/}
        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={t.state.data}*/}
          {/*hideSplitLine*/}
          {/*leftFixed={0}*/}
          {/*rightFixed={0}*/}
          {/*showHeader={true}*/}
        {/*/>*/}
        {/*<div className="tip">无数据展示</div>*/}
        {/*<Table*/}
          {/*columns={t.state.columns}*/}
          {/*data={data}*/}
          {/*leftFixed={0}*/}
          {/*showHeader*/}
        {/*/>*/}
      </div>
    );
  }
}

export default Demo;
