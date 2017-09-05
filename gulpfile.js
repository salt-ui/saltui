const gulp = require('gulp');
const fs = require('fs');
const { spawn } = require('child_process');
const getGitlabApi = require('@ali/gitlab-apis');
const co = require('co');
const rm = require('rimraf');
const to = require('to-case');
const webpack = require('webpack');
const commonWebpackCfg = require('./webpack.dev.js');

const runCmd = (cmd, args = [], fn, stdoutFn) => {
  console.log(`Run CMD: ${cmd} ${args.join(' ')}`);
  const runner = spawn(cmd, args, {
    // keep color
    stdio: stdoutFn ? 'pipe' : 'inherit',
  });
  if (stdoutFn) {
    runner.stdout.on('data', (data) => {
      stdoutFn(data.toString());
    });
  }
  runner.on('close', (code) => {
    if (fn) {
      fn(code);
    }
  });
};

const upperInitWord = str => str.split('-').map(key => (key[0].toUpperCase() + key.slice(1))).join('');
const removePrefix = str => str.split('-').slice(1).join('-');

gulp.task('copy', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => dir !== 'tingle-ui').forEach((dir) => {
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/src`, `./lib/${upperInitWord(removePrefix(dir))}`]);
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/demo/src`, `./demo/${upperInitWord(removePrefix(dir))}`]);
  });
});

gulp.task('remove', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => dir !== 'tingle-ui').forEach((dir) => {
    runCmd('rm', ['-rf', `./lib/${upperInitWord(removePrefix(dir))}/svg`]);
  });
});

gulp.task('replace', () => {
  const dirs = fs.readdirSync('./lib');
  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./lib/${dir}`);
    files.forEach((file) => {
      const filePath = `./lib/${dir}/${file}`;
      const stats = fs.statSync(filePath);
      if (stats.isFile() && /[.js|.jsx]$/.test(file)) {
        let fileData = fs.readFileSync(filePath).toString();
        fileData = fileData.replace(/@ali\/tingle-(.+?)(['/])/g, (match, s1, s2) => {
          if (/^icon/.test(s1)) {
            return `salt-icon${s2}`;
          }
          return `../${upperInitWord(s1)}'`;
        });
        fs.writeFileSync(filePath, fileData);
      } else if (stats.isDirectory()) {
        console.log(filePath);
      }
    });
  });
});

gulp.task('gitlab', () => {
  rm('./demo/*', () => {
    const gitlabApi = getGitlabApi({
      private_token: 'bz9D5Y4aYygvC6axeMJK',
      base_url: 'http://gitlab.alibaba-inc.com',
      timeout: 10000,
    });
    const { groups, projects } = gitlabApi;
    const { repositories } = projects;
    groups.detail('tingle-ui').then((response) => {
      const prjs = response.projects.map(prj => ({ path: prj.path, id: prj.id }));
      function* getFileList() {
        const results = [];
        for (let i = 0; i < prjs.length; i += 1) {
          const prj = prjs[i];
          try {
            results[i] = {
              name: prj.path,
              list: yield repositories.listTree(prj.id, 'demo/src'),
            };
          } catch (e) {
            console.log(e);
          }
          console.log(`${prj.path} FileList Done`);
        }
        return results;
      }
      co(getFileList).then((results) => {
        prjs.forEach((prj, index) => {
          const fileList = results[index] || [];

          try {
            fs.statSync(`./src/${upperInitWord(removePrefix(prj.path))}`);
            fileList.list.forEach((file) => {
              if (file.type === 'blob') {
                repositories.rawFile(prj.id, 'master', `demo/src/${file.name}`).then((fileBlob) => {
                  const dirPath = `./demo/${upperInitWord(removePrefix(prj.path))}`;
                  try {
                    fs.statSync(dirPath);
                  } catch (e) {
                    fs.mkdirSync(dirPath);
                  }
                  fs.writeFileSync(`${dirPath}/${file.name}`, fileBlob);
                });
              }
            });
          } catch (e) {
            try {
              console.log(`${upperInitWord(removePrefix(prj.path))} is not a necessary prj`);
            } catch (err) {
              console.log(err);
            }
          }
        });
      });
    });
  });
});

gulp.task('demo_replace', () => {
  const dirs = fs.readdirSync('./demo');
  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./demo/${dir}`);
    files.forEach((file) => {
      if (/\.js(x)?$/.test(file)) {
        let fileData = fs.readFileSync(`./demo/${dir}/${file}`).toString();
        // replace @ali/tingle-context with salt-context
        fileData = fileData.replace(/@ali\/tingle-(.+?)(['/])/g, (match, s1, s2) => {
          return `salt-${s1}${s2}`;
        });
        // replace ../../src with salt-current-comp
        fileData = fileData.replace('../../src', `salt-${to.slug(dir)}`);
        // replace icon-source
        fileData = fileData.replace('// 插入svg', '');
        fileData = fileData.replace("var IconSymbols = require('./svg/tingle-icon-symbols.svg');", '');
        fileData = fileData.replace("var IconSymbols = require('./svg/private-symbols.svg');", '');
        fileData = fileData.replace("import IconSymbols from './svg/tingle-icon-symbols.svg';", '');
        fileData = fileData.replace("ReactDOM.render(<IconSymbols/>, document.getElementById('TingleIconSymbols'));", '');
        fileData = fileData.replace("ReactDOM.render(<IconSymbols />, document.getElementById('TingleIconSymbols'));", '');
        fileData = fileData.replace("ReactDOM.render(<IconSymbols/>, document.getElementById('PrivateSymbols'));", '');
        fs.writeFileSync(`./demo/${dir}/${file}`, fileData);
      } else if (/\.styl$/.test(file)) {
        let fileData = fs.readFileSync(`./demo/${dir}/${file}`).toString();
        // replace ../../node_modules/@ali/tingle-xxx/src/xxx.styl with ../../src/Xxx/Xxx.styl
        const regExpForCompStyl = /\.\.\/\.\.\/node_modules\/@ali\/tingle-(.+?)\/src\/(.+?).styl/g;
        fileData = fileData.replace(regExpForCompStyl, (match, s1, s2) => {
          return `../../src/${s2}/${s2}.styl`;
        });
        fs.writeFileSync(`./demo/${dir}/${file}`, fileData);
      }
    });
  });
});


gulp.task('server', (cb) => {
  const compiler = webpack(commonWebpackCfg);
  compiler.watch({}, (err, stats) => {
    console.log(`webpack log:${stats}`);
    if (stats.hasErrors()) {
            // 异常日志打印到屏幕
      fs.writeFileSync('./dist/demo.js', [
        'document.body.innerHTML="<pre>',
        stats.toJson().errors[0].replace(/[\n\r]/g, '<br>').replace(/\[\d+m/g, '').replace(/"/g, '\\"'),
        '</pre>";',
        'document.body.firstChild.style.fontFamily="monospace";',
        'document.body.firstChild.style.lineHeight="1.5em";',
        'document.body.firstChild.style.margin="1em";',
      ].join(''));
    }
    console.info('###### pack_demo done ######');
    cb();
  });
});
