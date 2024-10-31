// NodeJs进阶开发、性能优化指南  https://juejin.cn/post/7095354780079357966
// https://kaiwu.lagou.com/course/courseInfo.htm?courseId=694#/detail/pc?id=6794

// SSR QPS
// https://juejin.cn/post/7021362370739961887

// 常规代码优化
// 工具分析

const fs = require('fs');
const express  = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.end('hello world')
})

app.get('/index',(req,res)=>{
    const file = fs.readFileSync(__dirname + '/index.html','utf-8')
    res.end(file)
    /* return stream */
  // fs.createReadStream(__dirname + '/index.html').pipe(res)
})

app.listen(3000,()=>{
    console.log('service is listening:3000')
})
