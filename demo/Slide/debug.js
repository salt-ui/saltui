export default function debugFunc(...args) {
  let domConsole = document.getElementById('Console');
  if (!domConsole) {
    domConsole = document.createElement('div');
    domConsole.id = 'Console';
    domConsole.className = 'console console-fixed-bottom';
    document.body.appendChild(domConsole);
  }
  let content = `${domConsole.innerHTML}`;
  if (content) {
    content += '<br />';
  }
  const arr = [];
  Array.prototype.slice.call(args, 0).forEach((param) => {
    try {
      arr.push(typeof param === 'object' ? JSON.stringify(param) : param);
    } catch (error) {
      arr.push(param);
    }
  });
  domConsole.innerHTML = `${content}> ${arr.join(', ')}`;
  domConsole.scrollTop = 9999;
  // console.debug(...args);
}
