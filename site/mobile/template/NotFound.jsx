import React from 'react';
import { Link } from 'react-router';

export default function NotFound(props) {
  console.log(props)
  return (
    <div id="page-404">
      <section>
        <h1>404</h1>
        <p>你要找的页面不存在 <Link to="/">返回首页</Link></p>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: '#react-content { height: 100%; background-color: #fff }',
        }}
      />
    </div>
  );
}
