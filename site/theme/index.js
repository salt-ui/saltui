
const prefix = (global.location && global.location.port) ? '/' : '/saltui';

let routes = [
  {
    path: prefix,
    component: './template/Home',
    name: '首页',
    // icon: 'home'
  },
  {
    path: `${prefix}/components`,
    name: '组件',
    component: './template/layout/Layout', 
    
    childRoutes: [
      {
        path: `${prefix}/components/:component`,
        component: './template/Component'
      },
    ]
  },
  
  {
    path: `${prefix}/components/:component/:name`,
    component: './template/Kitchen',
  },
];

module.exports = {
  home: './',
  sideNav: routes,
  routes: routes
};

/*{
    path: '/components',
    name: '组件',
    icon: 'dashboard',
    component: './template/layout/Layout', 
    indexRoute: {
      component: './template/Dashboard', 
    },
    childRoutes: [
      {
        path: '/components/:component',
        component: './template/Component'
      },
    ]
  },*/