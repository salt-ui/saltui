/**
 * Avatar Component Demo for tingle
 * @author
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Avatar from 'salt-avatar';
import Icon from 'salt-icon';

const avatarColors = ['#78C06E', '#3BC2B5', '#78919D', '#5EC9F6', '#F6BF26'];

// avatarColors 在实际使用中是在 require 之前通过 `Context.setGlobal` 来全局设置:
// Context.setGlobal({avatar: {colors: avatarColors}});
// 这里为了展示默认的颜色, 所以使用 props 来设置。


export default () => (
  <div>
    <div className="hash-code">
      <h2>hashCode 测试：</h2>
      <dl>
        <dt>天晟</dt>
        <dd>hashCode: {Avatar.hashCode('天晟')}</dd>
      </dl>
      <dl>
        <dt>阿里巴巴集团</dt>
        <dd>hashCode: {Avatar.hashCode('阿里巴巴集团')}</dd>
      </dl>
      <dl>
        <dt>阿里巴巴集团</dt>
        <dd>hashCode(long): {Avatar.hashCode('阿里巴巴集团', true)}</dd>
      </dl>
      <dl>
        <dt>alex</dt>
        <dd>hashCode: {Avatar.hashCode('alex')}</dd>
      </dl>
    </div>
    <div className="avatar-demo">
      <h2>基本</h2>
      <div className="t-FBH">
        <Avatar name="tingle" />
        <Avatar name="天晟" />
        <Avatar name="马天明" />
        <Avatar name="欧阳夏丹" />
        <Avatar />
        <Avatar src="https://img.alicdn.com/tps/TB1amOaKpXXXXbsXVXXXXXXXXXX-144-144.png" />
      </div>
      <h2>名字格式化</h2>
      <div className="t-FBH">
        <Avatar name="Keyu Lin" />
        <Avatar name="Tommy" />
        <Avatar name="Lin Ke Yu" />
        <Avatar name="林科 宇" />
      </div>
      <h2>自定义颜色集合</h2>
      <div className="t-FBH">
        <Avatar name="tingle" colors={avatarColors} />
        <Avatar name="天晟" colors={avatarColors} />
        <Avatar name="马天明" colors={avatarColors} />
        <Avatar name="欧阳夏丹" colors={avatarColors} />
        <Avatar name="钉钉" colors={avatarColors} />
        <Avatar name="马明" colors={['#FF00FF']} />
      </div>
      <h2>Size normal/large</h2>
      <div className="t-FBH">
        <Avatar name="Keyu Lin" />
        <Avatar name="林科 宇" size="large" />
      </div>
      <h2>自定义大小</h2>
      <div className="t-FBH">
        <Avatar name="tingle" size={60} />
        <Avatar name="天晟" size={80} style={{ fontSize: 16 }} />
        <Avatar name="马天明" size="100px" style={{ fontSize: 40 }} />
      </div>
      <h2>icon</h2>
      <div className="t-FBH">
        <Avatar icon={<Icon name="user" fill="#fff" height={20} width={20} />} />
        <Avatar icon={<Icon name="star" fill="#fff" height={24} width={24} />} size="large" />
      </div>
    </div>
  </div>
);
