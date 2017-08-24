/**
 * List Component for tingle
 * @author muxin
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
let Context = require('@ali/tingle-context');
let Icon = require('@ali/tingle-icon');
let Group = require('@ali/tingle-group');
let Boxs = require('@ali/tingle-box');
let HBox = Boxs.HBox;
let VBox = Boxs.VBox;
let Box = Boxs.Box;

let {
    TOUCH_START,
    TOUCH_MOVE,
    TOUCH_END,
    TOUCH_CANCEL,
    support3D,
    supportTouch,
    isPC,
    noop,
    RESIZE
} = Context;

let doc = document;

// 获取兼容PC和Device的event对象的page属性
let getCursorPage = supportTouch ? (event, page) => {

    return event.targetTouches[0][page] || event.changedTouches[0][page];
} : (event, page) => {

    return event[page];
};

class List extends React.Component {

    constructor(props) {

        super(props);

        let t = this;
        let datas = t.props.data || [];

        if(datas.length){

            datas.map((d,i) => {

                d.keyIndex = "index"+i;
                d.listLeft = 0
            })
        }

        this.state = {
            data         : datas,
            isCanMove    : true,     //当前能不能进行滑动
            startX       : 0,        //鼠标开始的X轴位置
            startY       : 0,        //鼠标开始的Y轴位置
            endX         : 0,        //鼠标释放的位置
            delateX      : 0,        //鼠标滑动的水平距离
            listLeft     : 0,
            isMove       : false
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProp) {


        if(nextProp.data && nextProp.data.length){

            nextProp.data.map((d,i) => {

                d.keyIndex = "index"+i;
                d.listLeft = 0
            })

            this.setState({
                data: nextProp.data
            });
        }
    }

    touchstartHandle(e) {

        let t = this;
        let data = t.state.data;
        let id = e.currentTarget.id;
        let isCanMove = t.state.isCanMove;

        data.map((d,i) => {

            if(d.keyIndex !== id && Math.abs(d.listLeft) > 0) {

                isCanMove = false;
            }

            d.listLeft = 0;

        })


        // 只响应单指操作
        if (supportTouch && e.touches.length > 1) {

            return;
        }

        e.currentTarget.style.transitionDuration = '.05s';

        // 获取当前触点的X轴的偏移量
        let touchPageX = getCursorPage(e,'pageX');
        let touchPageY = getCursorPage(e,'pageY');

        t.setState({
            data: data,
            startX: touchPageX,
            startY: touchPageY,
            isCanMove: isCanMove
        })

    }

    touchmoveHandle(e) {

        let t = this;
        let translateX;
        let data = t.state.data;
        let id = e.currentTarget.id;
        let isCanMove = t.state.isCanMove;
        let deltaX;
        let deltaY;

        // 只响应单指操作
        if (supportTouch && e.touches.length > 1) {

            return;
        }

        e.currentTarget.style.transitionDuration = '.1s';

        let touchPageX = getCursorPage(e,'pageX');
        let touchPageY = getCursorPage(e,'pageY');

        deltaX = touchPageX - t.state.startX;
        deltaY = touchPageY - t.state.startY;

        let change = Math.min(Math.max(-82, deltaX), 0);

        // 如果X轴的移动距离先达到5px并且Y轴的移动距离小于5px，则执行list的滑动
        // 如果Y轴的移动距离先达到5px，则执行浏览器默认的页面滚动
        if (Math.abs(deltaX) > 5 && Math.abs(deltaY) < 5) {

            data.map((d,i) => {

                if(d.keyIndex === id) {

                    if(isCanMove) {

                        d.listLeft = change;
                    }else {

                        d.listLeft = 0;
                        e.currentTarget.addEventListener('touchmove', (event) => {

                            event.preventDefault();
                        }, false);
                    }

                }
            })

            e.preventDefault();
            e.stopPropagation();

            t.setState({
                endX : touchPageX,
                delateX : change,
                listLeft : change,
                data : data,
                isCanMove : isCanMove
            });

        }


    }

    touchendHandle(e) {

        let t = this;
        let left;
        let data = t.state.data;
        let isCanMove = t.state.isCanMove;
        let id = e.currentTarget.id;
        let new_left = 0;

        // 只响应单指操作
        if (supportTouch && e.touches.length > 1) {

            return;
        }

        e.currentTarget.style.transitionDuration = '.2s';

        data.map((d,i) => {

            if(d.keyIndex === id) {

                left = parseInt(d.listLeft);
            }
        })

        if (left < -5) {

            new_left = -82;
        }else if(left = 0){

            new_left = 0;
        }else if (left > 5) {

            new_left = 82;
        }


        let arr = [];

        data.map((d,i) => {

            if(d.keyIndex !== id) {

                d.listLeft = 0;
                isCanMove = true;
            }else {

                d.listLeft = new_left;
            }
        })

        t.setState({
            listLeft: new_left,
            data: data,
            isCanMove: isCanMove
        })

        if(new_left < 0){

            t.setState({
                isMove: true
            })
        }

    }

    delete(dataItem,e){

        let t = this;

        e.preventDefault();
        t.props.onDelete(e,dataItem);

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

    prevent_default(e) {

        e.preventDefault();
    }

    clickHandle(dataItem,e) {

        let t = this;

        if(t.state.isMove){

            t.setState({
                isMove:false
            })

        }else{

            t.props.onClick(e,dataItem);
        }
    }

    clickPhotoHandle(imgUrl,e) {

        let t = this;

        e.stopPropagation();
        t.props.clickPhoto(e,imgUrl);
    }


    render() {

        let t = this;
        let {className,layout,isDelete,hasRightIcon,iconName,iconWidth,demoTitle} = t.props;
        let data = t.state.data;
        let isCanMove = t.state.isCanMove;
        let list = null;
        let Events = {};


        if(isDelete) {

            Events = {
                onTouchStart : t.touchstartHandle.bind(t),
                onTouchMove : t.touchmoveHandle.bind(t),
                onTouchEnd : t.touchendHandle.bind(t)
            }
        }

        if(data.length) {

            list = data.map((dataItem,index) => {
                    return (
                        <div key={index}>
                            <div className={Context.prefixClass('list-wrap')}
                                {...Events}
                                style={{left:dataItem.listLeft+'px'}}
                                id={dataItem.keyIndex}
                                onClick={t.clickHandle.bind(t,dataItem)}
                                ref="listItemBox">
                                <HBox vAlign="center">
                                    <HBox flex={1} className={classnames({[Context.prefixClass('list-img-right')]:(layout === 'right')})}>
                                        {dataItem.imgUrl &&
                                            <VBox vAlign="center" onClick={t.clickPhotoHandle.bind(t,dataItem.imgUrl)}>
                                                <img src={dataItem.imgUrl} className={Context.prefixClass('list-img')}/>
                                            </VBox>
                                        }
                                        <Box className={Context.prefixClass('list-text-content')} flex={1}>
                                            <p className={Context.prefixClass('list-title omit')}>
                                                {dataItem.title}
                                                {dataItem.date &&
                                                    <span className={Context.prefixClass('list-title-date')}>{dataItem.date}</span>
                                                }
                                            </p>
                                            {dataItem.text &&
                                                <p className={Context.prefixClass('list-text omit')}>{dataItem.text}</p>
                                            }
                                        </Box>
                                    </HBox>
                                    {hasRightIcon &&
                                        <Box>
                                            <Icon name={iconName} width={iconWidth} fill="#ccc" className={Context.prefixClass('list-arrow')}/>
                                        </Box>
                                    }
                                </HBox>
                            </div>
                            <div className={Context.prefixClass('list-behind')}>
                                <a href="#" className={Context.prefixClass('list-delete-btn')} id={dataItem.keyIndex} onClick={t.delete.bind(t,dataItem)}>
                                    <span className={Context.prefixClass('list-delete-btn-text')}>删除</span>
                                </a>
                            </div>
                        </div>
                    );
            });

            return (
                <Group className={classnames(Context.prefixClass('list'), {[className]: !!className})}>
                    <Group.Head className='t-demo-title'>{demoTitle}</Group.Head>
                    <Group.List lineIndent={10}>
                        {list}
                    </Group.List>
                </Group>
            );
        }else{
            return null;
        }

    }
}

List.defaultProps = {
    className: '',
    layout: 'left',
    hasRightIcon: true,
    iconName: 'angle-right',
    iconWidth: 20,
    data: [],
    isDelete: false,
    demoTitle: '',
    onClick: function() {},
    clickPhoto: function() {},
    onDelete: function() {}
}

// http://facebook.github.io/react/docs/reusable-components.html
List.propTypes = {
    className: React.PropTypes.string,
    layout:React.PropTypes.string,
    iconName:React.PropTypes.string,
    iconWidth:React.PropTypes.number,
    data:React.PropTypes.array,
    hasRightIcon:React.PropTypes.bool,
    onClick:React.PropTypes.func,
    clickPhoto:React.PropTypes.func,
    onDelete:React.PropTypes.func
}

List.displayName = 'List';

module.exports = List;
