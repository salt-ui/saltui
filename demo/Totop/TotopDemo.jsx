/**
 * Totop Component Demo for tingle
 * @author shaochao.wsc
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import Icon from 'salt-icon';
import Button from 'salt-button';
import React from 'react';
import Totop from 'salt-totop';

const { Box } = Totop;

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const len = (Math.random() * 10) + 10;
const mockData = [];
for (let i = 0; i < len; i++) {
  mockData.push({
    index: i,
    color: getRandomColor(),
  });
}


class TotopDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      always: false,
    };
  }

  render() {
    const t = this;
    return (
      <div className="demo">
        <Button onClick={() => { this.setState({ hide: !this.state.hide }); }}>切换返回顶部按钮隐藏</Button>
        <Button onClick={() => { this.setState({ always: !this.state.always }); }}>切换是否始终显示</Button>
        {mockData.map((item, index) => (
          <div key={index} className="demoDiv" style={{ background: item.color }}>{`第${item.index}个区块`}</div>
        ))}
        <Totop
          hideToTopButton={this.state.hide}
          showPosition={[100]}
          hide={t.state.hide}
          debounceNum={100}
          key={this.state.always ? 'always' : 'no'}
          onScroll={(e) => { console.log(e); }}
          ref={(c) => { this.totop = c; }}
          distance={this.state.always ? 0 : 100}
          duration={1000}
          customChildren={false}
          to={100}
          size="large"
        >
          <Box className="test" type="primary"><Icon name="photo" /></Box>
          {/* <Box type="secondary"><Icon name="user" /></Box> */}
        </Totop>
      </div>
    );
  }
}

export default TotopDemo;
