const fs = require('node:fs/promises')

fs.readFile('./test.js').then(res=>{
    console.log(res.toString())
})

const readStream = fs.createReadStream('./test.js',{encoding:'utf8'})

readStream.on('data',(chunk)=>{
    console.log(chunk)
})
readStream.on("end",()=>{
    console.log(close)
})