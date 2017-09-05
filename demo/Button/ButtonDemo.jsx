/**
 * Button Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import Icon from '@ali/tingle-icon';
import Button from '../../src';

const {
  TextButton,
  IconButton,
  ButtonGroup,
} = Button;

class Demo extends React.Component {

  handleClick(evt) {
    console.log(this, evt.target); // eslint-disable-line
  }

  render() {
    return (
      <div style={{ backgroundColor: '#f8f8f8' }}>
        <h1>按钮 Button</h1>

        <div className="demo-section">
          <h2 className="section-title">标准按钮</h2>
          <div className="section-content">
            <Button type="primary" onClick={this.handleClick}>一级按钮</Button>
            <Button type="secondary" onClick={this.handleClick}>二级按钮</Button>
            <Button type="minor" onClick={this.handleClick}>次要按钮</Button>
            <Button type="danger">警示按钮</Button>
            <Button loading>加载中</Button>
            <Button disabled>失效按钮</Button>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">小按钮</h2>
          <div className="section-content">
            <div className="demo-row">
              <div className="demo-cell">
                <Button type="primary" size="small" display="inline">一级按钮</Button>
              </div>
              <div className="demo-cell">
                <Button type="primary" size="small" display="inline" disabled>一级按钮</Button>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <Button type="secondary" size="small" display="inline">二级按钮</Button>
              </div>
              <div className="demo-cell">
                <Button type="secondary" size="small" display="inline" disabled>二级按钮</Button>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <Button type="minor" size="small" display="inline">次要按钮</Button>
              </div>
              <div className="demo-cell">
                <Button type="minor" size="small" display="inline" disabled>次要按钮</Button>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <Button type="danger" size="small" display="inline">警示按钮</Button>
              </div>
              <div className="demo-cell">
                <Button type="danger" size="small" display="inline" disabled>警示按钮</Button>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <Button type="danger" size="small" display="inline">警示按钮</Button>
              </div>
              <div className="demo-cell">
                <Button type="danger" size="small" display="inline" disabled>警示按钮</Button>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <Button type="danger" size="small" display="inline"><Icon name="setting"/>带图标</Button>
              </div>
              <div className="demo-cell">
                <Button type="danger" size="small" display="inline" disabled><Icon name="setting"/>带图标</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">图标按钮</h2>
          <div className="section-content">
            <div className="demo-row">
              <div className="demo-cell">
                <IconButton name="setting" onClick={this.handleClick}/>
              </div>
              <div className="demo-cell">
                <IconButton name="setting" disabled onClick={this.handleClick}/>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <IconButton type="secondary" name="setting" onClick={this.handleClick}/>
              </div>
              <div className="demo-cell">
                <IconButton type="secondary" name="setting" disabled onClick={this.handleClick}/>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">文字按钮</h2>
          <div className="section-content">
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton size="small" onClick={this.handleClick}>文字按钮(小)</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton size="small" disabled onClick={this.handleClick}>文字按钮(小)</TextButton>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton onClick={this.handleClick}>文字按钮(中)</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton disabled onClick={this.handleClick}>文字按钮(中)</TextButton>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton size="large" onClick={this.handleClick}>文字按钮(大)</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton size="large" disabled onClick={this.handleClick}>文字按钮(大)</TextButton>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton size="small" onClick={this.handleClick}><Icon name="setting"/>文字+图标(小)</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton size="small" disabled onClick={this.handleClick}><Icon name="setting"/>文字+图标(小)</TextButton>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton onClick={this.handleClick}><Icon name="setting"/>文字+图标(中)</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton disabled onClick={this.handleClick}><Icon name="setting"/>文字+图标(中)</TextButton>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton size="large" onClick={this.handleClick}><Icon name="setting"/>文字+图标(大)</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton size="large" disabled onClick={this.handleClick}><Icon name="setting"/>文字+图标(大)</TextButton>
              </div>
            </div>
            <div className="demo-row">
              <div className="demo-cell">
                <TextButton type="secondary" size="large" onClick={this.handleClick}>二级按钮</TextButton>
              </div>
              <div className="demo-cell">
                <TextButton type="secondary" size="large" disabled
                            onClick={this.handleClick}>二级按钮</TextButton>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">按钮 + 图标</h2>
          <div className="section-content">
            <Button type="primary" onClick={this.handleClick}><Icon name="setting"/>一级按钮</Button>
            <Button type="secondary" onClick={this.handleClick}><Icon name="setting"/>二级按钮</Button>
            <Button type="minor" onClick={this.handleClick}><Icon name="setting"/>次要按钮</Button>
            <Button disabled><Icon name="setting"/>失效按钮</Button>
            <Button type="danger"><Icon name="setting"/>危险按钮</Button>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">通栏按钮</h2>
          <div className="section-content"
               style={{ backgroundColor: 'rgba(31,56,88,0.06)', padding: '50px 0 100px 0' }}>
            <Button type="primary" display="banner" onClick={this.handleClick}>通栏一级按钮</Button> <br />
            <Button type="secondary" display="banner" onClick={this.handleClick}>通栏二级按钮</Button> <br />
            <Button type="minor" display="banner" onClick={this.handleClick}>通栏次级按钮</Button> <br />
            <Button type="primary" display="banner" onClick={this.handleClick}><Icon
              name="setting"/>通栏按钮+图标</Button><br />
            <Button type="primary" display="banner" disabled onClick={this.handleClick}>通栏按钮 不可用</Button>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">按钮组1: 跟随内容双按钮</h2>
          <div className="section-content">
            <Button.Group>
              <Button type="secondary" display="inline" onClick={this.handleClick}>取消</Button>
              <Button type="primary" display="inline" onClick={this.handleClick}>确认</Button>
            </Button.Group>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">按钮组2: 跟随内容三按钮</h2>
          <div className="section-content">
            <ButtonGroup>
              <Button type="secondary" display="inline" onClick={this.handleClick}>加签</Button>
              <Button type="secondary" display="inline" onClick={this.handleClick}>拒绝</Button>
              <Button type="primary" display="inline" onClick={this.handleClick}>同意</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">按钮组3: 贴底双按钮</h2>
          <div className="section-content">
            <ButtonGroup>
              <Button type="secondary" display="banner" onClick={this.handleClick}>拒绝</Button>
              <Button type="primary" display="banner" onClick={this.handleClick}>同意</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">按钮组4: 贴底四按钮</h2>
          <div className="section-content">
            <ButtonGroup>
              <Button type="secondary" display="banner" onClick={this.handleClick}>提交</Button>
              <Button type="secondary" display="banner" onClick={this.handleClick}>退回</Button>
              <Button type="secondary" display="banner" onClick={this.handleClick}>拒绝</Button>
              <Button type="secondary" display="banner" onClick={this.handleClick}>更多</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Demo;
