function createFileChunk(file,size){
    const fileChunkList = []
    let cur = 0;
    while (cur < file.size){
        fileChunkList.push({
            file:file.slice(cur,cur+size)
        })
    }
    return fileChunkList
}

fileChunkList.map(({file},index)=>({
    chunk: file,           // 文件名 + 数组下标
   hash: this.container.file.name + "-" + index
}))

function uploadChunks(){
    const requestList = fileChunkList
    .map(({chunk,hash})=>{
        const formData = new FormData();
        formData.append("chunk",chunk);
        formData.append("hash",hash);
        formData.append('filename',this.container.file.name)
        return { formData }
    })
}