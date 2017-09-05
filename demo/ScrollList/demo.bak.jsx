/**
 * ScrollList Component Demo for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const ScrollList = require('salt-scroll-list');

// build之后, 测试一下下面一行, 把上面一行注释掉
// const ScrollList = require('../../dist');

/* eslint-disable react/no-multi-comp */

class Item extends React.Component {
  render() {
    return <div className="demo-item">{`${this.props.index} ${this.props.name}`}</div>;
  }
}

Item.propTypes = {
  index: React.PropTypes.number,
  name: React.PropTypes.string,
};


class Other1 extends React.Component {
  render() {
    return <div className="demo-item other1">{'Other1'}</div>;
  }
}

class Other2 extends React.Component {
  render() {
    return <div className="demo-item other2">{'Other2'}</div>;
  }
}

window.testCount = 0;
window.testData = {
  content: {
    data: [{
      email: 'xw@abc.com',
      name: '小王',
      city: '北京',
    }, {
      email: 'xl@abc.com',
      name: '小李',
      city: '杭州',
    }, {
      email: 'xw@abc.com',
      name: '小王2',
      city: '北京2',
    }, {
      email: 'xl@abc.com',
      name: '小李2',
      city: '杭州2',
    }, {
      email: 'xl@abc.com',
      name: '小李',
      city: '杭州',
    }, {
      email: 'xw@abc.com',
      name: '小王2',
      city: '北京2',
    }, {
      email: 'xl@abc.com',
      name: '小李2',
      city: '杭州2',
    }, {
      email: 'xl@abc.com',
      name: '小李',
      city: '杭州',
    }, {
      email: 'xw@abc.com',
      name: '小王2',
      city: '北京2',
    }, {
      email: 'xl@abc.com',
      name: '小李2',
      city: '杭州2',
    },
    ],
  },
  success: true,
};

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataGetted: false,
      data: [],
      hasError: false,
      pageSize: 10,
      pageNum: 1,
    };
  }

  componentDidMount() {
  }

  onLoad(loadMore) {
    const me = this;
    me.state.pageNum = loadMore ? me.state.pageNum + 1 : 1;
    function callback(data) {
      if (data.success) {
        me.state.data = loadMore ? me.state.data.concat(data.content.data) : data.content.data;
        me.state.dataGetted = true;
        me.state.hasError = false;
      } else {
        me.state.hasError = true;
      }
      me.setState(me.state);
    }

    setTimeout(() => {
      const res = JSON.parse(JSON.stringify(window.testData));

      if (loadMore) {
        window.testCount += 1;
        if (window.testCount === 3) {
          res.success = false;
        }
        if (window.testCount === 5) {
          res.content.data = window.testData.content.data.slice(0, 3);
        } else if (window.testCount > 5) {
          res.content.data = [];
        }
      } else {
        window.testCount = 1;
        res.content.data = window.testData.content.data.slice(0, 3);
      }

            // res.content.data = [];
      callback(res);
    }, 1000);

        // const script = document.createElement('script');
        // window.jsonpCallbak = window.jsonpCallbak || callback;
        // script.src = `http://dip.alibaba-inc.com/api/v2/services/schema/mock/36906.jsonp?callback=jsonpCallbak&pageNum=${me.state.pageNum}&pageSize=${me.state.pageSize}&rnd=${(new Date).getTime()}`;
        // document.head.appendChild(script);
  }

  render() {
    return (<div >
      <div className="container">
        <ScrollList
          dataGetted={this.state.dataGetted} data={this.state.data} hasError={this.state.hasError}
          className="scroll-list-demo" onLoad={(loadMore) => { this.onLoad(loadMore); }}
        >
          <Other1 />
          <Other2 />
          <Item />
        </ScrollList>
      </div>
    </div>);
  }
}

module.exports = Demo;
