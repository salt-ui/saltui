const gulp = require('gulp');
const ejs = require('gulp-ejs');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-cleancss');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const getGitlabApi = require('@ali/gitlab-apis');
const co = require('co');
const rm = require('rimraf');
const to = require('to-case');
const assign = require('object-assign');
const colors = require('colors/safe');
const inquirer = require('inquirer');
const gulpRun = require('run-sequence');
const semver = require('semver');
const git = require('git-rev');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonWebpackCfg = require('./webpack.dev.js');
const pkg = require('./package.json');

const cleancssOption = {
  advanced: false,
  aggressiveMerging: false,
  sourceMap: true,
  compatibility: 'ie8',
  debug: true,
};

colors.setTheme({
  info: ['bold', 'green'],
});

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

const getQuestions = () => (
  new Promise((resolve) => {
    git.branch((branch) => {
      const defaultBranch = branch;
      const questions = [
        {
          type: 'input',
          name: 'version',
          message: 'please enter the package version to publish (should be xx.xx.xx)',
          default: pkg.version,
          validate(input) {
            if (semver.valid(input)) {
              if (semver.gt(input, pkg.version)) {
                return true;
              }
              return 'the version you entered should be larger than now';
            }
            return 'the version you entered is not valid';
          },
        },
        {
          type: 'input',
          name: 'branch',
          message: 'which branch you want to push',
          default: defaultBranch,
        },
      ];
      resolve(questions);
    });
  })
);

