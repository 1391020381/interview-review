// 大文件上传 
// https://juejin.cn/post/7347617618511200310


const chunkFun = (file,size)=>{
    const chunks = []
    for(let i = 0;i<file.size;i+=size){
        chunks.push(file.slice(i,i+size))
    }
    return chunks
}


const uploadFile = (chunks) => {
    const List = []
    for (let i = 0; i < chunks.length; i++) {
    const formData = new FormData()
    formData.append('index', i)
    formData.append('total', chunks.length)
    formData.append('fileName', 'xiezhen')
    formData.append('file', chunks[i])
    List.push(fetch('http://127.0.0.1:3000/up', {
        method: 'POST',
        body: formData
    }))
}
Promise.all(List).then(res => {
    fetch('http://127.0.0.1:3000/merge',{
        method: 'POST',
        headers:{
           'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            fileName: 'xiaoManXieZhen',
        })
    }).then(res => {
        console.log(res)
    })
})
}
