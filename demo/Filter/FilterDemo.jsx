/**
 * Field Component Demo for SaltUI
 * @author taoqili
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import Filter from 'salt-filter';
import List from 'salt-list'
import AngleRight from 'salt-icon/lib/AngleRight';
import Switch from 'salt-switch'

class TestView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      on1: false
    };
  }

  onClick = (e) => {
    const { on1 } = this.state
    this.setState({
      on1: !on1
    })
    this.props.onChange([{text: 'xxx', value: 'xxxx'}, {text: 'aaa', value: 'bbbb'}])
  }

  render() {
    return (
      <Switch on={this.state.on1} onChange={this.onClick} />
    )
  }
}

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Field = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultFilterValue: {
        sort: [
          {
            text: '默认',
            value: ''
          },
        ],
        quickSort: [
          {
            text: '升序排列',
            value: 'asc'
          }
        ],
        something: [
          {
            text: '10人以下',
            value: 'distance'
          }
        ]
      },
      listData: [
        {
          imgUrl: 'https://img.alicdn.com/tps/TB15YftJFXXXXafXpXXXXXXXXXX-699-698.jpg',
          text: '前端开发工程师',
          title: '马慧（穆心）',
        },
        {
          imgUrl: 'https://img.alicdn.com/tps/TB15YftJFXXXXafXpXXXXXXXXXX-699-698.jpg',
          text: '资深交互设计师',
          title: '周姮',
        },
        {
          imgUrl: 'https://img.alicdn.com/tps/TB1P1vaLpXXXXXxaXXXXXXXXXXX-50-50.jpg',
          text: '交互设计师',
          title: '郝晓敏 (钰馨）',
          date: '2017-7-8',
        },
        {
          imgUrl: 'https://img.alicdn.com/tps/TB1P1vaLpXXXXXxaXXXXXXXXXXX-50-50.jpg',
          text: '交互设计师',
          title: '张三丰（曾金）',
          date: '2017-7-8',
        }
      ]
    };
  }

  handleClick = (event, dataItem) => {
    console.log(event);
    console.log(dataItem);
  }

  handleClickImg = (event, imgUrl) => {
    console.log(event);
    console.log(imgUrl);
  }

  handleDelete = (event, dataItem) => {
    console.log(event);
    console.log(dataItem);
  }

  render() {
    return (
      <div>
        <div style={{ lineHeight: 2 }}>
          <p>something else</p>
          <p>something else</p>
          <p>something else</p>
        </div>
        <Filter
          size={4}
          activeIndex={1}
          defaultValue = {this.state.defaultFilterValue}
          options={
            [
              {
                name: 'someOther',
                multiSelect: true,
                title: '自定义渲染',
                renderView: TestView,
              },
              {
                name: 'brand4',
                title: '多选品牌',
                type: 'select',
                maxLine: 3,
                multiSelect: true,
                items: [
                  {
                    text: '阿里巴巴',
                    value: 'alibaba'
                  },
                  {
                    text: '阿里巴巴2',
                    value: 'alibaba2'
                  },
                  {
                    text: '淘宝',
                    value: 'taobao'
                  },
                  {
                    text: '菜鸟',
                    value: 'cainiao'
                  },
                  {
                    text: '优酷',
                    value: 'youku'
                  },
                  {
                    text: '天猫',
                    value: 'tianmao'
                  },
                  {
                    text: '百度',
                    value: 'baidu'
                  },
                  {
                    text: '腾讯',
                    value: 'tengxun'
                  },
                  {
                    text: '有道',
                    value: 'youdao'
                  }
                ]
              }
            ]
          }
          onChange={(data, filter) => {
            // if (data.name ==='quickSort') {
            //   filter.clearSelect()
            // }
            // can do confirm
            console.log('on change: ', data)
            switch (data.name) {
              case 'sort':
              case 'quickSort':
                this.setState({
                  listData: [
                    ...this.state.listData.reverse()
                  ]
                });
                break;
              default:
            }
          }}
          onConfirm={(data, filter) => {
            console.log('on confirm: ', data)
            // do confirm
          }}
          onReset={(data, filter) => {
            console.log('on reset: ', data)
            // do something
          }}
        />
        <List
          layout="left"
          hasRightIcon
          icon={<AngleRight/>}
          iconWidth={20}
          isDelete
          onClick={this.handleClick}
          clickPhoto={this.handleClickImg}
          onDelete={this.handleDelete}
          data={this.state.listData}
        />
      </div>
    );
  }
}

export default Demo;