// 将 tingle-ui 组下的转移至 saltui 下
gulp.task('copy', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => ['tingle-ui', 'tingle-icon'].indexOf(dir) === -1).forEach((dir) => {
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/src`, `./src/${upperInitWord(removePrefix(dir))}`]);
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/demo/src`, `./demo/${upperInitWord(removePrefix(dir))}`]);
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/README.md`, `./docs/${upperInitWord(removePrefix(dir))}.md`]);
  });
});

// 删除对应 lib 下的 svg 文件夹
gulp.task('remove', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => dir !== 'tingle-ui').forEach((dir) => {
    runCmd('rm', ['-rf', `./src/${upperInitWord(removePrefix(dir))}/svg`]);
  });
});

// 将 src 中的 @ali/tingle-xxx 替换为 ../Xxx
gulp.task('replace', () => {
  const dirs = fs.readdirSync('./src');
  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./src/${dir}`);
    files.forEach((file) => {
      const filePath = `./src/${dir}/${file}`;
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

// 从 gitlab 拉取最新 Demo
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
              console.log(e);
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

// demo 中替换一些变量
gulp.task('demo_replace', () => {
  /* eslint-disable max-len */
  const dirs = fs.readdirSync('./demo');
  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./demo/${dir}`);
    files.forEach((file) => {
      if (/\.js(x)?$/.test(file)) {
        let fileData = fs.readFileSync(`./demo/${dir}/${file}`).toString();
        // replace @ali/tingle-context with salt-context
        fileData = fileData.replace(/@ali\/tingle-(.+?)(['/])/g, (match, s1, s2) => `salt-${s1}${s2}`);
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
        // replace ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
        // with export default Demo
        const regExpDemoIndex = /ReactDOM\.render\(<(.+)\/>, document\.getElementById\('TingleDemo'\)\)/g;
        fileData = fileData.replace(regExpDemoIndex,
          (match, s1) => `export default ${s1}`);
        if (/^index/.test(file)) {
          fileData = fileData.replace("import React from 'react';", '');
          fileData = fileData.replace("import ReactDOM from 'react-dom';", '');
        }
        fs.writeFileSync(`./demo/${dir}/${file}`, fileData);
      } else if (/\.styl$/.test(file)) {
        let fileData = fs.readFileSync(`./demo/${dir}/${file}`).toString();
        // replace ../../src/Button.styl with ../../src/Button/Button.styl
        fileData = fileData.replace(/\.\.\/\.\.\/src\/(.+)([.styl|'|"])/g, (match, s1, s2) => `../../src/${s1.split('.')[0]}/${s1.split('.')[0]}${s2}`);
        // replace ../../node_modules/@ali/tingle-xxx/src/xxx.styl with ../../src/Xxx/Xxx.styl
        // replace ../../node_modules/@ali/tingle-icon/src/icon.styl with ~salt-icon/src/Icon.styl
        const regExpForCompStyl = /\.\.\/\.\.\/node_modules\/@ali\/tingle-(.+?)\/src\/(.+)([.styl|'|"])/ig;
        fileData = fileData.replace(regExpForCompStyl, (match, s1, s2, s3) => {
          if (s1 !== 'icon') {
            return `../../src/${upperInitWord(s1)}/${s2.split('.')[0]}${s3}`;
          }
          return `~salt-icon/src/Icon${s3}`;
        });
        // replace @require '../../node_modules/@ali/tingle-ui/dist/default.min.css' with ''
        fileData = fileData.replace("@require '../../node_modules/@ali/tingle-ui/dist/default.min.css'", '');
        fileData = fileData.replace("@require '../../node_modules/@ali/tingle-ui/dist/default.css'", '');
        fileData = fileData.replace("@require '../../node_modules/@ali/tingle-ui/build/salt-ui.css'", '');
        fileData = fileData.replace("@require '../../node_modules/@ali/tingle-ui/build/salt-ui.min.css'", '');
        fs.writeFileSync(`./demo/${dir}/${file}`, fileData);
      }
    });
  });
  /* eslint-enable max-len */
});

// demo 中插入对于样式的引入
gulp.task('demo_inject', () => {
  const dirs = fs.readdirSync('./demo');
  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./demo/${dir}`);
    files.forEach((file) => {
      if (/^index(.*)\.js(x)?$/.test(file) && dir !== 'Context') {
        let fileData = fs.readFileSync(`./demo/${dir}/${file}`).toString();
        const index = fileData.indexOf('salt-context');
        console.log(`./demo/${dir}/${file}`);
        const str = `\r\nimport './${upperInitWord(dir)}Demo.styl';`;
        let splitIndex = index + 'salt-context'.length + 1;
        const detectSpliter = fileData[splitIndex];
        if (detectSpliter === ')') {
          splitIndex += 1;
        }
        fileData = fileData.slice(0, splitIndex + 1) + str + fileData.slice(splitIndex + 1);
        fs.writeFileSync(`./demo/${dir}/${file}`, fileData);
      }
    });
  });
});

gulp.task('build_style', () => {
  const dirs = fs.readdirSync('./src');
  const ComponentNames = dirs.filter(dirName => dirName !== 'Style');
  gulp.src('./template/component.styl')
      .pipe(ejs({ ComponentNames }))
      .pipe(gulp.dest('./style'))
      .on('end', () => {
        const themes = fs.readdirSync('./style/theme');
        themes.forEach((theme) => {
          gulp
            .src(`./style/theme/${theme}/saltui.styl`)
            .pipe(stylus())
            .pipe(autoprefixer({
              browsers: ['iOS >= 7', 'Android >= 2.3', 'FireFoxAndroid >= 46', '> 1%'],
            }))
            .pipe(rename(`${theme}.css`))
            .pipe(gulp.dest('./build'))
            .pipe(cleancss(cleancssOption))
            .pipe(rename({
              suffix: '.min',
            }))
            .pipe(gulp.dest('./build'));
        });
      });
});

gulp.task('build_lib', (cb) => {
  rm('./lib/*', () => {
    gulp
    .src(['./src/**/*.js', './src/**/*.jsx'])
    .pipe(babel({
      presets: ['react', 'env', 'stage-1'],
      plugins: ['add-module-exports'],
    }))
    .pipe(gulp.dest('./lib'))
    .on('end', () => {
      console.log('###### build_js done ######');
      if (cb) {
        cb();
      }
    });
  });
});

