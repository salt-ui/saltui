/**
* Slide Component Demo for tingle
* @author gnosaij
*
* Copyright 2014-2015, Tingle Team, Alinw.
* All rights reserved.
*/
import React from 'react';

import classnames from 'classnames';
import Slide from 'salt-slide';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeCount: 0,
      slideList: [{
        img: 'https://img.alicdn.com/tfs/TB147.cRXXXXXaiXpXXXXXXXXXX-640-387.jpg',
        url: '',
        title: 'item0',
      }, {
        img: 'https://img.alicdn.com/tfs/TB1WpnPRXXXXXa0aXXXXXXXXXXX-640-340.jpg',
        url: '',
        title: 'item1',
      }, {
        img: 'https://img.alicdn.com/tfs/TB1KIH2RXXXXXc8XFXXXXXXXXXX-640-340.jpg',
        url: '',
        title: 'item2',
      }, {
        img: 'https://img.alicdn.com/tfs/TB1gXTqRXXXXXXfaVXXXXXXXXXX-640-340.jpg',
        url: '',
        title: 'item3',
      }],
      ajaxList: [],
      slideList2: [
        {
          img: 'https://img.alicdn.com/tfs/TB147.cRXXXXXaiXpXXXXXXXXXX-640-387.jpg',
          url: '',
          title: 'item0',
        },
      ],

      dynamicListActive: 0,
      dynamicList: [{
        name: 1,
      }, {
        name: 2,
      }, {
        name: 3,
      }, {
        name: 4,
      }],
    };

    this.dynamicListIndex = 4;
  }

  componentDidMount() {
    const t = this;
    t.setState({
      ajaxList: [{
        img: 'https://img.alicdn.com/tfs/TB147.cRXXXXXaiXpXXXXXXXXXX-640-387.jpg',
        url: '',
        title: 'item0',
      }, {
        img: 'https://img.alicdn.com/tfs/TB1WpnPRXXXXXa0aXXXXXXXXXXX-640-340.jpg',
        url: '',
        title: 'item1',
      }, {
        img: 'https://img.alicdn.com/tfs/TB1KIH2RXXXXXc8XFXXXXXXXXXX-640-340.jpg',
        url: '',
        title: 'item2',
      }, {
        img: 'https://img.alicdn.com/tfs/TB1gXTqRXXXXXXfaVXXXXXXXXXX-640-340.jpg',
        url: '',
        title: 'item3',
      }],
    });
  }

  handleSlideEnd(o) { }

  handleSlideCount(o) {
    this.setState({
      freeCount: this.state.freeCount + 1,
    });
  }

  onMount() {
    console.log('onMount', this);
  }

  onSlideEnd(e) {
    console.log('onSlideEnd', this, e.index);
  }

  _onSlideClick(o) {
    console.log(o);
  }

  render() {
    const t = this;
    console.log(this.state.dynamicList);
    return (<div>

      <h3 className="t-P10">动态添加Slide.Item</h3>
      <Slide
        loop={false}
        active={this.state.dynamicListActive}
        height={'2rem'}
        onSlideEnd={(option) => {
          let dynamicList = this.state.dynamicList;
          if (option.index === 2) {
            dynamicList = dynamicList.slice(1, dynamicList.length).concat({ name: dynamicList[dynamicList.length - 1].name + 1 });
            this.setState({
              dynamicListActive: 1,
              dynamicList,
            });
          } else if (option.index === 0 && dynamicList[option.index].name > 1) {
            dynamicList = [{ name: dynamicList[0].name - 1 }].concat(dynamicList.slice(0, dynamicList.length - 1));
            this.setState({
              dynamicListActive: 1,
              dynamicList,
            });
          }
        }}
      >
        {
          this.state.dynamicList.map(item => (
            <Slide.Item
              key={item.name}
              title={item.name}
            >
              <div className="dynamic-item">{item.name}</div>
            </Slide.Item>
          ))
        }
      </Slide>

      <h3 className="t-P10">默认</h3>
      <Slide onSlideEnd={(e) => { t.handleSlideCount(e); }}>
        <Slide.Item title="测试标题1">
          <div className="t-FBV t-FBAC t-FBJC" style={{ backgroundColor: 'orange', height: '100%' }}>
            <div className="t-FS20 t-FCf">数数玩：{t.state.freeCount}</div>
          </div>
        </Slide.Item>
        <Slide.Item title="测试标题2">
          <div className="t-FBV t-FBAC t-FBJC" style={{ backgroundColor: 'orange', height: '100%' }}>
            <div className="t-FS20 t-FCf">数数玩：{t.state.freeCount}</div>
          </div>
        </Slide.Item>
        <Slide.Item title="测试标题3">
          <div className="t-FBV t-FBAC t-FBJC" style={{ backgroundColor: 'orange', height: '100%' }}>
            <div className="t-FS20 t-FCf">数数玩：{t.state.freeCount}</div>
          </div>
        </Slide.Item>
        <Slide.Item title="测试标题4">
          <div className="t-FBV t-FBAC t-FBJC" style={{ backgroundColor: 'green', height: '100%' }}>
            <div className="t-FS20 t-FCf">数数玩：{t.state.freeCount}</div>
          </div>
        </Slide.Item>
        <Slide.Item title="测试标题5">
          <div className="t-FBV t-FBAC t-FBJC" style={{ backgroundColor: 'orange', height: '100%' }}>
            <div className="t-FS20 t-FCf">数数玩：{t.state.freeCount}</div>
          </div>
        </Slide.Item>
        <Slide.Item title="测试标题6">
          <div className="t-FBV t-FBAC t-FBJC" style={{ backgroundColor: 'green', height: '100%' }}>
            <div className="t-FS20 t-FCf">数数玩：{t.state.freeCount}</div>
          </div>
        </Slide.Item>
      </Slide>

      <h3 className="t-P10">有title</h3>
      <Slide
        showTitle
        showNav
        auto
        active={2}
        onSlideClick={this._onSlideClick.bind(this)}
        onMount={this.onMount.bind(this)}
        onSlideEnd={this.onSlideEnd.bind(this)}
      >
        {
          t.state.slideList.map((item, index) => (<Slide.Item key={index} className="t-image-slide-item" title="测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试" style={{
            backgroundImage: `url(${item.img})`,
          }}
          />))
        }
      </Slide>

      <h3 className="t-P10">无title</h3>
      <Slide
        showTitle={false}
        showNav
        auto
        active={2}
        onSlideClick={this._onSlideClick.bind(this)}
        onMount={this.onMount.bind(this)}
        onSlideEnd={this.onSlideEnd.bind(this)}
      >
        {
          t.state.slideList.map((item, index) => (<Slide.Item key={index} className="t-image-slide-item" style={{
            backgroundImage: `url(${item.img})`,
          }}
          />))
        }
      </Slide>

      <h3 className="t-P10">单个 slide</h3>
      <Slide
        onSlideClick={this._onSlideClick.bind(this)}
        showNav
        auto
      >
        {
          t.state.slideList2.map((item, index) => (
            <Slide.Item key={ index }>
              <a href="//work.alibaba-inc.com"><img src={item.img} /></a>
            </Slide.Item>
          ))
        }
      </Slide>
    </div>);
  }
}

export default Demo;
