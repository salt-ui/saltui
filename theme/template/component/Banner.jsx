import React from 'react';
import assign from 'object-assign';
import classnames from 'classnames';
import { fabric } from 'fabric';

const commonCfg = {
  stroke: 'white',
  fill: 'transparent',
  strokeWidth: 3,
  centeredRotation: true,
  originX: 'center',
  originY: 'center',
};
const points = [
  {x: 0, y: 62},
  {x: 30, y: 10},
  {x: 90, y: 10},
  {x: 120, y: 62},
  {x: 90, y: 114},
  {x: 30, y: 114},
];
const linePts = [
  70, 0, 30, 0,
];
const deepcopy = o => JSON.parse(JSON.stringify(o));

export default class Banner extends React.PureComponent {
  static defaultProps = {
    width: 400,
    height: 500,
  }
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('componentDidMount');
    const { width, height } = this.props;
    const page = new fabric.StaticCanvas(this.refs.canvas, {
      width,
      height,
    });

    let hexagon1 = new fabric.Polygon(points, assign({}, commonCfg, {
      left: 100,
      top: 160,
    }));

    let hexagon2 = new fabric.Polygon(deepcopy(points), assign({}, commonCfg, {
      left: 490,
      top: -108,
      opacity: 0,
    }));

    let hexagon3 = new fabric.Polygon(deepcopy(points), commonCfg);

    let hexagon4 = new fabric.Polygon(deepcopy(points), assign({}, commonCfg, {
      left: 70,
      top: 108,
      strokeWidth: 1,
      opacity: 0,
    }));

    let hexagon5 = new fabric.Polygon(deepcopy(points), assign({}, commonCfg, {
      left: 160,
      top: 56,
      strokeWidth: 1,
      opacity: 0,
    }));

    let hexagon6 = new fabric.Polygon(deepcopy(points), assign({}, commonCfg, {
      left: 160,
      top: 160,
      strokeWidth: 1,
      opacity: 0,
    }));

    let line1 = new fabric.Line(deepcopy(linePts), {
      stroke: 'white',
      originX: 'center',
      strokeWidth: 2,
      top: 50,
      left: 0,
    });

    let line2 = new fabric.Line(deepcopy(linePts), {
      stroke: 'white',
      strokeWidth: 2,
      originX: 'center',
      angle: -60,
      top: 28,
      left: 35,
    });

    let group1 = new fabric.Group([hexagon3, line1, line2], {
      left: 490,
      top: 400,
      originX: 'center',
      originY: 'center',
    });
    page.add(hexagon1, hexagon2, hexagon4, hexagon5, hexagon6, group1);

    setTimeout(() => {
      hexagon1.animate('angle', 360, {
        duration: 1500,
        onChange: page.renderAll.bind(page),
        onComplete: () => {
          hexa2In();
        }
      });
    });

    let hexa2In = () => {
      hexagon2.animate({
        left: 190,
        top: 108,
        opacity: 1
      }, {
        duration: 800,
        onChange: page.renderAll.bind(page),
        easing: fabric.util.ease.easeOutBounce,
        onComplete: () => {
          group1In();
        }
      });
    };

    let group1In = () => {
      group1.animate({
        left: 190,
        top: 212
      }, {
        duration: 800,
        onChange: page.renderAll.bind(page),
        easing: fabric.util.ease.easeOutBounce,
        onComplete: () => {
          twinkle(hexagon4, 6);
          twinkle(hexagon5, 6);
          twinkle(hexagon6, 6);
        }
      });
    };

    let twinkle = (obj, num) => {

      if (num <= 0) {
        obj.set({
          opacity: 1
        });
        page.renderAll();
        return;
      }

      obj.animate({
        opacity: (num % 2 == 0) ? 0 : 0.7 
      }, {
        duration: 200,
        onChange: page.renderAll.bind(page),
        easing: fabric.util.ease.easeOutBounce,
        onComplete: () => {
          twinkle(obj, num - 1);
        }
      });
    };
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    return <canvas ref="canvas" className={classnames('translate', 'animated', this.props.className)} />
  }
}