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
            size: 4,
            items: [
              {
                key: 'sort',
                title: '默认排序',
                type: 'list',  // grid | range | action
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
                title: '升序排列',
                toggleTitle: '降序排列',
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
                    text: '阿里',
                    value: 'ali'
                  },
                  {
                    text: '淘宝',
                    value: 'taobao'
                  },
                  {
                    text: '支付宝',
                    value: 'zhifubao'
                  },
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
                key: 'brand1',
                title: '品牌',
                type: 'grid',
                maxLine: 4,
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
                key: 'brand2',
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
                key: 'brand3',
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
                key: 'brand4',
                title: '品牌',
                type: 'grid',
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
          }}
          onSelect={(data) => {
            // can do confirm
            console.log('on select: ', data)
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
          onConfirm={(data) => {
            console.log('on confirm: ', data)
             // do confirm
          }}
          onReset={(data) => {
            console.log('on reset: ', data)
            // do something
          }}
        />
      </div>
    );
  }
}

export default Demo;
