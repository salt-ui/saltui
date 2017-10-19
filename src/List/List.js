/**
 * List Component for tingle
 * @author muxin
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import AngleRight from 'salt-icon/lib/AngleRight';
import Group from '../Group';
import Boxs from '../Boxs';

const HBox = Boxs.HBox;
const VBox = Boxs.VBox;
const Box = Boxs.Box;

const {
  supportTouch,
} = Context;

// 获取兼容PC和Device的event对象的page属性
const getCursorPage = supportTouch
  ? (event, page) => event.targetTouches[0][page] || event.changedTouches[0][page]
  : (event, page) => event[page];

class List extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    const datas = t.props.data || [];

    if (datas.length) {
      datas.map((d, i) => {
        d.keyIndex = `index${i}`;
        d.listLeft = 0;
        return false;
      });
    }

    this.state = {
      data: datas,
      isCanMove: true, // 当前能不能进行滑动
      startX: 0, // 鼠标开始的X轴位置
      startY: 0, // 鼠标开始的Y轴位置
      endX: 0, // 鼠标释放的位置
      delateX: 0, // 鼠标滑动的水平距离
      listLeft: 0,
      isMove: false,
    };
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.data && nextProp.data.length) {
      nextProp.data.map((d, i) => {
        d.keyIndex = `index${i}`;
        d.listLeft = 0;
        return false;
      });

      this.setState({
        data: nextProp.data,
      });
    }
  }

  touchstartHandle(e) {
    const t = this;
    const data = t.state.data;
    const id = e.currentTarget.id;
    let isCanMove = t.state.isCanMove;

    data.map((d) => {
      if (d.keyIndex !== id && Math.abs(d.listLeft) > 0) {
        isCanMove = false;
      }
      d.listLeft = 0;
      return false;
    });


    // 只响应单指操作
    if (supportTouch && e.touches.length > 1) {
      return;
    }

    e.currentTarget.style.transitionDuration = '.05s';

    // 获取当前触点的X轴的偏移量
    const touchPageX = getCursorPage(e, 'pageX');
    const touchPageY = getCursorPage(e, 'pageY');

    t.setState({
      data,
      startX: touchPageX,
      startY: touchPageY,
      isCanMove,
    });
  }

  touchmoveHandle(e) {
    const t = this;
    const data = t.state.data;
    const id = e.currentTarget.id;
    const isCanMove = t.state.isCanMove;

    // 只响应单指操作
    if (supportTouch && e.touches.length > 1) {
      return;
    }

    e.currentTarget.style.transitionDuration = '.1s';

    const touchPageX = getCursorPage(e, 'pageX');
    const touchPageY = getCursorPage(e, 'pageY');

    const deltaX = touchPageX - t.state.startX;
    const deltaY = touchPageY - t.state.startY;

    const change = Math.min(Math.max(-82, deltaX), 0);

    // 如果X轴的移动距离先达到5px并且Y轴的移动距离小于5px，则执行list的滑动
    // 如果Y轴的移动距离先达到5px，则执行浏览器默认的页面滚动
    if (Math.abs(deltaX) > 5 && Math.abs(deltaY) < 5) {
      data.map((d) => {
        if (d.keyIndex === id) {
          if (isCanMove) {
            d.listLeft = change;
          } else {
            d.listLeft = 0;
            e.currentTarget.addEventListener('touchmove', (event) => {
              event.preventDefault();
            }, false);
          }
        }
        return false;
      });

      e.preventDefault();
      e.stopPropagation();

      t.setState({
        endX: touchPageX,
        delateX: change,
        listLeft: change,
        data,
        isCanMove,
      });
    }
  }

  touchendHandle(e) {
    const t = this;
    let left;
    const data = t.state.data;
    let isCanMove = t.state.isCanMove;
    const id = e.currentTarget.id;
    let newLeft = 0;

    // 只响应单指操作
    if (supportTouch && e.touches.length > 1) {
      return;
    }

    e.currentTarget.style.transitionDuration = '.2s';

    data.map((d) => {
      if (d.keyIndex === id) {
        left = parseInt(d.listLeft, 10);
      }
      return false;
    });

    if (left < -5) {
      newLeft = -82;
    } else if (left === 0) {
      newLeft = 0;
    } else if (left > 5) {
      newLeft = 82;
    }


    data.map((d) => {
      if (d.keyIndex !== id) {
        d.listLeft = 0;
        isCanMove = true;
      } else {
        d.listLeft = newLeft;
      }
      return false;
    });

    t.setState({
      listLeft: newLeft,
      data,
      isCanMove,
    });

    if (newLeft < 0) {
      t.setState({
        isMove: true,
      });
    }
  }

  delete(dataItem, e) {
    const t = this;

    e.preventDefault();
    t.props.onDelete(e, dataItem);

    // let data = t.state.data;
    // let id = event.currentTarget.id;

    // data.map((d,i) => {

    //     if(d.keyIndex === id) {

    //         data.splice(i,1);
    //     }
    // })

    // t.setState({
    //     data : data
    // })
  }

  preventDefault(e) {
    e.preventDefault();
  }

  clickHandle(dataItem, e) {
    const t = this;

    if (t.state.isMove) {
      t.setState({
        isMove: false,
      });
    } else {
      t.props.onClick(e, dataItem);
    }
  }

  clickPhotoHandle(imgUrl, e) {
    const t = this;

    e.stopPropagation();
    t.props.clickPhoto(e, imgUrl);
  }


  render() {
    const t = this;
    const { className, layout, isDelete, hasRightIcon, iconWidth, demoTitle } = t.props;
    const data = t.state.data;
    let list = null;
    let Events = {};


    if (isDelete) {
      Events = {
        onTouchStart: t.touchstartHandle.bind(t),
        onTouchMove: t.touchmoveHandle.bind(t),
        onTouchEnd: t.touchendHandle.bind(t),
      };
    }
    if (data.length) {
      list = data.map((dataItem, index) => {
        let icon = null;
        if (React.isValidElement(t.props.icon)) {
          icon = React.cloneElement(t.props.icon, { width: iconWidth, fill: '#ccc', className: Context.prefixClass('list-arrow') });
        }
        return (
          /* eslint-disable react/no-array-index-key */
          <div key={index}>
            {/* eslint-enable react/no-array-index-key */}
            <div className={Context.prefixClass('list-wrap')}
              {...Events}
              style={{ left: `${dataItem.listLeft}px` }}
              id={dataItem.keyIndex}
              onClick={t.clickHandle.bind(t, dataItem)}
              ref={(c) => { this.listItemBox = c; }}
            >
              <HBox vAlign="center">
                <HBox
                  flex={1}
                  className={
                    classnames({
                      [Context.prefixClass('list-img-right')]: (layout === 'right'),
                    })
                  }
                > {
                    dataItem.imgUrl &&
                    <VBox vAlign="center"
                      onClick={t.clickPhotoHandle.bind(t, dataItem.imgUrl)}
                    >
                      <img
                        src={dataItem.imgUrl}
                        alt=""
                        className={Context.prefixClass('list-img')}
                      />
                    </VBox >
                  }
                  <Box className={Context.prefixClass('list-text-content')}
                    flex={1}
                  >
                    <p className={Context.prefixClass('list-title omit')}> {dataItem.title} {
                      dataItem.date &&
                      <span className={Context.prefixClass('list-title-date')}> {dataItem.date} </span>
                    } </p> {
                      dataItem.text &&
                      <p className={Context.prefixClass('list-text omit')}> {dataItem.text} </p>
                    }
                  </Box>
                </HBox >
                {hasRightIcon &&
                  <Box >
                    {icon}
                  </Box >
                }
              </HBox>
            </div >
            <div className={Context.prefixClass('list-behind')}>
              <a
                href="#"
                className={Context.prefixClass('list-delete-btn')}
                id={dataItem.keyIndex}
                onClick={t.delete.bind(t, dataItem)}
              >
                <span className={Context.prefixClass('list-delete-btn-text')}> 删除 </span>
              </a>
            </div>
          </div >
        );
      });

      return (
        <Group className={
          classnames(Context.prefixClass('list'), {
            [className]: !!className,
          })
        }
        >
          <Group.Head className="t-demo-title">
            {demoTitle}
          </Group.Head>
          <Group.List lineIndent={10} >
            {list}
          </Group.List></Group >
      );
    }
    return null;
  }
}

List.defaultProps = {
  className: '',
  layout: 'left',
  hasRightIcon: true,
  icon: <AngleRight />,
  iconWidth: 20,
  data: [],
  isDelete: false,
  demoTitle: '',
  onClick() { },
  clickPhoto() { },
  onDelete() { },
};

// http://facebook.github.io/react/docs/reusable-components.html
List.propTypes = {
  className: React.PropTypes.string,
  layout: React.PropTypes.string,
  icon: React.PropTypes.element,
  iconWidth: React.PropTypes.number,
  data: React.PropTypes.array,
  hasRightIcon: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  clickPhoto: React.PropTypes.func,
  onDelete: React.PropTypes.func,
};

List.displayName = 'List';

export default List;
