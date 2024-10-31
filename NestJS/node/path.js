// path.join 拼接路径
// path.resolve   用于将相对路径解析并且返回 绝对路径
// path.parse path.format

const path  = require('path');

const res = path.basename('C:\temp\myfile.html')

console.log(res)



console.log(path.join('/foo','/cxk','/ikun'))

console.log(path.join(__dirname,'/foo','/cxk','/ikun'))




console.log(path.resolve('/aaa','/bbb','/ccc'))
console.log(path.resolve('foo', 'bar', 'baz/asdf', 'quux', '..'));
console.log(path.resolve(__dirname,'./index.js'))



console.log(path.parse('/home/user/dir/file.txt'))

const m = {
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
  }
  console.log(path.format(m))