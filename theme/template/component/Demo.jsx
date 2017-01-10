import React from 'react';
import classnames from 'classnames';

function _getDemoTitle(content) {
  return content[1][1];
}
function _getDemoDescription(content) {
  return content[2][1];
}

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this.toggleCode = this.toggleCode.bind(this);
  }
  toggleCode(e) {
    e.preventDefault();
    this.setState({
      expand: !this.state.expand,
    })
  }
  render() {
    const { content, utils } = this.props;
    const { expand } = this.state;
    const { name } = content;
    let desc = content.content;
    return (
      <div className="demo-wrapper">

        <div className="preview-wrapper">
          <div className="preview-header">
            <div className="preview-statbar">
              <img src="https://os.alipayobjects.com/rmsportal/VfVHYcSUxreetec.png" width="350" alt=""/>
            </div>
            <div className="preview-navbar">
              <div className="preview-url">{`${location.pathname}/${name}`}</div>
            </div>
          </div>
          <div className="preview-content">
            <iframe src={`${location.pathname}/${name}`} />
          </div>
        </div>

        <div className={classnames('demo-card', {
          'demo-expand': expand,
        })}>
          <h3 className="title">{_getDemoTitle(desc)}</h3>
          <div className="desc">
            {_getDemoDescription(desc)}
            <a href="#" className="toggle-btn" onClick={this.toggleCode}><i className={classnames('alifont', {
              'icon-arrow-up': expand,
              'icon-arrow-down': !expand,
            })}></i></a>
          </div>
          <div className="code">
            {utils.toReactComponent(content.highlightedCode)}
          </div>
        </div>
        
      </div>
    );
  }
}
