const gulp = require('gulp');
const ejs = require('gulp-ejs');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-cleancss');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const rm = require('rimraf');
const assign = require('object-assign');
const colors = require('colors/safe');
const inquirer = require('inquirer');
const gulpRun = require('run-sequence');
const semver = require('semver');
const git = require('git-rev');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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

gulp.task('build_style', () => {
  const dirs = fs.readdirSync('./src');
  const ComponentNames = dirs.filter(dirName => (['Style', 'Utils'].indexOf(dirName) === -1) && !/^\./.test(dirName));
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
  const ComponentNames = dirs.filter(dirName => dirName !== 'Style' && !/^\./.test(dirName));
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
    externals: {
      react: {
        root: 'React',
        var: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        var: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
      },
    },
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
        spawnSync('git', ['push', 'origin', `${pkg.version}`], { stdio: 'inherit' });
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
          // columns: false,
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
          },
        ),
      ];
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

gulp.task('eslint', () => {
  gulp.src(['./demo/**/*.js', './demo/**/*.jsx'])
    .pipe(eslint())
    .pipe(eslint.format('checkstyle'));
});

