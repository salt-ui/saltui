import React from 'react';
import DocumentTitle from 'react-document-title';
import Layout from './layout/Layout';
import classnames from 'classnames';

export default (props) => {
  const { data, pageData, params, utils } = props;
  let demos = utils.get(utils.get(data.demos, params.component) || {}, params.name) || {};
  return (
    <DocumentTitle title={`${params.component} - Component`}>
      {utils.toReactComponent(demos.preview)}
    </DocumentTitle>
  );
}
