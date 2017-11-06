/**
 * Mask Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import Mask from 'salt-mask';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maskvisible1: false,
      maskvisible2: false,
      maskvisible3: false,
    };
  }

  showMask1() {
    this.setState({
      maskvisible1: true,
      maskvisible2: false,
      maskvisible3: false,
    });
  }

  showMask2() {
    this.setState({
      maskvisible1: false,
      maskvisible2: true,
      maskvisible3: false,
    });
  }

  showMask3() {
    this.setState({
      maskvisible1: false,
      maskvisible2: false,
      maskvisible3: true,
    });
  }

  handleWillHide1() {
    console.log('mask will hide');
    // 如果返回false 则Mask是不能关闭的
    // return false;
    this.setState({
      maskvisible1: false,
    });
  }

  handleWillHide2() {
    console.log('mask will hide');
    // 如果返回false 则Mask是不能关闭的
    // return false;
    this.setState({
      maskvisible2: false,
    });
  }

  handleWillHide3() {
    console.log('mask will hide');
    // 如果返回false 则Mask是不能关闭的
    // return false;
    this.setState({
      maskvisible3: false,
    });
  }

  handleDidHide() {
    console.log('mask did hide');
  }

  render() {
    const t = this;
    return (
      <div className="t-P20 t-mask-demo">
        <h3 className="t-F18 t-MB6 t-MT6" onClick={t.showMask1.bind(this)}>点击打开mask</h3>
        <div className="big-box" />
        <h3 className="t-F18 t-MB6 t-MT6" onClick={t.showMask2.bind(this)}>点击打开mask</h3>
        <div className="big-box" />
        <h3 className="t-F18 t-MB6 t-MT6" onClick={t.showMask3.bind(this)}>点击打开mask</h3>
        <div className="big-box" />
        <Mask visible={t.state.maskvisible1}
          onWillHide={t.handleWillHide1.bind(t)}
          onDidHide={t.handleDidHide.bind(t)}
          opacity={0.4}
        />
        <Mask visible={t.state.maskvisible2}
          onWillHide={t.handleWillHide2.bind(t)}
          onDidHide={t.handleDidHide.bind(t)}
          opacity={0.8}
        />
        <Mask visible={t.state.maskvisible3}
          onWillHide={t.handleWillHide3.bind(t)}
          onDidHide={t.handleDidHide.bind(t)}
          opacity={1}
          renderToBody={false}
        />
      </div>
    );
  }
}

export default Demo;
