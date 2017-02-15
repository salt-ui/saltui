import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';






export default ({ data, pageData, params, utils }) => {
  // const c = utils.get(data.demos, params.component);
  // console.log(data, pageData, params)
  // let demos = utils.get(utils.get(data.demos, params.component) || {}, params.name) || {};

  return (
    <DocumentTitle title={`${params.demo} - ${params.name}`}>
      {
      	utils.toReactComponent(pageData.preview)
      }
    </DocumentTitle>
  );
}