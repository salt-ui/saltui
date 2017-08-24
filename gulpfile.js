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

gulp.task('copy', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => dir !== 'tingle-ui').forEach((dir) => {
    runCmd('cp', ['-rf', `../tingle-ui/node_modules/@ali/${dir}/src`, `./lib/${upperInitWord(dir)}`]);
  });
});

gulp.task('remove', () => {
  const dirs = fs.readdirSync('../tingle-ui/node_modules/@ali');
  dirs.filter(dir => dir !== 'tingle-ui').forEach((dir) => {
    runCmd('rm', ['-rf', `./lib/${upperInitWord(dir)}/svg`]);
  });
});

gulp.task('replace', () => {
  const dirs = fs.readdirSync('./lib');
  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./lib/${dir}`);
    files.forEach((file, index) => {
      const filePath = `./lib/${dir}/${file}`;
      const stats = fs.statSync(filePath);
      if (stats.isFile() && /[.js|.jsx]$/.test(file)) {
        // console.log(filePath);
        const fileData = fs.readFileSync(filePath).toString();
        if (index === 0) {
          console.log(fileData);
        }
      } else if (stats.isDirectory()) {
        // console.log(filePath);
      }
    });
  });
});
