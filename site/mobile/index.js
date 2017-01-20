
module.exports = {

	routes: [{
		path: '/',
		component: './template/Layout',
		childRoutes: [{ 
			// path: '/demos/:demo', 
			// component: './template/Demo',
			// childRoutes: [{ 
				path: '/demos/:demo/:name', 
				component: './template/Demo',
			// }]
		}]
		}, 
	],
};
