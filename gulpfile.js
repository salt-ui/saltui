const gulp = require('gulp');
const fs = require('fs');
const { spawn } = require('child_process');
const getGitlabApi = require('@ali/gitlab-apis');
const co = require('co');
const rm = require('rimraf');
const to = require('to-case');


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
        for (let i = 0; i < prjs.length; i++) {
          const prj = prjs[i];
          try {
            results[i] = yield repositories.listTree(prj.id, 'demo/src');
          } catch (e) {
            console.log(e);
          }
          console.log(`${prj.path} Done`);
        }
        return results;
      }
      co(getFileList).then((results) => {
        prjs.forEach((prj, index) => {
          const fileList = results[index] || [];
          try {
            fs.statSync(`./lib/${upperInitWord(removePrefix(prj.path))}`);
            fileList.forEach((file) => {
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
            console.log(`${upperInitWord(removePrefix(prj.path))} is not a necessary prj`);
          }
        });
      });
    });
  });
});

let count = 0;
gulp.task('demo-replace', () => {
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
        count += 1;
        if (count === 5) {
          console.log(fileData);
        }
      }
    });
  });
});
