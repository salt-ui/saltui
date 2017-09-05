/**
 * ScrollList Component Demo for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import Icon from 'salt-icon';
import ScrollList from 'salt-scroll-list';

const { PropTypes } = React;

// build之后, 测试一下下面一行, 把上面一行注释掉
// import ScrollList from  '../../dist';

const Item = props => (<div className="newlist-demo-item">{`${props.index} ${props.name}`}</div>);
Item.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
};

function Other1() {
  return <div className="newlist-demo-item other1">{'Other1'}</div>;
}

function Other2() {
  return <div className="newlist-demo-item other2">{'Other2'}</div>;
}

function getJsonp(page, size) {
  const now = (new Date()).getTime();
  const url = `http://dip.alibaba-inc.com/api/v2/services/schema/mock/36906.jsonp?callback=jsonpCallbak&pageNum=${page}&pageSize=${size}&rnd=${now}`;
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

const propsMap = [
  {
    title: '标题文字',
  },
  {
    title: '标题文字',
    extra: <Icon name="direction-right" className="newlist-demo-icon" />,
  },
  {
    img: 'https://gw.alicdn.com/tfs/TB15larRXXXXXbcXpXXXXXXXXXX-300-300.jpg',
    title: '标题文字',
    extra: <Icon name="direction-right" className="newlist-demo-icon" />,
  },
  {
    title: <span className="newlist-demo-has-icon"><Icon name="map" className="newlist-demo-front-icon" />标题文字</span>,
    extra: <Icon name="direction-right" className="newlist-demo-icon" />,
  },
  {
    title: '标题文字',
    description: '副标题',
  },
  {
    title: '标题文字',
    description: '副标题',
    extra: <Icon name="direction-right" className="newlist-demo-icon" />,
  },
  {
    img: 'https://gw.alicdn.com/tfs/TB15larRXXXXXbcXpXXXXXXXXXX-300-300.jpg',
    title: '标题文字',
    description: '副标题',
    extra: <Icon name="direction-right" className="newlist-demo-icon" />,
  },
  {
    title: '2017财年绩效评估',
    description: '多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容',
    desMaxLine: 1,
  },
  {
    title: '2017财年绩效评估',
    description: '多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容',
  },
  {
    img: 'https://gw.alicdn.com/tfs/TB15larRXXXXXbcXpXXXXXXXXXX-300-300.jpg',
    title: '2017财年绩效评估',
    description: '多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容',
    extra: <Icon name="direction-right" className="newlist-demo-icon" />,
  },
];

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataGetted: false,
      data: [],
      hasError: false,
      pageSize: 10,
      pageNum: 1,
      loading: false,
      refreshing: false,
    };

    this.fetchTimes = 1;
  }

  onRefresh = () => {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.bindJsonpCallback((noMore, items) => {
        this.setState({
          refreshing: false,
          dataGetted: true,
          data: items,
          pageNum: 1,
          noMore: items.length < this.state.pageSize,
          hasError: false,
        });
      }, () => {
        this.setState({
          refreshing: false,
          dataGetted: true,
          noMore: true,
          hasError: true,
        });
      });

      getJsonp(1, this.state.pageSize);
    }, 2000);
  }

  onLoad = () => {
    const curr = this.state.pageNum;

    this.setState({ loading: true });

    setTimeout(() => {
      this.bindJsonpCallback((noMore, items) => {
        this.setState({
          loading: false,
          dataGetted: true,
          data: this.state.data.concat(items),
          pageNum: curr + 1,
          noMore,
          hasError: false,
        });
      }, () => {
        this.setState({
          loading: false,
          dataGetted: true,
          noMore: false,
          hasError: true,
        });
      });
      getJsonp(curr, this.state.pageSize);
    }, 1000);
  }

  bindJsonpCallback(success, error) {
    const i = this.fetchTimes;

    window.jsonpCallbak = (data) => {
      if (this.fetchTimes !== i) return;

      if (!data || !data.success) {
        error();
      } else {
        const items = data.content.data;
        const hasNoMore = !items || items.length < this.state.pageSize;

        success(hasNoMore, items);
      }
    };
  }

  render() {
    return (<div >
      <div className="container">
        <ScrollList
          className="scroll-list-demo"
          dataGetted={this.state.dataGetted}
          data={this.state.data}
          hasError={this.state.hasError}
          noMore={this.state.noMore}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          loading={this.state.loading}
          onLoad={this.onLoad}
        >
          <Other1 />
          <Other2 />
          {(data, index) => {
            const itemProps = propsMap[index % 6];
            return (
              <ScrollList.Item
                key={index}
                {...itemProps}
              />
            );
          }}
        </ScrollList>
      </div>
    </div>);
  }
}

export default Demo;
