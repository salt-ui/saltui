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
import Icon from 'salt-icon'
import AngleRight from 'salt-icon/lib/AngleRight';

class TestView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  onClick = (e) => {
    this.props.onChange({'aa': [{text: 'xxx', value: 'xxxx'}]})
  }

  render() {
    return (
      <div>
        <p style={{ lineHeight: '40px', height: '40px' }}>自定义渲染</p>
        <List
          layout="left"
          hasRightIcon
          icon={<AngleRight/>}
          iconWidth={20}
          isDelete
          data={this.state.listData}
          onClick={this.onClick}
        />
      </div>
    )
  }
}

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Field = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Filter
          size={3}
          defaultValue = {{
            sort: [
              {
                text: '距离',
                value: 'distance'
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
              },
              {
                text: '10-50人',
                value: 'grade'
              }
            ]
          }}
          options={
            [
              {
                name: 'sort',
                title: '默认排序',
                type: 'order',  // select | range | action
                items: [
                  {
                    text: '距离',
                    value: 'distance'
                  },
                  {
                    text: '评分',
                    value: 'grade'
                  }
                ]
              },
              {
                name: 'quickSort',
                title: '降序排列',
                type: 'switch',
                icon: false,
                items: [
                  {
                    text: '升序排列',
                    value: 'asc'
                  }
                ]
              },
              {
                name: 'something',
                title: '容纳人数',
                type: 'select',
                multiSelect: true,
                items: [
                  {
                    text: '10人以下',
                    value: 'distance'
                  },
                  {
                    text: '10-50人',
                    value: 'grade'
                  },
                  {
                    text: '50-100人',
                    value: 'cainiao'
                  },
                  {
                    text: '100-500人',
                    value: 'youku'
                  },
                  {
                    text: '500人以上',
                    value: 'tianmao'
                  }
                ]
              },
              {
                name: 'brand',
                title: '多个选择项',
                type: 'select',
                maxLine: 2,
                multiSelect: true,
                items: [
                  {
                    text: '阿里巴巴',
                    value: 'alibaba'
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
              },
              {
                name: 'someOther',
                renderView: TestView,
              },
              {
                name: 'brand2',
                title: '品牌',
                type: 'select',
                maxLine: 2,
                multiSelect: true,
                items: [
                  {
                    text: '阿里巴巴',
                    value: 'alibaba'
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
              },
              {
                name: 'brand3',
                title: '品牌',
                type: 'select',
                maxLine: 2,
                multiSelect: true,
                items: [
                  {
                    text: '阿里巴巴',
                    value: 'alibaba'
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
              },
              {
                name: 'brand4',
                title: '品牌',
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
          onSelect={(data) => {
            // can do confirm
            console.log('on select: ', data)
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
          onConfirm={(data) => {
            console.log('on confirm: ', data)
            // do confirm
          }}
          onReset={(data) => {
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
