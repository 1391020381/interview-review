const fs = require('fs');
const path = require('path')
console.time('eventLoop')
setTimeout(() => { // 新的事件循环的起点

    console.log('1');

}, 0);

setImmediate(() => {

    console.log('setImmediate 1');

});

/// 将会在 poll 阶段执行
console.time('eventLoop-fs')
fs.readFile(path.join(__dirname, './test.conf'), { encoding: 'utf-8' }, (err, data) => {
    console.timeEnd('eventLoop')
    console.timeEnd('eventLoop-fs')
    if (err) throw err;

    console.log('read file success');

});

/// 该部分将会在首次事件循环中执行

Promise.resolve().then(() => {

    console.log('poll callback');

});

// 首次事件循环执行

console.log('2');


// 2
// poll callback
// 1   当前没有可执行的任务
// setImmediate 1
// eventLoop: 13.218ms
// eventLoop - fs: 12.113ms
// read file success