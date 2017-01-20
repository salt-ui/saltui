import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';

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

      <div className="home-banner">
        <h2 className="brand zoomInRight animated">SaltUI</h2>
        <p className="slogan flash animated">为企业级后台应用而生</p>
        <Banner className="canvas" />
      </div>

      <ul className='site-feature'>
        {
          featureList.map((d, i) => (
            <li className='feature-item' key={`feature-${i}`}>
              <Icon name={d.icon} />
              <div className='feature-item-text'>
                <h3 className='feature-item-title'>{d.title}</h3>
                <p className='feature-item-des'>{d.des}</p>
              </div>
            </li>
          ))
        }
      </ul>
      <Footer />
    </Layout>
  </DocumentTitle>
)

