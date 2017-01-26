import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';
import Grid from 'uxcore-grid';

const { Row, Col} = Grid;

import Layout from './layout/Layout';
import Footer from './layout/Footer';
import Banner from './component/Banner';
import Icon from './component/Icon';

const featureList = [
  {
    icon: 'react',
    title: '数据驱动',
    des: '基于 React，数据自动绑定到视图，无需同时操作',
  },
  {
    icon: 'component',
    title: '组件化',
    des: '使用低耦合、高复用的 UI 组件构建页面',  
  },
  {
    icon: 'efficient',
    title: '高效',
    des: '针对表格、表单等后台常用场景，成倍提高页面构建效率',  
  },
  {
    icon: 'pattern',
    title: '规范',
    des: '来自阿里巴巴信息平台沉淀的视觉规范，大气美观',  
  },
  {
    icon: 'customise',
    title: '定制化',
    des: '在视觉规范的基础上，基于不同产品定位，提供定制化皮肤',  
  },
  {
    icon: 'reliable',
    title: '可靠',
    des: '整合 React、Babel、Reflux 等开源技术，一整套开发调试方案',
  }
];

export default (props) => (
  <DocumentTitle title={`SaltUI - Home`}>

    <Layout {...props} hasAside={false}>

      <Grid fluid={true}>
        <Row className="home-banner">
            <Col md={12} >
              <h1>The top open source framework for building amazing mobile apps.
              </h1>
              <p>SaltUI is the beautiful, free and open source mobile UI for developing native and progressive web apps with ease.
              </p>
              <button className="start-btn">Get Started</button>
            </Col>
            <Col md={12} >
              <div className="bg-back"></div>
              <div className="bg-front"></div>
            </Col>
        </Row>
        <Row className="site-feature">
          <Col md={8}>
            <div className="feature-item">
              <div className="feature-body">  
                <div className="feature-img img-intro"></div>
                <h3>指南</h3>
                <div className="intro">了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。</div>
              </div>
              <a href="#" className="feature-footer">查看详情</a>
            </div>
          </Col>
          <Col md={8}>
            <div className="feature-item">
              <div className="feature-body">  
                <div className="feature-img img-comp"></div>
                <h3>组件</h3>
                <div className="intro">使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。</div>
              </div>
              <a href="#" className="feature-footer">查看详情</a>
            </div>
          </Col>
          <Col md={8}>
            <div className="feature-item">
              <div className="feature-body">  
                <div className="feature-img img-res"></div>
                <h3>资源</h3>
                <div className="intro">下载相关资源，用其快速搭建页面原型或高保真视觉稿，提升产品设计效率。</div>
              </div>
              <a href="#" className="feature-footer">查看详情</a>
            </div>
          </Col>
        </Row>
      </Grid>
      <Footer />
    </Layout>
  </DocumentTitle>
)

 // <div className="home-banner">
 //        <h2 className="brand zoomInRight animated">SaltUI</h2>
 //        <p className="slogan flash animated">为企业级后台应用而生</p>
 //        <Banner className="canvas" />
 //      </div>

 //      <ul className='site-feature'>
 //        {
 //          featureList.map((d, i) => (
 //            <li className='feature-item' key={`feature-${i}`}>
 //              <Icon name={d.icon} />
 //              <div className='feature-item-text'>
 //                <h3 className='feature-item-title'>{d.title}</h3>
 //                <p className='feature-item-des'>{d.des}</p>
 //              </div>
 //            </li>
 //          ))
 //        }
 //      </ul>

