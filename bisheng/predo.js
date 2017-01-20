"use strict";
const path = require('path');
const fs = require('fs');
const sourceDir = path.join(__dirname, '..', 'components');
const rimraf = require('rimraf');

rimraf.sync('../components/*');

const copyFile = (src, dest) => {
	let defer = new Promise((resolve, reject) => {
		let dir = path.dirname(dest);
		fs.mkdir(dir, err => {
			if (err) {
				if (err.errno === -17) {
					// -17 means dir has existed.
					resolve();
				} else {
					reject(err);
				}
			} else {
				resolve();
			}
		});
	});
	defer.then(() => {
		fs.readFile(src, 'utf-8', (err, data) => {
			fs.writeFile(dest, data);
		});
	}).catch(err => {
		console.log(src, err);
	});
};

const generateComponents = (components, componentDir) => {
	components.forEach(component => {
		let targetDir = path.join(sourceDir, component);
		copyFile(
			path.join(componentDir, component, 'README.md'),
			path.join(targetDir, 'index.md')
		);
		copyFile(
			path.join(componentDir, component, 'History.md'),
			path.join(targetDir, 'HISTORY.md')
		);
		copyFile(
			path.join(componentDir, component, 'package.json'),
			path.join(targetDir, 'package.json')
		);
	});
}
fs.readdir('./node_modules', (err, files) => {
	const components = files
		.filter(file => file.startsWith('tingle-'));

  generateComponents(components, './node_modules');

});