/**
 * ScrollList Component Demo for tingle
 * @author zhouquan.yezq
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ScrollList from 'salt-scroll-list';


// build之后, 测试一下下面一行, 把上面一行注释掉
// import ScrollList from  '../../dist';

const Item = props => <div className="newlist-demo-item">{`${props.index} ${props.name}`}</div>;

Item.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
};

function Other1() {
  return <div className="newlist-demo-item other1">Other1</div>;
}

function Other2() {
  return <div className="newlist-demo-item other2">Other2</div>;
}


let cid = 1;
let currentPage;
class Demo extends React.Component {
  componetDidMount() {
    this.scrollList.fetchData();
  }
  render() {
    return (
      <div>
        <div className="container">
          <ScrollList
            ref={(ref) => {
              this.scrollList = ref;
            }}
            className="scroll-list-demo"
            url="https://www.easy-mock.com/mock/5a2f75a26ce8af6869ec49f0/saltui/scroll-list-data?jsonp_param_name=callback"
            dataType="jsonp"
            pageSize={10}
            cachedPages={3}
            beforeFetch={(data) => {
              currentPage = data.pageNum;
            }}
            currentPageKey="pageNum"
            processData={(data) => {
              const ret = data;
              ret.data.forEach((item) => {
                const it = item;
                it.name = `${it.name}---${cid}`;
                cid += 1;
              });
              ret.currentPage = currentPage;
              return ret;
            }}
          >
            <Item />
          </ScrollList>
        </div>
      </div>
    );
  }
}

export default Demo;
