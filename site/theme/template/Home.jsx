import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';
import Grid from 'uxcore-grid';

const { Row, Col} = Grid;

import Layout from './layout/Layout';
import Footer from './layout/Footer';
import Banner from './component/Banner';
import Icon from './component/Icon';



export default (props) => (
  <DocumentTitle title={`SaltUI - Home`}>

    <Layout {...props} hasAside={false}>

      <Grid fluid={true}>
        <Row className="home-banner">
          <Col md={14} >
            <h1>The top open source framework for building amazing mobile apps.
            </h1>
            <p>SaltUI is the beautiful, free and open source mobile UI for developing native and progressive web apps with ease.
            </p>
            <a className="start-btn" href="/components/tingle-avatar">Get Started</a>
          </Col>
          <Col md={10} >
            <div className="bg-phone"></div>
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
            </div>
          </Col>
          <Col md={8}>
            <div className="feature-item">
              <div className="feature-body">  
                <div className="feature-img img-comp"></div>
                <h3>组件</h3>
                <div className="intro">使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。</div>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="feature-item">
              <div className="feature-body">  
                <div className="feature-img img-res"></div>
                <h3>资源</h3>
                <div className="intro">下载相关资源，用其快速搭建页面原型或高保真视觉稿，提升产品设计效率。</div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
      <Footer />
    </Layout>
  </DocumentTitle>
);

// <div className="bg-back"></div>
//             <div className="bg-front"></div>



