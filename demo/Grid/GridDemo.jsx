/**
 * Collection Component Demo for tingle
 * @author gnosaij, changming.zy
 *
 * Copyright 2014-2017, Tingle Team, Alinw.
 * All rights reserved.
 */
import React from 'react';

import Grid from 'salt-grid';
import Icon from 'salt-icon';
import Badge from 'salt-badge';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 1,
      list: [0, 1, 2, 3, 4, 5, 6],
    };
  }

  add() {
    const t = this;
    t.setState({
      n: t.state.n + 1,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <div className="t-BCe t-FAC t-LH44">四等分可点击</div>
        <Grid col={4} className="t-BCf" square touchable>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="user" fill={'#42A5F5'} />
            <div className="menu-title">用户</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="time" fill={'#FF8A65'} />
            <div className="menu-title">时钟</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="star" fill={'#EA80FC'} />
            <div className="menu-title">星星</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="map" fill={'#EF9A9A'} />
            <div className="menu-title">地图</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="pen" fill={'#9FA8DA'} />
            <div className="menu-title">编辑</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="info-circle" fill={'#80DEEA'} />
            <div className="menu-title">信息</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus-circle" fill={'#DCE775'} />
            <div className="menu-title">添加</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="search" fill={'#A1887F'} />
            <div className="menu-title">搜索</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus" fill={'#BDBDBD'} />
          </div>
        </Grid>
        <div className="t-BCe t-FAC t-LH44">无边线可点击</div>
        <Grid col={4} className="t-BCf t-MB30" square noLine touchable>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="user" fill={'#42A5F5'} />
            <div className="menu-title">用户</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="time" fill={'#FF8A65'} />
            <div className="menu-title">时钟</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="star" fill={'#EA80FC'} />
            <div className="menu-title">星星</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="map" fill={'#EF9A9A'} />
            <div className="menu-title">地图</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="pen" fill={'#9FA8DA'} />
            <div className="menu-title">编辑</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="info-circle" fill={'#80DEEA'} />
            <div className="menu-title">信息</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus-circle" fill={'#DCE775'} />
            <div className="menu-title">添加</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="search" fill={'#A1887F'} />
            <div className="menu-title">搜索</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus" fill={'#BDBDBD'} />
          </div>
        </Grid>
        <div className="t-BCe t-FAC t-LH44">四等分不可点击</div>
        <Grid col={4} className="t-BCf" square>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="user" fill={'#42A5F5'} />
            <div className="menu-title">用户</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="time" fill={'#FF8A65'} />
            <div className="menu-title">时钟</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="star" fill={'#EA80FC'} />
            <div className="menu-title">星星</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="map" fill={'#EF9A9A'} />
            <div className="menu-title">地图</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="pen" fill={'#9FA8DA'} />
            <div className="menu-title">编辑</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="info-circle" fill={'#80DEEA'} />
            <div className="menu-title">信息</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus-circle" fill={'#DCE775'} />
            <div className="menu-title">添加</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="search" fill={'#A1887F'} />
            <div className="menu-title">搜索</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus" fill={'#BDBDBD'} />
          </div>
        </Grid>
        <div className="t-BCe t-FAC t-LH44">无边线不可点击</div>
        <Grid col={4} className="t-BCf t-MB30" square noLine>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="user" fill={'#42A5F5'} />
            <div className="menu-title">用户</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="time" fill={'#FF8A65'} />
            <div className="menu-title">时钟</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="star" fill={'#EA80FC'} />
            <div className="menu-title">星星</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="map" fill={'#EF9A9A'} />
            <div className="menu-title">地图</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="pen" fill={'#9FA8DA'} />
            <div className="menu-title">编辑</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="info-circle" fill={'#80DEEA'} />
            <div className="menu-title">信息</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus-circle" fill={'#DCE775'} />
            <div className="menu-title">添加</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="search" fill={'#A1887F'} />
            <div className="menu-title">搜索</div>
          </div>
          <div className="demo" onClick={t.add.bind(t)}>
            <Icon name="plus" fill={'#BDBDBD'} />
          </div>
        </Grid>
        <div className="t-BCe t-FAC t-LH44">高宽不相等</div>
        <Grid col={2} className="t-BCf t-MB30">
          <div className="t-FBH t-FBAC demo-cell" onClick={t.add.bind(t)}>
            <div className="icon-round t-FBH t-FBJC t-FBAC"><Icon name="user" fill={'#42A5F5'} /></div>&nbsp;&nbsp;
            <div className="t-FBV t-FBJC icon-desc">
              <h5>标题文字 <Badge count={99} /></h5>
              <p>协议优先，信用支付</p>
            </div>
          </div>
          <div className="t-FBH t-FBAC demo-cell" onClick={t.add.bind(t)}>
            <div className="icon-round t-FBH t-FBJC t-FBAC"><Icon name="time" fill={'#FF8A65'} /></div>&nbsp;&nbsp;
            <div className="t-FBV t-FBJC icon-desc">
              <h5>标题文字</h5>
              <p>协议优先，信用支付</p>
            </div>
          </div>
          <div className="t-FBH t-FBAC demo-cell" onClick={t.add.bind(t)}>
            <div className="icon-round t-FBH t-FBJC t-FBAC"><Icon name="star" fill={'#EA80FC'} /></div>&nbsp;&nbsp;
            <div className="t-FBV t-FBJC icon-desc">
              <h5>标题文字 <Badge dot /></h5>
              <p>协议优先，信用支付</p>
            </div>
          </div>
          <div className="t-FBH t-FBAC demo-cell" onClick={t.add.bind(t)}>
            <div className="icon-round t-FBH t-FBJC t-FBAC"><Icon name="map" fill={'#EF9A9A'} /></div>&nbsp;&nbsp;
            <div className="t-FBV t-FBJC icon-desc">
              <h5>标题文字</h5>
              <p>协议优先，信用支付</p>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Demo;
