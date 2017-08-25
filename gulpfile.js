const gulp = require('gulp');
const fs = require('fs');
const { spawn } = require('child_process');


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

const upperInitWord = str => str.split('-').slice(1).map(key => (key[0].toUpperCase() + key.slice(1))).join('');
const removePrefix = str => str.split('-').slice(1).join('-');

gulp.task('copy', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => dir !== 'tingle-ui').forEach((dir) => {
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/src`, `./lib/${upperInitWord(removePrefix(dir))}`]);
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
        fileData = fileData.replace(/@ali\/tingle-(.+)'/, (match, s1) => {
          if (/^icon/.test(s1)) {
            return match;
          }
          return `../${upperInitWord(s1)}'`;
        });
        fs.writeFileSync(filePath, fileData);
      } else if (stats.isDirectory()) {
      }
    });
  });
});
