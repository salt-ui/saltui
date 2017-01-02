let routes = [
  {
    path: '/',
    component: './template/Home',
    name: '首页',
    icon: 'home'
  },
  {
    path: '/components',
    name: '组件',
    icon: 'dashboard',
    component: './template/layout/Layout', 
    indexRoute: {
      component: './template/Dashboard', 
    },
    childRoutes: [{
      path: '/components/:component',
      component: './template/Component'
    }]
  },
];

module.exports = {
  home: './',
  sideNav: routes,
  routes: routes
};