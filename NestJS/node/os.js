const os = require("node:os")
const { exec } = require("child_process")
console.log("os.type:",os.type())

console.log('os.platform:',os.platform());

console.log('os.release:',os.release());

console.log('os.homedir():',os.homedir());

console.log('os.arch:',os.arch())


console.log("os.cpus():",os.cpus())

console.log('os.networkInterfaces:',os.networkInterfaces());

function openBrowser(url) {
    if (os.platform() === 'darwin') {  // macOS
      exec(`open ${url}`); //执行shell脚本
    } else if (os.platform() === 'win32') {  // Windows
      exec(`start ${url}`); //执行shell脚本
    } else {  // Linux, Unix-like
      exec(`xdg-open ${url}`); //执行shell脚本
    }
  }
  
  // Example usage
  openBrowser('https://www.juejin.cn');
