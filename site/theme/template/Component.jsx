import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { toHTMLText } from 'jsonml.js/lib/html';
import classnames from 'classnames';

import Layout from './layout/Layout';
import CardWrap from './layout/CardWrap';
import Card from './layout/Card';
import Markdown from './component/Markdown';
import Demo from './component/Demo';
import {upperFirstCharactor } from '../../utils';

const parseDemoRaw = (demos) => {

  let ret = Object.keys(demos).map(name => {

    let content = demos[name].content;

    if (content[2] && content[2][0] && content[2][0] === 'ul') {

      let raw = content.splice(2, 1);

      raw = raw[0]
        .filter(d => Array.isArray(d))
        .map(d => d[1][1]);

      let rawMap = {};

      raw.forEach(d => {
        d = d.split(':');
        rawMap[d[0]] = d[1].trim();
        if (d[0] === 'order') {
          rawMap['order'] = Number(rawMap['order']);
        }
      });

      demos[name].raw = rawMap;

    } else {
      demos[name].raw = {
        order: 0,
      }
    }
    demos[name].name = name;

    return demos[name];
  });

  ret.sort((a, b) => a.raw.order - b.raw.order);

  return ret;
};

export default (props) => {
  const { data, pageData, params, utils } = props;
  let demos = utils.get(data.demos, params.component) || {};
  // demos = parseDemoRaw(demos);
  // detail: http://gitlab.alibaba-inc.com/uxcore/inner-doc/issues/1
  let doc = pageData.index.content;
  let history = pageData.HISTORY.content;
  console.log(props)
  return (
    <DocumentTitle title={`${params.component} - Component`}>
      <div>
        <h2 className="component-page-title">
          <a href={`//gitlab.alibaba-inc.com/uxcore/${params.component}`} target="_blank">{upperFirstCharactor(params.component)}</a>
        </h2>

        <CardWrap width="100%">
          <Card>
          {
            Object.keys(demos).length > 0 && <Demo demos={demos} params={params.component} utils={utils}/>
            // demos.map(demo => <Card style={{width: demo.raw.width}} key={demo.name}><Demo utils={utils} content={demo} /></Card>)
          }
          </Card>
        </CardWrap>

        <CardWrap width="100%">
          <Card>
            <Markdown icon="doc" title="文档" content={ utils.toReactComponent(doc) } />
          </Card>
          {
            history.length > 2 
              ? <Card><Markdown icon="history" title="版本更新" content={ utils.toReactComponent(history) } /></Card> 
              : null
          }
        </CardWrap>
      </div>
    </DocumentTitle>
  );
}
