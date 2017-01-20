

let routes = [
  {
    path: '/',
    component: './template/Home',
    name: '首页',
    // icon: 'home'
  },
  {
    path: '/components',
    name: '组件',
    component: './template/layout/Layout', 
    
    childRoutes: [
      {
        path: '/components/:component',
        component: './template/Component'
      },
    ]
  },
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
  {
    path: '/components/:component/:name',
    component: './template/Kitchen',
  },
];

module.exports = {
  home: './',
  sideNav: routes,
  routes: routes
};