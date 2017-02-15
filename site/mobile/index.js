const prefix = (global.location && global.location.port) ? '/' : '/saltui';

module.exports = {

	routes: [{
		path: prefix,
		component: './template/Layout',
		childRoutes: [{ 
			// path: '/demos/:demo', 
			// component: './template/Demo',
			// childRoutes: [{ 
				path: '/demos/:demo/:name', 
				component: './template/Layout',
			// }]
		}]
		}, 
	],
};
