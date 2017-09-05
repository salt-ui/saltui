/**
 * ImageViewer Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const Button = require('salt-button');

const ImageViewer = require('salt-image-viewer/mix');

// build之后, 测试一下下面一行, 把上面一行注释掉
// const ImageViewer = require('../../dist');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div
        style={{
          height: 1000,
        }}
      >
        <Button
          onClick={() => {
            ImageViewer.show({
              photos: [
                {
                  src: '//img.alicdn.com/imgextra/i2/927018118/TB13fBjKFXXXXbPXpXXXXXXXXXX_!!0-tstar.jpg',
                },
                {
                  src: '//img.alicdn.com/tps/i4/TB1bokgFVXXXXbKXFXXYCct.pXX-238-238.png',
                },
              ],
              current: 1,
            });
          }}
        >点击查看</Button>
        <Button
          style={{
            marginTop: 400,
          }}
          onClick={() => {
            ImageViewer.show({
              photos: [
                {
                  src: 'http://gtms01.alicdn.com/tps/i1/TB12i5PHFXXXXaKXVXXY7J9SpXX-500-699.jpeg',
                },
                {
                  src: 'http://gtms04.alicdn.com/tps/i4/TB1E4yUHFXXXXboXFXXK0qsSpXX-500-750.jpeg',
                },
              ],
              current: 1,
            });
          }}
        >点击查看</Button>
      </div>
    );
  }
}

module.exports = Demo;
