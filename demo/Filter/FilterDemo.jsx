/**
 * Field Component Demo for SaltUI
 * @author
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import Filter from 'salt-filter';
import Icon from 'salt-icon'

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Field = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Filter
          options = {{
            size: 2,
            items: [
              {
                key: 'sort',
                title: '排序', // or Component
                type: 'list',  // grid | range | action | super
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
                key: 'quick',
                title: () => {
                  return (
                    <span>快捷支付</span>
                  )
                },
                type: 'action',
                icon: false,
                items: [
                  {
                    text: '升序排列',
                    value: 'asc'
                  }
                ]
              },
              {
                key: 'something',
                title: '单个网格',
                type: 'grid',
                multiSelect: true,
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
              // {
              //   key: 'other',
              //   title: '区间',
              //   type: 'range',
              //   min: 0,
              //   max: 15,
              //   unit: '分'
              // },
              {
                key: 'brand',
                title: '品牌',
                type: 'grid',
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
                    text: '阿里巴巴',
                    value: 'alibaba'
                  },
                  {
                    text: '淘宝',
                    value: 'taobao'
                  },
                  {
                    text: '阿里巴巴',
                    value: 'alibaba'
                  },
                  {
                    text: '淘宝',
                    value: 'taobao'
                  },
                  {
                    text: '阿里巴巴',
                    value: 'alibaba'
                  },
                  {
                    text: '淘宝',
                    value: 'taobao'
                  }
                ]
              }
            ]
          }}
          onSelect={(data) => {
            console.log(data)
            // 返回数据格式
            // data = {
            //   key: 'quick',
            //   currentItem: {
            //     sort: [
            //       {
            //         text: '距离',
            //         value: 'distance'
            //       }
            //     ],
            //     quick: [
            //       {
            //         text: '升序排列',
            //         value: 'asc'
            //       }
            //     ],
            //   },
            //   allItems: {
            //     something: [
            //       {
            //         text: '距离',
            //         value: 'distance'
            //       }
            //     ],
            //     other: [
            //       {
            //         text: '区间',
            //         value: [1, 20]
            //       }
            //     ],
            //     brand: [
            //       {
            //         text: '阿里巴巴',
            //         value: 'alibaba'
            //       }
            //     ]
            //   }
            // }
          }}
        />
      </div>
    );
  }
}

export default Demo;
