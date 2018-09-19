/**
* Slide Component Demo for SaltUI
* @author gnosaij
*
* Copyright 2014-2015, SaltUI Team, Alinw.
* All rights reserved.
*/
import React from 'react';
import Slide from 'salt-slide';


class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideList: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        slideList: [
          {
            img: '//img.alicdn.com/tps/TB1hhOmPFXXXXaSXXXXXXXXXXXX-640-387.jpg',
            url: '',
            title: 'item0',
          }, {
            img: '//img.alicdn.com/tps/TB1LxF5PFXXXXXoXFXXXXXXXXXX-640-340.jpg',
            url: '',
            title: 'item1',
          },
        ],
      });
    }, 1000);
  }

  render() {
    return (
      <Slide showNav>
        {
          this.state.slideList.length ?
            this.state.slideList.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
            )) : [
              <img width="48" alt="" src="//aliwork.alicdn.com/tps/TB1fPYRMXXXXXcdXFXXXXXXXXXX-480-238.svg" />,
            ]
        }
      </Slide>
    );
  }
}

export default Demo1;