gulp.task('make_index', (done) => {
  const dirs = fs.readdirSync('./src');
  const ComponentNames = dirs.filter(dirName => dirName !== 'Style');
  gulp
    .src('./template/buildIndex.js')
    .pipe(ejs({ ComponentNames }))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      done();
    });
});

gulp.task('build_js', ['build_lib', 'make_index'], (done) => {
  const plugins = [
    // new BundleAnalyzerPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      webpack_set_version: `__SALT_VERSION__ = "${pkg.version}"`,
    }),
  ];
  const webpackCfg = assign({}, commonWebpackCfg, {
    entry: {
      index: './index',
    },
    output: {
      path: path.join(process.cwd(), './build'),
      filename: 'salt-ui.js',
      library: 'SaltUI',
      libraryTarget: 'umd',
    },
    plugins,
  });
  webpack(webpackCfg, (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`webpack log:${stats.toString({
        hash: false,
        chunks: false,
        children: false,
      })}`);
      done();
    }
  });
});
gulp.task('uglify_js', ['build_js'], (done) => {
  gulp.src('./build/salt-ui.js')
  .pipe(uglify({
    mangle: false,
  }))
  .pipe(rename('salt-ui.min.js'))
  .pipe(gulp.dest('./build'))
  .on('end', () => {
    done();
  });
});

gulp.task('build', ['uglify_js', 'build_style']);

gulp.task('pub', () => {
  getQuestions().then((questions) => {
    inquirer.prompt(questions).then((answers) => {
      pkg.version = answers.version;
      fs.writeFileSync('package.json', JSON.stringify(pkg, null, '  '));
      gulpRun('build', () => {
        console.log(colors.info('#### Git Info ####'));
        spawnSync('git', ['add', '.'], { stdio: 'inherit' });
        spawnSync('git', ['commit', '-m', `ver. ${pkg.version}`], { stdio: 'inherit' });
        spawnSync('git', ['tag', `${pkg.version}`], { stdio: 'inherit' });
        spawnSync('git', ['push', 'origin', answers.branch], { stdio: 'inherit' });
        console.log(colors.info('#### Npm Info ####'));
        spawnSync('npm', ['publish'], { stdio: 'inherit' });
      });
    }).catch((err) => { console.log(err); });
  }).catch((err) => { console.log(err); });
});

gulp.task('server', () => {
  /* eslint-disable camelcase */
  let component_name = 'button';
  const options = process.argv.slice(3);
  if (options[0] === '-m' && options[1]) {
    component_name = options[1].toLowerCase();
  }
  gulp
    .src('./template/devIndex.jsx')
    .pipe(ejs({
      ComponentName: upperInitWord(component_name),
      component_name,
    }))
    .pipe(rename('index.jsx'))
    .pipe(gulp.dest('./dev/'))
    .on('end', () => {
      const plugins = [
        new BrowserSyncPlugin({
          server: {
            baseDir: './',
          },
          startPath: `#${component_name}`,
          open: 'external',
        }, {
          reload: false,
        }),
        // SourceMap plugin will define process.env.NODE_ENV as development
        new webpack.SourceMapDevToolPlugin({
          columns: false,
        }),
        // new BundleAnalyzerPlugin(),
        new ProgressBarPlugin(),
        new webpack.NormalModuleReplacementPlugin(
          /salt-(.+)/,
          (resource) => {
            /* eslint-disable no-param-reassign */
            if (resource.request.indexOf('salt-icon') === -1 && resource.request.indexOf('salt-ui') === -1) {
              resource.request = resource.request.replace(/salt-(.+)/, (match, s1) => require.resolve(`./src/${upperInitWord(s1)}`));
            }
            /* eslint-enable no-param-reassign */
          }
        ),
      ];
      // { ...commonWebpackCfg, plugins }
      const compiler = webpack(assign({}, commonWebpackCfg, { plugins }));
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
      });
    });
  /* eslint-enable camelcase */
});

